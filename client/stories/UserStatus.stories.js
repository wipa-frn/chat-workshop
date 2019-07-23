import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle,faUserFriends,faCommentDots} from '@fortawesome/free-solid-svg-icons'
import Proptypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import '../src/App.css';

const user = {
    id: 1,
    name: "wipawadee",
    presence : { state : 'offline'}
}

storiesOf('MemberStatus', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('default', () => 
    <li className="chat-username" key = {user.id}>
      <div> {user.name} </div>  
    </li>)
  .add('with status offline',() => (
    <li className="chat-username" key = {user.id}>
      <div> {user.name} </div>  
      <div >
          {user.presence.state === 'offline' ? ( <FontAwesomeIcon icon={faCircle} color="#A4A4A4" size="xs"/> ) : (<FontAwesomeIcon icon={faCircle} color="#6AC957" size="xs"/>) }
      </div>
    </li>
  ))
  .add('with status online',() => (
    <li className="chat-username" key = {user.id}>
      <div> {user.name} </div>  
      <div >
          {!user.presence.state === 'offline' ? ( <FontAwesomeIcon icon={faCircle} color="#A4A4A4" size="xs"/> ) : (<FontAwesomeIcon icon={faCircle} color="#6AC957" size="xs"/>) }
      </div>
    </li>
  ))
  .add('with direct chat',() => (
    <li className="chat-username" key = {user.id}>
    <div> {user.name} </div>  
    <div >
      <Button className="send-dm"  variant="link"  title={`Send ${user.name} a direct message`}>
          <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
      </Button>                 
        {user.presence.state === 'offline' ? ( <FontAwesomeIcon icon={faCircle} color="#A4A4A4" size="xs"/> ) : (<FontAwesomeIcon icon={faCircle} color="#6AC957" size="xs"/>) }
    </div>
  </li>
  ));
    
// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
