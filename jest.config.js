/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "@tests/(.*)": "<rootDir>/tests/$1",
    "@interfaces/(.*)": "<rootDir>interfaces/$1",
    "@src/(.*)": "<rootDir>src/$1",
    "@controllers/(.*)": "<rootDir>src/controllers/$1",
    "@services/(.*)": "<rootDir>src/services/$1",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/dist/"
  ]
};