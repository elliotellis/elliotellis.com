<script>
  import { SvelteDate } from 'svelte/reactivity';
  import * as sun from 'suncalc';
  import ms from 'ms';
  let { children } = $props();

  const debug = true;
  let m = $state({ x: 0, y: 0 });
  let dt = new SvelteDate();
  let ww = $state();
  let wh = $state();

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

  const getHue = (time, dc) => to2dp( invlerp(
    yearStart, 
    yearEnd, 
    (debug ? dc/wh : time)
  ) * 360 + 180 );

  const getSaturation = (time, dc) => piecewiseLinear(
    dayPoints.map((i) => tp(i.t)),
    dayPoints.map((i) => i.okc),
    (debug ? dc/ww : tp(time))
  );

  const getLightness = (time, dc) => piecewiseLinear(
    dayPoints.map((i) => tp(i.t)),
    dayPoints.map((i) => i.okl),
    (debug ? dc/ww : tp(time))
  );

  const handleMousemove = (event) => { 
    m.x = event.clientX; 
    m.y = event.clientY; 
    dt.setTime(range(0, ww, dayStart, dayEnd, m.x));
  }
  
  $effect(() => {
		const interval = setInterval(() => { now.setTime(Date.now()); }, 1000);

    document.body.style.setProperty(
      '--background-gradient',
      'linear-gradient( 90deg in oklch, #fff 0%, #000 100%)'
    );

    document.body.style.setProperty('--background-colour-left', 'oklch(' + (to2dp(getLightness(now - ms('3 hr'), m.x - 0.125*ww))) + ' ' + (to2dp(getSaturation(now - ms('3 hr'), m.x - 0.125*ww))) + ' ' + getHue(now - ms('3 hr'), m.y) + ')');
    document.body.style.setProperty('--background-colour-centre', 'oklch(' + to2dp(getLightness(now, m.x)) + ' ' + (to2dp(getSaturation(now, m.x))) + ' ' + getHue(now, m.x) + ')');
    document.body.style.setProperty('--background-colour-right', 'oklch(' + (to2dp(getLightness(now.valueOf() + ms('3 hr'), m.x + 0.125*ww))) + ' ' + (to2dp(getSaturation(now.valueOf() + ms('3 hr'), m.x + 0.125*ww))) + ' ' + getHue(now.valueOf() + ms('3 hr'), m.y) + ')');
    //document.body.style.setProperty('--gradient-colour', 'oklch(' + 1 + ' ' + (to2dp(0.5/saturation)) + ' ' + getHue(now) + ')');
    document.body.style.opacity = 1;
		return () => { clearInterval(interval); };
	});

</script>
  
<svelte:window bind:innerWidth={ww} bind:innerHeight={wh} onmousemove={handleMousemove} />

<main>

  <header class="name-container">
    <div class="text-container">
      <h1>elliot ellis</h1>
    </div>
  </header>

  {@render children()}
</main>

<style>

  main {
    color: contrast-color(var(--background-colour));
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .name-container {
    width: var(--header-width);
    padding: 1rlh 0 0 var(--site-x-margin);
    position: absolute;
    top: 0; left: var(--prev-area-width); 
    z-index: 2;
    
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
  </style>
{/if}