module.exports = {
    testEnvironment: "jsdom",
    coveragePathIgnorePatterns: ["/node_modules/", "/vendor/"],
    clearMocks: true,
    collectCoverage: true,
    moduleFileExtensions: ["js", "jsx"],
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/dist/**",
        "!**/vendor/**",
        "!./jest.config.js",
        "!./webpack.config.js",
        "!./coverage/lcov-report/**",
        "!./src/client/serviceWorker.js",
        "!./src/client/helpers/document_utils.js",
        "!/platform.js",
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    setupFilesAfterEnv: ["./setupTests.js"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    }
};
