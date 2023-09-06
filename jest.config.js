module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};

