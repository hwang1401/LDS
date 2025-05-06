/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../design-systems/*/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: [
    { from: '../public', to: '/' }
  ],
  /* 먼저 refs 설정을 제거하고 기본 스토리북이 정상 작동하는지 확인합니다
  refs: {
    'system-1': {
      title: '디자인 시스템 1',
      url: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:6006/system-1' 
        : 'https://design-system.example.com/system-1'
    },
    'system-2': {
      title: '디자인 시스템 2',
      url: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:6006/system-2' 
        : 'https://design-system.example.com/system-2'
    }
  }
  */
};

export default config;