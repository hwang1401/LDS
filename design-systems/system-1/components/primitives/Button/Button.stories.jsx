import React from 'react';
import Button from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'System-1/Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '버튼 컴포넌트는 사용자가 액션을 취할 수 있도록 하는 대화형 UI 요소입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'cta'],
      description: '버튼 종류 (Primary, Secondary, CTA)'
    },
    onClick: { 
      action: 'clicked',
      description: '클릭 이벤트 핸들러' 
    },
    style: {
      control: 'select',
      options: ['filled', 'outlined', 'transparent'],
      description: '버튼 스타일'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 크기'
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 적용 여부'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    leftIcon: {
      control: 'boolean',
      description: '왼쪽 아이콘 표시 여부'
    },
    rightIcon: {
      control: 'boolean',
      description: '오른쪽 아이콘 표시 여부'
    },
    iconOnly: {
      control: 'boolean',
      description: '아이콘만 표시 여부'
    },
    children: {
      control: 'text',
      description: '버튼 텍스트'
    }
  }
};

export default meta;

// 기본 버튼 예제
export const DefaultButton = {
  args: {
    variant: 'primary',
    style: 'filled',
    size: 'md',
    fullWidth: false,
    disabled: false,
    leftIcon: false,
    rightIcon: false,
    iconOnly: false,
    children: '버튼'
  }
};

