generateChart();

async function generateChart() {
  const data = await getData();
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data['xs'],
      datasets: [
        {
          label:
            'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
          data: data['ys'],
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function(value, index, values) {
                return value + '°';
              }
            }
          }
        ]
      }
    }
  });
}

async function getData() {
  const xs = [];
  const ys = [];

  const res = await fetch('GLB.Ts+dSST.csv');
  const data = await res.text();

  const table = data.split('\n').slice(2);

  table.forEach(elt => {
    const columns = elt.split(',');

    const year = columns[0];
    xs.push(year);

    const temp = columns[1];
    ys.push(Number(temp) + 14);
  });

  return { xs, ys };
}
