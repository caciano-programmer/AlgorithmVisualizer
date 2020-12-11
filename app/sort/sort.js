import React, { useReducer } from 'react';
import Header from '../UI/header/header';
import Chart from '../UI/chart/chart';
import Footer from '../UI/controls/controls';
import { randomArrayGenerator, SORT_ALGORITHMS } from './sortAlgorithms';
import { DEFAULT_SIZE, SPEEDS, STATES } from './stateConstants';

const initialState = {
  algorithm: SORT_ALGORITHMS.QUICK_SORT,
  size: DEFAULT_SIZE,
  array: randomArrayGenerator(DEFAULT_SIZE),
  state: STATES.STOP,
  speed: SPEEDS.NORMAL,
  progress: 0,
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.StrictMode>
      <Header changeAlgorithm={dispatch} />
      <Chart
        array={state.array}
        algorithm={state.algorithm}
        state={state.state}
        speed={state.speed}
        updateProgress={dispatch}
      />
      <Footer changeControls={dispatch} state={state.state} />
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
    case 'change-progress':
      return { ...state, progress: action.payload };
    default:
      throw new Error('No valid action given.');
  }
}
