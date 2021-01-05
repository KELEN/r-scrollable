/* eslint-disable */
import { configure, addParameters } from '@storybook/react';

const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {
    showPanel: false,
    showNav: false,
    sidebarAnimations: false,
    isToolshown: false,
  }
})

configure(loadStories, module);
