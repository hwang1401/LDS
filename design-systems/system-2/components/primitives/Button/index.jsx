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

export default Button; 