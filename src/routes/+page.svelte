<script>
  import { page } from '$app/state';
  import GalleryContainer from '$lib/components/GalleryContainer.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import bio from '$lib/content/bio.js';
  import homeContent from '$lib/content/home.js';
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

<TextContainer blocks={bio} />
<GalleryContainer>
  <Gallery media={homeContent} />
</GalleryContainer>



<!--
<div class="text-container">
  <p>
    Currently working on a freelance basis in the culture, 
    editorial, education, and fashion sectors, he has worked on
    <span>
      websites, visual identities, motion graphics, editorial design, 
      data graphics, exhibition graphics, and film titles, for 
    </span>
    <span>
      The Guardian, the Barbican Centre, WIRED, Fraser Muggeridge studio, 
      Philharmonia, the University of Reading, Geographer, 
    </span>
    and more.
  </p>
</div>
-->