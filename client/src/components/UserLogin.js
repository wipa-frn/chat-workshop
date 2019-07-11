import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
const UserLogin = props =>{
    return (
        <div>
            <label className="label-name"><FontAwesomeIcon icon={faUserCircle} /> {props.userName}</label>
            <label  className="label-id">ID : {props.userId}</label>
        </div>
    )
}

export default UserLogin;