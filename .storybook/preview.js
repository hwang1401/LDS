import '../design-systems/system-1/styles/variables.css';
import './storybook.css';

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
    },
    // 문서 레이아웃 설정 추가
    layout: { 
      fullscreen: false,
      padded: false // 패딩 제거
    },
    docs: {
      canvas: {
        padding: '0' // 캔버스 영역 패딩 제거
      },
      theme: {
        // 직접 색상값 사용 (CSS 변수는 스토리북에서 지원하지 않음)
        // 나중에 시맨틱 토큰이 변경되면 이 값도 수동으로 업데이트해야 함
        brandTitle: 'LDS',
        brandUrl: '/',
        brandTarget: '_self',
        colorPrimary: '#2196F3', // var(--semantic-color-primary-background-1-rest)
        colorSecondary: '#999999', // var(--semantic-color-secondary-background-1-rest)
        appBg: '#FFFFFF', // var(--semantic-color-secondary-background-inverse-rest)
        appContentBg: '#FFFFFF', // var(--semantic-color-secondary-background-inverse-rest)
        appBorderColor: '#CCCCCC', // var(--semantic-color-secondary-stroke-2-rest)
        appBorderRadius: 4,
        fontBase: "'Pretendard', sans-serif",
        fontCode: "'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Ubuntu Mono', monospace",
        textColor: '#333333', // var(--semantic-color-secondary-foreground-1-rest)
        textInverseColor: '#000000', // var(--semantic-color-secondary-foreground-inverse-rest)
        textMutedColor: '#666666', // var(--semantic-color-secondary-foreground-2-rest)
        barTextColor: '#666666', // var(--semantic-color-secondary-foreground-2-rest)
        barSelectedColor: '#2196F3', // var(--semantic-color-primary-foreground-1-rest)
        barBg: '#F9F9F9', // var(--semantic-color-secondary-background-1-rest)
        inputBg: '#FFFFFF', // var(--semantic-color-secondary-background-inverse-rest)
        inputBorder: '#CCCCCC', // var(--semantic-color-secondary-stroke-2-rest)
        inputTextColor: '#333333', // var(--semantic-color-secondary-foreground-1-rest)
        inputBorderRadius: 4
      }
    }
  },
};

export default preview;