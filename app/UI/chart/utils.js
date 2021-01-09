/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */

import { STATES } from '../../sort/AppConstants';

export const animations = (chart, updateChart, stepsFunc, speed, setState) => {
  const steps = stepsFunc();
  const { data, backgroundColor } = chart.data.datasets[0];

  return steps[0].length === 2
    ? showAnimations(updateChart, steps, backgroundColor, speed, data, setState)
    : showAnimationsMergeSort(updateChart, steps, backgroundColor, speed, data, setState);
};

function showAnimations(updateChart, steps, backgroundColor, speed, data, setState) {
  const ids = [];
  for (let i = 0; i < steps.length; i++) {
    const idNext = setTimeout(() => {
      const progress = Math.ceil((i / steps.length) * 100);
      backgroundColor[steps[i][0]] = 'red';
      backgroundColor[steps[i][1]] = 'red';
      updateChart([...data], [...backgroundColor], progress);
      setTimeout(() => {
        backgroundColor[steps[i][0]] = 'rgba(255, 99, 132, 0.2)';
        backgroundColor[steps[i][1]] = 'rgba(255, 99, 132, 0.2)';
        updateChart([...data], [...backgroundColor], progress);
      }, speed - speed / 4);
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
        setTimeout(() => {
          for (let m = steps[i][0]; m <= steps[i][1]; m++) backgroundColor[m] = 'rgba(255, 99, 132, 0.2)';
          for (let n = steps[i][2]; n <= steps[i][3]; n++) backgroundColor[n] = 'rgba(255, 99, 132, 0.2)';
        }, speed - speed / 4);
      } else {
        backgroundColor[steps[i][0]] = 'red';
        data[steps[i][0]] = steps[i][1];
        setTimeout(() => {
          backgroundColor[steps[i][0]] = 'rgba(255, 99, 132, 0.2)';
        }, speed - speed / 4);
      }
      updateChart([...data], [...backgroundColor], Math.ceil((i / steps.length) * 100));
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
