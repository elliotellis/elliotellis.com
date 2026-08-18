<script>
	import { onMount } from "svelte";
	import Image from "$lib/components/Image.svelte";
	import Caption from "$lib/components/Caption.svelte";
	import Work from "$lib/components/Work.svelte";
	let { data } = $props();
	let works = $state(null);
	let muted = $state(true);
	let activeWorkIndex = $state(undefined);

	const paradiddle = ["L", "R", "L", "L", "R", "L", "R", "R"];

	function shuffle(array) {
		for (let i = array.length - 1; i >= 1; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	onMount(() => {
		works = shuffle(data.works);
	});

	$effect(() => {
		document.body.style.setProperty(
			"overflow-y",
			activeWorkIndex != undefined ? "hidden" : "unset",
		);
	});
</script>

<div class="works-gallery">
	{#if works}
		<pre>
      {JSON.stringify(works[0], null, 2)}
    </pre>

		{#each works as work, w}
			{const active = activeWorkIndex === w ? true : false}
			<Work
				{work}
				active={activeWorkIndex === w}
				toggleActive={() => (activeWorkIndex = activeWorkIndex === w ? undefined : w)}
				{muted}
				toggleMuted={() => (muted = !muted)}
				float={paradiddle[w % paradiddle.length] === "L" ? "left" : "right"}
			/>
		{/each}
	{/if}
</div>

<style>
	.works-gallery {
		padding-top: var(--site-top-margin);
		padding-bottom: 6rlh;
		min-height: 100vh;
		overflow: hidden;
	}
</style>
