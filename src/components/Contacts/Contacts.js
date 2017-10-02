import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png'
import x from '../../images/x.png'
const socket = io('http://localhost:3069');


export default class Contacts extends Component{
    constructor(){
        super()
        this.state={
            friendName: [{name: 'blahblah', id: 2}, {name: 'bob', id: 3}, {name: 'rob', id: 4}, {name: 'robert', id: 5}, {name: 'nina', id: 6}, {name: 'Lynda', id: 7}, {name: 'Abby', id: 8}, {name: 'ash', id: 200}, {name: 'bob', id: 30}, {name: 'rob', id: 40}, {name: 'robert', id: 50}, {name: 'nina', id: 60}, {name: 'Lynda', id: 70}, {name: 'Abby', id: 80}],
            groups: [{name: 'starWars'}, {name: 'Pokemon'}, {name: 'Dev'}, {name: 'BLAHHHHH'}],
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

    render(){

    const allGroups = this.state.groups.map((group, i)=>{
        return(
            <div>
                <p>{group.name}</p>
            </div>
        )
    })

    const allFriends = this.state.friendName.map((friends, i)=>{
        return(
                <div key={i} className="listOfFriends">
                    <div className='imgContainer'><img src={this.state.friendName.img} alt="profile pic"/></div>
                    <div className='nameContainer'>
                        <p className="name">{friends.name}</p>
                        <button className="seeInfo" onClick={_=>this.showModalMethod(friends)}>SEE INFO</button>
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
                    <FriendModal friend={this.state.friend}/>
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


const FriendModal = (props) =>(

    <div className="modal">
        <div className="box">
            <div className="heaad">
                <img className="x" onClick={this.props.exit} src={x} alt="close"/>
                <p className="info">INFORMATION</p>
            </div>
            <div className="information">
                <p>NAME: {props.friend.name}</p>
                <p>ID: {props.friend.id}</p>
                <p>EMAIL: {props.friend.name}</p>
                <p>NUMBER: {props.friend.name}</p>
            </div>

            <div className='groups'>
                <p>ADD CONTACT TO GROUP</p>
                <div className='groupsbox'>{props.allGroups}</div>

            </div>
        </div>
    </div> 
)