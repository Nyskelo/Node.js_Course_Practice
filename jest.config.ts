import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testMatch: ['**/?(*.)+(spec).+(ts)'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/__mock__/setup-jest.ts'],
  transform: { '^.+\\.(ts)$': 'ts-jest' },
  coverageReporters: ['cobertura', 'text-summary', 'json-summary', 'html'],
};

export default config;
