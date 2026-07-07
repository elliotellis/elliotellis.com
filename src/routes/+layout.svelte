<script>
  import { SvelteDate } from 'svelte/reactivity';
  import * as sun from 'suncalc';
  import { page } from '$app/state';
  import favicon from '$lib/assets/favicon.svg';
  import BackgroundManager from '$lib/components/BackgroundManager.svelte';
  import BaselineGrid from '$lib/components/BaselineGrid.svelte';
    import Text from '$lib/components/Text.svelte';
  let { children } = $props();
</script>

<svelte:head>
  <meta property="og:locale" content="en_GB">
  <link rel="icon" href={favicon} />
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

<div style="position: absolute; width: 1rem; height: 1rlh; background: white;"></div>

<main class="grid">

  <header class="name-container">
    <Text>
      <h1>elliot ellis</h1>
    </Text>
  </header>

  {@render children()}

</main>

<style>

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

      --typeface: 'Action Grotesque Trial', 'Verdana', sans-serif;
      --fontweight-reg: 500;
      --fontweight-bold: 800;
      --font-spacewidth-reg: 0.232em;
      --font-spacewidth-bold: 0.238em;

      --typesize-base: 1rem;
      --leading-base: 1.25em;

      --site-x-margin: 0.75rem;
      --nav-prev-width: 20%;
      --nav-next-width: 20%;
      --header-width: 12rem;
      --main-text-width: 32rem;

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
      /*background: linear-gradient(90deg in oklch, var(--background-colour-left) 0%, var(--background-colour-centre) 50%, var(--background-colour-right) 100%);*/
      color: var(--text-colour);
      min-width: 320px;
      min-height: 100vh;
      margin: 0;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: space-between;
      opacity: 0.5;
      overflow-x: hidden;
    }

    /*body::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4rem;
      background: linear-gradient(180deg in oklch, var(--gradient-colour) -25%, transparent);
      mix-blend-mode: exclusion;
      z-index: 1;
    }*/

    ::selection {
      color: contrast-color(var(--text-colour));
      background-color: var(--text-colour);
      background-blend-mode: difference;
      z-index: 3;
    }

    main {
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

    .subgrid {
      grid-template-columns: subgrid;
    }

    .name-container {
      padding: 0 var(--site-x-margin);
      margin-top: 1rlh;
      z-index: 2;
    }

    @media only screen and (min-width: 32rem) {
      .name-container {
        grid-column: span 1;
      }
    }

    em { font-style: italic; }
    strong, .ty-bold { font-weight: var(--fontweight-bold); }
    a { color: inherit; }

    .subtle-link {
      text-decoration: none;
    }

    figure {
      margin: 0;
    }

    h1, h2, h3, h4, h5, h6, p, ul {
      padding: 0;
      margin: 0;
      font-size: 1rem;
      max-width: var(--main-text-width);
    }

    p {
      text-indent: 2rem;
    }

    p:first-child, ul + p {
      text-indent: unset;
    }

    p.caption {
      font-size: 0.75rem;
      line-height: 0.8rlh;
    }

    

    ul {
      list-style-type: none;
    }

    .hidden {
      display: none;
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

  }
</style>