import { configure } from '@kadira/storybook';

const requireContext = require.context('../src', true, /.story.(js|jsx)/);

function loadStories() {
  requireContext.keys().forEach((filename) => requireContext(filename));
}

configure(loadStories, module);
