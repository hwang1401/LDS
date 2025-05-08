const fs = require('fs');
const path = require('path');

console.log('Running token build...');

// 토큰 오브젝트를 CSS 변수로 변환하는 함수
function generateCssVariables(obj, prefix = '') {
  let css = '';
  
  for (const key in obj) {
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      css += generateCssVariables(obj[key], newPrefix);
    } else {
      // 참조 변환: {foundation.color.blue.light.50} -> var(--foundation-color-blue-light-50)
      let value = obj[key];
      if (typeof value === 'string' && value.match(/^\{([^}]+)\}$/)) {
        const refPath = value.replace(/^\{|\}$/g, '');
        value = `var(--${refPath.replace(/\./g, '-')})`;
      }
      css += `  --${newPrefix}: ${value};\n`;
    }
  }
  
  return css;
}

// 각 디자인 시스템에 대한 토큰 빌드
const designSystems = ['system-1', 'system-2'];

designSystems.forEach(system => {
  console.log(`\n💠 Building tokens for ${system}...`);
  
  try {
    // 토큰 파일 읽기
    const foundationPath = path.resolve(`shared/tokens/foundation.json`);
    const semanticPath = path.resolve(`design-systems/${system}/tokens/semantic.json`);
    
    // 파일 존재 확인
    if (!fs.existsSync(foundationPath)) {
      throw new Error(`Foundation tokens file not found: ${foundationPath}`);
    }
    
    if (!fs.existsSync(semanticPath)) {
      throw new Error(`Semantic tokens file not found for ${system}: ${semanticPath}`);
    }
    
    console.log(`Foundation file exists: ${fs.existsSync(foundationPath)}`);
    console.log(`Semantic file exists: ${fs.existsSync(semanticPath)}`);
    
    // 토큰 파일 로드
    const foundation = JSON.parse(fs.readFileSync(foundationPath, 'utf8'));
    const semantic = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));
    
    // CSS 파일용 디렉토리 확인
    const outputPath = path.resolve(`design-systems/${system}/styles/`);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    // CSS 파일 생성
    const cssContent = `/**
 * 자동 생성된 CSS 변수
 * 생성 시간: ${new Date().toISOString()}
 */

:root {
${generateCssVariables(foundation)}
${generateCssVariables(semantic)}
}
`;
    
    // CSS 파일 저장
    fs.writeFileSync(path.join(outputPath, 'variables.css'), cssContent);
    console.log(`✅ CSS variables generated for ${system}`);
    
  } catch (error) {
    console.error(`❌ Error building tokens for ${system}:`, error);
  }
}); 