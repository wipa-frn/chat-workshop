import React, { Component } from 'react';
import './App.css';
import {
  handleInput,
  handleInputMessage,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  createRoom,
  addUserToRoom,
  logoutUser,
  sendDM,
  
} from './methods';
import FormLogin from './components/FormLogin.js'
import TypingIndicator from './components/TypingIndicator.js'
import RoomList from './components/RoomList.js'
import UserLogin from './components/UserLogin.js'
import UserList from './components/UserList.js'
// import UserLogout from './components/UserLogout.js'
import TitleRoom from './components/TitleRoom.js'
import ChatSession from './components/ChatSession.js'
import InputMessage from './components/InputMessage.js'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt,faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import ScrollToBottom from 'react-scroll-to-bottom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      newMessage: '',
      typingUsers: [],

    };

    this.handleInput = handleInput.bind(this);
    this.handleInputMessage = handleInputMessage.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.sendMessage = sendMessage.bind(this);
    this.createRoom = createRoom.bind(this);
    this.addUserToRoom = addUserToRoom.bind(this);
    this.logoutUser = logoutUser.bind(this);
    this.sendDM = sendDM.bind(this);
  }

  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
      typingUsers,
 
    } = this.state;

    

    return (
  
   
    //chat screen
     <div className="App">
        {currentUser ? (
          <aside className="sidebar left-sidebar">
            <header className="room-header">
              <UserLogin userName={currentUser.name} userId={currentUser.id}></UserLogin>
            </header>

            {currentRoom ? (
              <RoomList 
                rooms={rooms}
                currentRoom={currentRoom}
                connectToRoom={this.connectToRoom}
                currentUser={currentUser}
                createRoom={this.createRoom}
                addUserToRoom={this.addUserToRoom}
                messages={messages} 
              />
            ) : null }

            <footer className="bottom-footer">
              {/* <UserLogout logoutUser={logoutUser} currentUser={currentUser}/> */}
              <Button  onClick={() => this.setState({ showLogin : logoutUser(currentUser,showLogin)})} size="lg">Log out <FontAwesomeIcon icon={faSignOutAlt} /></Button>
            </footer>
          </aside>
        ) : null}

        <section className="chat-screen">
          <header className="chat-header">
            {currentRoom ? <TitleRoom roomName={roomName}/> : null}
          </header>

          <ScrollToBottom className="chat-section">
            <ul className="chat-messages">
                <ChatSession messages={messages} currentUser={currentUser}></ChatSession>
                {//show [icon typing] when user is typing.
                  typingUsers.map(typingUser=>{
                    if((typingUser.isTyping === true ) && (typingUser.roomId === currentRoom.id)){
                      return <TypingIndicator/>
                    }
                  })
                }
            </ul>
          </ScrollToBottom>  

          <footer className="chat-footer">
            <InputMessage newMessage={newMessage} currentUser={currentUser} currentRoom={currentRoom} sendMessage={this.sendMessage} handleInputMessage={this.handleInputMessage}/>
          </footer>

        </section>
        <aside className="sidebar right-sidebar">
          {showLogin ? (
            <FormLogin
              userId={userId}
              handleInput={this.handleInput}
              connectToChatkit={this.connectToChatkit}
            />
          ):null}

          {currentRoom ? (
            <UserList currentUser={currentUser} chatUsers={roomUsers} sendDM={this.sendDM}/>
          ) : null }
         
        </aside> 
      </div>
    );
  }
}

export default App;