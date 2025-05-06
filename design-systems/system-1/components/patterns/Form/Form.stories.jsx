import React from 'react';
import { Form } from './index';

export default {
  title: 'System-1/Patterns/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    fields: { control: 'object' },
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'cancelled' },
    submitText: { control: 'text' },
    cancelText: { control: 'text' },
  },
};

// 로그인 폼 예시
export const LoginForm = {
  args: {
    title: '로그인',
    fields: [
      {
        name: 'email',
        label: '이메일',
        type: 'email',
        required: true,
        placeholder: '이메일을 입력하세요'
      },
      {
        name: 'password',
        label: '비밀번호',
        type: 'password',
        required: true,
        placeholder: '비밀번호를 입력하세요'
      }
    ],
    submitText: '로그인',
    cancelText: '취소'
  }
};

// 회원가입 폼 예시
export const SignupForm = {
  args: {
    title: '회원가입',
    fields: [
      {
        name: 'name',
        label: '이름',
        type: 'text',
        required: true,
        placeholder: '이름을 입력하세요'
      },
      {
        name: 'email',
        label: '이메일',
        type: 'email',
        required: true,
        placeholder: '이메일을 입력하세요'
      },
      {
        name: 'password',
        label: '비밀번호',
        type: 'password',
        required: true,
        placeholder: '비밀번호를 입력하세요'
      },
      {
        name: 'passwordConfirm',
        label: '비밀번호 확인',
        type: 'password',
        required: true,
        placeholder: '비밀번호를 다시 입력하세요'
      }
    ],
    submitText: '가입하기',
    cancelText: '취소'
  }
}; 