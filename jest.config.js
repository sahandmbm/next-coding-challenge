const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './'
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {'^@/(.*)$': '<rootDir>/src/$1'},
    testEnvironment: 'jest-environment-jsdom'
};

// nextJest sets transformIgnorePatterns which blocks ESM packages like
// react-intl. We override it after the config is generated.
module.exports = async () => {
    const config = await createJestConfig(customJestConfig)();
    config.transformIgnorePatterns = [
        '/node_modules/(?!(react-intl|@formatjs|intl-messageformat|@react-intl)/).+'
    ];
    return config;
};
