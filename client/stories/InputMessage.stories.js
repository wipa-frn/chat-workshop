import React from 'react';
import { storiesOf } from '@storybook/react';
import InputMessage from '../src/components/InputMessage'

let newMessage ;

const sendMessage = event => {
  event.preventDefault()
  alert('send message : '+newMessage)
}

function handleInputMessage(event) {
  newMessage = event.target.value
}

storiesOf('Input Text', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('input text', () => (
      <InputMessage 
        newMessage={newMessage} 
        // currentUser={currentUser} 
        // currentRoom={currentRoom} 
        sendMessage={sendMessage} 
        handleInputMessage={handleInputMessage}/>

  ));