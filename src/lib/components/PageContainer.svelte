<script>
  import { SvelteDate } from 'svelte/reactivity';
  import * as sun from 'suncalc';
  import ms from 'ms';
  let { children } = $props();

  const debug = false;
  let m = $state({ x: 0, y: 0 });
  let dt = new SvelteDate();
  let ww = $state();

  const piecewiseLinear = (ts, ys, t) => { 
    for(let i = 0; i < ts.length; ++i){
      if(ts[i] <= t && ts[i+1] >= t) {
        return ys[i] + (t - ts[i]) * (ys[i+1] - ys[i]) / (ts[i+1] - ts[i])
      }
    }
  }
  const to2dp = (float) => Math.round( float * 100 ) / 100;
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const invlerp = (x, y, a) => clamp((a - x) / (y - x));
  const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

  const now = new SvelteDate();
  now.setTime(Date.now());
  const sunTimes = sun.getTimes(now, 51.509718, -0.104315); // Blackfriars Bridge
  const dayStart = new Date(sunTimes.solarNoon - ms('12h'));
  const dayEnd = new Date(sunTimes.solarNoon.valueOf() + ms('12h')); // for some reason have to use valueOf() when adding milliseconds
  const yearStart = new Date(now.getFullYear(), 0);
  const yearEnd = new Date(now.getFullYear() + 1, 0);
  const tp = (t) => invlerp(dayStart, dayEnd, t); // get time point float
  console.log(sunTimes.solarNoon - ms('1h'))
  let dayPoints = [
    { label: 'dayStart',      s:   5, l: 10, okl: 0.1,  okc: 0.1,  t: dayStart }, 
    { label: 'nauticalDawn',  s:  10, l: 15, okl: 0.15, okc: 0.1,  t: sunTimes.nauticalDawn }, 
    { label: 'goldenHourEnd', s:  90, l: 60, okl: 0.6,  okc: 0.35,  t: sunTimes.goldenHourEnd }, 
    { label: 'noon-1h',       s:  90, l: 60, okl: 0.8,  okc: 0.15,  t: new Date(sunTimes.solarNoon - ms('1h')) }, 
    { label: 'solarNoon',     s: 100, l: 95, okl: 1,    okc: 0,    t: sunTimes.solarNoon },  
    { label: 'noon+1h',       s:  90, l: 60, okl: 0.8,  okc: 0.15,  t: new Date(sunTimes.solarNoon.valueOf() + ms('1h')) },
    { label: 'goldenHour',    s:  90, l: 60, okl: 0.6,  okc: 0.35,  t: sunTimes.goldenHour }, 
    { label: 'nauticalDusk',  s:  10, l: 15, okl: 0.15, okc: 0.1,  t: sunTimes.nauticalDusk }, 
    { label: 'dayEnd',        s:   5, l: 10, okl: 0.1,  okc: 0.1,  t: dayEnd }, 
  ];

  let hue = $derived( to2dp( invlerp(yearStart, yearEnd, now) * 360 + 180 ) ); // Hue is determined by the time of year

  let saturation = $derived(piecewiseLinear(
    dayPoints.map((i) => tp(i.t)),
    dayPoints.map((i) => i.okc),
    tp(now) 
    //m.x/ww
  ));

  let lightness = $derived(piecewiseLinear(
    dayPoints.map((i) => tp(i.t)),
    dayPoints.map((i) => i.okl),
    tp(now) 
    //m.x/ww
  ));

  const handleMousemove = (event) => { 
    m.x = event.clientX; 
    m.y = event.clientY; 
    dt.setTime(range(0, ww, dayStart, dayEnd, m.x));
  }
  
  $effect(() => {
		const interval = setInterval(() => { now.setTime(Date.now()); }, 1000);
    document.body.style.setProperty('--background-colour', 'oklch(' + (to2dp(lightness)) + ' ' + (to2dp(saturation)) + ' ' + hue + ')');
    document.body.style.opacity = 1;
		return () => { clearInterval(interval); };
	});

</script>
  
<svelte:window bind:innerWidth={ww} onmousemove={handleMousemove} />

<!-- style:--background-colour={'oklch(' + (to2dp(lightness)) + ' ' + (to2dp(saturation)) + ' ' + hue + ')'} -->
<main>
  <div class="colour-bar" style:--background-colour={'oklch(' + 1 + ' ' + (to2dp(0.5/saturation)) + ' ' + hue + ')'}></div>
  {@render children()}
</main>

<style>

  main {
    --top-padding: 3rem;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    color: contrast-color(var(--background-colour));
    width: 100%;
    position: relative;
    overflow: hidden;
  }

/*
  main::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(var(--top-padding) - var(--site-x-margin));
    left: var(--site-x-margin);
    width: calc(100% - (2*var(--site-x-margin)));
    height: 0;
    border-top: 1px solid var(--text-colour);

  }*/

  .colour-bar {
    position: absolute;
    top: -2rem;
    left: -50%;
    width: 200%;
    height: 4rem;
    background-color: var(--background-colour);
    mix-blend-mode: exclusion;
    filter: blur(2rem);
    z-index: 1;
  }

</style>

{#if debug}
  <div class="colour-debug-points">
    {#each dayPoints as point}
      <span style:left={tp(point.t)*100 + '%'}>{point.label}<br>{point.t.toLocaleTimeString()}</span>
    {/each}
    <div>chroma {to2dp(saturation)} / light {to2dp(lightness)} <br>chroma {to2dp(1-saturation)} / light {1}<br>{dt.toLocaleTimeString()}</div>
  </div>

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
    
    .colour-debug-points span:nth-child(1) { width: 18%; left: 0; }
    .colour-debug-points span:nth-child(2) { width: 12%; left: 18%; }
    .colour-debug-points span:nth-child(3) { width: 20%; left: 30%; }
    .colour-debug-points span:nth-child(4) { width: 20%; left: 50%; }
    .colour-debug-points span:nth-child(5) { width: 12%; left: 70% }
    .colour-debug-points span:nth-child(6) { width: 18%; left: 82%; }
  </style>
{/if}