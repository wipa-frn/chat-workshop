import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { Button,Modal,Form } from 'react-bootstrap';
import {
    handleInput
  } from '../methods';
  
class ModalAddUserToRoom extends React.Component {
  
    constructor(props, context) {
      super(props, context);
      
      this.state = {
        show: false,
        roomId: this.props.currentUser.rooms[0].id,
 
      };
        
      this.state = {
        friendsCheckbox: this.dafaultCheckedFriend(),
      };
  
      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleInput = handleInput.bind(this);
      this.handleChangeRoom = this.handleChangeRoom.bind(this);
      this.handleChecked = this.handleChecked.bind(this);
      this.dafaultCheckedFriend = this.dafaultCheckedFriend.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
  
    handleClose() {
      this.setState({ 
        show: false ,
        roomId: this.props.currentUser.rooms[0].id
      });

      this.setState({ friendsCheckbox: this.dafaultCheckedFriend() })
   
    }
  
    handleShow() {
      this.setState({ 
        show: true ,
        roomId: this.props.currentUser.rooms[0].id
      });

    }

    handleChangeRoom(e) {
        this.setState({ roomId: e.target.value });
        this.setState({ friendsCheckbox: this.dafaultCheckedFriend() })
      }

    handleChecked = (event) => {

      let friends = this.state.friendsCheckbox

      friends.map(friend => {
        if (friend.id === event.target.name){
          friend.isChecked = event.target.checked
        }
      })
      this.setState({friendsCheckbox: friends})
    }

    dafaultCheckedFriend(){
    let friends=[];
    this.props.currentUser.users.map(user => {
        if(user.id !== this.props.currentUser.id){
          friends = [...friends , {   //array ที่เก็บ object 
            id : user.id,
            name : user.name,
            isChecked : false,
        }]
        }
    });

    let roomId = this.state.roomId;

    this.props.currentUser.rooms.map(room => {
      if(room.id === roomId ){
        room.userIds.map(userId=>{
          friends = friends.filter( friend=>friend.id !== userId)
        })
      }
    })
    

    return friends;
    }

    handleSubmit(e) {
      e.preventDefault();

      let members = [];

      this.state.friendsCheckbox.map( friend => {
        if(friend.isChecked === true ){
            members = [...members,{
                roomId: this.state.roomId,
                userId: friend.id
            }]
        }
      })

      if ( members.length === 0 ) {
        alert('User member is required');
        return;
      }

      this.props.addUserToRoom(members);     //add user to room 
  
      this.setState({ 
        show: false ,
        roomId: this.props.currentUser.rooms[0].id,
        friendsCheckbox: this.dafaultCheckedFriend()
      });
      
    }
  
    render() {
      return (
        <>
          <li className="room-title-li" onClick={this.handleShow}>
            <div className="title-room">
              <div>Add user to room </div>
              <div><FontAwesomeIcon  icon={faPlusCircle} /></div>
            </div>
          </li>
          {/* Modal Add user to room */}
          <Modal  show={this.state.show} onHide={this.handleClose} >
            <Modal.Header closeButton>
              <Modal.Title>Add user to room</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleSubmit}>
              <Modal.Body>
              
                <Form.Group >
                  <Form.Control as="select" onChange={this.handleChangeRoom} value={this.state.roomId} onClick={this.handleChangeRoom}>

                      { this.props.currentUser.rooms.map(room => {
                        if(!(room.customData && room.customData.isDirectMessage)){
                          return <option value={room.id} > {'Room ID : '+room.id+ ' ('+room.name+')'} </option>
                        }
                        })}
                      
                    </Form.Control>
                </Form.Group>
                <Form.Group>
  
                  <Form.Label>Add user to this room</Form.Label>
                  <Form.Group  >
                   
                    { this.state.friendsCheckbox.length > 0 ? 
                      this.state.friendsCheckbox.map(friend => {
                        return <Form.Check type="checkbox" name={friend.id} value={friend.name} checked={friend.isChecked} label={" "+friend.name}  onClick={this.handleChecked}/>
                      })
                      : <div><h6 align="center">"Your friends are all in this room."</h6></div>
                    }
                    
                  </Form.Group>
                </Form.Group>
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Add
                </Button>
                <Button variant="secondary" onClick={this.handleClose}>
                  Cancle
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      );
    }
  }

  export default ModalAddUserToRoom