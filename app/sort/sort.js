import React, { useReducer } from 'react';
import Header from '../UI/header/header';
import Chart from '../UI/chart/chart';
import Controls from '../UI/controls/controls';
import { randomArrayGenerator } from './sortAlgorithms';
import { ACTIONS, InitialState } from './AppConstants';

export default () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  return (
    <React.StrictMode>
      <Header settings={dispatch} algorithm={state.algorithm} />
      <Chart
        array={state.array}
        algorithm={state.algorithm}
        state={state.state}
        speed={state.speed}
        updateProgress={progress => dispatch({ type: ACTIONS.CHANGE_PROGRESS, payload: progress })}
      />
      <Controls changeControls={dispatch} state={state.state} progress={state.progress} />
    </React.StrictMode>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_ALGORITHM:
      return { ...state, algorithm: action.payload, array: randomArrayGenerator(state.size) };
    case ACTIONS.CHANGE_SIZE:
      return { ...state, size: action.payload, array: randomArrayGenerator(action.payload) };
    case ACTIONS.CHANGE_SPEED:
      return { ...state, speed: action.payload };
    case ACTIONS.CHANGE_STATE:
      return { ...state, state: action.payload };
    case ACTIONS.CHANGE_PROGRESS:
      return { ...state, progress: action.payload };
    default:
      throw new Error('No valid action given.');
  }
}
