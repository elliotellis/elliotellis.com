<script>
  import { page } from '$app/state';
  let { data } = $props();
  import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
  <!-- Page title -->
  <title>elliot ellis &ndash; {''}</title>
  <meta property="og:title" content={'' + ' &ndash; elliot ellis'}>
  <meta property="twitter:title" content={'' + ' &ndash; elliot ellis'}>
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

<main>

  <Header />

</main>