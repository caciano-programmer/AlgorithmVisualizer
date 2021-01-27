import { SORT_ALGORITHMS } from '../sort/sortAlgorithms';

export const APP_NAME = 'SortVisualizer';

// Animation duration in ms, scales with array size
export const maxSpeed = arraySize => Math.floor((10 / arraySize) * 300 + 20);
export const minSpeed = arraySize => maxSpeed(arraySize) * 8;

const DEFAULT_ARRAY_SIZE = 25;
const DEFAULT_ARRAY_SPEED = Math.floor(maxSpeed(DEFAULT_ARRAY_SIZE) * 2.5);
const DEFAULT_ALGORITHM = SORT_ALGORITHMS.QUICK_SORT;

export const LocalStorageState = 'SortVisualizerPersistedState';

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

export const randomArrayGenerator = (size, array) => (array === undefined ? random(size) : shuffle(array));

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

function random(size) {
  const nums = [];
  const numMax = size * 5;
  const numMin = size < 50 ? 0 : Math.floor(Math.cbrt(size));
  for (let i = 0; i < size; i++) nums.push(Math.ceil(Math.random() * numMax) + numMin);
  return nums;
}

function shuffle(array) {
  const result = [...array];
  result.forEach((_, index) => {
    const randomIndex = Math.floor(Math.random() * index);
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  });
  return result;
}
