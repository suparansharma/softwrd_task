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
		console.log('landpad', landpad);
		defaultModal = true;
		landpadDetails = landpad?.details;
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
	<div class="relative flex items-center justify-between">
		<!-- Left Icons -->
		<div class="flex space-x-2">
			<!-- First Icon -->
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4.996 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 14a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z"
					clip-rule="evenodd"
				/>
			</svg>

			<!-- Second Icon -->
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>

		<!-- Right Side Label -->
		<div>
			<div class="relative flex items-center">
				<!-- Left Icon -->
				<div class="absolute inset-y-0 left-0 flex items-center pl-3">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z"
						/>
					</svg>
				</div>

				<!-- Select Field -->
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
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					{landpad.location.name}
				</TableBodyCell>
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					{landpad.location.region}
				</TableBodyCell>
				<TableBodyCell class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3">
					<button onclick={() => handelDetailsModal(landpad)}
						><Badge color="dark">View Details</Badge></button
					>
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
						<div class="mb-1 text-base font-small text-gray-400 dark:text-gray-500">
							{Math.floor(
								calculateSuccessRate(landpad.successful_landings, landpad.attempted_landings)
							)}%
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
