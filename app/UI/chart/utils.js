/* eslint-disable prefer-destructuring */

export const animations = (chart, algorithm, array, speed = 200, baseColor, animationColor) => {
  const steps = algorithm(array);
  const { data, backgroundColor } = chart.data.datasets[0];

  if (steps[0].length <= 2) {
    for (let i = 0; i < steps.length; i++) {
      setTimeout(() => {
        backgroundColor[steps[i][0]] = 'red';
        backgroundColor[steps[i][1]] = 'red';
        setTimeout(() => {
          backgroundColor[steps[i][0]] = 'rgba(255, 99, 132, 0.2)';
          backgroundColor[steps[i][1]] = 'rgba(255, 99, 132, 0.2)';
        }, speed - speed / 4);
        [data[steps[i][0]], data[steps[i][1]]] = [data[steps[i][1]], data[steps[i][0]]];
        chart.update();
      }, (i + 1) * speed);
    }
    setTimeout(() => {
      backgroundColor[steps[steps.length - 1][0]] = 'rgba(255, 99, 132, 0.2)';
      backgroundColor[steps[steps.length - 1][1]] = 'rgba(255, 99, 132, 0.2)';
      chart.update();
    }, speed * steps.length + 200);
  } else {
    for (let i = 0; i < steps.length; i++) {
      setTimeout(() => {
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
        chart.update();
      }, (i + 1) * speed);
    }
    setTimeout(() => {
      backgroundColor[backgroundColor.length - 1] = 'rgba(255, 99, 132, 0.2)';
      chart.update();
    }, speed * steps.length + 200);
  }
};

export const graphData = data => {
  const baseColor = 'rgba(255, 99, 132, 0.2)';
  const baseBorderColor = 'rgba(255, 99, 132, 1)';
  return {
    type: 'bar',
    data: {
      labels: generateValues(data.length, ''),
      datasets: [
        {
          label: 'Number Value',
          data,
          backgroundColor: generateValues(data.length, baseColor),
          borderColor: generateValues(data.length, baseBorderColor),
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
};

function generateValues(limit, value) {
  const array = [];
  for (let i = 0; i < limit; i++) array.push(value);
  return array;
}
