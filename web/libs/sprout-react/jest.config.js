process.env.TZ = 'UTC';

module.exports = {
  verbose: false,
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  moduleDirectories: ['node_modules'],
  roots: ['<rootDir>/packages', '<rootDir>/scripts'],
  testRegex: '(\\.|/)(test)\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFiles: ['jest-canvas-mock', './test/jest-shim.ts', './test/jest-setup.ts'],
  setupFilesAfterEnv: ['./test/setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: { 'ts-jest': { isolatedModules: true } },
  moduleNameMapper: {
    '\\.svg': '<rootDir>/test/mocks/svg.ts',
    '\\.css': '<rootDir>/test/mocks/style.ts',
    'monaco-editor/esm/vs/editor/editor.api': '<rootDir>/test/mocks/monaco.ts',
  },
  watchPathIgnorePatterns: ['node_modules/'],
};