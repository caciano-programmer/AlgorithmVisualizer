import { InitialState, INSTRUCTIONS, randomArrayGenerator, STATES } from '../config/AppConstants';
import { themes } from '../theme/theme';
import { findAdjustedSpeed, getStateFromLocalStorage } from './sortUtil';

export function configReducer(state, { type, payload }) {
  const instructionType = state.instruction.type;
  const stepLength = state.data.steps.length;
  let { pointer } = state;
  const random = (size, array, algorithm = state.algorithm) => algorithm.func(randomArrayGenerator(size, array));
  const noSteps = state.data.steps.length === 0;
  const sortedState = { ...state, progress: 100, state: STATES.FINISHED };

  switch (type) {
    case 'toggle-theme': {
      const theme = state.theme === themes.dark ? themes.light : themes.dark;
      return { ...state, state: STATES.STOP, theme };
    }
    case 'localStorage':
      return payload || state;
    case 'change-state':
      return noSteps ? sortedState : { ...state, state: payload };
    case 'instruction':
      return noSteps ? sortedState : instructionReducer(state, payload);
    case 'change-algorithm': {
      const data = state.custom ? payload.func(state.data.current) : random(state.size, state.data.start, payload);
      return { ...state, algorithm: payload, data, progress: 0, state: STATES.STOP, pointer: 0 };
    }
    case 'new-data': {
      const overflow = payload.length > 100 || (state.custom && state.data.current.length + payload.length > 100);
      const current = state.custom ? [...state.data.current, ...payload] : [...payload];
      const data = { ...state.algorithm.func(current), current };
      const size = data.start.length;
      const speed = findAdjustedSpeed(state.size, size, state.speed);
      return overflow
        ? state
        : { ...state, data, size, speed, state: STATES.STOP, pointer: 0, progress: 0, custom: true };
    }
    case 'clear-custom': {
      const persistedState = getStateFromLocalStorage();
      return persistedState === null ? InitialState : persistedState;
    }
    case 'alter-speed':
      return { ...state, speed: payload };
    case 'alter-size': {
      let size = payload;
      if (state.custom && size < 5) size = 5;
      const shuffle = !state.custom && size === state.size;
      const data = shuffle ? random(size, state.data.start) : random(size);
      const speed = findAdjustedSpeed(state.size, size, state.speed);
      return { ...state, size, data, state: STATES.STOP, pointer: 0, progress: 0, speed, custom: false };
    }
    case 'alter-array': {
      const data = { ...state.data, current: payload };
      if (instructionType === INSTRUCTIONS.NEXT || state.state === STATES.GO) pointer++;
      const finishedState = pointer >= stepLength ? STATES.FINISHED : state.state;
      const instruction = { type: instructionType, inProgress: false };
      const progress = Math.round((pointer / stepLength) * 100);
      return { ...state, data, pointer, state: finishedState, instruction, progress };
    }
    default:
      return InitialState;
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
