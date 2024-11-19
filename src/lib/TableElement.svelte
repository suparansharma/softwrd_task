<script>
	import LandpadTable from '../components/LandpadTable.svelte';
	import LandpadModal from '../components/LandpadModal.svelte';

	let { landpads } = $props();

	let defaultModal = $state(false);
	let landpadDetails = $state('');
	let landpadHeader = $state('');

	const handleDetailsModal = (landpad) => {
		defaultModal = true;
		landpadDetails = landpad.details;
		landpadHeader = landpad.full_name;
	};

	const handleCloseModal = () => {
		defaultModal = false;
	};
</script>

<LandpadTable {landpads} onDetailsClick={handleDetailsModal} />

<LandpadModal
	title={landpadHeader}
	details={landpadDetails}
	bind:open={defaultModal}
	onClose={handleCloseModal}
/>
