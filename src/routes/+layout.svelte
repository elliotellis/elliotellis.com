<script>
  import { page } from '$app/state';
  import BackgroundManager from '$lib/components/BackgroundManager.svelte';
  import BaselineGrid from '$lib/components/BaselineGrid.svelte';
  import Header from '$lib/components/Header.svelte';
  import Text from '$lib/components/Text.svelte';
  let { children } = $props();
</script>

<svelte:head>
  <meta property="og:locale" content="en_GB">
  <!-- <link rel="icon" href={favicon} /> -->
  <link rel="canonical" href={'https://elliotellis.com' + page.url.pathname} />
  <meta property="og:url" content={'https://elliotellis.com' + page.url.pathname}>
  <meta name="twitter:url" content={'https://elliotellis.com' + page.url.pathname}>
  <meta property="og:site_name" content="elliot ellis">
  <meta property="og:see_also" content="https://elliotellis.com">
  <meta name="twitter:card" content="summary">
  <script defer src="https://cloud.umami.is/script.js" data-website-id="1e454313-0ae1-4523-a698-230e19d476c8"></script>
</svelte:head>

<BaselineGrid on mode="offByDefault" />

<BackgroundManager debug={false} />

<div class="parent-container grid">

  <Header />

  <main class="page-container">
    {@render children()}
  </main>

</div>

<style>

  @font-face {
    font-family: 'Action Grotesque';
    src: url('$lib/fonts/ActionGrotesque-RegularNo2-Web.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Action Grotesque';
    src: url('$lib/fonts/ActionGrotesque-RegularNo2Italic-Web.woff2') format('woff2');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'Action Grotesque';
    src: url('$lib/fonts/ActionGrotesque-Medium-Web.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Action Grotesque';
    src: url('$lib/fonts/ActionGrotesque-Heavy-Web.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
  }

  :global {

    *, *::before, *::after {
      box-sizing: border-box;
    }

    @page {
      size: 210mm 297mm;
      margin: 1rem;
    }

    :root {
      --background-colour: grey;
      --text-colour: white;
      --grey-text-colour: lightgrey;

      --typeface: 'Action Grotesque', 'Verdana', sans-serif;
      --fontweight-reg: 500;
      --fontweight-bold: 800;
      --fontweight-smallcaps: 600;
      --font-spacewidth-reg: 0.232em;
      --font-spacewidth-bold: 0.238em;

      --typesize-base: 1rem;
      --leading-base: 1.25em;

      --site-x-margin: 0.75rem;
      --site-top-margin: 3rlh;
      --header-width: 12rem;
      --base-line-length: 32em;

      font-size: var(--typesize-base);
      line-height: var(--leading-base);
    }

    body {
      --text-colour: contrast-color( oklch(from var(--background-colour) calc(l - 0.2) c h) );
      font-size: var(--typesize-base);
      line-height: var(--leading-base);
      font-family: var(--typeface);
      font-weight: var(--fontweight-reg);
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      background-color: var(--background-colour);
      color: var(--text-colour);
      min-width: 320px;
      min-height: 100vh;
      margin: 0;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: space-between;
      overflow-x: hidden;
    }

    ::selection, a:hover, button:hover {
      color: contrast-color(var(--text-colour));
      background-color: var(--text-colour);
      background-blend-mode: difference;
    }

    .parent-container {
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    .grid {
      display: grid;
      grid-template-columns: var(--header-width) 1fr;
    }

    .grid > * {
      grid-column: span 2;
    }

    .page-container {
      overflow: hidden;
    }

    @media only screen and (min-width: 48rem) {
      .page-container {
        grid-column: 2;
      }
    }

    .subgrid {
      grid-template-columns: subgrid;
    }

    em { font-style: italic; }
    strong, .ty-bold { font-weight: var(--fontweight-bold); }
    a { color: inherit; }

    .subtle-link {
      text-decoration: none;
    }

    button {
      border: none;
      background: transparent;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }

    figure {
      margin: 0;
    }

    h1, h2, h3, h4, h5, h6, p, ul {
      padding: 0;
      margin: 0;
      font-size: 1rem;
      max-width: var(--base-line-length);
    }

    h4 {
      margin-top: 2rlh;
    }

    h1, h2 {
      font-weight: var(--fontweight-bold);
    }

    h4, button, .ty-sc {
      font-size: 0.75em;
      font-weight: var(--fontweight-smallcaps);
      text-transform: uppercase;
      letter-spacing: 0.01em;
    }

    .caption {
      font-size: 0.75rem;
      line-height: 0.75rlh;
    }

    ul {
      list-style-type: none;
    }

    .hidden {
      display: none;
    }

  }
</style>