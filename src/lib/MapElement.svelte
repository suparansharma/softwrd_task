<script>
	import { onMount } from 'svelte';
	import { defaults as defaultControls } from 'ol/control';
	import TileLayer from 'ol/layer/Tile';
	import Map from 'ol/Map';
	import OSM from 'ol/source/OSM';
	import View from 'ol/View';
	import Marker from './../lib/marker.svelte';
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
				zoom: 2
			}),

			controls: defaultControls({ zoom: false })
		});
	});
</script>

{#each landpads as landpad}
	<Marker {landpad} {map} />
{/each}

<div id="map"></div>

<style>
	#map {
		@apply h-[355px] w-[555px];
	}
</style>
