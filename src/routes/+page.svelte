<script>
  import { page } from '$app/state';
  import Gallery from '$lib/components/Gallery.svelte';
  import content from '$lib/content/home.js';
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

<div class="name-container">
  <div class="text-container">
    <h1>elliot ellis</h1>
  </div>
</div>

<Gallery {content} />

<style>
  .name-container {
    padding: var(--top-padding) 0 0 var(--site-x-margin);
  }
</style>