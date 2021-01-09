// import {} from './'

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

const data = graphData(randomArrayGenerator(DEFAULT_ARRAY_SIZE));

export const InitialState = {
  algorithm: SORT_ALGORITHMS.QUICK_SORT,
  config: {
    data,
    options,
    size: DEFAULT_ARRAY_SIZE,
    speed: DEFAULT_ARRAY_SPEED,
    progress: 0,
  },
  state: STATES.STOP,
};
