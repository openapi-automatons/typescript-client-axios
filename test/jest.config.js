module.exports = {
  clearMocks: true,
  displayName: 'integration',
  collectCoverageFrom: [
    '**/*.(js|ts)',
    '!**/*.d.ts'
  ],
  testMatch: [
    "**/?(*.)+(spec|test).+(ts|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
