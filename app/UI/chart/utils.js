/* eslint-disable no-param-reassign */

export const step = (data, setData, pointer, steps, speed, limit = 1) => {
  const dataCopy = [...data];
  const id = setInterval(() => {
    const [first, second] = steps[pointer++];
    [dataCopy[first], dataCopy[second]] = [dataCopy[second], dataCopy[first]];
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
