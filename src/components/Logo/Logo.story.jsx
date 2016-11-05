import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { StoriesWrapper } from 'lib';
import Logo from './Logo';

storiesOf('Logo', module)
  .add('Basic example', () => (
    <StoriesWrapper><Logo /></StoriesWrapper>
  ));
