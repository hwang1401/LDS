import React from 'react';
import Button from './index';

export default {
  title: 'System-1/Primitives/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'cta'],
      description: '버튼 종류(상황별)'
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
    leftIconName: {
      control: 'text',
      description: '왼쪽 아이콘 이름'
    },
    rightIconName: {
      control: 'text',
      description: '오른쪽 아이콘 이름'
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러'
    }
  }
};

const Template = (args) => <Button {...args} />;

// 기본 버튼
export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  style: 'filled',
  size: 'md',
  children: '기본 버튼'
};

// 아이콘이 있는 버튼 (왼쪽)
export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  ...Default.args,
  leftIconName: 'line icons/home',
  children: '왼쪽 아이콘 버튼'
};

// 아이콘이 있는 버튼 (오른쪽)
export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  ...Default.args,
  rightIconName: 'line icons/arrow-right',
  children: '오른쪽 아이콘 버튼'
};

// 양쪽에 아이콘이 있는 버튼
export const WithBothIcons = Template.bind({});
WithBothIcons.args = {
  ...Default.args,
  leftIconName: 'line icons/search',
  rightIconName: 'line icons/filter',
  children: '양쪽 아이콘 버튼'
};

// Secondary 버튼
export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  variant: 'secondary',
  children: 'Secondary 버튼'
};

// CTA 버튼
export const CTA = Template.bind({});
CTA.args = {
  ...Default.args,
  variant: 'cta',
  children: 'CTA 버튼'
};

// 다양한 스타일
export const Styles = () => (
  <div style={{ display: 'flex', gap: '10px' }}>
    <Button variant="primary" style="filled">Filled</Button>
    <Button variant="primary" style="outlined">Outlined</Button>
    <Button variant="primary" style="transparent">Transparent</Button>
  </div>
);

// 다양한 크기
export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Button size="xs">XS</Button>
    <Button size="sm">SM</Button>
    <Button size="md">MD</Button>
    <Button size="lg">LG</Button>
    <Button size="xl">XL</Button>
  </div>
);

// 아이콘 크기 예시
export const IconSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Button size="xs" leftIconName="line icons/home">XS 버튼</Button>
    <Button size="sm" leftIconName="line icons/home">SM 버튼</Button>
    <Button size="md" leftIconName="line icons/home">MD 버튼</Button>
    <Button size="lg" leftIconName="line icons/home">LG 버튼</Button>
    <Button size="xl" leftIconName="line icons/home">XL 버튼</Button>
  </div>
);
