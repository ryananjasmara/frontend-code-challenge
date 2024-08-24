module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@/utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@/shared/components/(.*)$': '<rootDir>/src/shared/components/$1', // Ensure this path is mapped
    '^@/services/(.*)$': '<rootDir>/src/services/$1', // Add this path if needed
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage'
};
