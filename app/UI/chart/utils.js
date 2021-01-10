/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */

import { STATES } from '../../sort/AppConstants';

export const animations = (chart, updateChart, steps, speed, setState, isMergeSort) => {
  const data = [...chart.data.datasets[0].data];
  const backgroundColor = [...chart.data.datasets[0].backgroundColor];

  return isMergeSort
    ? showAnimationsMergeSort(updateChart, steps, backgroundColor, speed, data, setState)
    : showAnimations(updateChart, steps, backgroundColor, speed, data, setState);
};

const progress = limit => (1 / limit) * 100;

function showAnimations(updateChart, steps, backgroundColor, speed, data, setState) {
  const ids = [];
  for (let i = 0; i < steps.length; i++) {
    const idNext = setTimeout(() => {
      backgroundColor[steps[i][0]] = 'red';
      backgroundColor[steps[i][1]] = 'red';
      updateChart([...data], [...backgroundColor], 0);
      const nextInner = setTimeout(() => {
        backgroundColor[steps[i][0]] = 'rgba(255, 99, 132, 0.2)';
        backgroundColor[steps[i][1]] = 'rgba(255, 99, 132, 0.2)';
        updateChart([...data], [...backgroundColor], progress(steps.length), steps.slice(i + 1));
        ids.push(nextInner);
      }, speed - speed / 8);
      [data[steps[i][0]], data[steps[i][1]]] = [data[steps[i][1]], data[steps[i][0]]];
    }, (i + 1) * speed);
    ids.push(idNext);
  }
  const idFinal = setTimeout(() => {
    updateChart([...data], [...backgroundColor], 100);
    setState(STATES.STOP);
  }, speed * (steps.length + 1) + 100);
  ids.push(idFinal);
  return ids;
}

function showAnimationsMergeSort(updateChart, steps, backgroundColor, speed, data, setState) {
  const ids = [];
  for (let i = 0; i < steps.length; i++) {
    const idNext = setTimeout(() => {
      if (steps[i].length > 2) {
        for (let m = steps[i][0]; m <= steps[i][1]; m++) backgroundColor[m] = 'red';
        for (let n = steps[i][2]; n <= steps[i][3]; n++) backgroundColor[n] = 'red';
        const nextInner = setTimeout(() => {
          for (let m = steps[i][0]; m <= steps[i][1]; m++) backgroundColor[m] = 'rgba(255, 99, 132, 0.2)';
          for (let n = steps[i][2]; n <= steps[i][3]; n++) backgroundColor[n] = 'rgba(255, 99, 132, 0.2)';
        }, speed - speed / 8);
        ids.push(nextInner);
      } else {
        backgroundColor[steps[i][0]] = 'red';
        data[steps[i][0]] = steps[i][1];
        const nextInner = setTimeout(() => {
          backgroundColor[steps[i][0]] = 'rgba(255, 99, 132, 0.2)';
        }, speed - speed / 8);
        ids.push(nextInner);
      }
      updateChart([...data], [...backgroundColor], progress(steps.length), steps.slice(i));
    }, (i + 1) * speed);
    ids.push(idNext);
  }
  const idFinal = setTimeout(() => {
    backgroundColor[backgroundColor.length - 1] = 'rgba(255, 99, 132, 0.2)';
    updateChart([...data], [...backgroundColor], 100);
    setState(STATES.STOP);
  }, speed * (steps.length + 1) + 100);
  ids.push(idFinal);
  return ids;
}
