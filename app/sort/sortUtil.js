import { useEffect, useReducer } from 'react';
import { equals } from 'ramda';
import localForage from 'localforage';
import { InitialState, maxSpeed, STATES } from '../config/AppConstants';
import { SORT_ALGORITHMS } from './sortAlgorithms';

export const useReducerMiddleware = (init, reducer, fn) => {
  const [state, dispatch] = useReducer(reducer, init);
  useEffect(() => fn(state), [state]);
  return [state, dispatch];
};

export const intercept = (fn, dispatch, type) => fn().then(payload => dispatch({ type, payload }));

export const saveLocalStorage = state => {
  if (!equals(state, InitialState) && !state.custom) {
    const toInactiveState = state.state === STATES.GO ? STATES.STOP : state.state;
    const algorithm = JSON.stringify(state.algorithm);
    const stateToSave = { ...state, state: toInactiveState, algorithm };
    localForage.setItem('state', stateToSave);
  }
};

export const getStateFromLocalStorage = () =>
  localForage
    .getItem('state')
    .then(state => {
      const algorithm = Object.values(SORT_ALGORITHMS).find(({ name }) => name === JSON.parse(state.algorithm).name);
      return { ...state, algorithm };
    })
    .catch(() => null);

export const findAdjustedSpeed = (arrSize, newArrSize, speed) => {
  const percentage = speed / maxSpeed(arrSize);
  return Math.floor(maxSpeed(newArrSize) * percentage);
};
