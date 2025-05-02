# 코드 기반 디자인 시스템 구축 단계

## 1. 준비 단계

### 필요한 기술 스택
- **JavaScript/TypeScript**: 컴포넌트 및 스크립트 작성
- **React**: 컴포넌트 라이브러리 구축
- **Style Dictionary**: 디자인 토큰 변환 도구
- **CSS/SCSS**: 스타일 정의
- **Storybook**: 컴포넌트 문서화 및 테스트
- **Git**: 버전 관리
- **Node.js/npm**: 패키지 관리

### 프로젝트 구조 설계
```
design-system/
├── tokens/                # 디자인 토큰 정의
│   ├── foundation.json    # 기본 토큰 (색상, 타이포그래피, 간격 등)
│   └── semantic.json      # 의미적 토큰 (컴포넌트 용도별 매핑)
├── src/
│   ├── components/        # 리액트 컴포넌트
│   │   ├── primitives/    # 기본 요소 (버튼, 인풋 등)
│   │   ├── compounds/     # 복합 요소 (카드, 모달 등)
│   │   └── patterns/      # 패턴 (폼, 헤더 등)
│   ├── styles/            # 생성된 CSS 변수 및 스타일
│   └── utils/             # 유틸리티 함수
├── scripts/
│   └── build-tokens.js    # 토큰 변환 스크립트
├── .storybook/           # 스토리북 설정
└── package.json          # 의존성 관리
```

## 2. 초기 설정 단계

### 프로젝트 초기화
```bash
# 프로젝트 폴더 생성 및 초기화
mkdir design-system
cd design-system
npm init -y

# 기본 폴더 구조 생성
mkdir -p tokens/src/components/scripts/.storybook
mkdir -p src/styles src/components/primitives src/components/compounds src/components/patterns src/utils

# git 초기화
git init
echo "node_modules/\nbuild/\ndist/" > .gitignore
```

### 필수 패키지 설치
```bash
# 리액트 및 기본 의존성
npm install react react-dom

# 개발 도구
npm install --save-dev @babel/core babel-loader webpack webpack-cli

# Style Dictionary 설치
npm install --save-dev style-dictionary

# Storybook 설치
npx storybook init
```

## 3. 디자인 토큰 정의 단계

### Foundation 토큰과 Semantic 토큰 구분

디자인 시스템에서 토큰은 크게 Foundation 토큰과 Semantic 토큰으로 나뉩니다. 이러한 구분은 토큰의 확장성과 일관성을 위해 중요합니다.

#### Foundation 토큰의 특징:
- 순수한 디자인 값 (색상 코드, 픽셀 값, 폰트 크기 등)
- 특정 용도나 맥락을 내포하지 않음
- 직접 참조보다는 Semantic 토큰을 통해 접근함

#### Semantic 토큰의 특징:
- Foundation 토큰을 참조하여 정의
- 사용 목적과 의미를 명확히 표현
- 컴포넌트 개발 시 실제로 사용되는 토큰

이러한 계층 구조를 통해 Foundation 토큰이 변경되면 이를 참조하는 모든 Semantic 토큰이 자동으로 업데이트되어, 전체 디자인 시스템의 일관성을 유지할 수 있습니다.

### Foundation 토큰 생성
Foundation 토큰은 디자인 시스템의 기본 값을 정의합니다. 이는 색상, 타이포그래피, 간격, 크기 등의 원시 값으로 구성됩니다.

**tokens/foundation.json:**
```json
{
  "color": {
    "blue": {
      "50": "#E3F2FD",
      "100": "#BBDEFB",
      "500": "#2196F3",
      "600": "#1E88E5",
      "700": "#1976D2"
    },
    "grey": {
      "50": "#FAFAFA",
      "100": "#F5F5F5",
      "500": "#9E9E9E",
      "900": "#212121"
    },
    "white": "#FFFFFF",
    "black": "#000000"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "typography": {
    "fontFamily": {
      "base": "Pretendard, sans-serif"
    },
    "fontSize": {
      "xs": "12px",
      "sm": "14px",
      "md": "16px",
      "lg": "20px",
      "xl": "24px"
    },
    "fontWeight": {
      "regular": "400",
      "medium": "500",
      "bold": "700"
    }
  },
  "radius": {
    "none": "0px",
    "sm": "4px",
    "md": "8px",
    "lg": "16px",
    "full": "9999px"
  }
}
```

### Semantic 토큰 생성

Semantic 토큰은 Microsoft Fluent Design System에서 영감을 받은 계층적 구조를 따릅니다. 색상 토큰은 다음과 같은 계층 구조를 가집니다:

1. **최상위 카테고리**: neutral, primary, status, shadow
2. **용도 계층**: background, foreground, stroke
3. **위계 계층**: 중요도에 따라 1, 2, 3... 등으로 표현
4. **상태 계층**: rest, hovered, pressed, disabled

이 구조를 따라 모든 색상 토큰은 "최상위카테고리.용도.위계.상태" 형식으로 일관되게 명명됩니다. 예를 들어, `primary.background.1.rest`는 주요 배경색의 가장 중요한 수준의 기본 상태를 의미합니다.

**tokens/semantic.json:**
```json
{
  "neutral": {
    "background": {
      "1": {
        "rest": "{color.grey.50}",
        "hovered": "{color.grey.100}"
      },
      "2": {
        "rest": "{color.grey.100}",
        "hovered": "{color.grey.200}"
      }
    },
    "foreground": {
      "1": {
        "rest": "{color.grey.900}",
        "disabled": "{color.grey.500}"
      }
    },
    "stroke": {
      "1": {
        "rest": "{color.grey.300}",
        "hovered": "{color.grey.400}"
      }
    }
  },
  "primary": {
    "background": {
      "1": {
        "rest": "{color.blue.500}",
        "hovered": "{color.blue.600}",
        "pressed": "{color.blue.700}",
        "disabled": "rgba(33, 150, 243, 0.5)"
      }
    },
    "foreground": {
      "1": {
        "rest": "{color.white}",
        "disabled": "rgba(255, 255, 255, 0.7)"
      }
    },
    "stroke": {
      "1": {
        "rest": "{color.blue.500}",
        "hovered": "{color.blue.600}",
        "pressed": "{color.blue.700}",
        "disabled": "rgba(33, 150, 243, 0.5)"
      }
    }
  },
  "typography": {
    "heading/1": {
      "1": {
        "rest": {
          "fontSize": "{typography.fontSize.xl}",
          "fontWeight": "{typography.fontWeight.bold}"
        }
      }
    },
    "body/normal": {
      "1": {
        "rest": {
          "fontSize": "{typography.fontSize.md}",
          "fontWeight": "{typography.fontWeight.regular}"
        }
      }
    }
  },
  "spacingVer": {
    "none": "0",
    "xxxs": "{spacing.xs}",
    "sm": "{spacing.sm}",
    "md": "{spacing.md}"
  },
  "spacingHor": {
    "none": "0",
    "xxxs": "{spacing.xs}",
    "sm": "{spacing.sm}",
    "md": "{spacing.md}"
  },
  "radius": {
    "none": "{radius.none}",
    "sm": "{radius.sm}",
    "md": "{radius.md}",
    "circular": "{radius.full}"
  }
}
```

## 4. 토큰 변환 시스템 구축

### Style Dictionary 설정
Style Dictionary는 디자인 토큰을 다양한 플랫폼에서 사용할 수 있는 형식으로 변환해줍니다.

**config.js:**
```javascript
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true // 참조 유지
        }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/styles/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    }
  }
};
```

### 빌드 스크립트 설정
package.json에 토큰 빌드 스크립트를 추가합니다.

```json
"scripts": {
  "build:tokens": "style-dictionary build --config config.js",
  "dev": "npm run build:tokens && start-storybook -p 6006",
  "build": "npm run build:tokens && vite build"
}
```

## 5. 컴포넌트 개발 단계

### 컴포넌트 계층 구조 설계

디자인 시스템의 컴포넌트는 복잡성과 용도에 따라 세 가지 계층으로 구성됩니다:

#### 1. 기본 요소(Primitives)
기본적이고 단일 기능을 수행하는 UI 요소입니다.
- **Button**: 다양한 유형의 버튼
- **Input**: 텍스트 필드, 체크박스, 라디오 버튼
- **Icon**: 시스템에서 사용되는 아이콘
- **Typography**: 텍스트 표시 요소
- **Badge**: 알림 및 상태 표시

#### 2. 복합 요소(Compounds)
기본 요소를 조합하여 더 복잡한 기능을 제공하는 컴포넌트입니다.
- **Card**: 정보 표시 카드
- **Modal**: 팝업 대화상자
- **Dropdown**: 드롭다운 메뉴
- **Tabs**: 탭 인터페이스
- **Accordion**: 접이식 패널

#### 3. 패턴(Patterns)
복합 요소와 기본 요소를 특정 사용자 경험을 위해 조합한 템플릿입니다.
- **Form**: 다양한 입력 필드와 버튼으로 구성된 폼
- **Header**: 내비게이션과 브랜딩이 포함된 헤더
- **SearchInterface**: 검색 기능과 결과 표시
- **Authentication**: 로그인/가입 인터페이스

이 계층 구조는 컴포넌트의 재사용성을 최대화하고, 개발자와 디자이너 모두에게 명확한 구조를 제공합니다.

### 기본 컴포넌트 개발
토큰을 적용한 리액트 컴포넌트를 개발합니다. 여기서는 Button 컴포넌트를 예로 들겠습니다.

**src/components/primitives/Button/index.jsx:**
```jsx
import React from 'react';
import './Button.css';

/**
 * 기본 버튼 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {'primary'|'secondary'} props.variant - 버튼 변형
 * @param {'solid'|'outlined'} props.appearance - 버튼 모양
 * @param {'sm'|'md'|'lg'} props.size - 버튼 크기
 * @param {boolean} props.isFullWidth - 전체 너비 적용 여부
 * @param {boolean} props.isDisabled - 비활성화 여부
 * @param {ReactNode} props.leftIcon - 왼쪽 아이콘
 * @param {ReactNode} props.rightIcon - 오른쪽 아이콘
 * @param {ReactNode} props.children - 버튼 내용
 */
export const Button = ({
  variant = 'primary',
  appearance = 'solid',
  size = 'md',
  isFullWidth = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${appearance}`,
    `btn-${size}`,
    isFullWidth ? 'btn-full-width' : '',
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classNames} 
      disabled={isDisabled}
      {...props}
    >
      {leftIcon && <span className="btn-icon btn-icon-left">{leftIcon}</span>}
      <span className="btn-text">{children}</span>
      {rightIcon && <span className="btn-icon btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
```

### 시맨틱 토큰을 활용한 컴포넌트 스타일링

CSS 변수와 시맨틱 토큰을 활용하여 일관된 스타일을 적용합니다.

**src/components/primitives/Button/Button.css:**
```css
@import '../../../styles/variables.css';

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--typography-fontFamily-base);
  font-weight: var(--typography-fontWeight-medium);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
  outline: none;
}

/* 변형별 스타일 */
.btn-primary.btn-solid {
  background-color: var(--primary-background-1-rest);
  color: var(--primary-foreground-1-rest);
  border-radius: var(--radius-md);
}

.btn-primary.btn-solid:hover:not(:disabled) {
  background-color: var(--primary-background-1-hovered);
}

.btn-primary.btn-solid:active:not(:disabled) {
  background-color: var(--primary-background-1-pressed);
}

.btn-primary.btn-solid:disabled {
  background-color: var(--primary-background-1-disabled);
  color: var(--primary-foreground-1-disabled);
  cursor: not-allowed;
}

.btn-primary.btn-outlined {
  background-color: transparent;
  color: var(--primary-foreground-1-rest);
  border: 1px solid var(--primary-stroke-1-rest);
  border-radius: var(--radius-md);
}

.btn-primary.btn-outlined:hover:not(:disabled) {
  border-color: var(--primary-stroke-1-hovered);
  background-color: rgba(33, 150, 243, 0.05);
}

.btn-primary.btn-outlined:active:not(:disabled) {
  border-color: var(--primary-stroke-1-pressed);
  background-color: rgba(33, 150, 243, 0.1);
}

.btn-primary.btn-outlined:disabled {
  border-color: var(--primary-stroke-1-disabled);
  color: var(--primary-foreground-1-disabled);
  cursor: not-allowed;
}

/* 크기별 스타일 */
.btn-sm {
  padding: var(--spacingVer-xxxs) var(--spacingHor-sm);
  font-size: var(--typography-fontSize-sm);
}

.btn-md {
  padding: var(--spacingVer-sm) var(--spacingHor-md);
  font-size: var(--typography-fontSize-md);
}

.btn-lg {
  padding: var(--spacingVer-md) var(--spacingHor-md);
  font-size: var(--typography-fontSize-lg);
}

.btn-full-width {
  width: 100%;
}

.btn-icon {
  display: flex;
  align-items: center;
}

.btn-icon-left {
  margin-right: var(--spacingHor-xxxs);
}

.btn-icon-right {
  margin-left: var(--spacingHor-xxxs);
}
```

### 복합 컴포넌트 개발 예시

기본 요소를 조합한 Card 컴포넌트 예시입니다.

**src/components/compounds/Card/index.jsx:**
```jsx
import React from 'react';
import './Card.css';
import Typography from '../../primitives/Typography';

/**
 * 카드 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {'default'|'elevated'|'outlined'} props.variant - 카드 변형
 * @param {ReactNode} props.title - 카드 제목
 * @param {ReactNode} props.subtitle - 카드 부제목
 * @param {ReactNode} props.media - 카드 미디어 영역
 * @param {ReactNode} props.actions - 카드 액션 버튼 영역
 * @param {ReactNode} props.children - 카드 내용
 */
export const Card = ({
  variant = 'default',
  title,
  subtitle,
  media,
  actions,
  children,
  ...props
}) => {
  const classNames = [
    'card',
    `card-${variant}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {media && <div className="card-media">{media}</div>}
      <div className="card-content">
        {title && (
          <Typography variant="heading/1" size="1">
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="body/normal" size="1" className="card-subtitle">
            {subtitle}
          </Typography>
        )}
        <div className="card-body">{children}</div>
      </div>
      {actions && <div className="card-actions">{actions}</div>}
    </div>
  );
};

export default Card;
```

**src/components/compounds/Card/Card.css:**
```css
@import '../../../styles/variables.css';

.card {
  border-radius: var(--radius-md);
  overflow: hidden;
}

.card-default {
  background-color: var(--neutral-background-1-rest);
}

.card-elevated {
  background-color: var(--neutral-background-1-rest);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-outlined {
  background-color: var(--neutral-background-1-rest);
  border: 1px solid var(--neutral-stroke-1-rest);
}

.card-media {
  width: 100%;
}

.card-content {
  padding: var(--spacingVer-md) var(--spacingHor-md);
}

.card-subtitle {
  margin-top: var(--spacingVer-xxxs);
  color: var(--neutral-foreground-2-rest);
}

.card-body {
  margin-top: var(--spacingVer-sm);
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacingVer-sm) var(--spacingHor-md);
  border-top: 1px solid var(--neutral-stroke-1-rest);
}
```

## 6. 문서화 및 테스트 환경 구축

### Storybook 설정
Storybook을 사용하여 컴포넌트를 문서화하고 테스트합니다.

**.storybook/main.js:**
```javascript
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: '@storybook/react',
  staticDirs: ['../public']
};
```

### 컴포넌트 스토리 작성
각 컴포넌트에 대한 스토리를 작성하여 문서화합니다.

**src/components/primitives/Button/Button.stories.jsx:**
```jsx
import React from 'react';
import { Button } from './index';

export default {
  title: 'Components/Primitives/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '버튼 변형'
    },
    appearance: {
      control: 'select',
      options: ['solid', 'outlined'],
      description: '버튼 모양'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기'
    },
    isFullWidth: {
      control: 'boolean',
      description: '전체 너비 적용 여부'
    },
    isDisabled: {
      control: 'boolean',
      description: '비활성화 여부'
    }
  }
};

const Template = (args) => <Button {...args}>버튼 텍스트</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  appearance: 'solid',
  size: 'md'
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'primary',
  appearance: 'outlined',
  size: 'md'
};

export const Small = Template.bind({});
Small.args = {
  variant: 'primary',
  appearance: 'solid',
  size: 'sm'
};

export const Large = Template.bind({});
Large.args = {
  variant: 'primary',
  appearance: 'solid',
  size: 'lg'
};
```

### 디자인 토큰 문서화
디자인 토큰을 시각적으로 문서화합니다.

**.storybook/Design.stories.mdx:**
```jsx
import { Meta, ColorPalette, ColorItem, Typeset } from '@storybook/addon-docs';
import { tokens } from '../src/styles/tokens';

<Meta title="Design Tokens/Overview" />

# 디자인 토큰

디자인 시스템에서 사용되는 모든 디자인 토큰을 시각화합니다.

## 색상

### 기본 색상

<ColorPalette>
  {Object.entries(tokens.color.blue).map(([key, value]) => (
    <ColorItem 
      key={key} 
      title={`blue.${key}`} 
      subtitle={`var(--color-blue-${key})`} 
      colors={[value]} 
    />
  ))}
</ColorPalette>

## 타이포그래피

<Typeset 
  fontSizes={[
    tokens.typography.fontSize.xs,
    tokens.typography.fontSize.sm,
    tokens.typography.fontSize.md,
    tokens.typography.fontSize.lg,
    tokens.typography.fontSize.xl
  ]}
  fontFamily={tokens.typography.fontFamily.base}
  fontWeight={tokens.typography.fontWeight.regular}
/>
```

## 7. 자동화 파이프라인 구축

### GitHub Actions 설정
토큰 변경 시 자동으로 빌드 및 배포되도록 GitHub Actions를 설정합니다.

**.github/workflows/build-tokens.yml:**
```yaml
name: Build Design Tokens
on:
  push:
    paths:
      - 'tokens/**'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build:tokens
      - name: Commit generated files
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add src/styles/
          git commit -m "Update design tokens" || echo "No changes to commit"
          git push
```

### Storybook 배포 자동화
Storybook을 GitHub Pages 등에 자동으로 배포하도록 설정합니다.

**.github/workflows/deploy.yml:**
```yaml
name: Deploy Storybook
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build:tokens
      - run: npm run build-storybook
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: storybook-static
```

## 8. 버전 관리 및 배포

### 시맨틱 버저닝
변경 사항을 추적하기 위한 버전 관리 시스템을 설정합니다.

```json
// package.json
{
  "name": "@your-org/design-system",
  "version": "1.0.0"
}
```

### 변경 로그 관리
변경 사항을 문서화하는 CHANGELOG.md 파일을 유지합니다.

**CHANGELOG.md:**
```markdown
# 변경 로그

## [1.0.0] - 2023-11-15
### 초기 릴리스
- 기본 컴포넌트: 버튼
- 디자인 토큰: 색상, 타이포그래피, 간격, 반경
- 자동화 파이프라인 구축
```

### npm 패키지 배포
디자인 시스템을 npm 패키지로 배포하여 다른 프로젝트에서 사용할 수 있게 합니다.

```bash
# npm 배포 준비
npm login
npm publish
```

## 9. 협업 워크플로우 설정

### PR 템플릿 생성
기여자들이 일관된 형식으로 PR을 제출할 수 있도록 템플릿을 제공합니다.

**.github/PULL_REQUEST_TEMPLATE.md:**
```markdown
## 변경 유형
- [ ] 버그 수정
- [ ] 새 기능
- [ ] 문서화
- [ ] 코드 스타일 변경
- [ ] 리팩토링
- [ ] 기타

## 변경 내용
간략한 변경 내용 설명

## 스크린샷
변경 사항을 보여주는 스크린샷 (있다면)

## 체크리스트
- [ ] 테스트 완료
- [ ] 문서화 완료
- [ ] 디자인 토큰 변경 시 검토 완료
```

### 코드 리뷰 가이드라인
효과적인 코드 리뷰를 위한 가이드라인을 제공합니다.

**CONTRIBUTING.md:**
```markdown
# 기여 가이드라인

## 코드 리뷰 프로세스
1. PR 작성자는 충분한 컨텍스트와 스크린샷 제공
2. 최소 1명의 승인 필요
3. 토큰 변경 시 디자인 리뷰 필수
4. 컴포넌트 API 변경 시 문서화 필수

## 코드 스타일
- ESLint 및 Prettier 설정 준수
- 의미 있는 컴포넌트 이름과 일관된 네이밍 규칙 사용
- JSDoc으로 컴포넌트 속성 문서화
```

## 10. 확장 및 유지보수

### 확장 전략
필요에 따라 시스템을 확장하는 전략을 세웁니다.

1. **새 컴포넌트 추가**: 기존 토큰을 최대한 활용
2. **토큰 확장**: 필요한 경우에만 새 토큰 추가
3. **테마 지원**: 다크 모드 등 다양한 테마 구현

### 성능 최적화
시스템의 성능을 주기적으로 점검하고 최적화합니다.

1. **번들 크기 관리**: 불필요한 의존성 제거
2. **코드 분할**: 필요한 경우 코드 분할 적용
3. **렌더링 최적화**: 메모이제이션 및 최적화 기법 적용

### 접근성 보장
모든 컴포넌트가 접근성 표준을 준수하도록 합니다.

1. **WCAG 지침 준수**: 색상 대비, 키보드 탐색 등
2. **스크린 리더 호환성**: 적절한 ARIA 속성 사용
3. **접근성 테스트**: 자동화된 테스트 도구 활용

## 11. 학습 및 문제 해결 리소스

### 유용한 학습 자료
- [Style Dictionary 공식 문서](https://amzn.github.io/style-dictionary)
- [Storybook 공식 문서](https://storybook.js.org/docs)
- [디자인 시스템 필드 가이드](https://www.designsystemsfieldguide.com/)
- [Atomic Design 원칙](https://bradfrost.com/blog/post/atomic-web-design/)

### 일반적인 문제 및 해결책
- **토큰 참조 문제**: Style Dictionary의 outputReferences 옵션 활성화
- **스타일 충돌**: CSS 모듈 또는 CSS-in-JS 라이브러리 고려
- **컴포넌트 과부하**: 목적에 맞는 명확한 컴포넌트 경계 설정 