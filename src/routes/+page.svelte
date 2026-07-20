<script>
  import { page } from '$app/state';
  import Gallery from '$lib/components/Gallery.svelte';
  import Text from "$lib/components/Text.svelte";
  let { data } = $props();
  const bio = [
    'Designer, developer, and typographer who makes graphics, websites, systems, and tools.',
    'Currently working on a freelance basis in culture, editorial, and fashion, my experience includes work with The Guardian, the Barbican Centre, WIRED, Fraser Muggeridge studio, Philharmonia, the University of Reading, and Geographer, among others.',
    /*'As a designer I’m best at editorial design, identities, and motion graphics – anything that benefits from a systematic approach and good typography. I use code as a key part of my practice, both to explore and execute creative ideas, and to automate processes and build efficient workflows.',
    'I also design and build websites that are uncomplicated, friendly, and charmful. Absent of annoyances, bloat, or invasive features, the sites I make allow visitors to form a trustworthy initial relationship with businesses and professionals.',
    'I’m based in London, but love working on projects with people anywhere in the world.',*/
    'This is a temporary holding page as I finish a new website. Please contact me to request a portfolio in the meantime.'
  ];
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

<div class="information-container">
  <Text class="biography" blocks={bio} dynamicIndents />
  <Text class="contact-info">
    <h4>Contact</h4>
    <p><a href="mailto:elliot@elliotellis.com">elliot@elliotellis.com</a></p>
  </Text>
</div>

<style>

  .information-container {
    padding: var(--site-top-margin) var(--site-x-margin);
  }

  :global(.contact-info) a {
    text-decoration: none;
  }

</style>