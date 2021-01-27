import { useEffect, useReducer } from 'react';
import { equals } from 'ramda';
import { InitialState, LocalStorageState, maxSpeed, STATES } from '../config/AppConstants';
import { SORT_ALGORITHMS } from './sortAlgorithms';

export const useReducerMiddleware = (init, reducer, fn) => {
  const [state, dispatch] = useReducer(reducer, init);
  useEffect(() => fn(state), [state, fn]);
  return [state, dispatch];
};

export const saveLocalStorage = state => {
  if (!equals(state, InitialState) && !state.custom) {
    const toInactiveState = state.state === STATES.GO ? STATES.STOP : state.state;
    const stateToSave = { ...state, state: toInactiveState };
    localStorage.setItem(LocalStorageState, JSON.stringify(stateToSave));
  }
};

export const getStateFromLocalStorage = () => {
  const state = JSON.parse(localStorage.getItem(LocalStorageState));
  if (state === null) return null;
  const [, algorithm] = Object.entries(SORT_ALGORITHMS).find(el => el[1].name === state.algorithm.name);
  return { ...state, algorithm };
};

export const findAdjustedSpeed = (arrSize, newArrSize, speed) => {
  const percentage = speed / maxSpeed(arrSize);
  return Math.floor(maxSpeed(newArrSize) * percentage);
};
