import { SORT_ALGORITHMS } from '../sort/sortAlgorithms';
import { maxSpeed, randomArrayGenerator } from '../sort/sortUtil';

const DEFAULT_ARRAY_SIZE = 25;
const DEFAULT_ARRAY_SPEED = Math.floor(maxSpeed(DEFAULT_ARRAY_SIZE) * 2.5);
const DEFAULT_ALGORITHM = SORT_ALGORITHMS.QUICK_SORT;

export const APP_NAME = 'SortVisualizer';

export const STATES = {
  GO: 'go',
  STOP: 'stop',
  FINISHED: 'finished',
};

export const INSTRUCTIONS = {
  NEXT: 'next',
  PREVIOUS: 'previous',
  END: 'end',
  BEGINNING: 'beginning',
};

export const InitialState = {
  state: STATES.STOP,
  algorithm: DEFAULT_ALGORITHM,
  data: DEFAULT_ALGORITHM.func(randomArrayGenerator(DEFAULT_ARRAY_SIZE)),
  size: DEFAULT_ARRAY_SIZE,
  speed: DEFAULT_ARRAY_SPEED,
  custom: false,
  pointer: 0,
  instruction: { type: INSTRUCTIONS.BEGINNING, inProgress: false },
  progress: 0,
};
