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

  return (
    <React.StrictMode>
      <Header
        algorithm={config.algorithm}
        speed={config.speed}
        size={config.size}
        setAlgorithm={newAlgorithm => {
          dispatch({ type: 'update-steps', payload: newAlgorithm });
        }}
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
        setConfig={(data, background, progress, steps) => {
          dispatch({ type: 'alter-array', payload: { data, background, progress, steps } });
        }}
        isMergeSort={config.algorithm.name === 'Merge Sort'}
        steps={config.steps}
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
    case 'change-algorithm': {
      const data = graphData(randomArrayGenerator(state.size));
      const steps = state.algorithm.func(data.datasets[0].data);
      return { ...state, algorithm: payload, data, steps, progress: 0 };
    }
    case 'alter-speed':
      return { ...state, speed: payload };
    case 'alter-size': {
      const data = graphData(randomArrayGenerator(payload));
      const steps = state.algorithm.func(data.datasets[0].data);
      return { ...state, size: payload, data, steps, progress: 0 };
    }
    case 'alter-array': {
      return {
        ...state,
        data: graphData(payload.data, payload.background),
        progress: payload.progress + state.progress >= 100 ? 100 : payload.progress + state.progress,
        steps: payload.steps || state.steps,
      };
    }
    default:
      throw new Error('No valid action given');
  }
}
