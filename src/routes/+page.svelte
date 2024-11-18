<script>
	import { Spinner } from 'flowbite-svelte';
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

<div class="w-full pt-5 pb-3 text-center border-b-4 item-center mb-10">
	<img
		class="h-[40px] mx-auto"
		src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/SpaceX_Logo_Black.png/797px-SpaceX_Logo_Black.png"
		alt=""
		srcset=""
	/>
</div>

<div class="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3">
	<!-- First Section: Landpads Table -->
	<div class="col-span-1 lg:col-span-2 border-r pr-4 pl-5">
		{#if loading}
			<Spinner color="green" class="mx-auto w-16 h-16 justify-center items-center" />
		{:else}
			<TableElement {landpads} />
		{/if}
	</div>

	<!-- Second Section: Map and Success Chart -->
	<div class="col-span-1 pl-4 lg:pl-0">
		<MapElement {landpads} />
		{#if !loading}
			<SuccessChart {landpads} />
		{/if}
	</div>
</div>
