module.exports = {
  testRunner: 'jest-circus/runner',
  automock: false,
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  testEnvironment: 'node',
}
