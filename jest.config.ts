import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    collectCoverage: true,
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    transform: {
        '\\.m?jsx?$': 'jest-esm-transformer',
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    verbose: true,
};

export default config;
