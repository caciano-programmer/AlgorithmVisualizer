import React, { useReducer, useState } from 'react';
import { Header } from '../UI/header/header';
import { MemoizedChart } from '../UI/chart/chart';
import { Controls } from '../UI/controls/controls';
import { randomArrayGenerator } from './sortAlgorithms';
import { InitialState } from './AppConstants';
import { graphData } from '../config/chartConfig';

export const Sort = () => {
  const [state, setState] = useState(InitialState.state);
  const [config, dispatch] = useReducer(configReducer, InitialState.config);
  const [algorithm, setAlgorithm] = useState(InitialState.algorithm);
  const [progress, setProgress] = useState(InitialState.progress);

  return (
    <React.StrictMode>
      <Header
        algorithm={algorithm}
        speed={config.speed}
        size={config.size}
        setAlgorithm={newAlgorithm => setAlgorithm(newAlgorithm)}
        setState={newState => setState(newState)}
        setSpeed={newSpeed => {
          dispatch({ type: 'alter-speed', payload: newSpeed });
        }}
        setSize={newSize => {
          dispatch({ type: 'alter-size', payload: newSize });
        }}
      />
      <MemoizedChart
        config={{ data: config.data, options: config.options }}
        setConfig={(data, background) => {
          dispatch({ type: 'alter-array', payload: { data, background } });
        }}
        algorithm={algorithm}
        state={state}
        speed={config.speed}
        updateProgress={setProgress}
        setState={newState => setState(newState)}
      />
      <Controls
        state={state}
        progress={progress}
        size={config.size}
        speed={config.speed}
        setState={newState => setState(newState)}
        setSpeed={newSpeed => {
          dispatch({ type: 'alter-speed', payload: newSpeed });
        }}
        setSize={newSize => {
          dispatch({ type: 'alter-size', payload: newSize });
        }}
      />
    </React.StrictMode>
  );
};

function configReducer(state, action) {
  switch (action.type) {
    case 'alter-speed':
      return { ...state, speed: action.payload };
    case 'alter-size':
      return { ...state, size: action.payload, data: graphData(randomArrayGenerator(action.payload)) };
    case 'alter-array':
      return { ...state, data: graphData(action.payload.data, action.payload.background) };
    default:
      throw new Error('No valid action given');
  }
}
