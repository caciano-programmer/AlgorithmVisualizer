import React, { useReducer } from 'react';
import { Header } from '../UI/header/header';
import { MemoizedChart } from '../UI/chart/chart';
import { Controls } from '../UI/controls/controls';
import { InitialState, INSTRUCTIONS } from './AppConstants';

export const Sort = () => {
  const [config, dispatch] = useReducer(configReducer, InitialState);

  return (
    <React.StrictMode>
      <Header algorithm={config.algorithm} />
      <MemoizedChart
        state={config.state}
        data={config.data}
        setData={payload => dispatch({ type: 'alter-array', payload })}
        speed={config.speed}
        steps={config.steps}
        pointer={config.pointer}
        instruction={config.instruction}
      />
      <Controls
        state={config.state}
        setState={payload => dispatch({ type: 'change-state', payload })}
        progress={config.progress}
        size={config.size}
        speed={config.speed}
        inProgress={config.inProgress}
        instruction={config.instruction}
        setInstruction={payload => dispatch({ type: 'instruction', payload: { type: payload, inProgress: true } })}
      />
    </React.StrictMode>
  );
};

function configReducer(state, { type, payload }) {
  switch (type) {
    case 'change-state':
      return { ...state, state: payload };
    case 'instruction':
      return instructionReducer(state, payload);
    case 'change-algorithm':
      return {};
    case 'alter-speed':
      return {};
    case 'alter-size':
      return {};
    case 'alter-array':
      return { ...state, data: payload, instruction: { type: state.instruction.type, inProgress: false } };
    default:
      throw new Error('No valid action given');
  }
}

function instructionReducer(state, payload) {
  switch (payload.type) {
    case INSTRUCTIONS.NEXT: {
      const pointer =
        state.pointer < 0 ? 0 : state.instruction.type === INSTRUCTIONS.NEXT ? state.pointer + 1 : state.pointer;
      return pointer >= state.steps.length ? state : { ...state, pointer, instruction: payload };
    }
    case INSTRUCTIONS.PREVIOUS: {
      const pointer =
        state.pointer >= state.steps.length
          ? state.steps.length - 1
          : state.instruction.type === INSTRUCTIONS.PREVIOUS
          ? state.pointer - 1
          : state.pointer;
      return state.pointer <= 0 ? state : { ...state, pointer, instruction: payload };
    }
    default:
      throw new Error('No valid instruction given.');
  }
}
