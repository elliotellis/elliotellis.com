<script>
	import Image from "$lib/components/Image.svelte";
	import WorkActiveModal from "$lib/components/WorkActiveModal.svelte";
	import { onMount } from "svelte";
	import { dev } from "$app/environment";
	import MediaContainer from "$lib/components/MediaContainer.svelte";
	let { work, active, toggleActive, muted, toggleMuted, float } = $props();
	let opened = $state(false);
	let thumbnailEl;
	let thumbnailRect = $state({ w: 0, h: 0, x: 0, y: 0 });

	onMount(() => {
		let rect = thumbnailEl.getBoundingClientRect();
		thumbnailRect.w = rect.x; // to fix
		thumbnailRect.h = rect.x; // to fix
		thumbnailRect.x = rect.x; // to fix
		thumbnailRect.y = rect.y; // to fix
	});
</script>

<div id={work.slug} class={["work", active && "active"]} style:float>
	<button
		class="work-toggle"
		style:width={dev ? "50%" : undefined}
		onclick={() => {
			toggleActive();
			if (active && !opened) opened = true;
		}}>Expand work</button
	>

	<MediaContainer type="thumbnail" aspectRatio={work.aspectRatio}>
		<Image data={work.animation || work.image} />
	</MediaContainer>

	{#if active}
		<WorkActiveModal {work} {thumbnailRect} {toggleActive} />
	{/if}
</div>

<style>
	.work {
		padding: 1rlh var(--site-hmargin);
		position: relative;
	}

	:global(.work-toggle) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 4;
	}
</style>
