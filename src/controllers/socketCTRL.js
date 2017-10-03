import io from 'socket.io-client';
const socket = io('http://localhost:3069');

//these functions are invoked in their components' componentsDidMount() life cycle method

//========= socket.on listeners ==============//

    export function heartbeat(getFriendsList, getUserInfo, getGroups, getActiveLocations){ //in home component 
        socket.on('heartbeat', data=> {
            // console.log('data in controller', data)
            //pass in action reducers to heartbeat function in component
            getFriendsList(data.friends);
            getUserInfo(data.userInfo);
            getGroups(data.groups);
            getActiveLocations(data.activeLocations);
        })
    }

    export function updateUser(getUserInfo){ //in profile component
        socket.on('update user', user=>{
            //pass in getUserInfo action reducer in component
            getUserInfo(user)
        })
    }
    
    export function activeLocations(){ //on home page/landing page with map
        //write socket.emit('show locations') from server to use the active_locations table to send to all recipients the active locations
        socket.on('show locations', data => {
            //use maps to show the data
        })
    }
    

    //=============== emit sockets ===================//

    export function sendLocation(user, recipients){ //in situations, send objects with user info with user location, array of recipient ids to add to the active_locations table in db
        socket.emit('send location', {user, recipients})
    }

    export function editUser(user){ //on profile page, update username or safe haven and send the whole user object
        socket.emit('update user info', {username: user.username, userId:user.id})
    }

    export function deleteUser(userId){ //on profile page, delete user and send the user id to server
        socket.emit('delete user', userId)
    }

    export function addFriendToGroup(group){ //on contact/group page
        //in component, add friend id to array in reducer and send the array in socket.emit
        socket.emit('add friend to group', group)
    }

    export function deleteGroup(groupId){
        socket.emit('delete group', groupId)
    }

    // export function updateGroup(userId, groupName) {
    //     socket.emit('update group', {userId, groupName})
    // }