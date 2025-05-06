import React from 'react';
import './Button.css';

/**
 * 버튼 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {'primary'|'secondary'|'cta'} props.variant - 버튼 종류(상황별)
 * @param {'filled'|'outlined'|'transparent'} props.style - 버튼 스타일
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} props.size - 버튼 크기
 * @param {boolean} props.fullWidth - 전체 너비 적용 여부
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {React.ReactNode} props.leftIcon - 왼쪽 아이콘
 * @param {React.ReactNode} props.rightIcon - 오른쪽 아이콘
 * @param {React.ReactNode} props.children - 버튼 내용
 * @param {function} props.onClick - 클릭 이벤트 핸들러
 */
export const Button = ({
  variant = 'primary',
  style = 'filled',
  size = 'md',
  fullWidth = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...props
}) => {
  // 텍스트만 있는지, 아이콘만 있는지, 둘 다 있는지 확인
  const hasText = children !== undefined && children !== null;
  const hasLeftIcon = leftIcon !== undefined;
  const hasRightIcon = rightIcon !== undefined;
  const iconOnly = !hasText && (hasLeftIcon || hasRightIcon);

  // 클래스 이름 생성
  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${style}`,
    `btn-${size}`,
    iconOnly ? 'btn-icon-only' : '',
    fullWidth ? 'btn-full-width' : '',
  ].filter(Boolean).join(' ');

  // 클릭 핸들러
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <button 
      className={classNames} 
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {hasLeftIcon && (
        <span className={`btn-icon btn-icon-left ${iconOnly ? 'icon-only' : ''}`}>
          {leftIcon}
        </span>
      )}
      
      {hasText && <span className="btn-text">{children}</span>}
      
      {hasRightIcon && (
        <span className={`btn-icon btn-icon-right ${iconOnly ? 'icon-only' : ''}`}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button; 