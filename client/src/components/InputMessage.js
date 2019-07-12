import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'

const InputMessage = props => {

    const { newMessage , currentUser, currentRoom ,sendMessage,handleInputMessage} = props;

    return (
        <form onSubmit={sendMessage} className="message-form">
            <input
            type="text"
            value={newMessage}
            name="newMessage"
            className="message-input"
            placeholder="Type your message and hit ENTER to send"
            onChange={handleInputMessage}
            />
            <Button variant="info" type="submit"><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></Button>
        </form>
    )
}

export default InputMessage