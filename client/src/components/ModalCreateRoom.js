import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { Button,Modal,Form } from 'react-bootstrap';
import {
    handleInput,
} from '../methods';
  
class ModalCreateRoom extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        show: false,
        roomName: null,
        members:[props.currentUser.id],   
        friendsCheckbox: this.dafaultCheckedFriend(),
        isPrivate: false,
  
      };
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleInput = handleInput.bind(this);
      this.handleChecked = this.handleChecked.bind(this);
      this.handleCheckedTypeRoom = this.handleCheckedTypeRoom.bind(this);
      this.dafaultCheckedFriend = this.dafaultCheckedFriend.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
  
    handleClose() {
      this.setState({
        show: false,
        roomName: null,
        members:[this.props.currentUser.id],   
        friendsCheckbox: this.dafaultCheckedFriend(),
        isPrivate: false
      })
    }
  
    handleShow() {
      this.setState({
        show: true,
        roomName: '',
        members:[this.props.currentUser.id],   
        friendsCheckbox: this.dafaultCheckedFriend(),
        isPrivate: false
      })
    }
    handleChecked = (event) => {
  
        let friends = this.state.friendsCheckbox
        friends.forEach(friend => {
           if (friend.id === event.target.name)
            friend.isChecked = event.target.checked
        })
        this.setState({friendsCheckbox: friends})
      }

    handleCheckedTypeRoom = (event) => {
 
      if(event.target.checked){
        this.setState({isPrivate: true})
      }
      else{
        this.setState({isPrivate: false})
      }
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

  
      return friends;
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (this.state.roomName === null || this.state.roomName.trim() === '') {
        alert('Room name is required');
        return;
      }
  
      let members = this.state.members;
  
      this.state.friendsCheckbox.map( friend => {
        if(friend.isChecked === true ){
            members = [...members,friend.id]
      }
      })
  
      this.props.createRoom(this.state.roomName,members,this.state.isPrivate); //create room
  
      this.setState({
        show: false,
        roomName: '',
        members:[this.props.currentUser.id],   
        friendsCheckbox: this.dafaultCheckedFriend(),
        isPrivate: false
      })
  
    }
  
  
    render() {
      return (
        <>
          <li className="room-title-li" onClick={this.handleShow}>
            <div className="title-room">
              <div>Create Room </div>
              <div><FontAwesomeIcon  icon={faPlusCircle} /></div>
            </div>
          </li>
  
          {/* Modal Crate Room */}
          <Modal show={this.state.show} onHide={this.handleClose} >
            <Modal.Header closeButton>
              <Modal.Title>Create Room</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleSubmit}>
              <Modal.Body>
              
                <Form.Group >
                  <Form.Label>Room Name</Form.Label>
                  <Form.Control type="text" placeholder="Room Name" name="roomName" value={this.state.roomName} onChange={this.handleInput} />
                </Form.Group>
                <Form.Group>
  
                  <Form.Label>Add user to this room</Form.Label>
  
                  <Form.Group  >
                    { this.state.friendsCheckbox.map(friend => {
                      return <Form.Check type="checkbox" name={friend.id} value={friend.name} checked={friend.isChecked} label={" "+friend.name}  onClick={this.handleChecked}/>
                    })}
                    
                  </Form.Group>

                  <Form.Group>
                    <div  className="mb-3">
                      <Form.Check
                        inline
                        label="Room is private"
                        type="checkbox"
                        onClick={this.handleCheckedTypeRoom}
                        checked={this.state.isPrivate}
                      />
                    </div>
                  </Form.Group>
                </Form.Group>
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Create
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
  
export default ModalCreateRoom;