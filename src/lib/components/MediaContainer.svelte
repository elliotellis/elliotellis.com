<script>
	let { children, type, baseSize, aspectRatio = [1, 1] } = $props();
</script>

<div
	class="media-container"
	bind:this={mediaEl}
	style:--base-size-default={baseSize}
	style:aspect-ratio={aspectRatio[0] + " / " + aspectRatio[1]}
	style:--ratio-width={aspectRatio[0]}
	style:--ratio-height={aspectRatio[1]}
	style:--margin-top={type === "thumbnail" ? Math.floor(Math.random() * 4) : null}
	style:--margin-bottom={type === "thumbnail" ? Math.floor(Math.random() * 4) : null}
	style:--margin-left={type === "thumbnail" ? Math.floor(Math.random() * 4) : null}
	style:--margin-right={type === "thumbnail" ? Math.floor(Math.random() * 4) : null}
	/* Compatibility for browsers that don't support sqrt() CSS type */
	style:--width-calc={Math.sqrt(aspectRatio[0] / aspectRatio[1])}
	style:--height-calc={Math.sqrt(aspectRatio[1] / aspectRatio[0])}
>
	{@render children()}
</div>

<style>
	.media-container {
		outline: 1px solid white;
		--base-size-default: 10rem;
		--base-size-default: 20svw;
		--base-size-small: calc(var(--base-size-default) * 2/3);
		--base-size-large: calc(var(--base-size-default) * 4/3);
		--base-size: var(--base-size-default);
		/* Compatibility for browsers that don't support sqrt() CSS type */
		width: calc(var(--base-size) * var(--width-calc));
		height: calc(var(--base-size) * var(--height-calc));
		/* Modern CSS syntax */
		width: calc(var(--base-size) * sqrt(var(--ratio-width) / var(--ratio-height)));
		height: calc(var(--base-size) * sqrt(var(--ratio-height) / var(--ratio-width)));
		width: calc(var(--base-size) * sqrt(var(--ratio-width) / var(--ratio-height)));
		height: calc(var(--base-size) * sqrt(var(--ratio-height) / var(--ratio-width)));

		/* Thumbnails only: */
		--base-vmargin: 1rem;
		--base-vmargin: 1rlh;
		--base-vmargin: 2.5svh;
		margin-top: calc(var(--base-vmargin) * var(--margin-top));
		margin-bottom: calc(var(--base-vmargin) * var(--margin-bottom));
		--base-hmargin: 1rem;
		--base-hmargin: 2.5svw;
		margin-left: calc(var(--base-hmargin) * var(--margin-top));
		margin-right: calc(var(--base-hmargin) * var(--margin-bottom));
	}
</style>
