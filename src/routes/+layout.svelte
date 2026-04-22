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
		}

		body {
			--background-colour: var(--colour-lightgrey);
      --text-colour: var(--colour-black);
      --key-colour: var(--colour-orange);

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

		/* a[target="_blank"]:after {
      content: '\2197';
    } */

		main {
			width: 100%;
			display: grid;
  		grid-template-columns: repeat(12, [col-start] 1fr);
  		gap: var(--site-xmargin);
		}

		main > * {
			grid-column: col-start / span 12;
		}

		.subgrid {
      grid-template-columns: subgrid;
    }

	}
</style>