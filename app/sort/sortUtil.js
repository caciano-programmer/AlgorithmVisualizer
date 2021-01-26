// Animation duration in ms, scales with array size
export const maxSpeed = arraySize => Math.floor((10 / arraySize) * 350 + 20);
export const minSpeed = arraySize => maxSpeed(arraySize) * 6;

export const findAdjustedSpeed = (arrSize, newArrSize, speed) => {
  const percentage = speed / maxSpeed(arrSize);
  return Math.floor(maxSpeed(newArrSize) * percentage);
};

export function randomArrayGenerator(size, array) {
  return array === undefined ? random(size) : shuffle(array);
}

function random(size) {
  const nums = [];
  const numMax = size * 5;
  const numMin = size < 50 ? 0 : Math.floor(Math.cbrt(size));
  for (let i = 0; i < size; i++) nums.push(Math.ceil(Math.random() * numMax) + numMin);
  return nums;
}

function shuffle(array) {
  const result = [...array];
  result.forEach((_, index) => {
    const randomIndex = Math.floor(Math.random() * index);
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  });
  return result;
}
