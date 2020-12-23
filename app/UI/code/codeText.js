import React from 'react';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import lightStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/atelier-heath-light';
import darkStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/an-old-hope';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  code: {
    textAlign: 'start',
    fontSize: '2.25vw',
    '@media only screen and (min-width: 768px)': {
      fontSize: '1.25vw',
    },
  },
}));

export const CodeText = ({ theme }) => {
  SyntaxHighlighter.registerLanguage('javascript', js);
  const classes = useStyles();
  return (
    <SyntaxHighlighter
      language="javascript"
      style={theme === 'light' ? lightStyle : darkStyle}
      codeTagProps={{ className: classes.code }}
      showLineNumbers
    >
      {code()}
    </SyntaxHighlighter>
  );
};

function code() {
  return `
  // ============================= Sort Functions =============================

  function selectionSort(array) {
    const nums = [...array];
    for (let i = 0; i < nums.length; i++) {
      let min = i;
      for (let j = i; j < nums.length; j++) if (nums[j] < nums[min]) min = j;
      swap(nums, min, i);
    }
    return nums;
  }
  
  function bubbleSort(array) {
    const nums = [...array];
    for (let i = 1; i < nums.length; i++)
      for (let j = 1; j < nums.length; j++) if (nums[j] < nums[j - 1]) swap(nums, j, j - 1);
    return nums;
  }
  
  function insertionSort(array) {
    const nums = [...array];
    for (let i = 1; i < nums.length; i++) for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) swap(nums, j - 1, j);
    return nums;
  }
  
  function quickSort(numbers) {
    const array = [...numbers];
    const sort = (nums, lower, limit) => {
      if (lower < limit) {
        const pivotIndex = partition(nums, lower, limit);
        sort(nums, lower, pivotIndex - 1);
        sort(nums, pivotIndex + 1, limit);
      }
    };
    sort(array, 0, array.length - 1);
    return array;
  }
  
  function mergeSort(numbers) {
    const array = [...numbers];
    const sort = (start, end) => {
      if (start === end) return;
      const middle = Math.floor((end - start) / 2) + start;
      sort(start, middle);
      sort(middle + 1, end);
      merge(array, start, middle, end);
    };
    sort(0, array.length - 1);
    return array;
  }
  
  function heapSort(numbers) {
    const array = [...numbers];
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) heapify(array, i, numbers.length - 1);
    for (let limit = array.length - 1; limit > 0; ) {
      swap(array, 0, limit--);
      heapify(array, 0, limit);
    }
    return array;
  }
  
  // ============================= Sort Helper Functions =============================
  
  function swap(array, l, r) {
    if (array.length < 2 || l === r) return;
    [array[l], array[r]] = [array[r], array[l]];
  }
  
  function partition(nums, lower = 0, limit = nums.length - 1) {
    const pivot = nums[limit];
    let upper = limit - 1;
    while (upper > lower) {
      while (nums[lower] < pivot) lower++;
      while (nums[upper] >= pivot) upper--;
      if (lower < upper) swap(nums, lower, upper);
    }
    if (nums[lower] > pivot) swap(nums, lower, limit);
    return lower;
  }
  
  function merge(array, start, middle, end) {
    let result = [];
    let [p1, p2] = [start, middle + 1];
    while (p1 <= middle && p2 <= end) {
      while (array[p1] <= array[p2] && p1 <= middle) result.push(array[p1++]);
      while (array[p2] <= array[p1] && p2 <= end) result.push(array[p2++]);
    }
    result = [...result, ...array.slice(p1, middle + 1), ...array.slice(p2, end + 1)];
    for (let i = start, j = 0; i <= end; i++, j++) array[i] = result[j];
  }
  
  function heapify(array, index, limit = array.length - 1) {
    let largest = index;
    const left = index * 2 + 1;
    const right = left + 1;
    if (left <= limit && array[left] > array[largest]) largest = left;
    if (right <= limit && array[right] > array[largest]) largest = right;
    if (largest !== index) {
      swap(array, index, largest);
      heapify(array, largest, limit);
    }
  }
  `;
}
