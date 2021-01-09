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
        setConfig={(data, background, progress) => {
          dispatch({ type: 'alter-array', payload: { data, background, progress } });
        }}
        algorithm={algorithm}
        state={state}
        speed={config.speed}
        setState={newState => setState(newState)}
      />
      <Controls
        state={state}
        progress={config.progress}
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

function configReducer(state, { type, payload }) {
  switch (type) {
    case 'alter-speed':
      return { ...state, speed: payload };
    case 'alter-size':
      return { ...state, size: payload, data: graphData(randomArrayGenerator(payload)), progress: 0 };
    case 'alter-array':
      return { ...state, data: graphData(payload.data, payload.background), progress: payload.progress };
    default:
      throw new Error('No valid action given');
  }
}
