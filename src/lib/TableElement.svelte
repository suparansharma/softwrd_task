<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Modal,
		Progressbar,
		Badge
	} from 'flowbite-svelte';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline, LinkOutline } from 'flowbite-svelte-icons';

	let { landpads } = $props();

	let defaultModal = $state(false);
	let landpadDetails = $state('');
	let selectedStatus = $state('');
	let landpadHeader = $state('');

	// Helper function to calculate the success rate
	const calculateSuccessRate = (successful, attempted) => {
		return attempted > 0 ? ((successful / attempted) * 100).toFixed(2) : 'N/A';
	};

	const handelDetailsModal = (landpad) => {
		console.log("landpad",landpad)
		defaultModal = true;
		landpadDetails = landpad?.details;
	};

	const getBadgeColor = (status) => {
		if (status === 'active') return 'green';
		if (status === 'retired') return 'red';
		if (status === 'under construction') return 'indigo';
		return 'dark'; // Default color if no match
	};

	const filteredLandpads = () =>
		selectedStatus ? landpads.filter((landpad) => landpad.status === selectedStatus) : landpads;
</script>

<Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
	Dropdown button
	<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
</Button>

<Dropdown>
	<DropdownItem on:click={() => (selectedStatus = '')}>All</DropdownItem>
	<DropdownItem on:click={() => (selectedStatus = 'active')}>Active</DropdownItem>
	<DropdownItem on:click={() => (selectedStatus = 'retired')}>Retired</DropdownItem>
	<DropdownItem on:click={() => (selectedStatus = 'under construction')}>
		Under Construction
	</DropdownItem>
</Dropdown>

<Table hoverable={true}>
	<TableHead>
		<TableHeadCell>Full Name</TableHeadCell>
		<TableHeadCell>Location Name</TableHeadCell>
		<TableHeadCell>Details</TableHeadCell>
		<TableHeadCell>Success Rate (%)</TableHeadCell>
		<TableHeadCell>Wikipedia Link</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredLandpads() as landpad}
			<TableBodyRow class="hover:bg-gray-100">
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3"
					>{landpad.full_name}</TableBodyCell
				>
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					{landpad.location.name}, {landpad.location.region}
				</TableBodyCell>
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					<button onclick={() => handelDetailsModal(landpad)}><Badge color="dark"> View Details</Badge></button>
				</TableBodyCell>
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					{#if calculateSuccessRate(landpad.successful_landings, landpad.attempted_landings) !== 'N/A'}
						<!-- <div class="my-4"> -->
							<Progressbar
								progress={calculateSuccessRate(
									landpad.successful_landings,
									landpad.attempted_landings
								)}
								progressClass="bg-[#31C48D] "
							/>
							<div class="mb-1 text-base font-medium dark:text-white">
								{calculateSuccessRate(landpad.successful_landings, landpad.attempted_landings)}%
							</div>
						<!-- </div> -->
					{:else}
						<div class="text-base font-medium dark:text-white">N/A</div>
					{/if}
				</TableBodyCell>

				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					<a
						href={landpad.wikipedia}
						class="font-medium text-primary-600 hover:underline dark:text-primary-500"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkOutline class="w-6 h-6 ms-2 text-[#1C64F2] " />
					</a>
				</TableBodyCell>
				
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 capitalize">
					<Badge color={getBadgeColor(landpad.status)}>{landpad.status}</Badge>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-5">
		{landpadDetails}
	</p>
</Modal>
