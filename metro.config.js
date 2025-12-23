const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  server: {
    enhanceMiddleware: (middleware) => {
      return middleware;
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
