import React, { useReducer } from 'react';
import { Header } from '../UI/header/header';
import { MemoizedChart } from '../UI/chart/chart';
import { Controls } from '../UI/controls/controls';
import { InitialState, INSTRUCTIONS } from '../config/AppConstants';
import { SORT_ALGORITHMS } from './sortAlgorithms';
import { configReducer } from './sortReducer';

export const Sort = () => {
  const [config, dispatch] = useReducer(configReducer, InitialState);

  return (
    <>
      <Header
        algorithm={config.algorithm}
        setAlgorithm={payload => dispatch({ type: 'change-algorithm', payload })}
        setNewData={payload => dispatch({ type: 'new-data', payload })}
        clearCustom={() => dispatch({ type: 'clear-custom' })}
      />
      <MemoizedChart
        state={config.state}
        data={config.data.current}
        steps={config.data.steps}
        setData={payload => dispatch({ type: 'alter-array', payload })}
        speed={config.speed}
        pointer={config.pointer}
        instruction={config.instruction}
        isMerge={config.algorithm.name === SORT_ALGORITHMS.MERGE_SORT.name}
      />
      <Controls
        state={config.state}
        setState={payload => dispatch({ type: 'change-state', payload })}
        progress={config.progress}
        size={config.size}
        setSize={(payload = config.size) => dispatch({ type: 'alter-size', payload })}
        speed={config.speed}
        setSpeed={payload => dispatch({ type: 'alter-speed', payload })}
        instruction={config.instruction}
        setInstruction={payload => {
          const inProgress = payload === INSTRUCTIONS.NEXT || payload === INSTRUCTIONS.PREVIOUS;
          dispatch({ type: 'instruction', payload: { type: payload, inProgress } });
        }}
      />
    </>
  );
};
