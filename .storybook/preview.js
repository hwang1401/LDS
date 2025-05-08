import '../design-systems/system-1/styles/variables.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // 스토리북 사이드바 순서 설정
    sidebar: {
      order: ['Concepts', 'Tokens', 'component', '*'],
    },
    options: {
      storySort: {
        order: ['Concepts', 'Tokens', 'component', '*'],
        method: 'alphabetical',
      }
    }
  },
};

export default preview;