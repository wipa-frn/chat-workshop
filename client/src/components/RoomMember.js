import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserFriends} from '@fortawesome/free-solid-svg-icons'

const RoomMember = props => {
    const  {totalMember } = props;
    return (
        <h6><FontAwesomeIcon icon={faUserFriends} /> Room Members ({totalMember})</h6>
    )
}

export default RoomMember