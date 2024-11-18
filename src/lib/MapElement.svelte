<script>
	import { onMount } from 'svelte';
	import { defaults as defaultControls } from 'ol/control';
	import TileLayer from 'ol/layer/Tile';
	import Map from 'ol/Map';
	import OSM from 'ol/source/OSM';
	import View from 'ol/View';
	import Marker from './../lib/marker.svelte';
	import { Card } from 'flowbite-svelte';

	let { landpads } = $props();
	let map;

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
<Card  size="md" class="mb-4">
	<div class="flex justify-between items-center mb-5">
		<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Map View</h5>
	</div>
	<div class="relative h-[355px] w-full overflow-hidden rounded-md border border-gray-200">
		<div id="map" class="absolute inset-0"></div>
	</div>
	<!-- <div id="map"></div> -->
</Card>

<style>
	#map {
		@apply h-[355px] w-[555px];
	}
</style>
