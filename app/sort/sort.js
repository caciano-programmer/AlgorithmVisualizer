import React, { useReducer } from 'react';
import { Header } from '../UI/header/header';
import { MemoizedChart } from '../UI/chart/chart';
import { Controls } from '../UI/controls/controls';
import { findAdjustedSpeed, InitialState, INSTRUCTIONS, STATES } from './AppConstants';
import { randomArrayGenerator, SORT_ALGORITHMS } from './sortAlgorithms';

export const Sort = () => {
  const [config, dispatch] = useReducer(configReducer, InitialState);

  return (
    <React.StrictMode>
      <Header algorithm={config.algorithm} setAlgorithm={payload => dispatch({ type: 'change-algorithm', payload })} />
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
    </React.StrictMode>
  );
};

function configReducer(state, { type, payload }) {
  const instructionType = state.instruction.type;
  const stepLength = state.data.steps.length;
  let { pointer } = state;
  const newData = (size, algorithm = state.algorithm) => algorithm.func(randomArrayGenerator(size));

  switch (type) {
    case 'change-state':
      return { ...state, state: payload };
    case 'instruction':
      return instructionReducer(state, payload);
    case 'change-algorithm': {
      const data = newData(state.size, payload);
      return { ...state, algorithm: payload, data, progress: 0, state: STATES.STOP, pointer: 0 };
    }
    case 'alter-speed':
      return { ...state, speed: payload };
    case 'alter-size': {
      const speed = findAdjustedSpeed(state.size, payload, state.speed);
      return { ...state, size: payload, data: newData(payload), state: STATES.STOP, pointer: 0, progress: 0, speed };
    }
    case 'alter-array': {
      const data = { ...state.data, current: payload };
      if (instructionType === INSTRUCTIONS.NEXT || state.state === STATES.GO) pointer++;
      const finishedState = pointer >= stepLength ? STATES.FINISHED : state.state;
      const instruction = { type: instructionType, inProgress: false };
      const progress = (pointer / stepLength) * 100;
      return { ...state, data, pointer, state: finishedState, instruction, progress };
    }
    default:
      throw new Error('No valid action given');
  }
}

function instructionReducer(state, payload) {
  const stepLength = state.data.steps.length;
  let { pointer } = state;

  switch (payload.type) {
    case INSTRUCTIONS.NEXT: {
      if (pointer < 0) pointer = 0;
      return pointer >= stepLength ? state : { ...state, pointer, instruction: payload };
    }
    case INSTRUCTIONS.PREVIOUS: {
      if (state.pointer >= stepLength) pointer = stepLength - 1;
      pointer = state.state === STATES.FINISHED ? pointer : pointer - 1;
      return pointer < 0 ? state : { ...state, pointer, instruction: payload, state: STATES.STOP };
    }
    case INSTRUCTIONS.BEGINNING: {
      const data = { ...state.data, current: state.data.start };
      return { ...state, instruction: payload, data, state: STATES.STOP, pointer: 0, progress: 0 };
    }
    case INSTRUCTIONS.END: {
      const data = { ...state.data, current: state.data.end };
      return { ...state, instruction: payload, data, state: STATES.FINISHED, progress: 100, pointer: stepLength };
    }
    default:
      throw new Error('No valid instruction given.');
  }
}
