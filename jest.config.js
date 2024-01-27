const {defaults} = require('jest-config');
require('dotenv').config({
  path: '.env.test'
})
module.exports = {
    testEnvironment: "node",
    testTimeout: 5000,
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFiles: ["dotenv/config"],
}
