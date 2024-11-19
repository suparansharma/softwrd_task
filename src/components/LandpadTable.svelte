<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Badge,
		Progressbar
	} from 'flowbite-svelte';
	import { LinkOutline } from 'flowbite-svelte-icons';

	export let landpads = [];
	export let onDetailsClick = () => {};

	const calculateSuccessRate = (successful, attempted) => {
		return attempted > 0 ? ((successful / attempted) * 100).toFixed(2) : 'N/A';
	};

	const getBadgeColor = (status) => {
		if (status === 'active') return 'green';
		if (status === 'retired') return 'red';
		if (status === 'under construction') return 'indigo';
		return 'dark';
	};
</script>

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
		{#each landpads as landpad}
			<TableBodyRow class="hover:bg-gray-100">
				<TableBodyCell>{landpad.full_name}</TableBodyCell>
				<TableBodyCell>{landpad.location.name}</TableBodyCell>
				<TableBodyCell>{landpad.location.region}</TableBodyCell>
				<TableBodyCell>
					<button on:click={() => onDetailsClick(landpad)}>
						<Badge color="dark">View Details</Badge>
					</button>
				</TableBodyCell>
				<TableBodyCell>
					{#if calculateSuccessRate(landpad.successful_landings, landpad.attempted_landings) !== 'N/A'}
						<Progressbar
							progress={calculateSuccessRate(
								landpad.successful_landings,
								landpad.attempted_landings
							)}
							progressClass="bg-[#31C48D]"
						/>
						<div class="mb-1 text-sm font-small text-gray-400 dark:text-gray-500">
							{Math.floor(
								calculateSuccessRate(landpad.successful_landings, landpad.attempted_landings)
							)}%
						</div>
					{:else}
						<div class="text-base font-small text-gray-400 dark:text-gray-500">N/A</div>
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					<a
						href={landpad.wikipedia}
						class="font-medium text-primary-600 hover:underline dark:text-primary-500"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkOutline class="w-6 h-6 ms-2 text-[#1C64F2]" />
					</a>
				</TableBodyCell>
				<TableBodyCell class="capitalize">
					<Badge color={getBadgeColor(landpad.status)}>{landpad.status}</Badge>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
