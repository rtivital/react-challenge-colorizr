import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Button } from './index';

storiesOf('Button', module)
  .add('with text', () => (
    <Button theme="white" onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
