import React from 'react';
import { storiesOf } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RoomType from '../src/components/RoomType'
import {faUsers,faUserFriends} from '@fortawesome/free-solid-svg-icons'

const memberOnline = 3;
const memberOffline = 5;

storiesOf('RoomType', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('Group', () =>( 
    <ul><RoomType name="Group Messaages" /><FontAwesomeIcon icon={faUsers} /></ul>
  ))  
  .add('Direct', () =>( 
    <ul><RoomType name="Direct Messaages"/><FontAwesomeIcon icon={faUserFriends} /></ul>
  ))
  .add('Online', () =>( 
    <ul><RoomType name={"Online ("+ memberOnline +")"}/></ul>
  ))
  .add('Offline', () =>( 
    <ul><RoomType name={"Offline ("+ memberOffline +")"}/></ul>
  ))
  ;