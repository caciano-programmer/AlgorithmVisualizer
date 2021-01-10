import { randomArrayGenerator, SORT_ALGORITHMS } from './sortAlgorithms';
import { graphData, options } from '../config/chartConfig';

const DEFAULT_ARRAY_SIZE = 40;
const DEFAULT_ARRAY_SPEED = 400;

export const APP_NAME = 'SortVisualizer';

export const STATES = {
  GO: 'go',
  BEGINNING: 'beginning',
  NEXT: 'next',
  PREVIOUS: 'previous',
  STOP: 'stop',
  END: 'end',
};

export const InitialState = {
  state: STATES.STOP,
  config: {
    algorithm: SORT_ALGORITHMS.QUICK_SORT,
    data: graphData(randomArrayGenerator(DEFAULT_ARRAY_SIZE)),
    options,
    size: DEFAULT_ARRAY_SIZE,
    speed: DEFAULT_ARRAY_SPEED,
    progress: 0,
    get steps() {
      return this.algorithm.func(this.data.datasets[0].data);
    },
  },
};
