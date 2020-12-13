/* eslint-disable no-param-reassign */

export const SORT_ALGORITHMS = {
  SELECTION_SORT: { name: 'Selection Sort', func: selectionSort },
  INSERTION_SORT: { name: 'Insertion Sort', func: insertionSort },
  BUBBLE_SORT: { name: 'Bubble Sort', func: bubbleSort },
  MERGE_SORT: { name: 'Merge Sort', func: mergeSort },
  HEAP_SORT: { name: 'Heap Sort', func: heapSort },
  QUICK_SORT: { name: 'Quick Sort', func: quickSort },
};

export const randomArrayGenerator = size => {
  const nums = [];
  const numMax = size * 5;
  const numMin = size < 50 ? 0 : Math.floor(Math.cbrt(size));
  for (let i = 0; i < size; i++) nums.push(Math.ceil(Math.random() * numMax) + numMin);
  return nums;
};

// ============================= Sort Functions =============================

function selectionSort(array) {
  const nums = [...array];
  const steps = [];
  for (let i = 0; i < nums.length; i++) {
    let min = i;
    for (let j = i; j < nums.length; j++) if (nums[j] < nums[min]) min = j;
    swap(nums, min, i, steps);
  }
  return steps;
}

function bubbleSort(array) {
  const nums = [...array];
  const steps = [];
  for (let i = 1; i < nums.length; i++)
    for (let j = 1; j < nums.length; j++) if (nums[j] < nums[j - 1]) swap(nums, j, j - 1, steps);
  return steps;
}

function insertionSort(array) {
  const nums = [...array];
  const steps = [];
  for (let i = 1; i < nums.length; i++)
    for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) swap(nums, j - 1, j, steps);
  return steps;
}

function quickSort(numbers) {
  const array = [...numbers];
  const steps = [];
  const sort = (nums, lower, limit) => {
    if (lower < limit) {
      const pivotIndex = partition(nums, lower, limit, steps);
      sort(nums, lower, pivotIndex - 1);
      sort(nums, pivotIndex + 1, limit);
    }
  };
  sort(array, 0, array.length - 1);
  return steps;
}

function mergeSort(numbers) {
  const array = [...numbers];
  const steps = [];
  const sort = (start, end) => {
    if (start === end) return;
    const middle = Math.floor((end - start) / 2) + start;
    sort(start, middle);
    sort(middle + 1, end);
    merge(array, start, middle, end, steps);
  };
  sort(0, array.length - 1);
  return steps;
}

function heapSort(numbers) {
  const array = [...numbers];
  const steps = [];
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) heapify(array, i, numbers.length - 1, steps);
  for (let limit = array.length - 1; limit > 0; ) {
    swap(array, 0, limit--, steps);
    heapify(array, 0, limit, steps);
  }
  return steps;
}

// ============================= Sort Helper Functions =============================

function swap(array, l, r, steps) {
  if (array.length < 2 || l === r) return;
  if (steps !== undefined) steps.push([l, r]);
  [array[l], array[r]] = [array[r], array[l]];
}

function partition(nums, lower = 0, limit = nums.length - 1, steps) {
  const pivot = nums[limit];
  let upper = limit - 1;
  while (upper > lower) {
    while (nums[lower] < pivot) lower++;
    while (nums[upper] >= pivot) upper--;
    if (lower < upper) swap(nums, lower, upper, steps);
  }
  if (nums[lower] > pivot) swap(nums, lower, limit, steps);
  return lower;
}

function merge(array, start, middle, end, steps) {
  let result = [];
  steps.push([start, middle, middle + 1, end]);
  let [p1, p2] = [start, middle + 1];
  while (p1 <= middle && p2 <= end) {
    while (array[p1] <= array[p2] && p1 <= middle) result.push(array[p1++]);
    while (array[p2] <= array[p1] && p2 <= end) result.push(array[p2++]);
  }
  result = [...result, ...array.slice(p1, middle + 1), ...array.slice(p2, end + 1)];
  for (let i = start, j = 0; i <= end; i++, j++) {
    array[i] = result[j];
    steps.push([i, result[j]]);
  }
}

function heapify(array, index, limit = array.length - 1, steps) {
  let largest = index;
  const left = index * 2 + 1;
  const right = left + 1;
  if (left <= limit && array[left] > array[largest]) largest = left;
  if (right <= limit && array[right] > array[largest]) largest = right;
  if (largest !== index) {
    swap(array, index, largest, steps);
    heapify(array, largest, limit, steps);
  }
}
