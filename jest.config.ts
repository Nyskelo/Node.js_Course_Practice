import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testMatch: ['**/?(*.)+(spec).+(ts)'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/__mock__/setup-jest.ts'],
  transform: { '^.+\\.(ts)$': 'ts-jest' },
};

export default config;
