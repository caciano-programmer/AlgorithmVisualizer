import { randomArrayGenerator, SORT_ALGORITHMS } from './sortAlgorithms';

const DEFAULT_ARRAY_SIZE = 5;
const DEFAULT_ARRAY_SPEED = 400;

export const APP_NAME = 'SortVisualizer';

export const STATES = {
  GO: 'go',
  STOP: 'stop',
  FINISHED: 'finished',
};

export const INSTRUCTIONS = {
  BEGINNING: 'beginning',
  NEXT: 'next',
  PREVIOUS: 'previous',
  END: 'end',
};

export const InitialState = {
  state: STATES.STOP,
  algorithm: SORT_ALGORITHMS.QUICK_SORT,
  data: randomArrayGenerator(DEFAULT_ARRAY_SIZE),
  size: DEFAULT_ARRAY_SIZE,
  speed: DEFAULT_ARRAY_SPEED,
  pointer: 0,
  instruction: { type: INSTRUCTIONS.BEGINNING, inProgress: false },
  progress: 0,
  get steps() {
    return this.algorithm.func(this.data);
  },
};
