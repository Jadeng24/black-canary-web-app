//these functions are invoked in their components' componentsDidMount() life cycle method
//or server.js

module.exports = {
    heartbeat: function(){ //in menu? component 
        //DONE //write socket.emit('heartbeat') from server
        //DONE //write action in reducer.js to save to state
        socket.on('heartbeat', data=> {
            //save friends: data.friends,
            //save userInfo: data.user,
            //save groups: data.groups,
            //save activeLocations: data.activeLocations
        })
    },
    updateUser: function(){ //in profile component
        //DONE //write socket.emit('update user') from server
        //DONE //write action in reducer.js to save to state
        socket.on('update user', data=>{
            //save userInfo: data.user
        })
    },
    activeLocations: function(){ //on home page/landing page with map
        //write socket.emit('show locations') from server to use the active_locations table to send to all recipients the active locations
        socket.on('show locations', data => {
            //use maps to show the data
        })
    },
    

    //emit sockets
    sendLocation: function(recipients){ //in situations, send objects with user info with user location, array of recipient ids to add to the active_locations table in db
        //DONE //write socket.on('send location') in server, post to db
        socket.emit('send location', {user, recipients})
    },
    editUser: function(){ //on profile page, update username or safe haven and send the whole user object
        //DONE //write socket.on('update user info') in server to save user object to db
        socket.emit('update user info', {user})
    },
    deleteUser: function(){ //on profile page, delete user and send the user id to server
        //DONE //write socket.on('delete user') in server to delete user from db by user id
        socket.emit('delete user', {userId})
    }
    

};