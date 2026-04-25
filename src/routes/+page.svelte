<script>
  import { page } from '$app/state';
  let { data } = $props();
  import Header from '$lib/components/Header.svelte';
  import Works from '$lib/components/Works.svelte';
  import works from '$lib/content/home';
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

<Header />

<Works {works} />