module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // TODO: Do this mapping automatically
  moduleNameMapper: {
    '@utility/common(.*)': '<rootDir>/../../utility/common/src$1',
  },
}
