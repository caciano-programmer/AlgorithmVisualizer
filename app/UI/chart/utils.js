export const step = (data, setData, pointer, steps, speed) => {
  const dataCopy = [...data];
  console.log(pointer)
  const [first, second] = steps[pointer];
  const id = setTimeout(() => {
    [dataCopy[first], dataCopy[second]] = [dataCopy[second], dataCopy[first]];
    setData(dataCopy);
  }, speed);
  return id;
};
