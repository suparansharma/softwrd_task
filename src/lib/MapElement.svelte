<script>
	import { defaults as defaultControls } from 'ol/control';
	import TileLayer from 'ol/layer/Tile';
	import Map from 'ol/Map';
	import OSM from 'ol/source/OSM';
	import View from 'ol/View';
	import { onMount } from 'svelte';
	import Marker from './../lib/marker.svelte';

	let { landpads } = $props();
	let map = $state({});

	onMount(async () => {
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 0
			}),

			controls: defaultControls({ zoom: false })
		});
	});
</script>

{#each landpads as landpad}
	<Marker {landpad} {map} />
{/each}
<div size="md" class="mb-4 rounded-md shadow-md overflow-hidden border border-[#E5E7EB]">
	<div class="flex justify-between items-center">
		<h5 class="text-xl p-8 font-bold leading-none text-gray-900 dark:text-white">Map View</h5>
	</div>
	<div class="relative h-[355px] w-full">
		<div id="map" class="!w-full"></div>
	</div>
	
</div>


