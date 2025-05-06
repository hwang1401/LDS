import React from 'react';
import { Button } from './index';

export default {
  title: 'primitive/Button',
  component: Button,
  argTypes: {
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
      description: '왼쪽 아이콘 추가'
    },
    rightIcon: {
      control: 'boolean',
      description: '오른쪽 아이콘 추가'
    },
    onClick: { action: 'clicked' }
  },
  parameters: {
    layout: 'centered',
  },
};

// 기본 템플릿
const Template = (args) => {
  // 아이콘 설정
  const leftIconElement = args.leftIcon ? (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
      <path d="M480-120 200-480l280-360 42 42-226 318 226 318-42 42Z"/>
    </svg>
  ) : null;
  
  const rightIconElement = args.rightIcon ? (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
      <path d="m480-120-42-42 226-318-226-318 42-42 280 360-280 360Z"/>
    </svg>
  ) : null;
  
  // 아이콘 props 제거
  const { leftIcon, rightIcon, ...restArgs } = args;
  
  return (
    <Button 
      {...restArgs} 
      leftIcon={leftIconElement}
      rightIcon={rightIconElement}
    >
      {args.variant ? args.variant.charAt(0).toUpperCase() + args.variant.slice(1) : ''} 버튼
    </Button>
  );
};

// Primary 버튼
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  style: 'filled',
  size: 'md',
  fullWidth: false,
  disabled: false,
  leftIcon: false,
  rightIcon: false
};

// Secondary 버튼
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  style: 'filled',
  size: 'md',
  fullWidth: false,
  disabled: false,
  leftIcon: false,
  rightIcon: false
};

// CTA 버튼
export const CTA = Template.bind({});
CTA.args = {
  variant: 'cta',
  style: 'filled',
  size: 'md',
  fullWidth: false,
  disabled: false,
  leftIcon: false,
  rightIcon: false
};

// 크기 비교
export const SizeComparison = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
    <Button variant="primary" style="filled" size="xs">XS 버튼</Button>
    <Button variant="primary" style="filled" size="sm">SM 버튼</Button>
    <Button variant="primary" style="filled" size="md">MD 버튼</Button>
    <Button variant="primary" style="filled" size="lg">LG 버튼</Button>
    <Button variant="primary" style="filled" size="xl">XL 버튼</Button>
  </div>
);

// 종류별 비교
export const VariantComparison = () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <Button variant="primary" style="filled" size="md">Primary</Button>
    <Button variant="secondary" style="filled" size="md">Secondary</Button>
    <Button variant="cta" style="filled" size="md">CTA</Button>
  </div>
);

// 스타일별 비교
export const StyleComparison = () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <Button variant="primary" style="filled" size="md">Filled</Button>
    <Button variant="primary" style="outlined" size="md">Outlined</Button>
    <Button variant="primary" style="transparent" size="md">Transparent</Button>
  </div>
);

// 상태별 비교
export const StateComparison = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <h3>기본 상태</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="primary" style="filled" size="md">Primary</Button>
        <Button variant="secondary" style="filled" size="md">Secondary</Button>
        <Button variant="cta" style="filled" size="md">CTA</Button>
      </div>
    </div>
    <div>
      <h3>비활성화 상태</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="primary" style="filled" size="md" disabled>Primary</Button>
        <Button variant="secondary" style="filled" size="md" disabled>Secondary</Button>
        <Button variant="cta" style="filled" size="md" disabled>CTA</Button>
      </div>
    </div>
  </div>
); 