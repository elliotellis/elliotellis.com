<svelte:head>
  <!-- Page title -->
  <title>elliot ellis &ndash; {data.siteSettings[0].siteSubheading}</title>
  <meta property="og:title" content={data.siteSettings[0].siteSubheading + ' &ndash; elliot ellis'}>
  <meta property="twitter:title" content={data.siteSettings[0].siteSubheading + ' &ndash; elliot ellis'}>
  <!-- Page image -->
  {#if data.siteSettings[0].siteSharingImage}
    <meta property="og:image" content={data.siteSettings[0].siteSharingImage}>
    <meta name="twitter:image" content={data.siteSettings[0].siteSharingImage}>
  {/if}
  <!-- Page description -->
  {#if data.siteSettings[0].siteDescription}
    <meta property="og:description" content={data.siteSettings[0].siteDescription}>
    <meta name="twitter:description" content={data.siteSettings[0].siteDescription}>
  {/if}
</svelte:head>

<main></main>

<style></style>