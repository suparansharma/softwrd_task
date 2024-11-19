<script>
	import { Modal } from 'flowbite-svelte';

	export let title = '';
	export let details = '';
	export let open = false;
	export let onClose = () => {};
</script>

<Modal title={title} bind:open={open} autoclose on:close={onClose}>
	<div class="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-5">
			{details}
		</p>
	</div>
</Modal>
