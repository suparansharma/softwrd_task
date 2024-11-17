<script>
	import MapElement from '$lib/MapElement.svelte';
	import SuccessChart from '$lib/SuccessChart.svelte';
	import TableElement from '$lib/TableElement.svelte';
	import { onMount } from 'svelte';
	let error = null;
	let landpads = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			const response = await fetch('https://api.spacexdata.com/v3/landpads');
			if (!response.ok) {
				throw new Error('Failed to fetch landpads data');
			}
			landpads = await response.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});
</script>

<div class="w-full pt-10 pb-10 text-center border-b-4 item-center mb-10">
	<img
		class="h-[50px] mx-auto"
		src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/SpaceX_Logo_Black.png/797px-SpaceX_Logo_Black.png"
		alt=""
		srcset=""
	/>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
	<div class="col-span-1 lg:col-span-2 border-r pr-4">
		<TableElement {landpads} />
	</div>

	<div class="col-span-1 pl-4">
		<MapElement {landpads} />
		<!-- <SuccessChart {landpads} /> -->
		{#if !loading }
			<SuccessChart {landpads} />
		{/if}
	</div>

	
</div>
