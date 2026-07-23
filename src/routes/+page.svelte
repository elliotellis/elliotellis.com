<script>
  import { page } from '$app/state';
  import Works from '$lib/components/Works.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <!-- Page title -->
  <title>elliot ellis</title>
  <meta property="og:title" content="elliot ellis">
  <meta property="twitter:title" content="elliot ellis">
  <!-- Page image -->
  {#if ''}
    <meta property="og:image" content={''}>
    <meta name="twitter:image" content={''}>
  {/if}
  <!-- Page description -->
  {#if ''}
    <meta property="og:description" content={''}>
    <meta name="twitter:description" content={''}>
  {/if}
</svelte:head>

<Works {data} />