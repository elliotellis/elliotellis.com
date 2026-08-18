<script>
	let { data } = $props();
</script>

<!-- <div class="image-container"> -->
<picture>
	{#if data.srcsetWebp}
		<source srcset={data.srcsetWebp} type="image/webp" />
	{/if}
	<img alt={data.alt} src={data.src} srcset={data.srcset} loading="lazy" />
</picture>

<!-- </div> -->

<style>
	.image-container {
		display: inline-block;
		width: auto;
		height: 100%;
	}

	picture,
	img {
		width: auto;
		max-width: 100%;
		height: auto;
		max-height: 100%;
	}
</style>
