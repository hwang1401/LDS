import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../../shared/components/Icon';
import './Button.css';

/**
 * 버튼 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {'filled'|'outlined'|'transparent'} props.style - 버튼 스타일
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} props.size - 버튼 크기
 * @param {boolean} props.fullWidth - 전체 너비 적용 여부
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {boolean} props.leftIcon - 왼쪽 아이콘 표시 여부
 * @param {boolean} props.rightIcon - 오른쪽 아이콘 표시 여부
 * @param {boolean} props.iconOnly - 아이콘만 표시 여부
 * @param {React.ReactNode} props.children - 버튼 내용
 * @param {function} props.onClick - 클릭 이벤트 핸들러
 */
const Button = ({
  variant = 'primary',
  style = 'filled',
  size = 'md',
  fullWidth = false,
  disabled = false,
  leftIcon = false,
  rightIcon = false,
  iconOnly = false,
  children,
  onClick,
  ...rest
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${style}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    iconOnly ? 'btn-icon-only' : '',
  ].filter(Boolean).join(' ');

  // 아이콘 크기는 버튼 크기보다 한 단계 작게 설정
  const getIconSize = (btnSize) => {
    const sizeMap = {
      xs: 'xs',
      sm: 'xs',
      md: 'sm',
      lg: 'md',
      xl: 'lg'
    };
    return sizeMap[btnSize] || 'sm';
  };

  // 버튼 타입에 따른 기본 아이콘 선택
  const getDefaultIcon = (type) => {
    const iconMap = {
      leftIcon: {
        primary: 'line-icons/arrow/chevron/up',
        secondary: 'line-icons/arrow/chevron/up', 
        cta: 'line-icons/arrow/chevron/up'
      },
      rightIcon: {
        primary: 'line-icons/arrow/chevron/right',
        secondary: 'line-icons/arrow/chevron/right',
        cta: 'line-icons/arrow/chevron/right'
      },
      iconOnly: {
        primary: 'line-icons/arrow/chevron/right',
        secondary: 'line-icons/arrow/chevron/up',
        cta: 'line-icons/arrow/chevron/up'
      }
    };
    
    return iconMap[type][variant] || iconMap[type].primary;
  };

  const iconSize = getIconSize(size);

  // iconOnly인 경우 버튼 내용은 아이콘만 표시
  if (iconOnly) {
    return (
      <button 
        className={buttonClasses} 
        disabled={disabled}
        onClick={onClick}
        {...rest}
        aria-label={typeof children === 'string' ? children : 'Icon button'}
      >
        <span className="btn-icon">
          <Icon name={getDefaultIcon('iconOnly')} size={iconSize} />
        </span>
      </button>
    );
  }

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {leftIcon && (
        <span className="btn-icon btn-icon-left">
          <Icon name={getDefaultIcon('leftIcon')} size={iconSize} />
        </span>
      )}
      <span className="btn-text">{children}</span>
      {rightIcon && (
        <span className="btn-icon btn-icon-right">
          <Icon name={getDefaultIcon('rightIcon')} size={iconSize} />
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  style: PropTypes.oneOf(['filled', 'outlined', 'transparent']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Button; 