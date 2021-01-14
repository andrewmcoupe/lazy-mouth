module.exports = {
  testRunner: 'jest-circus/runner',
  automock: false,
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.integration.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
