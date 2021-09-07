export default {
  clearMocks: true,
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
