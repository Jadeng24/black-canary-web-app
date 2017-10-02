//these functions are invoked in their components' componentsDidMount() life cycle method


module.exports = {
    heartbeat: function(getFriendsList, getUserInfo, getGroups, getActiveLocations){ //in home component 
        socket.on('heartbeat', data=> {
            //pass in action reducers to heartbeat function in component
            getFriendsList(data.friends);
            getUserInfo(data.user);
            getGroups(data.groups);
            getActiveLocations(data.activeLocations);
        })
    },
    updateUser: function(getUserInfo){ //in profile component
        socket.on('update user', user=>{
            //pass in getUserInfo action reducer in component
            getUserInfo(user)
        })
    },
    activeLocations: function(){ //on home page/landing page with map
        //write socket.emit('show locations') from server to use the active_locations table to send to all recipients the active locations
        socket.on('show locations', data => {
            //use maps to show the data
        })
    },
    

    //emit sockets
    sendLocation: function(user, recipients){ //in situations, send objects with user info with user location, array of recipient ids to add to the active_locations table in db
        socket.emit('send location', {user, recipients})
    },
    editUser: function(user){ //on profile page, update username or safe haven and send the whole user object
        socket.emit('update user info', {username: user.username, userId:user.id})
    },
    deleteUser: function(userId){ //on profile page, delete user and send the user id to server
        socket.emit('delete user', {userId})
    },
    addFriendToGroup: function(group){ //on contact/group page
        //in component, add friend id to array in reducer and send the array in socket.emit
        socket.emit('add friend to group', group)
    },
    deleteGroup: function(groupId){
        socket.emit('delete group', groupId)
    }

};