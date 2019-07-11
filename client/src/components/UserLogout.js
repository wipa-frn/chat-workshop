import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { Button} from 'react-bootstrap';
const UserLogout = props =>{
    const {  currentUser , logoutUser } = props;
    return (
        <div>
            <Button onClick={() => logoutUser(currentUser)}>Log out <FontAwesomeIcon icon={faSignOutAlt} /></Button>
        </div>
    )
}

export default UserLogout;