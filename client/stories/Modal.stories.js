import React from 'react';
import { storiesOf } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { Button,Modal,Form } from 'react-bootstrap';

let show = false;

function handleShow(){
  show = true;
}
function handleClose(){
  show = false;
}

storiesOf('Modal', module)
  .add('Create Room Button', () => 
  <ul>
    <li className="room-title-li" onClick={handleShow}>
    <div className="title-room">
      <div>Create Room </div>
      <div><FontAwesomeIcon  icon={faPlusCircle} /></div>
    </div>
    </li>
  </ul>
  )
  .add('Create Room Modal', () => 
    <ul>
    <li className="room-title-li" onClick={handleShow}>
    <div className="title-room">
      <div>Create Room </div>
      <div><FontAwesomeIcon  icon={faPlusCircle} /></div>
    </div>
    </li>

    <Modal show={handleShow} onHide={handleClose} >
    <Modal.Header closeButton>
      <Modal.Title>Create Room</Modal.Title>
    </Modal.Header>
    <Form >
      <Modal.Body>
      
        <Form.Group >
          <Form.Label>Room Name</Form.Label>
          <Form.Control type="text" placeholder="Room Name" name="roomName"  />
        </Form.Group>
        <Form.Group>

          <Form.Label>Add user to this room</Form.Label>

          <Form.Group  >
            {/* { this.state.friendsCheckbox.map(friend => { */}
              <Form.Check type="checkbox" name='id1' value='ployy'  label={" "+'ployy'}  />
              <Form.Check type="checkbox" name='id2' value='kenn'  label={" "+'kenn'}  />
            {/* })} */}
            
          </Form.Group>

          <Form.Group>
            <div  className="mb-3">
              <Form.Check
                inline
                label="Room is private"
                // type="checkbox"
                // onClick={this.handleCheckedTypeRoom}
                // checked={this.state.isPrivate}
              />
            </div>
          </Form.Group>
        </Form.Group>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit">
          Create
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancle
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
  </ul>
  )

  .add('Add Member Modal', () => 
  <ul>
  <li className="room-title-li" onClick={handleShow}>
  <div className="title-room">
    <div>Create Room </div>
    <div><FontAwesomeIcon  icon={faPlusCircle} /></div>
  </div>
  </li>

  <Modal show={handleShow} onHide={handleClose} >
  <Modal.Header closeButton>
    <Modal.Title>Add User To Room</Modal.Title>
  </Modal.Header>
  <Form >
    <Modal.Body>
    
      <Form.Group >
        <Form.Label>Room Name</Form.Label>
        <Form.Control as="select" >
        <option value='{room.id}' > {'Room ID : room.id (room name)'} </option>
        <option value='{room.id}' > {'Room ID : room.id (room name)'} </option>
        <option value='{room.id}' > {'Room ID : room.id (room name)'} </option>
        </Form.Control>
      </Form.Group>

      <Form.Group>

        <Form.Label>Add user to this room</Form.Label>

        <Form.Group  >
          {/* { this.state.friendsCheckbox.map(friend => { */}
            <Form.Check type="checkbox" name='id1' value='ployy'  label={" "+'ployy'}  />
            <Form.Check type="checkbox" name='id2' value='kenn'  label={" "+'kenn'}  />
          {/* })} */}
          
        </Form.Group>

    
      </Form.Group>
      
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" type="submit">
        Create
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Cancle
      </Button>
    </Modal.Footer>
  </Form>
</Modal>
</ul>
)
  ;