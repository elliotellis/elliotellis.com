<script>
  import { page } from '$app/state';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <meta property="og:locale" content="en_GB">
  <!--
  <link rel="icon" type="image/png" href={faviconPng1x} />
  <link rel="icon" type="image/png" href={faviconPng2x} /> -->
  <link rel="icon" href={favicon} />
  <link rel="canonical" href={'https://elliotellis.com' + page.url.pathname} />
  <meta property="og:url" content={'https://elliotellis.com' + page.url.pathname}>
  <meta name="twitter:url" content={'https://elliotellis.com' + page.url.pathname}>
  <meta property="og:site_name" content="elliot ellis">
  <meta property="og:see_also" content="https://elliotellis.com">
  <meta name="twitter:card" content="summary">
  <script defer src="https://cloud.umami.is/script.js" data-website-id="1e454313-0ae1-4523-a698-230e19d476c8"></script>
</svelte:head>

{@render children()}


<style>
  :global {
    *, *::before, *::after {
      box-sizing: border-box;
    }

    :root {
      --colour-white: #fff;
      --colour-lightgrey: #eee;
      --colour-midgrey: #9e9896;
      --colour-black: #23202e; /* to change to new black */
      --colour-orange: #ee6416;

      --typeface: 'Delegate Trial', 'Tahoma', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --fontweight-reg: 400;
      --fontweight-bold: 700;
      --leading-base: 1.25em;

      --typesize-body: 1rem;
      --leading-body: 1.25rem;

      --grid-gutter: 1rem;
      --grid-margin: 1rem;
      --grid-margin-dtp: 2rem;
    }

    body {
      --text-colour: var(--colour-black);
      --key-colour: var(--colour-orange);
      --background-colour: var(--colour-lightgrey);

      font-family: var(--typeface);
      line-height: var(--leading-base);
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      background: var(--background-colour);
      color: var(--text-colour);
      min-width: 320px;
      min-height: 100vh;
      margin: 0;
      display: grid;
      grid-template-rows: 1fr auto;
      position: relative;
    }

    em { font-style: italic; }
    strong { font-weight: var(--fontweight-bold); }

    a { color: var(--text-colour); }
    a:hover { color: var(--text-colour); }

    h1 {
      margin: 0;
    }

    p {
      margin: 1rem 0 0;
    }

    /* a[target="_blank"]:after {
      content: '\2197';
    } */

    .grid {
      --margin: var(--grid-margin);
      --gutter: var(--grid-gutter);
      width: 100%;
      display: grid;
      grid-template-columns: [site-start] 0 [content-start] repeat(12, 1fr) [content-end] 0 [site-end];
      gap: var(--gutter);
    }

    .grid > * {
      grid-column: site-start / site-end;
      padding: 0 var(--grid-margin);
    }

    .subgrid {
      grid-template-columns: subgrid;
    }
    
    /*
      want to do a set of min and max widths of type size/leading combos
      e.g. 1/1.25 up to a certain measure and then 1/1.5 above that
      could be a media query related to element width? 
      i think i found this out one time
    */

    .rule {
      --rule-weight: 0.0625rem;
      border-top: var(--rule-weight) solid var(--text-colour);
      padding: 0.5rem 0;
    }

    .rule-1x { --rule-weight: 0.0625rem; }
    .rule-2x { --rule-weight: 0.125rem;	}
    .rule-4x { --rule-weight: 0.25rem; }

  }
</style>