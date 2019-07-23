import React from 'react';

import { storiesOf } from '@storybook/react';
import '../src/App.css';
import TypingIndicator from '../src/components/TypingIndicator'

storiesOf('TypingIndicator', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('default', () => 
    <TypingIndicator/>  
  )