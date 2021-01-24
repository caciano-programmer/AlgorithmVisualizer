import { randomArrayGenerator, SORT_ALGORITHMS } from './sortAlgorithms';

// Animation duration in ms
export const MAX_SPEED = arraySize => Math.floor((10 / arraySize) * 500 + 25);
export const MIN_SPEED = arraySize => MAX_SPEED(arraySize) * 4;

const DEFAULT_ARRAY_SIZE = 25;
const DEFAULT_ARRAY_SPEED = Math.floor(MAX_SPEED(DEFAULT_ARRAY_SIZE) * 2.5);
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
  pointer: 0,
  instruction: { type: INSTRUCTIONS.BEGINNING, inProgress: false },
  progress: 0,
};

export const findAdjustedSpeed = (arrSize, newArrSize, speed) => {
  const percentage = speed / MAX_SPEED(arrSize);
  return Math.floor(MAX_SPEED(newArrSize) * percentage);
};
