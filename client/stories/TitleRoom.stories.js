import React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import TitleRoom from '../src/components/TitleRoom'

import '../src/App.css';

storiesOf('TitleRoom', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('TitleRoom', () => <TitleRoom roomName="Group Little Monster"/>);