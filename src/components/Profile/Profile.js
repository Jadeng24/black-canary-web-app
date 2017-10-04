import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import x from '../../images/x.png'
import io from 'socket.io-client';
import editIcon from '../../images/whiteEditIcon.svg'
import {connect} from 'react-redux';
import {getUserInfo, getFriendsList, getGroups, getActiveLocations} from './../../ducks/reducer';
import {editUser, updateUser, editSafeHaven, heartbeat} from './../../controllers/socketCTRL';

const socket = io('http://localhost:3069');

class Profile extends Component{
    constructor(){
        super()

        this.state={
            newUsername: '',
            newSafeHaven: '',
            toggleNameInput: false,
            changeSafeHaven: false,
            delete: false
        }
        this.toggleName = this.toggleName.bind(this)
        this.addedNewName = this.addedNewName.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeSafeHavenBtn = this.changeSafeHavenBtn.bind(this)
        this.deleteModal = this.deleteModal.bind(this)
    }

    componentDidMount(){
        
        // console.log('mount profile', this.props.user)
        updateUser(getUserInfo)
        heartbeat(getFriendsList, getUserInfo, getGroups, getActiveLocations);
    }

    toggleName(){
        this.setState({
            toggleNameInput: true
        })
    }

    addedNewName(){
        // this.props.editUsername(this.state.newName)
        // editUser(this.props.user);
        editUser({username: this.state.newName, userId: this.props.user.id});

        this.setState({
            toggleNameInput: false,
            newName: ''
        })
    }

    handleChange(input){
        let target = input.target
        console.log(target.value)
        this.setState({
            [target.name]: target.value
        })
    }

    changeSafeHavenBtn(input){
        if(input === 'add'){
            this.setState({
                changeSafeHaven: true
            })
        }else if(input === 'change'){
            editSafeHaven({safeHaven: this.state.newSafeHaven, userId: this.props.user.id})
            this.setState({
                changeSafeHaven: false,
                newSafeHaven: ''
            })
        }
    }

    deleteModal(type){
        if(type === 'popup'){
            this.setState({
                delete: true
            })
        }else if(type==='nvm'){
            this.setState({
                delete: false
            })
        }
    }

    componentDidMount(){
        socket.emit('save socket_id', {socketID: socket.id})
    }

    render(){
        let {user} = this.props;
        // console.log('profile page user:', user)

        return(
            <div className="ProfileContainer">

                <div className="Profile">
                
                 <div className='nameContainer'>
                    {
                        !this.state.toggleNameInput
                        ?
                        <div className='nameContainer'>
                            <div className="name">NAME: {this.props.user.username}</div>
                            <img className="editIcon" onClick={this.toggleName} src={editIcon} alt="edit"/>
                        </div>
                        
                        :
                        <div className="nameInputContainer">
                            <input className="nameInput" maxlength="5" name="newName" type="text" onChange={(e)=> {this.handleChange(e, 'name')}} value={this.state.newName}/>
                            <button onClick={this.addedNewName} className="addNewNameBtn">ADD</button>
                        </div>
                    }
                </div>

    
                    <div className="imgContainer">
                        <div className="imgPlaceholder"></div>
                    </div>
                



                
                {
                    !this.state.changeSafeHaven
                    ?
                    <div className="safehavenContainer">
                        <p className="safeHaven"> SAFEHAVEN: {this.props.user.safe_haven}</p>
                        <img onClick={()=>{this.changeSafeHavenBtn('add')}} className="editIcon" src={editIcon} alt="edit"/>
                    </div>
                    :
                    <div className="safeHavenInput">
                        <input className="safeHavenInput" type="text" name="newSafeHaven" onChange={e=>this.handleChange(e)} value={this.state.newSafeHaven}/>
                        <button onClick={()=> {this.changeSafeHavenBtn('change')}} className='changebtn'>ADD</button>
                    </div>
                }


                <div className="navigationBtns">
                    <Link className="contacts" to="/contacts">CONTACTS</Link>
                    <Link className="contacts" to="/Home">GROUPS</Link>
                    <a href='http://localhost:3069/auth/logout'> <p className="logOut">LOGOUT</p> </a>
                    {
                        !this.state.delete
                        ?
                        <button onClick={()=> {this.deleteModal('popup')}} className="deleteBtn">DELETE YOUR ACCOUNT</button>
                        :
                        <div className="deleteModal">
                            <img src={x} alt='close' className="close" onClick={()=> {this.deleteModal('nvm')}}/>
                            <p className="head">ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?</p>
                            <div className="deleteBtns">
                                <Link className="yes" to="/">YES, I WANT TO FEEL UNSAFE</Link>
                                <button onClick={()=> {this.deleteModal('nvm')}} className="no">NO, I WANT TO CONTINUE FEELING SAFE</button>
                            </div>
                        </div>
                    }
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    // let {user} = state;
    // return {user}
    return state;
}

let outputActions = {
    editUser,
    getUserInfo,
    getFriendsList,
    getGroups,
    getActiveLocations
}

export default connect(mapStateToProps, outputActions)(Profile);