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

// 각 디자인 시스템마다 빌드 실행
designSystems.forEach(system => {
  const sd = StyleDictionary.extend(getConfig(system));
  sd.buildAllPlatforms();
});

// config.js를 직접 실행할 경우 사용
export default getConfig(designSystems[0]); 