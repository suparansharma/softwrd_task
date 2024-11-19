<script>
	import { Spinner } from 'flowbite-svelte';
	import MapElement from '$lib/MapElement.svelte';
	import SuccessChart from '$lib/SuccessChart.svelte';
	import TableElement from '$lib/TableElement.svelte';
	import Header from '../components/Header.svelte';
	import RectangleListIcon from '../elements/RectangleListIcon.svelte';
	import AdjustmentFilterIcon from '../elements/AdjustmentFilterIcon.svelte';
	import GridIcon from '../elements/GridIcon.svelte';
	import { onMount } from 'svelte';
	import { fetchLandpads } from '../utils/api';

	let error = null;
	let landpads = [];
	let loading = true;
	let loadingSecondary = true;
	let selectedStatus = '';

	let statusOptions = [
		{ value: '', name: 'All' },
		{ value: 'active', name: 'Active' },
		{ value: 'retired', name: 'Retired' },
		{ value: 'under construction', name: 'Under Construction' }
	];

	const filteredLandpads = () =>
		selectedStatus ? landpads.filter((landpad) => landpad.status === selectedStatus) : landpads;

	onMount(async () => {
		try {
			landpads = await fetchLandpads();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
			setTimeout(() => (loadingSecondary = false), 1000);
		}
	});
</script>

<Header />

<div class="grid grid-cols-1 gap-6 py-4 px-10 lg:grid-cols-3">
	<!-- First Section: Landpads Table -->
	<div class="col-span-1 lg:col-span-2 border-r pr-4 pl-5">
		{#if loading}
			<div class="flex justify-center items-center h-screen">
				<Spinner color="green" class="w-20 h-20" />
			</div>
		{:else if error}
			<div class="text-red-500 text-center">{error}</div>
		{:else}
			<div class="w-full pt-5 pb-5 text-center mb-10">
				<div class="relative flex flex-col md:flex-row items-center justify-between">
					<div class="flex space-x-1 border rounded p-1 mb-4 md:mb-0">
						<div class="pr-2 border-r border-gray-300">
							<RectangleListIcon />
						</div>
						<GridIcon />
					</div>

					<!-- Right Side Label -->
					<div>
						<div class="relative flex items-center">
							<div class="absolute inset-y-0 left-0 flex items-center pl-3">
								<AdjustmentFilterIcon />
							</div>
							<select
								class="w-full px-10 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
								bind:value={selectedStatus}
							>
								{#each statusOptions as item}
									<option value={item.value}>{item.name}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
			</div>
			<TableElement landpads={filteredLandpads()} />
		{/if}
	</div>

	<!-- Second Section: Map and Success Chart -->
	<div class="col-span-1 pl-5 lg:pl-0">
		{#if loadingSecondary}
			<div class="flex justify-center items-center h-screen">
				<Spinner color="blue" class="w-16 h-16" />
			</div>
		{:else}
			<div>
				<MapElement landpads={filteredLandpads()} />
				<SuccessChart landpads={filteredLandpads()} />
			</div>
		{/if}
	</div>
</div>
