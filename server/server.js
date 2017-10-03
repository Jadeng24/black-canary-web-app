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

        db.find_user([profile.identities[0].user_id])
        .then( user => {
            if(user[0]) {
                console.log('user found',user)
                return done(null, user[0])
            } else {
            //if they're logging in with google, profilePic should be profile.picture
                db.create_user([profile.nickname, profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile['_json']['picture_large'], profile.identities[0].user_id])
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
      successRedirect: `http://localhost:3070/#/`,
      failureRedirect: `http://localhost:3070/#/`
  }));

  passport.serializeUser((user, done)=> {
      console.log('serialize', user)
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
      res.redirect(302, '/#/')
  });


//================ SOCKETS ==============//
io.on('connection', socket => {
    console.log('A user has connected, socket ID: ', socket.id);

// heartbeat updates the connected user every second
    // setInterval(heartbeat, 1000);
    // function heartbeat(){
    //     let userInfo, groups, friends, activeLocations;
    //     //app.get all info from db to send in heartbeat
    //     app.get('db').get_user_info([currentUser.id])
    //         .then(user=> {
    //             userInfo: user;
    //         });
            
    //     app.get('db').get_groups([currentUser.id])
    //         .then(data=> {
    //             groups: data
    //         });

    //     app.get('db').get_friends([currentUser.id])
    //         .then(data=> {
    //         friends: data
    //         });

    //     app.get('db').get_active_locations([currentUser.id])
    //         .then(data => {
    //             activeLocations: data
    //         });

    //     socket.emit('heartbeat', {userInfo, groups, friends, activeLocations})
    // }

    socket.on('save socket_id', data => {
        console.log('socket.on save socket_id. data', data,'current user:', currentUser)
        currentUser.id ?
            app.get('db').update_socket_id([data.socketId, currentUser.auth_id])
        :
            null;
    })

    socket.on('send location', data => {
        // post data to active_locations table in db

        app.get('db').add_active_location([data.userId, data.coordinates, data.situation, data.recipients]);
    })

    socket.on('update user info', data => {
        //put the user info by user id to (users table) in db
        app.get('db').update_username([data.username, data.userId])
            .then(user=> {
                socket.emit('update user', {user})
            })
    })

    socket.on('delete user', userId => {
        app.get('db').delete_user([userId])
    })

    socket.on('update group', group=> {
        app.get('db').update_group([group.friendIds, group.name, group.id]);
    })

    socket.on('delete group', groupId=> {
        app.get('db').delete_group([groupId])
    })

    socket.on('disconnect', ()=> {
        console.log('A user has disconnected, socket ID: ', socket.id);
    })

})



//server listening for sockets
server.listen(port, ()=> console.log(`Listening on port ${port}`));
