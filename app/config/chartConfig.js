const baseColor = 'rgba(255, 99, 132, 0.2)';
const baseBorderColor = 'rgba(255, 99, 132, 1)';

export const graphData = (data, background = generateValues(data.length, baseColor)) => ({
  labels: generateValues(data.length, ''),
  datasets: [
    {
      label: 'Number Value',
      data,
      backgroundColor: background,
      borderColor: generateValues(data.length, baseBorderColor),
      borderWidth: 1,
    },
  ],
});

export const options = {
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
};

export function generateValues(limit, value) {
  const array = [];
  for (let i = 0; i < limit; i++) array.push(value);
  return array;
}
