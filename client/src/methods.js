import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import { isTypeAlias } from '@babel/types';

function handleInput(event) {
  const { value, name } = event.target;

  this.setState({
    [name]: value,
  });

}

function handleInputMessage(event) {
  const { value, name } = event.target;
 
  this.setState({
    [name]: value,
  });
  typingMessage.call(this)

  

}

function connectToRoom(id) {
  const { currentUser } = this.state;

  this.setState({
    messages: [],
  });

  return currentUser
    .subscribeToRoom({  //รายละเอียด room ที่ connect
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {

          const {currentUser,currentRoom } = this.state

          this.setState({
            messages: [...this.state.messages, message],
          });

          //set cursor when connect to room
          if((currentRoom !== null && currentRoom.id === `${id}`)){
            
            currentUser.setReadCursor({
              roomId: `${id}`,
              position: message.id
            })
            .then(() => {
              console.log('Success! set cursor')    
            })
            .catch(err => {
              console.log(`Error setting cursor: ${err}`)
            })
          }
            
        },
        onPresenceChanged: () => {

          const { currentRoom } = this.state;

          this.setState({
            roomUsers: currentRoom.users.sort(a => {
              if (a.presence.state === 'online') return -1;
              return 1;
            }),
          });

        },

        onUserStartedTyping: user => {

          const { typingUsers} = this.state;
          let newTypingUsers = [];

          typingUsers.map(typingUser =>{
            if( typingUser.userId === user.id && typingUser.roomId === `${id}`){
              let tmp = {
                isTyping : true,
                userId : typingUser.userId,
                roomId : `${id}`
              }
              newTypingUsers = [...newTypingUsers,tmp]
   
            }
            else{
              newTypingUsers = [...newTypingUsers,typingUser]
            }
          })

          this.setState({
            typingUsers : newTypingUsers
          })
      
          console.log(`User ${user.name} started typing`)

        },
        onUserStoppedTyping: user => {
          const { typingUsers} = this.state;
          let newTypingUsers = [];
          
          typingUsers.map(typingUser =>{
            if( typingUser.userId === user.id && typingUser.roomId === `${id}`){
              let tmp = {
                isTyping : false,
                userId : typingUser.userId,
                roomId : `${id}`
              }
              newTypingUsers = [...newTypingUsers,tmp]
   
            }
            else{
              newTypingUsers = [...newTypingUsers,typingUser]
            }
          })

          this.setState({
            typingUsers : newTypingUsers
          })
      
          console.log(`User ${user.name} stoped typing`)          
        },

      },
    })
    .then(currentRoom => {

      const { typingUsers } = this.state;                                                       

      //add new user typing in each rooms
      let newTypingUser = {};
      let newTypingUsers = [];

      currentRoom.users.map(roomUser=>{
        newTypingUser = {
          isTyping : false,
          userId : roomUser.id,
          roomId : currentRoom.id
        }

        if(typingUsers.length > 0){

          let isDuplicate = false

          typingUsers.map(user=>{
            if((newTypingUser.userId === user.userId) && (newTypingUser.roomId === user.roomId)){
              isDuplicate = true
            }
          })

          if(!isDuplicate){
            newTypingUsers = [...newTypingUsers,newTypingUser]
          }

          isDuplicate = false
          
        }
        else{
          newTypingUsers = [...newTypingUsers,newTypingUser]
        }
        
      })

      const roomName =
        currentRoom.customData && currentRoom.customData.isDirectMessage
          ? currentRoom.customData.userIds.filter(
              id => id !== currentUser.id
            )[0]
          : currentRoom.name;

          this.setState({
            currentRoom,
            roomUsers: currentRoom.users,
            rooms: currentUser.rooms,
            roomName,
            typingUsers: [...typingUsers , ...newTypingUsers],
          });
 
    })
    .catch(console.error);
    

}

function connectToChatkit(event) {
  event.preventDefault();

  const { userId } = this.state;

  if (userId === null || userId.trim() === '') {
    alert('Invalid userId');
    return;
  }

  axios
    .post('http://localhost:5200/users', { userId })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: 'http://localhost:5200/authenticate',
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:56792706-fc40-43ea-8e3c-92cddc4a5983',
        userId,
        tokenProvider,
      });

      return chatManager
        .connect({

          onAddedToRoom: room => {
            const { rooms } = this.state;
            this.setState({
              rooms: [...rooms, room],
            });
          },

        })
        .then(currentUser => {

          //subscribe all room for get all user 
  
          currentUser.rooms.map(room=>{
            currentUser.subscribeToRoomMultipart({
              roomId: room.id,
            });
          })
        
          //set read cursor
          let  cursor_ ;
          chatManager.connect({
            onNewReadCursor: room => {
      
              cursor_ = currentUser.readCursor({
                roomId: room.roomId
              })

              console.log(`read up to message ID ${
                cursor_.position
              } in ${
                cursor_.room.id
              }.`)

              this.setState({
                rooms: this.state.rooms
              })

            }
          })
      
          this.setState({
            currentUser,
            showLogin: false,
            rooms: currentUser.rooms,
            },
            (currentUser.rooms.length > 0) ? 
              () => connectToRoom.call(this,currentUser.rooms[0].id)  //default room
            : null
            
          );

        });
    })
    .catch(console.error);
    
    
}

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  if (newMessage.trim() === '') return;

  currentUser.sendMessage({
    text: newMessage,
    roomId: `${currentRoom.id}`,
  });

  this.setState({
    newMessage: '',
  });

}


function createRoom(roomName,members,isPrivate){
  const { currentUser } = this.state;

  currentUser.createRoom({
    name: roomName,
    private: isPrivate,
    addUserIds: members,

  }).then(room => {
    console.log(`Created room called : ${room.name}`)
  })
  .catch(err => {
    console.log(`Error creating room ${err}`)
  })

 
}

function addUserToRoom(usersObject){

  const { currentUser } = this.state;

  usersObject.map( user => {
    currentUser.addUserToRoom(user) //id -> room and user  
      .then(() => {
        console.log('Added user to room success')
      })
      .catch(err => {
        console.log(`Error adding user to room: ${err}`)
      })
  })

}

function logoutUser(currentUser){
  
  if(window.confirm('Do you want to logout?')){
    currentUser.disconnect();
    return true;
  }else{
    return false;
  }
}

function createPrivateRoom(id) {
  const { currentUser, rooms } = this.state;
  const roomName = `${currentUser.id}_${id}`;

  const isPrivateChatCreated = rooms.filter(room => {

    if (room.customData && room.customData.isDirectMessage) {
      const arr = [currentUser.id, id];
      const { userIds } = room.customData;

      if (arr.sort().join('') === userIds.sort().join('')) {
        return {
          room,
        };
      }
    }

    return false;
  });

  if (isPrivateChatCreated.length > 0) {
    return Promise.resolve(isPrivateChatCreated[0]);
  }

  return currentUser.createRoom({
    name: `${roomName}`,
    private: true,
    addUserIds: [`${id}`],
    customData: {
      isDirectMessage: true,
      userIds: [currentUser.id, id],
    },
  });
}

function sendDM(id) {
  createPrivateRoom.call(this, id).then(room => {
    connectToRoom.call(this, room.id);
  });
}

function typingMessage(){

  const {currentUser,currentRoom} = this.state
  currentUser.isTypingIn({ roomId: currentRoom.id })
  .then(() => {
    console.log('Success!')
  })
  .catch(err => {
    console.log(`Error sending typing indicator: ${err}`)
  })
}


export { handleInput,handleInputMessage, connectToRoom, connectToChatkit,sendMessage,createRoom,addUserToRoom 
  ,logoutUser,sendDM,typingMessage }