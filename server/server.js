require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , session = require('express-session')
    , cors = require('cors')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , sockets = require('socket.io')
    , io = sockets(server)
    , port = process.env.PORT;

    let currentUser = {};

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(__dirname + './../build')) //npm build to deploy app

massive({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: true
  }).then( db => {
    app.set('db', db);
  })



passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
},  function(accessToken, refreshToken, extraParams, profile, done) {
        const db = app.get('db')
    // console.log(profile)
        db.find_user([profile.identities[0].user_id])
        .then( user => {
            if(user[0]) {
                // console.log('user found',user)
                return done(null, user[0])
            } else {
            //if they're logging in with google, profilePic should be profile.picture
                db.create_user([profile.nickname, profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile.picture, profile.identities[0].user_id])
                .then(user => {
                    return done(null, user[0])
                })
            }
        })
    }
));


// ================= AUTH ENDPOINTS =================//

//authorize user
  app.get('/auth', passport.authenticate('auth0'));


//redirect user to home page
  app.get('/auth/callback', passport.authenticate('auth0', {
      successRedirect: `http://localhost:3070/#/home`,
      failureRedirect: `http://localhost:3070/#/`
  }));

  passport.serializeUser((user, done)=> {
    //   console.log('serialize', user)
      currentUser = user;
      done(null, user)
  });

  passport.deserializeUser((obj, done)=> {
      // console.log('line 80', obj)
      app.get('db').find_user([obj.auth_id])
      .then( user=> {
      // console.log('deserialize', user)
         done(null, user[0])
      })
  });

  app.get('/auth/me', (req, res, next) => {
      console.log(req.user)
      let response, status=200
      if (!req.user) {
      //    res.status(404).send('User not found');
        status=404
        response='User not found'
      } else {
      //    res.status(200).send(req.user);
        response = req.user
      }
      res.status(status).send(response)
    })


  //log out
  app.get('/auth/logout', (req, res)=> {
      req.logOut();
      res.redirect(302, 'http://localhost:3070/#/')
  });


//========================= SOCKETS ===================================//

io.on('connection', socket => {
    console.log('A user has connected, socket ID: ', socket.id);
    let userInfo, groups, friends, activeLocations, emergencyGroup;

// heartbeat updates the connected user every second
if(currentUser.id) {
    setInterval(heartbeat, 500);
    function heartbeat(){
        app.get('db').get_user_info([currentUser.id])
            .then(user=> {
                // console.log('get user info', user)
                userInfo = user[0];
            });

        app.get('db').get_groups([currentUser.id])
            .then(data => {
                let groupsObj = {};
                for(let i = 0; i < data.length; i++) {
                    if(groupsObj.hasOwnProperty(data[i].group_id)){
                        groupsObj[data[i].group_id].members.push({ username: data[i].member_username,
                        userID: data[i].member_user_id});
                    } else {
                        groupsObj[data[i].group_id] = {
                            groupID: data[i].group_id,
                            groupName: data[i].group_name,
                            members: [{username: data[i].member_username,
                                userID: data[i].member_user_id}]
                        }
                    }
                }
                let groupsArr = [];
                for (group in groupsObj) {
                    groupsArr.push(groupsObj[group]);
                }
                //ultimate return: the array "groups" of object {groupName, groupID, members: [{username, userID}, {username, userID}]}
                // console.log('groups data line 197', groupsArr)
                groups = groupsArr;

            })

        app.get('db').get_friends([currentUser.id])
            .then(data=> {
                // console.log('get friends', data)
            friends = data
            });

        app.get('db').get_active_locations([currentUser.id])
            .then(data => {
                // console.log('get active locations', data)
                //change data and save to activeLocations
                activeLocations = {
                    1: [],
                    2: [],
                    3: []
                }
                data.map(e => {
                    // console.log(e);
                    let {message, situation} = e;
                    let coordinates;
                    if(e.coordinates) {
                        let coord = e.coordinates.split('*');
                        coordinates = {lat: 1*coord[0], lng: 1*coord[1]};
                    }else {
                        coordinates ={lat: 40.226192, lng:  -111.660776}
                    }
                    
                    let senderName = `${e.senderfirstname} ${e.senderlastname}`;

                    activeLocations[e.situationlevel].push({senderName, coordinates, message, situation})
                })
                //"29348748*-983475"

                // activeLocations = data
            });

        // app.get('db').get_emergency_group([currentUser.id])
        //     .then(data=> {
        //         emergencyGroup = data
        //     })

            // console.log('userInfo:', userInfo, 'groups:', groups, 'friends:', friends, 'activeLocations:', activeLocations)
        socket.emit('heartbeat', {userInfo, groups, friends, activeLocations, emergencyGroup})
    }
}

    socket.on('save socket_id', data => {
        currentUser.id ?
        app.get('db').update_socket_id([data.socketId, currentUser.auth_id])
        :
        null;
        // console.log('socket.on save socket_id. data', data,'current user:', currentUser)
    })

    socket.on('send location', data => {
        // post data to active_locations table in db
        console.log('data:', data)
        app.get('db').add_active_location([data.user_id, data.user_coordinates, data.situation, data.situation_level, data.message])
            .then(alert=> {
                console.log('alert[0]', alert[0])
                let all = [...data.individual_recip];
                data.group_recip.map(group => {
                    group.members.map(member => {
                        all.push(member.userID)
                    })
                });
                let x = new Set(all);
                allRecip = Array.from(x);

                allRecip.map(recip => {
                    app.get('db').add_location_recipient([alert[0].id, recip])
                })
            })
    })

    socket.on('update user info', user => {
        //put the user info by user id to (users table) in db
        console.log('server socket.on user,', user)
        app.get('db').update_username([user.username, user.userId])
            .then(user=> {
                socket.emit('update user', user)
            })
    })

    socket.on('update safe haven', data=> {
        app.get('db').update_safe_haven([data.userId, data.safeHaven])
            .then(user=> {
                socket.emit('update user', user)
            })
    })

    socket.on('delete user', userId => {
        console.log(userId)
        app.get('db').delete_user([userId])
    })

    socket.on('add group', data=> {
        // console.log('data:', data)
        app.get('db').add_group([data.userId, data.group.group_name])
        .then(group=> {
            // console.log('group',group)
            app.get('db').add_friend_to_group([group[0].id, data.group.friendId])
        })
    })

    socket.on('rename group', group=> {
        console.log('rename group:',group)
        app.get('db').rename_group([group.group_name, group.id]);
    })

    socket.on('delete group', groupId=> {
        app.get('db').delete_group([groupId])
    })

    socket.on('create emergency group', data=> {
        app.get('db').create_emergency_group([data.userId, data.group.message])
            .then(data=> {
                console.log('data from emergency group creation', data)
                app.get('db').add_emergency_contacts([data.emergency_id, data.group.recipient])
            })
    })

    socket.on('edit emergency group', contacts=> {
        contacts.map(contact=> {
            app.get('db').edit_emergency_group([currentUser.id, contact])
             
        })
    })

    socket.on('friend search', firstName => {
        let results;
        app.get('db').search_by_firstName([firstName])
            .then(friends => {
                console.log(friends)
                // friends.map(friend=> {
                //     app.get('db').search_for_pending([friend.id])
                //         .then(friend => {
                //             if(friend) {
                //                 if(friend.friend_status === false) {
                //                     socket.emit('search results', )
                //                 }
                //             }
                //         })
                // })



                socket.emit('search results', friends)
            })

                //see friends of current user, save to array
                //loop through friends array to see if requested friends are the same
                //if friends array[0].friend_status = false, send "pending"
                //if true, splice that friend out of requested friends array

        
    })

    socket.on('friend request', friendId=> {
        app.get('db').request_friend([currentUser.id, friendId])

    })

    socket.on('confirm friend request', requestId=> {
        app.get('db').confirm_friend([requestId])
    })

    socket.on('decline friend request', requestId=> {
        app.get('db').decline_friend([requestId])
    })

    socket.on('add friend to group', data=> {
        app.get('db').add_friend_to_group([data.groupId, data.memberId])
    })

    socket.on('remove friend from group', data=> {
        app.get('db').remove_friend_from_group([data.groupId, data.friendId])
    })



    socket.on('disconnect', ()=> {
        console.log('A user has disconnected, socket ID: ', socket.id);
    })

})



//server listening for sockets
server.listen(port, ()=> console.log(`Listening on port ${port}`));
