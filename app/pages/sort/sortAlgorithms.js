/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

// Used to generate an array with custom size and custom max number limit
export const randomArrayGenerator = (size, numMax) => {
  const nums = [];
  for (let i = 0; i < size; i++) nums.push(Math.ceil(Math.random() * numMax));
  return nums;
};

// ============================= Sort Functions =============================

export const selectionSort = array => {
  const nums = [...array];
  for (let i = 0; i < nums.length; i++) {
    let min = i;
    for (let j = i; j < nums.length; j++) if (nums[j] < nums[min]) min = j;
    swap(nums, min, i);
  }
  return nums;
};

export const bubbleSort = array => {
  const nums = [...array];
  for (let i = 0; i < nums.length - 1; i++)
    for (let j = 0; j < nums.length - 1; j++) if (nums[j] > nums[j - 1]) swap(nums, j, j + 1);
  return nums;
};

export const insertionSort = array => {
  const nums = [...array];
  for (let i = 1; i < nums.length; i++) for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) swap(nums, j - 1, j);
  return nums;
};

export const quicksort = numbers => {
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
};

export const mergesort = numbers => {
  if (numbers.length <= 1) return numbers;
  const middle = Math.floor(numbers.length / 2);
  const left = mergesort(numbers.slice(0, middle));
  const right = mergesort(numbers.slice(middle));
  return merge(left, right);
};

export const heapsort = numbers => {
  const array = [...numbers];
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) heapify(array, i);
  for (let limit = array.length - 1; limit > 0; ) {
    swap(array, 0, limit--);
    heapify(array, 0, limit);
  }
  return array;
};

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

function merge(left, right) {
  const result = [];
  let [p1, p2] = [0, 0];
  for (; p1 < left.length && p2 < right.length; ) {
    while (left[p1] <= right[p2]) result.push(left[p1++]);
    while (right[p2] <= left[p1]) result.push(right[p2++]);
  }
  return [...result, ...left.slice(p1), ...right.slice(p2)];
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
