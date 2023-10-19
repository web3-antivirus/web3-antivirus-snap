module.exports = {
  preset: '@metamask/snaps-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  rootDir: './',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
};