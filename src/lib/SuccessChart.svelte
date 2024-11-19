<script>
	import { Chart } from 'flowbite-svelte';

	let { landpads } = $props();

	// Calculate success_rate for each landpad
	let success_rate = landpads.map((landpad) => {
		const { successful_landings, attempted_landings } = landpad;
		return attempted_landings > 0
			? Math.round((successful_landings / attempted_landings) * 100)
			: 0;
	});

	let success_label = landpads.map((landpad) => {
		const { full_name } = landpad;
		return full_name;
	});
	console.log('success_rate', success_rate);
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
							// formatter: function () {
							// 	return success_rate.filter((rate) => rate > 0).length;
							// }
							formatter: function () {
								return success_rate?.length;
							}
						},
						value: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: -20,
							formatter: function (value) {
								return value + '%';
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
			show: false
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

<div size="md" class="rounded-md shadow-md overflow-hidden border border-[#E5E7EB]">
	<div class="flex justify-between items-center">
		<h5 class="text-xl p-8 font-bold leading-none text-gray-900 dark:text-white">
			Success Rate Chart
		</h5>
	</div>

	<div class="relative h-[355px] w-full">
		<Chart {options} class="py-6" />
	</div>
</div>
