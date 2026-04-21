<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}


<style>
	:global {
		body {
			font-family: 'Delegate Trial';
			font-size: 1rem;
			line-height: 1.5;
		}
	}
</style>