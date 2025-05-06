import React from 'react';
import { Card } from './index';
import Button from '../../primitives/Button';

/**
 * 카드 컴포넌트 스토리
 */
export default {
  title: 'System-1/Compounds/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined'],
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    media: { control: 'object' },
    actions: { control: 'object' },
  },
};

// 기본 카드
export const DefaultCard = {
  args: {
    variant: 'default',
    title: '카드 제목',
    subtitle: '카드 부제목',
    children: '카드 내용이 여기에 들어갑니다. 다양한 컨텐츠를 넣을 수 있습니다.',
  },
};

// 이미지가 있는 카드
export const WithImage = {
  args: {
    variant: 'elevated',
    title: '이미지 카드',
    subtitle: '이미지가 포함된 카드',
    media: (
      <img
        src="https://via.placeholder.com/400x200"
        alt="카드 이미지"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
    ),
    children: '이미지가 포함된 카드 내용입니다.',
  },
}; 