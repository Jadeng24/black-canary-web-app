import React, {Component} from 'react';
import io from 'socket.io-client';
import addFriend from '../../images/addFriendIconReal.png';
import x from '../../images/x.png';
import editIcon from '../../images/EDIT_ICON.svg'
import Groups from './Groups'


export default class GroupsModal extends Component{

    constructor(props){
        super(props)

        this.state={
            friends: props.group.friends,
            groupName: this.props.group.name,
            newGroupName:'',
            editGroupName: false
        }
        this.deleteFriendFromGroup = this.deleteFriendFromGroup.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    deleteFriendFromGroup(i){
        let friends=[...this.state.friends]
        friends.splice(i, 1) 
        this.setState({
            friends 
        })
    }

    handleChange(e){
        console.log(e.target.value)
        this.setState({
            newGroupName: e.target.value
        })
    }


    toggleEdit(input){
        if(input==='edit'){
            this.setState({
                editGroupName: true,
            })
        }else if(input==='added'){
            this.setState({
                editGroupName: false,
                groupName: this.state.newGroupName
            }, _=>{
                console.log('this.state.newGroupName:', this.state.newGroupName)
                console.log('this.groupName', this.state.groupName)
            })
        }
    }



    render(){
        let {group, exit, toggleGroupName} = this.props;

        const membersOfGroup = this.state.friends.map((friends, i) => {
            return(
                <div className="singleFriend" key={i}>
                    <p>{friends}</p>
                    <img className="deleteFriend" onClick={_=>this.deleteFriendFromGroup(i)} src={x} alt="delete"/>


                </div>
            )
        })

        return(
            <div className='GroupsModal'>
                <div className="groupsBox">
                    <div className="closeModal">
                        <img className="close" onClick={_=>exit()} src={x} alt='close'/>
                    </div>

                    <div className="header">

                        {
                            this.state.editGroupName
                            ?
                            <div className='inputArea'>
                                <input type="text" className="newGroupName" onChange={e=>this.handleChange(e)} value={this.state.newGroupName}/>
                                <button className="addBtn" onClick={_=>this.toggleEdit('added')}>ADD</button>
                            </div>
                            :
                            <div className="heady">
                                <p className="head">GROUP: {this.state.groupName}</p>
                                <img className="edit" onClick={_=>this.toggleEdit('edit')} src={editIcon} alt="edit"/>
                            </div>
                        }

                    </div>

                    <div>
                        <p className="title">members:</p>
                        <div className="list">{membersOfGroup}</div>
                    <button className="deleteButton">DELETE THIS GROUP</button>
                    </div>

                </div>
            </div>
        )
    }
}