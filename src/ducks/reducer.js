const initialState = {
    user: {
        username: 'abby',
        firstName: '',
        lastName: '',
        email: '',
        profilepic: '',
        auth_id: '',
        socket_id: '',
        id: '',
        location: '',
        safe_haven: '123 street'
    },
    friends: [], //array of friend objects [{friend_username, friend_firstname, friend_lastname, friend_email, friend_id, friend_status, friend_pic, user_id}] 
    groups: [], //array of group objects [{groupId, groupName, members:[]}]
    activeLocations: [], //array of active locations with messages and fromUser
    userLoggedIn: false
};


const GET_USER_INFO = 'GET_USER_INFO',
      GET_FRIENDS_LIST = 'GET_FRIENDS_LIST',
      GET_GROUPS = 'GET_GROUPS',
      GET_ACTIVE_LOCATIONS = 'GET_ACTIVE_LOCATIONS',
      DELETE_USER = 'DELETE_USER';


//get user info
//add to componentDidMount, inside socket.on('update user')/socket.on('heartbeat')
export function getUserInfo(user){
    return {
        type: GET_USER_INFO,
        payload: user 
    }
}

//get friends list
// add to componentDidMount, inside socket.on('heartbeat')
export function getFriendsList(friends){
    return {
        type: GET_FRIENDS_LIST,
        payload: friends
    }
}


//get groups 
// add to componentDidMount, inside socket.on('heartbeat')
export function getGroups(groups){
    return {
        type: GET_GROUPS,
        payload: groups
    }
}


//get active locations sent to current user
// add to componentDidMount, inside socket.on('heartbeat')

export function getActiveLocations(locations){
    return {
        type: GET_ACTIVE_LOCATIONS,
        payload: locations
    }
}

//delete user


//double check what the payload is for each action
export default function reducer(state = initialState, action){
    let { user, friends, groups, activeLocations } = state;

    switch (action.type) {
        case GET_USER_INFO:
        // console.log('reducer get user info', action.payload)
            return Object.assign({}, state, {user: action.payload})
            break;
        case GET_FRIENDS_LIST:
        // console.log('reducer get friends',action.payload)
            return Object.assign({}, state, {friends: action.payload})
            break;
        case GET_GROUPS:
        // console.log('reducer get groups', action.payload)
            return Object.assign({}, state, {groups: action.payload})
            break;
        case GET_ACTIVE_LOCATIONS:
        // console.log('reducer get active locations', action.payload)
            return Object.assign({}, state, {activeLocations: action.payload})
            break;

        default:
            break;
    }
    
    return state;
}
