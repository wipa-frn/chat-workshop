    import React from 'react';
    import Proptypes from 'prop-types';
    import { format } from 'date-fns';
    
    const ChatSession = props => {
      
      const { messages , currentUser} = props;
   
      return messages.map(message => {
        const time = format(new Date(`${message.updatedAt}`), 'MMMM Do, YYYY H:mm a');
        if(message.roomId === messages[0].roomId){
          
          return (
             
            <li className={message.senderId === props.currentUser.id ? "message-sender" : "message-receiver"} key={message.id}>
            { message.senderId === currentUser.id ? (
              <div>
                <span className="message-time">{time + " | "}</span>
                <span className="message-user-id">{message.senderId}</span>
                <div><span>{message.text}</span></div>
              </div> ) : (
              
              <div>
                <span className="message-user-id">{message.senderId}</span>
                <span className="message-time">{" | " + time}</span>
                <div><span>{message.text}</span></div>  
              </div>)
              }
            </li>
        

          );
        }
      });
    };

    ChatSession.propTypes = {
      messages: Proptypes.arrayOf(Proptypes.object).isRequired,
    };

    export default ChatSession;