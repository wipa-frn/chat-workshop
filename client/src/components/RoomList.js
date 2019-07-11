import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock ,faComment,faUsers,faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { Badge} from 'react-bootstrap';
import Proptypes from 'prop-types';
import ModalCreateRoom from './ModalCreateRoom'
import ModalAddUserToRoom from './ModalAddUserToRoom'
import RoomType from './RoomType'
import 'react-slidedown/lib/slidedown.css'

const RoomList = props => {

  const { rooms, currentRoom , connectToRoom , currentUser ,createRoom,addUserToRoom} = props;
  
  // function show room list
  const groupList = rooms.map(room => {
    
    const roomIcon = !room.isPrivate ? <FontAwesomeIcon icon={faComment} /> : <FontAwesomeIcon icon={faLock} />;
    const isRoomActive = room.id === currentRoom.id ? 'active' : '' ;
    
    if(room.id === currentRoom.id){room.unreadCount = 0}

    if((!room.customData) || (!room.customData.isDirectMessage)){
    
      return(
        <li className={"room-name " + isRoomActive}
            key = {room.id}
            onClick={() => connectToRoom(room.id) }
        >
          <div>{ roomIcon }&nbsp;
            {room.customData && room.customData.isDirectMessage ? (
              room.customData.userIds.filter( id => id !== currentUser.id)[0]
            ) : (
              room.name
            )}
          </div>
          
          { (room.unreadCount !== 0) ? (<Badge variant="danger">{room.unreadCount}</Badge>) : null }

        </li>
      )
    }
    else{
      return null;
    }

  });

  const directChats = rooms.map(room => {
    const roomIcon = !room.isPrivate ? <FontAwesomeIcon icon={faComment} /> : <FontAwesomeIcon icon={faLock} />;
    const isRoomActive = room.id === currentRoom.id ? 'active' : '' ;

    if(room.id === currentRoom.id){room.unreadCount = 0}

    if(room.customData && room.customData.isDirectMessage){
      return(
        <li className={"room-name "+isRoomActive}
            key = {room.id}
            onClick={() => connectToRoom(room.id) }
        >
          <div>{ roomIcon }&nbsp;
            {room.customData && room.customData.isDirectMessage ? (
              room.customData.userIds.filter( id => id !== currentUser.id)[0]
            ) : (
              room.name
            )}
          </div>
          { (room.unreadCount !== 0) ? (<Badge variant="danger">{room.unreadCount}</Badge>) : null}
          
        </li>
      )
    }
    else{
      return null;
    }

  });

    return (
      <>
          <ul>    
            <ModalCreateRoom createRoom={createRoom} currentUser={currentUser} />  
            <ModalAddUserToRoom addUserToRoom={addUserToRoom} currentUser={currentUser} currentRoom={currentRoom}/> 
            <RoomType name="Group Messages" icon="faUsers" /> 
            {/* <FontAwesomeIcon  icon={faUsers} /> */}
            <div className="room-list scroll-bar">
              {groupList}
            </div>
            <RoomType name="Direct Messages" icon="faUserFriends"/> 
            {/* <FontAwesomeIcon  icon={faUserFriends} /> */}
            <div className="room-list direct-scroll-bar">
              {directChats}
            </div>
          </ul>
      </>
    )
};

RoomList.propTypes = {
  rooms: Proptypes.array.isRequired,
  currentRoom: Proptypes.object.isRequired,
  connectToRoom: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired,
};

export default RoomList


