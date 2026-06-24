<script>
  import { SvelteDate } from 'svelte/reactivity';
  import * as sun from 'suncalc';
  import { page } from '$app/state';
  import favicon from '$lib/assets/favicon.svg';
  let { children } = $props();

  let m = $state({ x: 0, y: 0 });
  let ww = $state();

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

  function piecewise_linear(ts, ys, t) { 
    for(let i = 0; i < ts.length; ++i){
      if(ts[i] <= t && ts[i+1] >= t) {
        // Use the equation for the line passing through 
        // (ts[i], ys[i]) and (ts[i+1], ys[i+1])
        return ys[i] + (t - ts[i]) * (ys[i+1] - ys[i]) / (ts[i+1] - ts[i])
      }
    }
  }

  const to2dp = (float) => Math.round( float * 100 ) / 100
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const invlerp = (x, y, a) => clamp((a - x) / (y - x));
  const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

  const now = new SvelteDate();
  const sunTimes = sun.getTimes(now, 51.509718, -0.104315); // Blackfriars Bridge
  const dayCycleStart = new Date(sunTimes.solarNoon - 43200000);
  const dayCycleEnd = new Date(sunTimes.solarNoon.valueOf() + 43200000); // for some reason dates in future need to be set from unix number
  const yearStart = new Date(now.getFullYear(), 0);
  const yearEnd = new Date(now.getFullYear() + 1, 0);
  let colorRanges = [0, 100, 0, 100]; // saturation low, high, lightness low, high
  let timeRange = [];

  // Hue is determined by the time of year
  let hue = $derived( to2dp( invlerp(yearStart, yearEnd, now) * 360 + 180 ) );

  // Saturation is a linear interpolation where it is low at noon and night, and at its peak at dusk and dawn
  //let saturation = $derived( to2dp( range(timeRange[0], timeRange[1], colorRanges[0], colorRanges[1], now) ) );
  //let lightness = $derived( to2dp( range(timeRange[0], timeRange[1], colorRanges[2], colorRanges[3], now) ) );
  //let saturation = $derived( to2dp( range(0, ww, colorRanges[0], colorRanges[1], m.x) ) );
  //let lightness = $derived( to2dp( range(0, ww, colorRanges[2], colorRanges[3], m.x) ) );

  let colourDebugPoints = [ 
    0, 
    invlerp(dayCycleStart, dayCycleEnd, sunTimes.nauticalDawn), 
    invlerp(dayCycleStart, dayCycleEnd, sunTimes.goldenHourEnd), 
    invlerp(dayCycleStart, dayCycleEnd, sunTimes.solarNoon),  
    invlerp(dayCycleStart, dayCycleEnd, sunTimes.goldenHour),  
    invlerp(dayCycleStart, dayCycleEnd, sunTimes.nauticalDusk),  
    1];

  let saturation = $derived(to2dp(piecewise_linear(
    colourDebugPoints.map((x) => x * ww),
    // midn, nauDawn, ghEnd,   noon,  goldhr, nauDusk, midn
    [   5,      10,    90,     20,    90,      10,   5 ],
    m.x
  )));

  let lightness = $derived(to2dp(piecewise_linear(
    colourDebugPoints.map((x) => x * ww),
    // midn, nauDawn, ghEnd,   noon,  goldhr, nauDusk, midn
    [   10,      15,     60,    85,     60,      15,   10 ],
    m.x
  )));

  // Brightness is a linear interpolation over 24h over how close it is to noon
  //let solarNoonDiff = $state(0);
  //let brightness = $derived( to2dp(100 - (solarNoonDiff + 43200) / 86400 * 100) );


  function updateTimeValues() {
    now.setTime(Date.now());

    if (dayCycleStart <= now && now < sunTimes.nauticalDawn) {
      timeRange = [dayCycleStart, sunTimes.nauticalDawn];
      colorRanges = [10, 10, 10, 10];
    } else if (sunTimes.nauticalDawn <= now && now < sunTimes.goldenHourEnd) {
      timeRange = [sunTimes.nauticalDawn, sunTimes.goldenHourEnd];
      colorRanges = [10, 100, 10, 67];
    } else if (sunTimes.goldenHourEnd <= now && now < sunTimes.solarNoon) {
      timeRange = [sunTimes.goldenHourEnd, sunTimes.solarNoon];
      colorRanges = [100, 10, 67, 100];
    } else if (sunTimes.solarNoon <= now && now < sunTimes.goldenHour) {
      timeRange = [sunTimes.solarNoon, sunTimes.goldenHour];
      colorRanges = [10, 100, 100, 67];
    } else if (sunTimes.goldenHour <= now && now < sunTimes.nauticalDusk) {
      timeRange = [sunTimes.goldenHour, sunTimes.nauticalDusk];
      colorRanges = [100, 10, 67, 10];
    } else if (sunTimes.nauticalDusk <= now && now < dayCycleEnd) {
      timeRange = [sunTimes.nauticalDusk, dayCycleEnd];
      colorRanges = [10, 10, 10, 10];
    } else {
      console.log("error! time is messed up")
    }

    //solarNoonDiff = Math.floor((now - sunTimes.solarNoon) / 1000);
    
  }
  updateTimeValues();

  console.log(colourDebugPoints);
  console.log(dayCycleStart);
  console.log(dayCycleEnd);
  console.log(sunTimes.nauticalDawn);
  //console.log(invlerp(dayCycleStart, dayCycleEnd, sunTimes.nauticalDawn));
      //console.log(now.valueOf());
    //console.log("timeRange " + timeRange);
    //console.log("colorRanges " + colorRanges);
    //console.log("SATURATION " + saturation);
    //console.log("LIGHTNESS " + lightness);
  $effect(() => {
		const interval = setInterval(() => { updateTimeValues() }, 1000);
		return () => { clearInterval(interval); };
	});
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

<svelte:window bind:innerWidth={ww} />

<main onmousemove={handleMousemove} style:--background-colour={'hsl(' + hue + ' ' + saturation + ' ' + lightness + ')'}>
  {@render children()}
</main>


<div class="colour-debug-points">
  <span style:left={colourDebugPoints[0]*100 + '%;'}>
    midnight<br>{dayCycleStart.toLocaleTimeString()}
  </span>
  <span style:left={colourDebugPoints[1]*100 + '%;'}>
    nauticalDawn<br>{sunTimes.nauticalDawn.toLocaleTimeString()}
  </span>
  <span style:left={colourDebugPoints[2]*100 + '%;'}>
    goldenHourEnd<br>{sunTimes.goldenHourEnd.toLocaleTimeString()}
  </span>
  <span style:left={colourDebugPoints[3]*100 + '%;'}>
    solarNoon<br>{sunTimes.solarNoon.toLocaleTimeString()}
  </span>
  <span style:left={colourDebugPoints[4]*100 + '%;'}>
    goldenHour<br>{sunTimes.goldenHour.toLocaleTimeString()}
  </span>
  <span style:left={colourDebugPoints[5]*100 + '%;'}>
    nauticalDusk<br>{sunTimes.nauticalDusk.toLocaleTimeString()}
  </span>
  <div>s {saturation} / l {lightness}</div>
</div>


<!--
<p><strong>Current datetime</strong> <br/> {currentDate}</p>
<p><strong>Custom datetime</strong> <br/> {customDate}</p>
<p><strong>Hue comp datetime</strong> <br/> {hueCompDate}</p>
<p><strong>+1year datetime</strong> <br/> {oneYearDate}</p>
<p><strong>One year</strong> <br/> {oneYear}</p>
<p><strong>Difference to Hue date</strong><br/> {hueDateDiff}</p>
<p><strong>Hue value</strong> <br/> {hue}</p>
<p><strong>Brightness value</strong> <br/> {brightness}</p>-->

<style>
  .colour-debug-points {
    position: absolute;
    width: 100vw;
    height: 10vh;
    top: 0;
    left: 0;
    color: white;
    mix-blend-mode: difference;
  }
  .colour-debug-points span {
    position: absolute;
    display: block;
    border-left: 1px solid white;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .colour-debug-points div {
    margin-top: 60px;
    text-align: center;
    width: 100%;
  }
  span:nth-child(1) { width: 18%; left: 0; }
  span:nth-child(2) { width: 12%; left: 18%; }
  span:nth-child(3) { width: 20%; left: 30%; }
  span:nth-child(4) { width: 20%; left: 50%; }
  span:nth-child(5) { width: 12%; left: 70% }
  span:nth-child(6) { width: 18%; left: 82%; }
  main {
    background-color: var(--background-colour);
    padding: 2rem;
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
      --colour-white: #fff;
      --colour-lightgrey: #eee;
      --colour-midgrey: #9e9896;
      --colour-black: #23202e; /* to change to new black */
      --colour-orange: #ee6416;

      --typeface: 'Action Grotesque Trial', 'Verdana', sans-serif;
      --fontweight-reg: 500;
      --fontweight-bold: 800;
      --leading-base: 1.25em;

      --typesize-body: 1rem;
      --leading-body: 1.25rem;

      --site-margin: 1rem;
      --max-text-width: 20rem;
      --base-rule-weight: 0.0625rem;
    }

    body {
      --text-colour: var(--colour-black);
      --text-colour-minor: var(--colour-midgrey);
      --key-colour: var(--colour-orange);
      --background-colour: var(--colour-white);

      font-family: var(--typeface);
      font-weight: var(--fontweight-reg);
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
    strong, .ty-bold { font-weight: var(--fontweight-bold); }
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
      margin: 0;
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