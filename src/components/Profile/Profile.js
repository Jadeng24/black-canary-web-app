import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import editIcon from '../../images/whiteEditIcon.svg'


// eslint-disable-next-line
const socket = io('http://localhost:3069');

export default class Profile extends Component{
    constructor(){
        super()

        this.state={
            name: 'name',
            newName: '',
            safeHaven: 'SH',
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

    toggleName(){
        this.setState({
            toggleNameInput: true
        })
    }

    addedNewName(){
        this.setState({
            toggleNameInput: false,
            name: this.state.newName
        })
    }

    handleChange(input){
        let target = input.target
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
            this.setState({
                changeSafeHaven: false,
                safeHaven: this.state.newSafeHaven
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

    // componentDidMount(){
    //     socket.emit('save socket_id', {socketID: socket.id})
    // }

    render(){
        return(
            <div className="Profile">

                
                 <div className='nameContainer'>
                    {
                        !this.state.toggleNameInput
                        ?
                        <div className='nameContainer'>
                            <div className="name">{this.state.name}</div>
                            <img className="editIcon" onClick={this.toggleName} src={editIcon} alt="edit"/>
                        </div>
                        
                        :
                        <div className="nameInputContainer">
                            <input className="nameInput" name="newName" type="text" onChange={(e)=> {this.handleChange(e, 'name')}} value={this.state.newName}/>
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
                        <p className="safeHaven"> SAFEHAVEN: {this.state.safeHaven}</p>
                        <button onClick={()=>{this.changeSafeHavenBtn('add')}} className="changebtn" >CHANGE</button>
                    </div>
                    :
                    <div className="safeHavenInput">
                        <input type="text" name="newSafeHaven" onChange={e=>this.handleChange(e)} value={this.state.newSafeHaven}/>
                        <button onClick={()=> {this.changeSafeHavenBtn('change')}} className='changebtn'>add</button>
                    </div>
                }


                <div className="navigationBtns">
                    <Link to="/contacts"> <button className="btn">GO TO CONTACTS</button> </Link>
                    <Link to="/Home"> <button className="btn">GO TO GROUPS</button> </Link>
                    {
                        !this.state.delete
                        ?
                        <button onClick={()=> {this.deleteModal('popup')}} className="deleteBtn">DELETE YOUR ACCOUNT</button>
                        :
                        <div className="deleteModal">
                            <button onClick={()=> {this.deleteModal('nvm')}}> close</button>
                            <p className="head">ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?</p>
                            <div className="deleteBtns">
                                <Link className="yes" to="/login"><button className="yes">YES, I WANT TO FEEL UNSAFE</button></Link>
                                <button onClick={()=> {this.deleteModal('nvm')}} className="no">NO, I WANT TO CONTINUE FEELING SAFE</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}