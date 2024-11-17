<script>
    import { Chart, Card, A, Button, Dropdown, DropdownItem, Popover, Tooltip } from 'flowbite-svelte';
    import { InfoCircleSolid, ArrowDownToBracketOutline, ChevronDownOutline, ChevronRightOutline, PenSolid, DownloadSolid, ShareNodesSolid } from 'flowbite-svelte-icons';
    
    let { landpads } = $props();  // Assuming this is coming as props
    console.log("landpads", landpads);

    // Aggregate landing data
    const landingData = landpads.map(pad => ({
      fullName: pad.full_name,
      attempted: pad.attempted_landings,
      successful: pad.successful_landings
    }));

    const successfulLandings = landingData.map(pad => pad.successful);
    const attemptedLandings = landingData.map(pad => pad.attempted);
    const labels = landingData.map(pad => pad.fullName);
    
    const options = {
      series: successfulLandings,  
      colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'],  
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
                show: false,
                fontFamily: 'Inter, sans-serif',
                offsetY: 20
              },
              total: {
                showAlways: true,
                show: true,
                label: 'Total Successful Landings',
                fontFamily: 'Inter, sans-serif',
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  return `${sum} Landings`;
                }
              },
              value: {
                show: true,
                fontFamily: 'Inter, sans-serif',
                offsetY: -20,
                formatter: function (value) {
                  return value + ' Landings';
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
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif'
      },
      labels: labels,  // Dynamically setting labels
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + ' Landings';
          }
        }
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + ' Landings';
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

<Card>
    <div class="flex justify-between items-start w-full">
        <div class="flex-col items-center">
            <div class="flex items-center mb-1">
                <h5 class="text-xl">Landing Zone Statistics</h5>
            </div>
            <Chart options={options} series={options.series} type="donut" height="320" />
        </div>
    </div>
</Card>
