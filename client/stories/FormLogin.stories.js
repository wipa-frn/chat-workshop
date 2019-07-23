import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import FormLogin from '../src/components/FormLogin';

storiesOf('FormLogin', module)
.addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
.add('Form login', () => <FormLogin />);

// storiesOf('Button', module)
// .addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
