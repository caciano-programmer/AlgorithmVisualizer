import React, { useReducer } from 'react';
import Header from '../UI/header/header';
import Chart from '../UI/chart/chart';
import Footer from '../UI/footer/footer';
import { randomArrayGenerator, SORT_ALGORITHMS } from './sortAlgorithms';

const DEFAULT_SIZE = 50;
const STATES = { GO: 'go', BEGINNING: 'beginning', NEXT: 'next', PREVIOUS: 'previous', STOP: 'stop', END: 'end' };
const SPEEDS = { SLOW: 'slow', NORMAL: 'normal', FAST: 'fast' };

const initialState = {
  algorithm: SORT_ALGORITHMS.INSERTION_SORT,
  size: DEFAULT_SIZE,
  array: randomArrayGenerator(DEFAULT_SIZE),
  state: STATES.STOP,
  speed: SPEEDS.NORMAL,
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.StrictMode>
      <Header changeAlgorithm={dispatch} />
      <Chart array={state.array} algorithm={state.algorithm} state={state.state} speed={state.speed} />
      <Footer changeControls={dispatch} />
    </React.StrictMode>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case 'change-algorithm':
      return { ...state, algorithm: action.payload, array: randomArrayGenerator(state.size) };
    case 'change-size':
      return { ...state, size: action.payload, array: randomArrayGenerator(action.payload) };
    case 'change-speed':
      return { ...state, speed: action.payload };
    case 'change-state':
      return { ...state, state: action.payload };
    default:
      throw new Error('No valid action given.');
  }
}
