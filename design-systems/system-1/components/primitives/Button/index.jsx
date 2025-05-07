import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../../shared/components/Icon';
import './Button.css';

/**
 * 버튼 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {'primary'|'secondary'|'cta'} props.variant - 버튼 종류(상황별)
 * @param {'filled'|'outlined'|'transparent'} props.style - 버튼 스타일
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} props.size - 버튼 크기
 * @param {boolean} props.fullWidth - 전체 너비 적용 여부
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {string} props.leftIconName - 왼쪽 아이콘 이름
 * @param {string} props.rightIconName - 오른쪽 아이콘 이름
 * @param {React.ReactNode} props.children - 버튼 내용
 * @param {function} props.onClick - 클릭 이벤트 핸들러
 */
const Button = ({
  variant = 'primary',
  style = 'filled',
  size = 'md',
  fullWidth = false,
  disabled = false,
  leftIconName,
  rightIconName,
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

  const iconSize = getIconSize(size);

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {leftIconName && (
        <span className="btn-icon btn-icon-left">
          <Icon name={leftIconName} size={iconSize} />
        </span>
      )}
      <span className="btn-text">{children}</span>
      {rightIconName && (
        <span className="btn-icon btn-icon-right">
          <Icon name={rightIconName} size={iconSize} />
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'cta']),
  style: PropTypes.oneOf(['filled', 'outlined', 'transparent']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIconName: PropTypes.string,
  rightIconName: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Button; 