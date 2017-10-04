import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png'
import x from '../../images/x.png'
import FriendModal from './../FriendModal/FriendModal';
import {connect} from 'react-redux';
import {getFriendsList, getGroups} from './../../ducks/reducer';
const socket = io('http://localhost:3069');


class Contacts extends Component{
    constructor(){
        super()
        this.state={
            friendName: [
                {
                    firstName: 'Janise',
                    lastName: 'Suski',
                    username: 'janises',
                    userID: 1,            
                    socketID: '98734jbfhljabh38y7r8734oybfjsdhbfwp495bfuijfsgnk547',
                    email: 'janises@janises.janises'
                },
                {
                    firstName: 'Andi',
                    lastName: 'Platter',
                    username: 'meatGap',
                    userID: 2,                        
                    socketID: '98asjdfhauiwefnkjfgskrguroybfjsdhbf8734y534hgsdf63g263',
                    email: 'andi@meat.gap'
                },
                {
                    firstName: 'Abby',
                    lastName: 'Thelin',
                    username: 'noBats',
                    userID: 3,                                    
                    socketID: '732h5bd672bdhu5489dhj834hf743ihfbfjsdhbfwp495bfuijfsgnk547',
                    email: 'abby@noBats.tuna'
                },
                {
                    firstName: 'Alan',
                    lastName: 'Miller',
                    username: 'alien',
                    userID: 4,                                    
                    socketID: '732h98234f59e7634asdghf2946msndfblrehfsdhbfwp495bfuijfsgnk547',
                    email: 'alan@theystillthinkimhuman.mothership'
                },
                {
                    firstName: 'Mom',
                    lastName: '',
                    username: 'knk',
                    userID: 35,                                    
                    socketID: '732kasjdhf74qbafjlhskf7q98234hfkjdff743ihfbfjsdhbfwp495bfuijfsgnk547',
                    email: 'mom@mom.mom'
                },
                {
                    firstName: 'Jake',
                    lastName: 'Keator',
                    username: 'jakeSnake',
                    userID: 44,                                    
                    socketID: '7akjsdafhlao723hflakhf34fbajshfs3784kufhibfblrehfsdhbfwp495bfuijfsgnk547',
                    email: 'brother@brother.brother'
                },
            ],
            groups: [
                {name: 'starWars'}, 
                {name: 'Pokemon'}, 
                {name: 'Dev'}, 
                {name: 'BLAHHHHH'},
                {name: 'gurlzzz'},
                {name: 'dumbBOYZ'}
            ],
            friendModal: false,
            friend: null
        }
        this.showModalMethod = this.showModalMethod.bind(this)
        this.exit = this.exit.bind(this)
    }

    showModalMethod(friend){
        this.setState({
            friendModal: true,
            friend
        })
    }

    exit(){
        this.setState({
            friendModal: false
        })
    }

    toggleGroupAdd(event, groupObj) {

    }

    render(){

    const allGroups = this.state.groups.map((group, i)=>{
        return(
            <div key={i}>
                <p className="groups">{group.name}</p>
            </div>
        )
    })

    const allFriends = this.props.friends.map((friend, i)=>{
        return(
                <div key={i} className="listOfFriends">
                    <div className='imgContainer'><img src={friend.friend_pic} alt="profile pic"/></div>
                    <div className='nameContainer'>
                        <p className="name">{friend.friend_firstname}</p>
                        <button className="seeInfo" onClick={_=>this.showModalMethod(friend)}>SEE INFO</button>
                    </div>
                </div>
        )
        })

        return(
            <div className="Contacts">

                {
                    !this.state.friendModal
                    ?
                    null
                    : 
                    <FriendModal exit={this.exit} friend={this.state.friend} groups={this.state.groups}/>
                }

                    <div className='header'>
                        <header className='head'>FRIENDS</header>
                        <img className="addFriend" src={addFriend} alt="addFriendIcon"/>
                    </div>

                {
                    !this.state.friendModal
                    ?
                    <div>
                    {allFriends} 
                    </div>
                    :
                    null
                }

            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

let outputActions = {
    getFriendsList,
    getGroups
}

export default connect(mapStateToProps, outputActions)(Contacts);