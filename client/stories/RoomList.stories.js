import React from 'react';

import { storiesOf } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock ,faComment} from '@fortawesome/free-solid-svg-icons'
import {Badge } from 'react-bootstrap';

const room = {
  isPrivate : true,
  customData : {
    isDirectMessage : true,
    userIds : ['ploy','ken','pare']
  },
  name : 'Little Monster',
  unreadCount : 3
}

const currentUser = {
    id: 'wipawadee'
}
const roomIcon = !room.isPrivate ? <FontAwesomeIcon icon={faComment} /> : <FontAwesomeIcon icon={faLock} />;
const roomIcon_public = room.isPrivate ? <FontAwesomeIcon icon={faComment} /> : <FontAwesomeIcon icon={faLock} />;

storiesOf('Room List', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('private', () => 
  <li className={"room-name"}
//   key = {room.id}
//   onClick={() => connectToRoom(room.id) }
  >
  <div>{ roomIcon }&nbsp;
  {room.customData && room.customData.isDirectMessage ? (
    room.customData.userIds.filter( id => id !== currentUser.id)[0]
  ) : (
    room.name
  )}
  </div>
  </li>
  )
  .add('public', () => 
  <li className={"room-name"}
//   key = {room.id}
//   onClick={() => connectToRoom(room.id) }
  >
  <div>{ roomIcon_public }&nbsp;
  {room.customData && room.customData.isDirectMessage ? (
    room.customData.userIds.filter( id => id !== currentUser.id)[0]
  ) : (
    room.name
  )}
  </div>
  </li>
  )
  .add('unreadcount', () => 
  <li className={"room-name"}
//   key = {room.id}
//   onClick={() => connectToRoom(room.id) }
  >
  <div>{ roomIcon_public }&nbsp;
  {room.customData && room.customData.isDirectMessage ? (
    room.customData.userIds.filter( id => id !== currentUser.id)[0]
  ) : (
    room.name
  )}
  </div>
  { (room.unreadCount !== 0) ? (<Badge variant="danger">{room.unreadCount}</Badge>) : null}
  
  </li>
  )
  ;

