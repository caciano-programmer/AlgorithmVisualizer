import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { randomArrayGenerator, selectionSort } from './sortAlrorithms';

const defaultArraySize = 10;
const defaultMaxNumberValue = 10;
const numbersToJsx = array => array.map(number => <li key={uuidv4()}>{number}</li>);

export default () => {
  const [Numbers, setNumbers] = useState(randomArrayGenerator(defaultArraySize, defaultMaxNumberValue));

  return (
    <>
      <div>
        Array: <ul>{numbersToJsx(Numbers)}</ul>
      </div>
      <button
        onClick={() => {
          setNumbers(selectionSort(Numbers));
        }}
        type="button"
      >
        Click
      </button>
    </>
  );
};
