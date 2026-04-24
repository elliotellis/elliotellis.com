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

      --typesize-caption: 0.8rem;
      --leading-caption: 1rem;
      --typesize-body: 1rem;
      --leading-body: 1.25rem;

      --site-margin: 1rem;
    }

    @media only screen and (32rem < width) {
      :root {
        --site-margin: 1.5rem;
      }
    }

    body {
      --text-colour: var(--colour-black);
      --text-colour-minor: var(--colour-midgrey);
      --key-colour: var(--colour-orange);
      --background-colour: var(--colour-white);

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

    a { color: inherit; }

    h1 {
      margin: 0;
    }

    h3 {
      margin: 0.5rem 0 0;
      font-size: var(--typesize-body);

    }

    p {
      margin: 1rem 0 0;
      max-width: 32rem;
    }

    p:first-of-type {
      margin: 0;
    }

    .caption {
      font-size: var(--typesize-caption);
      line-height: var(--leading-caption);
      color: var(--text-colour-minor);
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

    /* a[target="_blank"]:after {
      content: '\2197';
    } */

    .grid {
      width: 100%;
      display: grid;
      grid-template-columns: [site-start] 1fr [divider] 2fr [site-end];
    }

    .grid > * {
      grid-column: site-start / site-end;
      padding: var(--site-margin);
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



    .rule-above-1x { --rule-weight-above: 0.0625rem; }
    .rule-above-2x { --rule-weight-above: 0.125rem; }
    .rule-above-4x { --rule-weight-above: 0.25rem; }
    .rule-below-1x { --rule-weight-below: 0.0625rem; }
    .rule-below-2x { --rule-weight-below: 0.125rem; }
    .rule-below-4x { --rule-weight-below: 0.25rem; }

    .rule-above-1x, .rule-above-2x, .rule-above-4x {
      border-top: var(--rule-weight-above) solid var(--text-colour);
      padding-top: calc(1rem - var(--rule-weight-above));
    }

    .rule-below-1x, .rule-below-2x, .rule-below-4x {
      border-bottom: var(--rule-weight-below) solid var(--text-colour);
      padding-bottom: calc(1rem - var(--rule-weight-below));
    }

  }
</style>