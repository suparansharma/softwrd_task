<script>
	import Overlay from 'ol/Overlay';
	import { fromLonLat } from 'ol/proj';

	let { landpad ,map} = $props();
	let overlayEl;
	

	$effect(async () => {
		if (!map || !overlayEl) {
			return;
		}

		
		const overlay = new Overlay({
			element: overlayEl,
			position: fromLonLat([landpad?.location?.longitude, landpad?.location?.latitude]),
			positioning: 'bottom-center',
			stopEvent: false
		});

		overlay.setPosition(fromLonLat([landpad?.location?.longitude, landpad?.location?.latitude]));
		map.addOverlay(overlay);
	});
</script>

<div bind:this={overlayEl} class="w-6 h-6 rounded-full bg-[#f65252]"></div>
