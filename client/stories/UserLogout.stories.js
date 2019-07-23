import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { Button, Welcome } from '@storybook/react/demo';
import {Button } from 'react-bootstrap';

import '../src/App.css';
import UserLogout from '../src/components/UserLogout';
            

storiesOf('User Logout ', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('default', () => 
        <UserLogout onClick={action('button-click')}/>
        
    );
