import StyleDictionary from 'style-dictionary';

console.log('Running token build with shared foundation...');

const designSystems = ['system-1', 'system-2'];

const getConfig = (system) => {
  return {
    source: [
      "shared/tokens/foundation.json",
      `design-systems/${system}/tokens/*.json`
    ],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: `design-systems/${system}/styles/`,
        files: [
          {
            destination: "variables.css",
            format: "css/variables"
          }
        ]
      },
      js: {
        transformGroup: "js",
        buildPath: `design-systems/${system}/styles/`,
        files: [
          {
            destination: "tokens.js",
            format: "javascript/es6"
          }
        ]
      }
    }
  };
};

// 토큰 빌드 함수
async function buildTokens() {
  try {
    for (const system of designSystems) {
      console.log(`Building tokens for ${system}...`);
      const config = getConfig(system);
      const sd = StyleDictionary.extend(config);
      sd.buildAllPlatforms();
      console.log(`✅ ${system} tokens built successfully`);
    }
  } catch (error) {
    console.error('❌ Error building tokens:', error);
    process.exit(1);
  }
}

// 스크립트 실행
buildTokens(); 