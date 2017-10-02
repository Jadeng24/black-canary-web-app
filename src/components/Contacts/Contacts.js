import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png'
import x from '../../images/x.png'
const socket = io('http://localhost:3069');


export default class Contacts extends Component{
    constructor(){
        super()
        this.state={
            friendName: [{
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
          },],
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
            <div key={i}>
                <p>{group.name}</p>
            </div>
        )
    })

    const allFriends = this.state.friendName.map((friends, i)=>{
        return(
                <div key={i} className="listOfFriends">
                    <div className='imgContainer'><img src={this.state.friendName.img} alt="profile pic"/></div>
                    <div className='nameContainer'>
                        <p className="name">{friends.firstName}</p>
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
                    <FriendModal exit={this.exit} friend={this.state.friend}/>
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
                <img className="x" onClick={props.exit} src={x} alt="close"/>
            <div className="heaad">
                <p className="info">INFORMATION</p>
            </div>
            <div className="information">
                <p>USERNAME: {props.friend.username}</p>
                <p>NAME: {props.friend.firstName}</p>
                <p>EMAIL: {props.friend.email}</p>
            </div>

            <div className='groups'>
                <p className="added">ADD CONTACT TO GROUP:</p>
                <div className="groupsbox">
                    {props.allGroups}
                </div>
            </div>
        </div>
    </div> 
)