const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'cjs'], // Adding '.cjs' to handle CommonJS modules
};

module.exports = defaultConfig;
