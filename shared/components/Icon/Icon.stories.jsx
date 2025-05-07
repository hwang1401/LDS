import React from 'react';
import Icon from './index';
import './Icon.css';

export default {
  title: 'Shared/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'text',
      description: '아이콘 이름 (경로 포함)'
    },
    size: {
      control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      description: '아이콘 크기'
    },
    color: {
      control: 'color',
      description: '아이콘 색상'
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러'
    }
  },
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 제공하는 아이콘을 표시하는 컴포넌트입니다. 아이콘은 shared/tokens/icons 디렉토리에 저장되어 있습니다.'
      }
    }
  }
};

const Template = (args) => <Icon {...args} />;

// 로고 아이콘 예시
export const Logo = Template.bind({});
Logo.args = {
  name: 'logo/brand-logo',
  size: 'md',
  color: '#2196F3'
};

// 라인 아이콘 예시
export const LineIcon = Template.bind({});
LineIcon.args = {
  name: 'line icons/home',
  size: 'md',
  color: '#333333'
};

// 플랫 아이콘 예시 
export const FlatIcon = Template.bind({});
FlatIcon.args = {
  name: 'flat icons/notification',
  size: 'md',
  color: '#F44336'
};

// 다양한 크기 예시
export const SizeVariants = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <Icon name="logo/brand-logo" size="xs" color="#2196F3" />
    <Icon name="logo/brand-logo" size="sm" color="#2196F3" />
    <Icon name="logo/brand-logo" size="md" color="#2196F3" />
    <Icon name="logo/brand-logo" size="lg" color="#2196F3" />
    <Icon name="logo/brand-logo" size="xl" color="#2196F3" />
  </div>
);

// 다양한 색상 예시
export const ColorVariants = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <Icon name="line icons/home" size="md" color="#2196F3" />
    <Icon name="line icons/home" size="md" color="#4CAF50" />
    <Icon name="line icons/home" size="md" color="#F44336" />
    <Icon name="line icons/home" size="md" color="#FFC107" />
    <Icon name="line icons/home" size="md" color="#9C27B0" />
  </div>
); 