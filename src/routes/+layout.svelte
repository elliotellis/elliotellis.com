<script>
  import { SvelteDate } from 'svelte/reactivity';
  import * as sun from 'suncalc';
  import { page } from '$app/state';
  import favicon from '$lib/assets/favicon.svg';
  import PageContainer from '$lib/components/PageContainer.svelte';
  let { children } = $props();
  const showBaselineGrid = true;
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

{#if showBaselineGrid}
  <style>
    body {
      background-image: 
        linear-gradient(to top, 
          rgba(255,255,255,0.5) 0, 
          transparent 1px 50%, 
          rgba(255,255,255,0.25) 50%, 
          transparent calc(50% + 1px) 100%
        );
      background-repeat: repeat-y;
      background-size: 100% 1rlh;
    }
  </style>
{/if}

<PageContainer>

  {@render children()}

</PageContainer>

<style>
  :global {
    *, *::before, *::after {
      box-sizing: border-box;
    }

    @page {
      size: 210mm 297mm;
      margin: 1rem;
    }

    ::selection {
      color: red;
      background-color: var(--colour-grey);
    }

    :root {
      --background-colour: white;
      --text-colour: contrast-color(var(--background-colour));

      --typeface: 'Action Grotesque Trial', 'Verdana', sans-serif;
      --fontweight-reg: 500;
      --fontweight-bold: 800;
      --font-spacewidth-reg: 0.232em;
      --font-spacewidth-bold: 0.238em;

      --typesize-base: 1rem;
      --leading-base: 1.25em;

      --site-x-margin: 0.75rem;
      --prev-area-width: 1.5rem;
      --header-width: 16rem;
      --next-area-width: 3rem;
      --main-text-width: 32rem;

      font-size: var(--typesize-base);
      line-height: var(--leading-base);
      --baseline-offset: calc(calc(var(--leading-base) - 1cap) / 2);
    }

    body {
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
      opacity: 0.5;
      overflow-x: hidden;
    }

    body::before {
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
    }

    em { font-style: italic; }
    strong, .ty-bold { font-weight: var(--fontweight-bold); }
    a { color: inherit; }

    .subtle-link {
      text-decoration: none;
    }

    .text-container {
      padding-top: var(--baseline-offset);
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