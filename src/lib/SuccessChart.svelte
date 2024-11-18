<script>
  import { Chart, Card } from 'flowbite-svelte';

  let { landpads } = $props(); // Assuming this is coming as props
  
  // Calculate success_rate for each landpad
  let success_rate = landpads.map(landpad => {
      const { successful_landings, attempted_landings } = landpad;
      return attempted_landings > 0 
          ? Math.round((successful_landings / attempted_landings) * 100) 
          : 0; 
  });

  let success_label = landpads.map(landpad => {
      const { full_name } = landpad;
      return full_name; 
  });

  const options = {
    series: success_rate, 
    colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694', '#A78BFA', '#34D399', '#FB923C'],
    chart: {
      height: 320,
      width: '100%',
      type: 'donut'
    },
    stroke: {
      colors: ['transparent'],
      lineCap: ''
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: 20
            },
            total: {
              showAlways: true,
              show: true,
              label: 'Landing Pads',
              fontFamily: 'Inter, sans-serif',
              formatter: function () {
                return success_rate.length; // Show the count of elements
              }
            },
            value: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: -20,
              formatter: function (value) {
                return value + '%'; // Display percentage
              }
            }
          },
          size: '80%'
        }
      }
    },
    grid: {
      padding: {
        top: -2
      }
    },
    labels: success_label, 
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false // Hides the legend
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      }
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    }
  };
</script>

<Card size="md">
  <div class="flex justify-between items-start w-full">
    <div class="flex-col items-center">
      <div class="flex items-center mb-1">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Success Rate Chart</h5>
      </div>
    </div>
  </div>

  <Chart {options} class="py-6" />
</Card>
