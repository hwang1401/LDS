/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../design-systems/*/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../docs/stories/**/*.mdx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-webpack5-compiler-babel"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  staticDirs: [
    "../public",
    { from: '../public/shared', to: '/shared' }
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
  babel: async (options) => ({
    ...options,
    presets: [...(options.presets || []), '@babel/preset-react']
  }),
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['babel-plugin-react-require']
        }
      }
    });

    // SVG 파일을 위한 로더 설정 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

export default config;