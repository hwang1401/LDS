# 코드 기반 디자인 시스템 구축 가이드

## 목차

1. [개요](#개요)
2. [아키텍처](#아키텍처)
3. [토큰 관리](#토큰-관리)
   - [토큰 철학](#토큰-철학)
   - [Foundation 토큰과 Semantic 토큰](#foundation-토큰과-semantic-토큰)
   - [Semantic 토큰 카테고리 구조](#semantic-토큰-카테고리-구조)
   - [토큰 구조](#토큰-구조)
   - [토큰 변환](#토큰-변환)
4. [컴포넌트 설계](#컴포넌트-설계)
   - [시맨틱 토큰을 활용한 컴포넌트 구현](#시맨틱-토큰을-활용한-컴포넌트-구현)
   - [컴포넌트 계층 구조](#컴포넌트-계층-구조)
   - [컴포넌트 API 설계](#컴포넌트-api-설계)
   - [토큰 문서화](#토큰-문서화)
5. [자동화 프로세스](#자동화-프로세스)
6. [스토리북 활용](#스토리북-활용)
7. [협업 워크플로우](#협업-워크플로우)
8. [버전 관리](#버전-관리)
9. [프로젝트 아키텍처](#프로젝트-아키텍처)
   - [아토믹 디자인과 FSD](#아토믹-디자인과-fsd)
   - [하이브리드 구조](#하이브리드-구조)

## 개요

이 가이드는 디자인 도구(피그마 등) 없이 코드만으로 디자인 시스템을 구축하고 유지보수하는 방법을 설명합니다. 디자인 토큰을 중심으로 컴포넌트 라이브러리를 구성하고, 자동화 파이프라인을 통해 효율적인 워크플로우를 구현하는 것이 목표입니다.

### 핵심 목표

- 코드 기반 디자인 시스템 관리
- 토큰 변경 시 자동 반영되는 컴포넌트
- 웹으로 배포된 스토리북을 통한 문서화
- 개발자 친화적인 컴포넌트 API 설계

## 아키텍처

### 전체 구조

```
design-system/
├── tokens/                # 디자인 토큰 정의
│   ├── foundation.json    # 기본 토큰 (색상, 타이포그래피, 간격 등)
│   └── semantic.json      # 의미적 토큰 (컴포넌트 용도별 매핑)
├── src/
│   ├── components/        # 리액트 컴포넌트
│   ├── styles/            # 생성된 CSS 변수 및 스타일
│   └── utils/             # 유틸리티 함수
├── scripts/
│   └── build-tokens.js    # 토큰 변환 스크립트
├── .storybook/           # 스토리북 설정
└── package.json          # 의존성 관리
```

### 기술 스택

- **리액트**: 컴포넌트 라이브러리
- **Style Dictionary**: 토큰 변환
- **CSS 변수**: 스타일 관리
- **Storybook**: 문서화 및 시각화
- **GitHub Actions**: CI/CD 자동화

## 토큰 관리

### 토큰 철학

디자인 시스템의 핵심은 **Foundation Token**과 **Semantic Token**의 명확한 분리에 있습니다:

- **Foundation Token**은 가장 순수한 디자인 요소입니다. 어떠한 사용 목적이나 용도를 지정하지 않고, 단순히 원시적인 값만을 정의합니다. 색상 코드, 픽셀 단위, 문자 크기 등이 여기에 해당됩니다.

- **Semantic Token**은 Foundation Token을 기반으로 실제 사용 목적과 의미를 부여합니다. 예를 들어, Foundation Token에서 정의된 색상 값을 "버튼 배경색", "경고 메시지 색상" 등으로 매핑합니다.

이러한 분리는 디자인 시스템의 확장성과 일관성을 보장합니다. Foundation Token이 변경되면 이를 참조하는 모든 Semantic Token이 자동으로 업데이트되어 전체 시스템에 일관된 변화를 줄 수 있습니다.

### Foundation 토큰과 Semantic 토큰

#### Foundation 토큰

Foundation 토큰은 디자인 시스템의 기초를 형성하는 가장 기본적인 값입니다:

1. **순수한 값**: 특정 용도나 맥락에 관계없는 원시 값
2. **일관된 체계**: 규칙적인 단계(scale)로 구성
3. **독립적 정의**: 다른 토큰을 참조하지 않음

예시:
```json
{
  "color": {
    "blue": {
      "50": "#E3F2FD", 
      "100": "#BBDEFB",
      "500": "#2196F3"
    }
  },
  "spacing": {
    "20": "0.25rem",
    "40": "0.5rem",
    "80": "1rem"
  }
}
```

#### Semantic 토큰

Semantic 토큰은 Foundation 토큰을 참조하여 실제 사용 맥락과 의미를 부여합니다:

1. **용도 지정**: UI 요소의 특정 부분에 사용될 목적 명시
2. **의미적 이름**: 색상 코드 대신 '버튼 배경색'과 같이 의미 부여
3. **참조 기반**: Foundation 토큰을 참조하여 정의

예시:
```json
{
  "neutral": {
    "background": {
      "1": {
        "rest": "{color.grey.50}",
        "hovered": "{color.grey.100}"
      }
    }
  },
  "radius": {
    "button": "{radius.md}"
  }
}
```

이 구조에서 디자인 시스템을 업데이트할 때 Foundation 토큰만 변경하면 이를 참조하는 모든 Semantic 토큰과 그에 연결된 컴포넌트가 자동으로 업데이트됩니다.

### Semantic 토큰 카테고리 구조

디자인 시스템의 시맨틱 토큰은 다음과 같은 계층적 구조를 갖습니다:

#### 시맨틱 토큰의 5단계 계층 구조

```
테마.상황.용도.위계.상태
```

1. **테마(Theme)**: 디자인 시스템 옵션/버전
   - 서비스별 디자인 시스템 (예: `service-a`, `service-b`)
   - 버전별 디자인 시스템 (예: `system-1`, `system-2`)
   - 디자인 시스템 프레임워크 버전 (예: `material-1`, `material-2`, `fluent-1`)

2. **상황(Context)**: 사용되는 맥락
   - **Neutral**: 중립적인 색상들로, 주로 텍스트, 배경, 테두리 등에 사용
   - **Primary**: 브랜드 아이덴티티를 나타내는 주요 색상들
   - **Status**: 성공, 경고, 오류, 정보 등의 상태를 표현하는 색상들
   - **Shadow**: 그림자 효과를 위한 색상 및 불투명도 값들

3. **용도(Usage)**: 실제 활용 목적
   - **Background**: 배경 색상
   - **Foreground**: 전경 색상 (주로 텍스트)
   - **Stroke**: 테두리 및 구분선

4. **위계(Hierarchy)**: 중요도 수준
   - **1**: 가장 강조되는 수준
   - **2**: 중간 수준의 강조
   - **3**: 가장 낮은 수준의 강조

5. **상태(State)**: CSS pseudo-class 기반 상태
   - **default**: 기본 상태
   - **hover**: 마우스 오버 상태
   - **focus**: 포커스 상태
   - **active**: 활성화 상태
   - **disabled**: 비활성화 상태

#### 토큰 네이밍 규칙의 일관성

모든 시맨틱 토큰은 항상 위의 5단계 구조를 모두 포함해야 합니다:

```
테마.상황.용도.위계.상태
```

예시:
- `system-1.primary.background.1.default`
- `service-a.neutral.foreground.1.hover`
- `material-2.status-error.background.1.default`
- `fluent-1.primary.stroke.2.disabled`

이 규칙은 해당 색상에 위계나 상태가 하나밖에 없는 경우에도 반드시 적용해야 합니다. 예를 들어, 에러 메시지 배경색이 하나의 위계와 상태만 있더라도 `system-1.status-error.background.1.default`와 같이 명시적으로 모든 계층을 표현해야 합니다.

이러한 일관된 구조는:
1. 토큰 이름만으로 그 용도와 맥락을 즉시 이해할 수 있게 합니다
2. 자동화 도구에서 패턴 매칭을 통한 처리가 쉬워집니다
3. 나중에 시스템이 확장될 때 쉽게 새로운 위계나 상태를 추가할 수 있습니다
4. 개발자가 컴포넌트에서 토큰을 사용할 때 오류 가능성을 줄여줍니다
5. 다양한 테마와 버전 간 전환이 용이해집니다

#### 추가 시맨틱 토큰 카테고리

색상 외에도 다음과 같은 시맨틱 토큰 카테고리가 정의되어 있습니다:

1. **Typography (타이포그래피)**
   - 다양한 텍스트 스타일을 용도에 맞게 정의
   - 구조: `타입/레벨 > 중요도 > 상태 > 속성`
   - 예: heading/1, body/normal, caption, overline, label/button 등
   - 각 타입은 fontSize, lineHeight, letterSpacing, fontWeight 등의 속성 포함

2. **Spacing (간격)**
   - **SpacingVer**: 수직 방향 간격 (컴포넌트 간 여백, 섹션 간격 등)
   - **SpacingHor**: 수평 방향 간격 (컴포넌트 내부 패딩, 그리드 간격 등)
   - 일관된 간격 체계: none, xxxs, xxs, xs, sm, md, lg, xl, xxl, xxxl

3. **Size (크기)**
   - 다양한 UI 요소의 크기를 정의 (아이콘, 버튼, 입력 필드 등)
   - 일관된 크기 체계: none, xxxs, xxs, xs, sm, md, lg, xl, xxl, xxxl

4. **Radius (모서리 반경)**
   - UI 요소의 모서리 둥글기를 정의
   - 다양한 수준: none, sm, md, lg, xl, xxl, circular

이러한 시맨틱 토큰들은 모두 foundation 토큰을 참조하여 의미론적 계층을 형성합니다. 이런 방식으로, foundation 토큰이 변경되면 연결된 모든 시맨틱 토큰이 자동으로 업데이트되어 디자인 시스템 전체의 일관성을 유지할 수 있습니다.

### 토큰 구조

토큰은 Foundation과 Semantic 두 계층으로 구성됩니다:

1. **Foundation 토큰**: 원시 값 정의 (색상, 크기, 간격 등)
2. **Semantic 토큰**: 용도에 따른 매핑 (버튼 색상, 헤더 타이포그래피 등)

```json
// foundation.json 예시
{
  "color": {
    "blue": {
      "50": "#E3F2FD",
      "100": "#BBDEFB",
      // ...
      "900": "#0D47A1"
    },
    // 다른 색상들...
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  }
}
```

```json
// semantic.json 예시
{
  "button": {
    "primary": {
      "background": {
        "default": "{color.blue.500}",
        "hover": "{color.blue.600}",
        "pressed": "{color.blue.700}"
      },
      "text": "{color.white}",
      "padding": {
        "x": "{spacing.md}",
        "y": "{spacing.sm}"
      }
    },
    "outlined": {
      "border": {
        "color": "{color.blue.500}",
        "width": "1px"
      },
      // ...
    }
  }
}
```

### 토큰 변환

Style Dictionary를 사용하여 JSON 토큰을 CSS 변수로 변환합니다:

```javascript
// config.js
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

## 컴포넌트 설계

### 시맨틱 토큰을 활용한 컴포넌트 구현

시맨틱 토큰은 컴포넌트 구현의 핵심입니다. 용도별로 정의된 토큰들을 활용하여 일관되고 체계적인 컴포넌트를 구현할 수 있습니다. 

#### 버튼 컴포넌트 예시

버튼은 시맨틱 토큰이 실제 컴포넌트로 구현되는 가장 명확한 예입니다.

1. **버튼 종류별 구현**

   - **Primary 버튼**: 브랜드의 주요 색상을 사용하는 가장 강조된 버튼
       ```jsx
       // 시맨틱 토큰 활용 예
       <Button
         background="system-1.primary.background.1.default"
         color="system-1.primary.foreground.1.default"
         _hover={{
           background: "system-1.primary.background.1.hover"
         }}
         _active={{
           background: "system-1.primary.background.1.active"
         }}
         _disabled={{
           background: "system-1.primary.background.1.disabled",
           color: "system-1.primary.foreground.1.disabled"
         }}
       >
         Primary 버튼
       </Button>
       ```

   - **Secondary 버튼**: 보조적인 액션을 위한 덜 강조된 버튼
       ```jsx
       <Button 
         variant="secondary"
         background="system-1.neutral.background.1.default"
         color="system-1.neutral.foreground.1.default"
       >
         Secondary 버튼
       </Button>
       ```

2. **버튼 스타일 변형**

   - **Filled 버튼**: 배경색이 채워진 기본 형태
   - **Outlined 버튼**: 테두리만 있고 배경은 투명한 형태
       ```jsx
       <Button 
         variant="outlined"
         borderColor="system-1.primary.stroke.1.default"
         color="system-1.primary.foreground.inverse.default"
         background="transparent"
         _hover={{
           borderColor: "system-1.primary.stroke.1.hover",
           background: "system-1.primary.background.1.hover",
           opacity: 0.1
         }}
       >
         Outlined 버튼
       </Button>
       ```
   - **Transparent 버튼**: 테두리와 배경 모두 없는 텍스트만 있는 형태
       ```jsx
       <Button 
         variant="transparent"
         color="system-1.primary.foreground.inverse.default"
         background="transparent"
         _hover={{
           color: "system-1.primary.foreground.inverse.hover"
         }}
       >
         Transparent 버튼
       </Button>
       ```

3. **버튼 크기 변형**

   시맨틱 크기 토큰을 활용하여 일관된 크기 체계 적용:
   ```jsx
   <Button 
     size="sm"
     px="system-1.spacingHor.xs"
     py="system-1.spacingVer.xxs"
     fontSize="system-1.typography.body/normal.1.default.fontSize"
   >
     작은 버튼
   </Button>
   
   <Button size="md">중간 버튼</Button>
   <Button size="lg">큰 버튼</Button>
   ```

#### 컴포넌트 상태 관리

시맨틱 토큰은 다양한 상태별로 정의되어 있어 컴포넌트의 상태 관리를 일관되게 적용할 수 있습니다:

```jsx
// 버튼 컴포넌트 내부 구현 예시
const Button = ({variant = 'primary', size = 'md', ...props}) => {
  const styles = {
    primary: {
      base: {
        background: "system-1.primary.background.1.default",
        color: "system-1.primary.foreground.1.default",
      },
      hover: {
        background: "system-1.primary.background.1.hover",
      },
      pressed: {
        background: "system-1.primary.background.1.active",
      },
      disabled: {
        background: "system-1.primary.background.1.disabled",
        color: "system-1.primary.foreground.1.disabled",
      }
    },
    // 다른 variant 스타일...
  };

  const sizeStyles = {
    sm: {
      paddingX: "system-1.spacingHor.xs",
      paddingY: "system-1.spacingVer.xxs",
      borderRadius: "system-1.radius.sm",
      fontSize: "system-1.typography.body/normal.1.default.fontSize",
    },
    md: {
      // 중간 크기 스타일
    },
    lg: {
      // 큰 크기 스타일
    }
  };

  return (
    <button
      css={{
        ...styles[variant].base,
        ...sizeStyles[size],
        '&:hover:not(:disabled)': styles[variant].hover,
        '&:active:not(:disabled)': styles[variant].pressed,
        '&:disabled': styles[variant].disabled,
      }}
      {...props}
    />
  );
};
```

#### 시스템 확장성

이런 구조는 새로운 컴포넌트나 변형을 추가할 때 일관성을 유지하면서 쉽게 확장할 수 있습니다:

1. 새로운 버튼 변형 추가 시, 기존 시맨틱 토큰을 재활용
2. 시맨틱 토큰 수정 시 연결된 모든 컴포넌트가 자동으로 업데이트
3. 테마 전환 시 컴포넌트 재구현 없이 시맨틱 토큰만 교체하면 됨

이러한 접근 방식으로 디자인 시스템은 단순한 컴포넌트 모음이 아닌, 의미와 목적을 가진 체계적인 구조로 발전합니다.

### 컴포넌트 계층 구조

디자인 시스템의 컴포넌트는 다음과 같은 계층 구조로 나눌 수 있습니다:

#### 1. 기본 요소(Primitives)

기본 요소는 디자인 시스템의 기초가 되는 가장 작은 단위의 컴포넌트입니다:

- **특징**: 더 이상 분해할 수 없는 기본 UI 요소
- **예시**: 버튼, 입력 필드, 체크박스, 라디오 버튼, 아이콘, 텍스트 필드 등
- **역할**: 다른 컴포넌트의 구성 요소로 사용됨

#### 2. 복합 요소(Compounds)

복합 요소는 기본 요소들을 조합하여 만든 더 복잡한 컴포넌트입니다:

- **특징**: 여러 기본 요소의 조합으로 구성
- **예시**: 카드, 모달, 드롭다운, 탭 패널, 내비게이션 바 등
- **역할**: 특정 기능을 수행하는 독립적인 UI 단위

#### 3. 패턴(Patterns)

패턴은 특정 사용자 경험을 제공하기 위한 컴포넌트 조합입니다:

- **특징**: 복합 요소와 기본 요소의 특정 배열 및 동작 방식
- **예시**: 폼, 인증 흐름, 검색 인터페이스, 피드백 시스템 등
- **역할**: 일관된 UX를 제공하는 재사용 가능한 솔루션

#### 아토믹 디자인과의 비교

이 구조는 Brad Frost의 아토믹 디자인 방법론과 유사하지만 약간 다릅니다:

- **아토믹 디자인**: 원자(Atoms) → 분자(Molecules) → 유기체(Organisms) → 템플릿(Templates) → 페이지(Pages)
- **현재 구조**: 기본 요소(Primitives) → 복합 요소(Compounds) → 패턴(Patterns)

주요 차이점은 템플릿과 페이지 계층이 디자인 시스템 범위에서 제외되고, 대신 이를 구현하는 애플리케이션의 영역으로 간주한다는 점입니다.

### 컴포넌트 API 설계

재사용성과 유연성을 위한 명확한 인터페이스:

```jsx
// Button.jsx 예시
import React from 'react';
import './Button.css';

/**
 * 기본 버튼 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {'primary'|'secondary'|'tertiary'} props.variant - 버튼 변형
 * @param {'solid'|'outlined'|'ghost'} props.appearance - 버튼 모양
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
```

### 토큰 문서화

디자인 토큰 시각화 및 문서화:

```jsx
// DesignTokens.stories.mdx
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
```

## 자동화 프로세스

### CI/CD 파이프라인

GitHub Actions를 활용한 자동화 워크플로우:

1. **토큰 빌드 자동화**: 디자인 토큰 변경 시 자동 빌드
2. **스토리북 배포**: 빌드된 스토리북 자동 배포
3. **테스트 자동화**: 컴포넌트 변경 시 자동 테스트

## 스토리북 활용

### 컴포넌트 문서화

Storybook을 활용한 체계적인 문서화:

1. **컴포넌트 스토리**: 각 컴포넌트의 다양한 상태 및 변형 전시
2. **인터랙티브 예제**: 실시간으로 속성 변경하며 테스트
3. **접근성 검사**: 접근성 표준 준수 여부 확인

## 협업 워크플로우

### 디자이너-개발자 협업

효율적인 협업을 위한 가이드라인:

1. **토큰 중심 커뮤니케이션**: 디자인 변경 사항을 토큰으로 전달
2. **PR 리뷰 프로세스**: 컴포넌트 변경 시 디자이너의 리뷰 필수
3. **문서화 우선**: 모든 변경 사항은 스토리북에 문서화 필수

## 버전 관리

### 시맨틱 버저닝

버전 관리 전략:

1. **메이저 버전**: 하위 호환성을 깨는 변경
2. **마이너 버전**: 하위 호환성을 유지하는 기능 추가
3. **패치 버전**: 버그 수정 및 사소한 변경

## 프로젝트 아키텍처

### 아토믹 디자인과 FSD

디자인 시스템의 파일 구조는 개발 효율성에 큰 영향을 줍니다. 여기서는 두 가지 주요 방법론을 살펴보겠습니다:

#### 아토믹 디자인 구조

Brad Frost의 아토믹 디자인 방법론에 기반한 구조입니다:

```
src/
├── atoms/        # 가장 기본적인 UI 요소 (버튼, 인풋 등)
├── molecules/    # 원자의 조합 (폼 필드, 카드 등)
├── organisms/    # 분자와 원자의 복합체 (헤더, 푸터 등)
├── templates/    # 페이지 레이아웃 (그리드, 구조)
└── pages/        # 실제 페이지 구현
```

**장점**:
- 명확한 계층 구조로 컴포넌트 재사용성 강화
- 디자인 시스템과 개념적으로 일치
- 컴포넌트 복잡성에 따른 명확한 분류

**단점**:
- 실제 기능 구현 시 여러 폴더를 오가며 작업 필요
- 기능이 추가될수록 분류가 모호해질 수 있음
- 대규모 프로젝트에서 확장성 문제 발생 가능

#### Feature-Sliced Design (FSD)

기능 중심의 구조를 제안하는 방법론입니다:

```
src/
├── shared/       # 공유 유틸리티, 라이브러리, UI 키트
├── entities/     # 비즈니스 엔티티 (사용자, 상품 등)
├── features/     # 사용자 인터랙션 (로그인, 검색 등)
├── widgets/      # 복합 UI 블록 (사이드바, 피드 등)
└── pages/        # 라우팅, 레이아웃
```

**장점**:
- 기능 중심으로 관련 코드를 그룹화하여 작업 효율성 증가
- 기능 단위로 독립적인 개발과 테스트 가능
- 대규모 프로젝트와 팀 협업에 적합

**단점**:
- 디자인 시스템의 컴포넌트 계층과 일치하지 않을 수 있음
- 공유 컴포넌트의 관리가 복잡해질 수 있음

### 하이브리드 구조

디자인 시스템에 최적화된 하이브리드 파일 구조를 제안합니다:

```
src/
├── tokens/             # 디자인 토큰 정의
│   ├── foundation/     # 기본 토큰
│   └── semantic/       # 의미적 토큰
├── components/         # UI 컴포넌트
│   ├── primitives/     # 기본 UI 요소 (버튼, 인풋 등)
│   ├── compounds/      # 복합 UI 요소 (카드, 모달 등)
│   └── patterns/       # 재사용 가능한 UI 패턴
├── features/           # 기능 모듈
│   ├── auth/           # 인증 관련 기능
│   └── settings/       # 설정 관련 기능
└── pages/              # 실제 페이지 구현
```

이 구조는 아토믹 디자인의 컴포넌트 계층화와 FSD의 기능 중심 접근법을 결합하여:

1. 디자인 시스템의 원칙을 준수하면서도 기능 개발의 효율성 확보
2. 컴포넌트 재사용성 최대화 및 중복 최소화
3. 독립적인 기능 모듈화로 유지보수성 향상

각 프로젝트의 규모와 팀 구성에 맞게 이 구조를 조정하여 최적의 개발 환경을 구성할 수 있습니다.