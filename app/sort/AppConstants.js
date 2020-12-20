// import {} from './'

import { randomArrayGenerator, SORT_ALGORITHMS } from './sortAlgorithms';

export const APP_NAME = 'SortVisualizer';

export const STATES = {
  GO: 'go',
  BEGINNING: 'beginning',
  NEXT: 'next',
  PREVIOUS: 'previous',
  STOP: 'stop',
  END: 'end',
};

const DEFAULT_ARRAY_SIZE = 50;
const DEFAULT_ARRAY_SPEED = 50;

export const InitialState = {
  algorithm: SORT_ALGORITHMS.QUICK_SORT,
  size: DEFAULT_ARRAY_SIZE,
  array: randomArrayGenerator(DEFAULT_ARRAY_SIZE),
  state: STATES.STOP,
  speed: DEFAULT_ARRAY_SPEED,
  progress: 0,
};

export const ACTIONS = {
  CHANGE_ALGORITHM: 'change-algorithm',
  CHANGE_SIZE: 'change-size',
  CHANGE_SPEED: 'change-speed',
  CHANGE_STATE: 'change-state',
  CHANGE_PROGRESS: 'change-progress',
};
