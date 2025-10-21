const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'app/components/**/*.{js,jsx,ts,tsx}',
    'app/lib/**/*.{js,jsx,ts,tsx}',
    'app/types/**/*.{js,jsx,ts,tsx}',
    'app/hooks/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/*.config.js',
    '!**/jest.setup.js',
    '!app/**/page.tsx',
    '!app/**/layout.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: [
    '<rootDir>/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/app/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/app/components/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/app/lib/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/app/types/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/app/hooks/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/lib/(.*)$': '<rootDir>/app/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/app/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/app/types/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
};

module.exports = createJestConfig(customJestConfig);