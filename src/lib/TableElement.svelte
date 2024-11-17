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
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	let { landpads } = $props();

	let defaultModal = $state(false);
	let landpadDetails = $state('');
	let selectedStatus = $state('');

	// Helper function to calculate the success rate
	const calculateSuccessRate = (successful, attempted) => {
		return attempted > 0 ? ((successful / attempted) * 100).toFixed(2) : 'N/A';
	};

	const handelDetailsModal = (landpad) => {
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
		<TableHeadCell>Success Rate (%)</TableHeadCell>
		<TableHeadCell>Wikipedia Link</TableHeadCell>
		<TableHeadCell>Details</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredLandpads() as landpad}
			<TableBodyRow>
				<TableBodyCell>{landpad.full_name}</TableBodyCell>
				<TableBodyCell>
					{landpad.location.name}, {landpad.location.region}
				</TableBodyCell>
				<TableBodyCell>
					<div class="my-4">
						<Progressbar
							progress={calculateSuccessRate(
								landpad.successful_landings,
								landpad.attempted_landings
							)}
							color="green"
						/>
						<div class="mb-1 text-base font-medium dark:text-white">
							{calculateSuccessRate(landpad.successful_landings, landpad.attempted_landings)}%
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell>
					<a
						href={landpad.wikipedia}
						class="font-medium text-primary-600 hover:underline dark:text-primary-500"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn More
					</a>
				</TableBodyCell>
				<TableBodyCell>
					<button on:click={() => handelDetailsModal(landpad)}>Details</button>
				</TableBodyCell>
				<TableBodyCell class="capitalize">
					<Badge color={getBadgeColor(landpad.status)}>{landpad.status}</Badge>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{landpadDetails}
	</p>

	<svelte:fragment slot="footer">
		<Button on:click={() => alert('Handle "success"')}>I accept</Button>
		<Button color="alternative">Decline</Button>
	</svelte:fragment>
</Modal>
