import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('ChatSession', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('receiver', () => (
    <li className="message-receiver" >
      <div>
        <span className="message-time">{"12:23" + " | "}</span>
        <span className="message-user-id">Wipawadee</span>
        <div><span>Hi! ploy</span></div>
      </div>
    </li>
  ))
  .add('sender', () => (
    <li className="message-sender" >
        <div>
            <span className="message-user-id">Thikamporn</span>
            <span className="message-time">{" | " + "14:23"}</span>
            <div><span>Hi fern</span></div>  
        </div>
    </li>
  ));