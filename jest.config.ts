import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testMatch: ['**/?(*.)+(spec).+(ts)'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/__mock__/setup-jest.ts'],
  transform: { '^.+\\.(ts)$': 'ts-jest' },
  collectCoverage: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
  coveragePathIgnorePatterns: ['/__mock__/'],
};

export default config;
