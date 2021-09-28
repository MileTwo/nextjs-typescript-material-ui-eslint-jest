import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    collectCoverage: true,
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    verbose: true,
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
        'tests/(.*)': '<rootDir>/tests/$1',
    },
};

export default config;
