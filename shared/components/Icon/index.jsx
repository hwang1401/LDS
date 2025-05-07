import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * 인라인 SVG를 사용하는 Icon 컴포넌트
 * 원본 아이콘을 그대로 불러오며, 상위 컴포넌트에서 크기와 색상을 시멘틱 토큰으로 조절할 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.name - 아이콘 이름 (경로 포함, 예: "logo/brand-logo" 또는 "line icons/home")
 * @param {string} props.size - 아이콘 크기 (실제 크기는 상위 컴포넌트에서 CSS로 제어)
 * @param {string} props.className - 추가적인 CSS 클래스
 * @param {function} props.onClick - 클릭 이벤트 핸들러
 */
const Icon = ({ name, size = 'md', className = '', onClick, ...rest }) => {
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState(false);

  // 아이콘 이름 경로 정규화
  const normalizePath = (iconName) => {
    // 공백이 있는 경로 처리
    const normalized = iconName
      .replace(/\s+/g, '-') // 공백을 하이픈으로 변경
      .replace(/\/+/g, '/') // 중복 슬래시 제거
      .toLowerCase(); // 소문자로 변환 (대소문자 구분 문제 해결)
    
    return normalized;
  };

  useEffect(() => {
    // SVG 파일 가져오기
    const fetchSvg = async () => {
      try {
        // 아이콘 경로 정규화
        const normalizedPath = normalizePath(name);
        console.log('Fetching icon:', normalizedPath);
        
        // 원래 경로로 시도
        let res = await fetch(`/shared/tokens/icons/${normalizedPath}.svg`);
        
        // 원래 경로가 실패하면 하이픈을 제거한 경로 시도
        if (!res.ok) {
          const pathWithoutHyphen = normalizedPath.replace(/-/g, '/');
          console.log('Retrying with path:', pathWithoutHyphen);
          res = await fetch(`/shared/tokens/icons/${pathWithoutHyphen}.svg`);
        }
        
        if (!res.ok) {
          throw new Error(`Failed to fetch icon: ${name}`);
        }
        
        const svgText = await res.text();
        setSvgContent(svgText);
      } catch (err) {
        console.error('Error loading SVG:', err);
        setError(true);
      }
    };

    fetchSvg();
  }, [name]);

  // SVG 콘텐츠를 React 엘리먼트로 변환
  const createSvgElement = () => {
    if (!svgContent) {
      return null;
    }

    // viewBox, xmlns 등 메타 속성 유지하면서 width, height 속성 제거
    const svgElement = document.createElement('div');
    svgElement.innerHTML = svgContent;
    const svgNode = svgElement.firstChild;
    
    // width, height 속성 추출하고 제거 (CSS로 제어하기 위해)
    svgNode.removeAttribute('width');
    svgNode.removeAttribute('height');
    const viewBox = svgNode.getAttribute('viewBox');
    
    // 기존 내용 유지
    const innerContent = svgNode.innerHTML;
    
    // 색상 속성을 현재 색상(currentColor)으로 설정 (CSS 변수로 제어하기 위함)
    const processedContent = innerContent.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    
    // 최종 SVG HTML 문자열
    const finalSvg = `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${processedContent}</svg>`;
    
    return finalSvg;
  };

  // 에러 발생 시 플레이스홀더 표시
  if (error) {
    return (
      <div 
        className={`icon icon-${size} ${className}`} 
        onClick={onClick}
        {...rest}
      >
        ⚠️
      </div>
    );
  }

  return (
    <span 
      className={`icon icon-${size} ${className}`} 
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: createSvgElement() }}
      {...rest}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Icon; 