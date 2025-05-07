import React from 'react';
import PropTypes from 'prop-types';

/**
 * Icon 컴포넌트 - 표준화된 방식으로 SVG 아이콘을 표시합니다.
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.name - 아이콘 이름 (경로 포함, 예: "logo/brand-logo" 또는 "line-icons/home")
 * @param {string} props.size - 아이콘 크기 (xs, sm, md, lg, xl)
 * @param {string} props.color - 아이콘 색상 (기본 색상 또는 CSS 색상값)
 * @param {function} props.onClick - 클릭 이벤트 핸들러
 * @param {string} props.className - 추가적인 CSS 클래스
 */
const Icon = ({ name, size = 'md', color, onClick, className, ...rest }) => {
  // 아이콘 크기를 픽셀 값으로 변환
  const sizeMap = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48
  };

  const pixelSize = sizeMap[size] || 24;
  
  try {
    // 동적으로 아이콘 불러오기 (@icons 별칭 사용)
    const IconComponent = React.lazy(() => import(`@icons/${name}.svg`));
    
    return (
      <React.Suspense fallback={<div style={{ width: pixelSize, height: pixelSize }}></div>}>
        <IconComponent
          width={pixelSize}
          height={pixelSize}
          style={{ color }}
          onClick={onClick}
          className={`icon icon-${size} ${className || ''}`}
          {...rest}
        />
      </React.Suspense>
    );
  } catch (error) {
    console.error(`아이콘을 불러올 수 없습니다: ${name}`, error);
    return <div style={{ width: pixelSize, height: pixelSize }}></div>;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Icon; 