import React from 'react';

import { storiesOf } from '@storybook/react';
import '../src/App.css';
import UserLogin from '../src/components/UserLogin'

storiesOf('User Login', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('default', () => 
    <UserLogin userName='FernFern' userId='Wipawadee' />  
  )