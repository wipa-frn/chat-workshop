import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle,faUserFriends,faCommentDots} from '@fortawesome/free-solid-svg-icons'
import Proptypes from 'prop-types';
import { Button } from 'react-bootstrap';
import RoomType from './RoomType';
import RoomMember from './RoomMember'

const UserList = props => {

    const { chatUsers, currentUser ,sendDM } = props;
    let totalMember = 0;
    let memberOnline = 0;
    let memberOffline = 0;
    
    const users_online = chatUsers.map(user => { 
        
        if (user.presence.state === 'online'){
            memberOnline++;
            totalMember++;
            return (
                <li className="chat-username" key = {user.id}>
                    <div> {user.name} </div>
                    <div >
                        {currentUser.id !== user.id ? (
                            <Button className="send-dm"  variant="link" onClick={() => sendDM(user.id)} title={`Send ${user.name} a direct message`}>
                                <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
                            </Button>
                        ) : null} 

                        {user.presence.state === 'online' ? ( <FontAwesomeIcon icon={faCircle} color="#6AC957" size="xs"/> ) : null }
                    </div>
                </li>
            )
        }

            
    })

    const users_offline = chatUsers.map(user => { 
        if (user.presence.state === 'offline'){
            totalMember++;
            memberOffline++;
            return (
                <li className="chat-username" key = {user.id}>
                    <div> {user.name} </div>
                    <div >
                        {currentUser.id !== user.id ? (
                            <Button className="send-dm"  variant="link" onClick={() => sendDM(user.id)} title={`Send ${user.name} a direct message`}>
                                <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
                            </Button>
                        ) : null}                        
                        
                        {user.presence.state === 'offline' ? ( <FontAwesomeIcon icon={faCircle} color="#A4A4A4" size="xs"/> ) : null }
                    </div>
                </li>

            )
        }
    })
    return (
        <div>
      
            <header className="user-header">
                <RoomMember totalMember={totalMember}/>
            </header>

            <ul>
                <RoomType name={"Online ("+ memberOnline +")"}/>
                {users_online}
                <RoomType name={"Offline ("+ memberOffline +")"}/>
                {users_offline}
            </ul>
        </div>
    )
}

UserList.propTypes = {
    chatUsers: Proptypes.array.isRequired,
    currentUser: Proptypes.object.isRequired,
    sendDM: Proptypes.func.isRequired,
};

export default UserList;