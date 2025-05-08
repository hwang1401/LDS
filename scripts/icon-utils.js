/**
 * 아이콘 유틸리티 함수
 * 
 * 이 파일은 아이콘 관련 유틸리티 함수들을 제공합니다.
 * - kebabCase: 문자열을 kebab-case로 변환
 * - iconPathToKebabCase: 아이콘 경로를 kebab-case로 변환
 */

/**
 * 문자열을 kebab-case로 변환
 * @param {string} str 변환할 문자열
 * @returns {string} kebab-case로 변환된 문자열
 */
function kebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase -> kebab-case
    .replace(/[\s_]+/g, '-')             // 공백과 언더스코어를 하이픈으로 변환
    .replace(/\//g, '/')                 // 슬래시는 유지
    .toLowerCase();                      // 소문자로 변환
}

/**
 * 아이콘 경로를 kebab-case로 변환
 * @param {string} iconPath 원본 아이콘 경로
 * @returns {string} kebab-case로 변환된 아이콘 경로
 */
function iconPathToKebabCase(iconPath) {
  // 경로 분해
  const parts = iconPath.split('/');
  
  // 각 부분을 kebab-case로 변환
  const kebabParts = parts.map(part => kebabCase(part));
  
  // 경로 재구성
  return kebabParts.join('/');
}

/**
 * 아이콘 경로를 변환하는 함수 (버튼 컴포넌트용)
 * @param {string} originalPath 원본 아이콘 경로 
 * @returns {string} 변환된 아이콘 경로
 */
function convertIconPath(originalPath) {
  // 경로 매핑 테이블
  const pathMap = {
    'line icons/home': 'line-icons/home',
    'line icons/settings/settings': 'line-icons/settings',
    'line icons/checkmark/checkmark': 'line-icons/checkmark',
    'line icons/Arrow/Arrowhead/right': 'line-icons/arrow/arrow-right',
  };
  
  // 매핑 테이블에 있으면 변환된 경로 반환, 없으면 kebab-case로 변환
  return pathMap[originalPath] || iconPathToKebabCase(originalPath);
}

module.exports = {
  kebabCase,
  iconPathToKebabCase,
  convertIconPath
}; 