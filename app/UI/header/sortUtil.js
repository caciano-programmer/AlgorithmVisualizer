import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';

export function getAlgorithm(name) {
  switch (name) {
    case SORT_ALGORITHMS.BUBBLE_SORT.name:
      return SORT_ALGORITHMS.BUBBLE_SORT;
    case SORT_ALGORITHMS.HEAP_SORT.name:
      return SORT_ALGORITHMS.HEAP_SORT;
    case SORT_ALGORITHMS.INSERTION_SORT.name:
      return SORT_ALGORITHMS.INSERTION_SORT;
    case SORT_ALGORITHMS.MERGE_SORT.name:
      return SORT_ALGORITHMS.MERGE_SORT;
    case SORT_ALGORITHMS.QUICK_SORT.name:
      return SORT_ALGORITHMS.QUICK_SORT;
    case SORT_ALGORITHMS.SELECTION_SORT.name:
      return SORT_ALGORITHMS.SELECTION_SORT;
    default:
      throw new Error('No valid algorithm name given.');
  }
}

export function isValidNumbers(input) {
  let valid = true;
  const stripped = input.replaceAll(',', ' ').trim();
  if (stripped.length === 0) return { valid, validNums: [] };
  const validNums = stripped
    .split(/\s+/)
    .filter(el => {
      const validEl = /^[1-9][0-9]*$/g.test(el) && +el <= 100;
      if (!validEl) valid = false;
      return validEl;
    })
    .map(el => +el);
  return { valid, validNums: valid ? validNums : [] };
}
