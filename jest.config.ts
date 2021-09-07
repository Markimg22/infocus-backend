export default {
  clearMocks: true,
  preset: 'ts-jest',
  bail: true,
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
