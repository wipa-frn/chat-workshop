import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'

const TypingIndicator = () => {
    return (
        <li className="message-receiver typing-indicator"><div><FontAwesomeIcon icon={faEllipsisH}/></div></li>
    )
}

export default TypingIndicator