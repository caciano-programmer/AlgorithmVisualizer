/* eslint-disable no-param-reassign */

export const step = (data, setData, pointer, steps, speed, limit) => {
  const dataCopy = [...data];
  const id = setInterval(() => {
    const [first, second] = steps[pointer++];
    [dataCopy[first], dataCopy[second]] = [dataCopy[second], dataCopy[first]];
    setData(dataCopy);
    if (--limit === 0) clearInterval(id);
  }, speed);
  return id;
};

export const mergeStep = (data, setData, pointer, steps, speed, limit, isPrevious) => {
  const dataCopy = [...data];
  const id = setInterval(() => {
    if (steps[pointer].length === 3) {
      const [index, value, previous] = steps[pointer];
      dataCopy[index] = isPrevious ? previous : value;
    }
    pointer++;
    setData(dataCopy);
    if (--limit === 0) clearInterval(id);
  }, speed);
  return id;
};

export const getIntervals = num => {
  const intervals = [0];
  let interval;
  if (num / 5 >= 10) interval = Math.floor(num / 5 / 10) * 10;
  else if (num >= 5) interval = Math.floor(num / 5);
  else interval = num / 5;
  for (let i = interval; i < num + interval; i += interval) intervals.push(+i.toFixed(1));
  return intervals;
};

export const getTickHeight = () => {
  const topTick = document.getElementById('topTick').getBoundingClientRect();
  const bottomTick = document.getElementById('bottomTick').getBoundingClientRect();
  return bottomTick.top - topTick.top;
};

export function indexInsideStep(stepArray, index,) {
  if (stepArray === undefined) return false;
  if (stepArray.length === 3) return index === stepArray[0];
  if (stepArray.length === 4) return index >= stepArray[0] && index <= stepArray[3];
  return stepArray.includes(index);
}

export function getBarValue(stepArr, data, index, isPrevious, current) {
  if (stepArr.length === 2) return index === stepArr[0] ? data[stepArr[1]] : data[stepArr[0]];
  if (stepArr.length === 3) return isPrevious ? stepArr[2] : stepArr[1];
  return current;
}
