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

    @page {
      size: 210mm 297mm;
      margin: 1rem;
    }

    :root {
      --colour-white: #fff;
      --colour-lightgrey: #eee;
      --colour-midgrey: #5D5856;
      --colour-black: #161616;
      --colour-orange: #ee6416;

      --typeface: 'Delegate Trial', 'Tahoma', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --fontweight-reg: 400;
      --fontweight-bold: 700;
      --leading-base: 1.25em;

      --typesize-body: 1rem;
      --leading-body: 1.25rem;

      --site-margin: 1rem;
      --max-text-width: 32rem;
      --base-rule-weight: 0.0625rem;
    }
    
    @media (monochrome) {
      :root {
        --colour-orange: #000;
      }
    }

    @media only screen and (28rem < width) {
      :root { --site-margin: 1.5rem; } }
		
		@media only screen and (36rem < width) {
			:root { --site-margin: 2rem; } }
		
		@media only screen and (56rem < width) {
			:root { --site-margin: 1.5rem; } }
		
		@media only screen and (64rem < width) {
      :root { --site-margin: 2rem; } }
		
		@media only screen and (80rem < width) {
      :root { --site-margin: 2.5rem; } }
		
		/* the above is fine for now but i think i want to separate horiz and vert 
			margins with the horizontal one being wider in proportion usually, especially
			on larger viewports */

		/* you also need to make most element margins/paddings relative to both root em
			and the site margin - site-margin probably needs renaming to like root spacing scale */

    @media only print {
      :root { 
        font-size: 10pt;
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

    .subtle-link {
      text-decoration: none;
    }

    h1 {
      margin: 0;
    }

    h2 {
      margin: 0.5rem 0 0;
      font-size: var(--typesize-body);
    }

    h3 {
      margin: 0.5rem 0 0;
      font-size: var(--typesize-body);

    }

    p, ul {
      margin: 1rem 0 0;
      max-width: var(--max-text-width);
    }

    p:first-of-type {
      margin: 0;
    }

    .caption {
      font-size: var(--typesize-caption);
      line-height: var(--leading-caption);
      color: var(--text-colour-minor);
    }

    ul {
      padding: 0 0 0 1em;
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

    .bold {
      font-weight: var(--fontweight-bold);
    }

    /* a[target="_blank"]:after {
      content: '\2197';
    } */
    
    /*
      want to do a set of min and max widths of type size/leading combos
      e.g. 1/1.25 up to a certain measure and then 1/1.5 above that
      could be a media query related to element width? 
      i think i found this out one time
    */

    .rule-above-1x { --rule-weight-above: var(--base-rule-weight); }
    .rule-above-2x { --rule-weight-above: calc(2 * var(--base-rule-weight)); }
    .rule-above-4x { --rule-weight-above: calc(4 * var(--base-rule-weight)); }
    .rule-below-1x { --rule-weight-below: var(--base-rule-weight); }
    .rule-below-2x { --rule-weight-below: calc(2 * var(--base-rule-weight)); }
    .rule-below-4x { --rule-weight-below: calc(4 * var(--base-rule-weight)); }

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