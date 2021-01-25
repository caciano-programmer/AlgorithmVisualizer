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
  const interval = num / 5 >= 10 ? Math.floor(num / 5 / 10) * 10 : Math.floor(num / 5);
  for (let i = interval; i < num + interval; i += interval) intervals.push(i);
  return intervals;
};

export const getTickHeight = () => {
  const topTick = document.getElementById('topTick').getBoundingClientRect();
  const bottomTick = document.getElementById('bottomTick').getBoundingClientRect();
  return bottomTick.top - topTick.top;
};
