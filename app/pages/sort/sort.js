import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  randomArrayGenerator,
  selectionSort,
  insertionSort,
  bubbleSort,
  quickSort,
  mergeSort,
  heapSort,
} from './sortAlgorithms';

const defaultArraySize = 5;
const defaultMaxNumberValue = 10;
const numbersToJsx = array => array.map(number => <li key={uuidv4()}>{number}</li>);

// TODO make array immutable with immutable.js
// TODO finish getting steps for mergesort, heapsort, 
export default () => {
  const [Numbers, setNumbers] = useState(randomArrayGenerator(defaultArraySize, defaultMaxNumberValue));
  console.log(Numbers);
  const arraySteps = quickSort(Numbers);
  console.log(arraySteps);

  return (
    <>
      <div>
        Array: <ul>{numbersToJsx(Numbers)}</ul>
      </div>
      <button onClick={() => {}} type="button">
        Click
      </button>
    </>
  );
};
