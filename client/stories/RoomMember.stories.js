import React from 'react';
import { storiesOf } from '@storybook/react';
import RoomMember from '../src/components/RoomMember'

storiesOf('Room Member', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
.add('default', () =>( 
    <RoomMember totalMember={6}/>
  ));