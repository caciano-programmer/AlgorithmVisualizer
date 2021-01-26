import { INSTRUCTIONS, STATES } from '../config/AppConstants';
import { findAdjustedSpeed, randomArrayGenerator } from './sortUtil';

/* TODO make middleware to implement persist functionality on refresh, and also implement close case
 *      in reducer, so that when close button pressed goes back to previous non custom state
 * */
// FIXME react batching updates when speed is cranked too high
export function configReducer(state, { type, payload }) {
  const instructionType = state.instruction.type;
  const stepLength = state.data.steps.length;
  let { pointer } = state;
  const random = (size, array, algorithm = state.algorithm) => algorithm.func(randomArrayGenerator(size, array));
  const noSteps = state.data.steps.length === 0;
  const sortedState = { ...state, progress: 100, state: STATES.FINISHED };

  switch (type) {
    case 'change-state':
      return noSteps ? sortedState : { ...state, state: payload };
    case 'instruction':
      return noSteps ? sortedState : instructionReducer(state, payload);
    case 'change-algorithm': {
      const data = state.custom ? payload.func(state.data.current) : random(state.size, state.data.start, payload);
      return { ...state, algorithm: payload, data, progress: 0, state: STATES.STOP, pointer: 0 };
    }
    case 'new-data': {
      const current = state.custom ? [...state.data.current, ...payload] : [...payload];
      const data = { ...state.algorithm.func(current), current };
      const size = data.start.length;
      const speed = findAdjustedSpeed(state.size, size, state.speed);
      return { ...state, data, size, speed, state: STATES.STOP, pointer: 0, progress: 0, custom: true };
    }
    case 'clear-custom':
      return {};
    case 'alter-speed':
      return { ...state, speed: payload };
    case 'alter-size': {
      const data = payload === state.size ? random(payload, state.data.start) : random(payload);
      const speed = findAdjustedSpeed(state.size, payload, state.speed);
      return { ...state, size: payload, data, state: STATES.STOP, pointer: 0, progress: 0, speed, custom: false };
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
