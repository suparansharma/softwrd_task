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
		Badge,
		Label,
		Select
	} from 'flowbite-svelte';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline, LinkOutline } from 'flowbite-svelte-icons';
	import RectangleListIcon from '../elements/RectangleListIcon.svelte';
	import GridIcon from '../elements/GridIcon.svelte';
	import AdjustmentFilterIcon from '../elements/AdjustmentFilterIcon.svelte';

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
		defaultModal = true;
		landpadDetails = landpad?.details;
		landpadHeader = landpad?.full_name;
	};

	const getBadgeColor = (status) => {
		if (status === 'active') return 'green';
		if (status === 'retired') return 'red';
		if (status === 'under construction') return 'indigo';
		return 'dark'; // Default color if no match
	};

	let statusOptions = [
		{ value: '', name: 'All' },
		{ value: 'active', name: 'Active' },
		{ value: 'retired', name: 'Retired' },
		{ value: 'under construction', name: 'Under Construction' }
	];

	const filteredLandpads = () =>
		selectedStatus ? landpads.filter((landpad) => landpad.status === selectedStatus) : landpads;
</script>

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
					<AdjustmentFilterIcon/>
				</div>
				<Select
					class="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
					items={statusOptions}
					bind:value={selectedStatus}
					let:item
				>
					<option value={item.value}>{item.name}</option>
				</Select>
			</div>
		</div>
	</div>
</div>

<Table hoverable={true}>
	<TableHead>
		<TableHeadCell>Full Name</TableHeadCell>
		<TableHeadCell>Location Name</TableHeadCell>
		<TableHeadCell>Region</TableHeadCell>
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
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3"
					>{landpad.location.name}</TableBodyCell
				>
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3"
					>{landpad.location.region}</TableBodyCell
				>
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					<button onclick={() => handelDetailsModal(landpad)}>
						<Badge color="dark">View Details</Badge>
					</button>
				</TableBodyCell>

				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					{#if calculateSuccessRate(landpad.successful_landings, landpad.attempted_landings) !== 'N/A'}
						<Progressbar
							progress={calculateSuccessRate(
								landpad.successful_landings,
								landpad.attempted_landings
							)}
							progressClass="bg-[#31C48D] "
						/>
						<div class="mb-1 text-sm font-small text-gray-400 dark:text-gray-500">
							{Math.floor(
								calculateSuccessRate(landpad.successful_landings, landpad.attempted_landings)
							)}%
						</div>
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
						<LinkOutline class="w-6 h-6 ms-2 text-[#1C64F2]" />
					</a>
				</TableBodyCell>

				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 capitalize">
					<Badge color={getBadgeColor(landpad.status)}>{landpad.status}</Badge>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<Modal title={landpadHeader} bind:open={defaultModal} autoclose>
	<div class="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-5">
			{landpadDetails}
		</p>
	</div>
</Modal>

<style>
	/* Custom responsiveness */
	@media (max-width: 640px) {
		.table-cell {
			display: block;
			width: 100%;
			padding: 1rem 0;
		}
		.table-cell:not(:first-child) {
			margin-top: 1rem;
		}
		.table-row {
			display: block;
			margin-bottom: 1rem;
		}
		.table-cell-heading {
			font-weight: bold;
		}

		.flowbite-modal {
			max-width: 90%;
		}
	}

	@media (min-width: 641px) and (max-width: 1024px) {
		.table-cell {
			padding: 0.5rem;
		}

		.flowbite-modal {
			max-width: 80%;
		}
	}

	@media (min-width: 1025px) {
		.flowbite-modal {
			max-width: 60%;
		}
	}
</style>
