import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  SORT_ALGORITHMS,
  swap,
  randomArrayGenerator,
  selectionSort,
  insertionSort,
  bubbleSort,
  quickSort,
  mergeSort,
  heapSort,
} from './sortAlgorithms';

const DEFAULT_ARRAY_SIZE = 5;
const DEFAULT_MAX_NUMBER_VALUE = 15;

export default () => {
  const [Numbers, setNumbers] = useState(randomArrayGenerator(DEFAULT_ARRAY_SIZE, DEFAULT_MAX_NUMBER_VALUE));
  const animations = getArraySteps(Numbers, SORT_ALGORITHMS.QUICK_SORT);
  const showAnimations = steps => {
    steps.forEach((step, index) => {
      if (step.length === 2)
        setTimeout(() => {
          setNumbers(oldNums => {
            const newState = [...oldNums];
            swap(newState, step[0], step[1]);
            return newState;
          });
        }, index * 2000);
    });
  };

  return (
    <>
      <div>
        Array: <ul>{numbersToJsx(Numbers)}</ul>
      </div>
      <button onClick={() => showAnimations(animations)} type="button">
        Click
      </button>
    </>
  );
};

function numbersToJsx(array) {
  return array.map(number => <li key={uuidv4()}>{number}</li>);
}

function getArraySteps(array, sortMethod = SORT_ALGORITHMS.MERGE_SORT) {
  switch (sortMethod) {
    case SORT_ALGORITHMS.BUBBLE_SORT:
      return bubbleSort(array);
    case SORT_ALGORITHMS.INSERTION_SORT:
      return insertionSort(array);
    case SORT_ALGORITHMS.MERGE_SORT:
      return mergeSort(array);
    case SORT_ALGORITHMS.HEAP_SORT:
      return heapSort(array);
    case SORT_ALGORITHMS.QUICK_SORT:
      return quickSort(array);
    default:
      return selectionSort(array);
  }
}
