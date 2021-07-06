module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  moduleNameMapper: {
    '@access/common(.*)': '<rootDir>/../../access/common/src$1',
    '@access/todo(.*)': '<rootDir>/../../access/todo/src$1',
    '@engine/validation(.*)': '<rootDir>/../../engine/validation/src$1',
    '@manager/administration(.*)':
      '<rootDir>/../../manager/administration/src$1',
    '@utility/common(.*)': '<rootDir>/../../utility/common/src$1',
  },
}
