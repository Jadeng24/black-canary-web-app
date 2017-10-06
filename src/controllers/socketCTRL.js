import io from 'socket.io-client';
const socket = io('http://localhost:3069');

//these functions are invoked in their components' componentsDidMount() life cycle method

//========= socket.on listeners ==============//
    export function socketOn(){
        socket.on('connect', ()=> {
            console.log(socket.id)
        })
    }
    
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

    export function searchResults(saveToState){
        socket.on('search results', data=> {
            saveToState(data)
        })
    }
    
    // export function activeLocations(){ //on home page/landing page with map
    //     //write socket.emit('show locations') from server to use the active_locations table to send to all recipients the active locations
    //     socket.on('show locations', data => {
    //         //use maps to show the data
    //     })
    // }
    

    //=============== emit sockets ===================//

    export function sendLocation(alert){ //in situations, send objects with user info with user location, array of recipient ids to add to the active_locations table in db
        console.log(alert)
        socket.emit('send location', alert)
    }

    export function editUser(user){ //on profile page, update username or safe haven and send the whole user object
        console.log('socket controller user:', user)
        socket.emit('update user info', user)
    }

    export function editSafeHaven(user){
        socket.emit('update safe haven', user)
    }

    export function deleteUser(userId){ //on profile page, delete user and send the user id to server
        socket.emit('delete user', userId)
    }

    export function addGroup(userId, group){
        socket.emit('add group', {userId, group})
    }

    export function addFriendToGroup(groupId, friendId){ //on contact/group page
        //in component, send friend id and group id in socket.emit
        socket.emit('add friend to group', {groupId, friendId})
    }

    export function removeFriendFromGroup(groupId, friendId){ //on group page
        socket.emit('remove friend from group', {groupId, friendId})
    }

    export function requestFriend(friendId){ //on contact page
        socket.emit('friend request', friendId)
    }

    export function confirmFriendRequest(requestId){
        //on profile or contacts page
        socket.emit('confirm friend request', requestId)
    }

    export function declineFriendRequest(requestId){
        //on profile or contacts page
        //requestId is friend.id
        socket.emit('decline friend request', requestId)
    }

    export function deleteGroup(groupId){
        //on groups page
        socket.emit('delete group', groupId)
    }

    export function renameGroup(group){
        //on groups page
        socket.emit('rename group', group)
    }

    export function createEmergencyGroup(userId, group){
        //group includes message and recipients
        //on settings/profile page
        socket.emit('create emergency group', {userId, group})
    }

    // export function editEmergencyGroup(contacts){
    //     //on settings/profile page
    //     // contacts are an array of contact_ids
    //     socket.emit('edit emergency group', contacts)
    // }



    export function friendSearch(firstName){
        socket.emit('friend search', firstName);
    }