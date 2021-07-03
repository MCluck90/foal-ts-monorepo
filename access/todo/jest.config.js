module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  moduleNameMapper: {
    '@access/common(.*)': '<rootDir>/../common/src$1',
    '@utility/common(.*)': '<rootDir>/../../utility/common/src$1',
  },
}
