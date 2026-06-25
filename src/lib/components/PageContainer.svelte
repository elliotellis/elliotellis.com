<script>
  import { SvelteDate } from 'svelte/reactivity';
  import * as sun from 'suncalc';
  let { children } = $props();

  const debug = true;
  let mx = $state(0);
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
  const dayStart = new Date(sunTimes.solarNoon - 43200000);
  const dayEnd = new Date(sunTimes.solarNoon.valueOf() + 43200000); // for some reason dates in future need to be set from unix number
  const yearStart = new Date(now.getFullYear(), 0);
  const yearEnd = new Date(now.getFullYear() + 1, 0);
  const tp = (t) => invlerp(dayStart, dayEnd, t); // get time point float

  let dayPoints = [
    { label: 'dayStart', t: dayStart,                s:   5, l: 10, okl: 0.1,  okc: 0.1 }, 
    { label: 'dayStart', t: sunTimes.nauticalDawn,   s:  10, l: 15, okl: 0.15, okc: 0.1 }, 
    { label: 'dayStart', t: sunTimes.goldenHourEnd,  s:  90, l: 60, okl: 0.6,  okc: 0.5 }, 
    { label: 'dayStart', t: sunTimes.solarNoon,      s: 100, l: 95, okl: 1,    okc: 0   }, 
    { label: 'dayStart', t: sunTimes.goldenHour,     s:  90, l: 60, okl: 0.6,  okc: 0.5 }, 
    { label: 'dayStart', t: sunTimes.nauticalDusk,   s:  10, l: 15, okl: 0.15, okc: 0.1 }, 
    { label: 'dayStart', t: dayEnd,                  s:   5, l: 10, okl: 0.1,  okc: 0.1 }, 
  ];

  let hue = $derived( to2dp( invlerp(yearStart, yearEnd, now) * 360 + 180 ) ); // Hue is determined by the time of year

  // Saturation is a linear interpolation where it is low at noon and night, and at its peak at dusk and dawn
  //let saturation = $derived( to2dp( range(timeRange[0], timeRange[1], colorRanges[0], colorRanges[1], now) ) );
  //let lightness = $derived( to2dp( range(timeRange[0], timeRange[1], colorRanges[2], colorRanges[3], now) ) );

  let saturation = $derived(to2dp(piecewiseLinear(
    dayPoints.map((i) => tp(i.t)),
    dayPoints.map((i) => i.okc),
    /*tp(now)*/ mx/ww
  )));

  let lightness = $derived(to2dp(piecewiseLinear(
    dayPoints.map((i) => tp(i.t)),
    dayPoints.map((i) => i.okl),
    /*tp(now)*/ mx/ww
  )));

  const handleMousemove = (event) => { 
    mx = event.clientX; 
    dt.setTime(range(0, ww, dayStart, dayEnd, mx));
  }
  
  $effect(() => {
		const interval = setInterval(() => { now.setTime(Date.now()); }, 1000);
		return () => { clearInterval(interval); };
	});

</script>
  
<svelte:window bind:innerWidth={ww}  /> 

<main onmousemove={handleMousemove} style:--background-colour={'oklch(' + (lightness) + ' ' + (saturation) + ' ' + hue + ')'}>
  {@render children()}
</main>

<style>

  main {
    background-color: var(--background-colour);
    padding: 1rem;
  }

</style>

{#if debug}
  <div class="colour-debug-points">
    {#each dayPoints as point}
      <span style:left={tp(point.t)*100 + '%'}>{point.label}<br>{point.t.toLocaleTimeString()}</span>
    {/each}
    <div>s {saturation} / l {lightness} <br>{dt.toLocaleTimeString()}</div>
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