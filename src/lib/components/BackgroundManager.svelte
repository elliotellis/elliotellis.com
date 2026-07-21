<script>
  import { SvelteDate } from 'svelte/reactivity';
  import * as sun from 'suncalc';
  import ms from 'ms';
    import { onMount } from 'svelte';
  let { debug = false, children } = $props();

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
  let dayPointMarkerPos = $derived( to2dp(range(dayStart, dayEnd, 0, 100, now)) );
  let yearPointMarkerPos = $derived( to2dp(range(yearStart, yearEnd, 0, 100, now)) );
  
  /* OKLCH values: 
   * let dayPoints = [
   *   { label: 'dayStart',      s:   5, l: 10, okl: 0.1,  okc: 0.1,  t: dayStart }, 
   *   { label: 'nauticalDawn',  s:  10, l: 15, okl: 0.15, okc: 0.1,  t: sunTimes.nauticalDawn }, 
   *   { label: 'goldenHourEnd', s:  90, l: 60, okl: 0.6,  okc: 0.35,  t: sunTimes.goldenHourEnd }, 
   *   { label: 'noon-1h',       s:  90, l: 60, okl: 0.8,  okc: 0.15,  t: new Date(sunTimes.solarNoon - ms('1h')) }, 
   *   { label: 'solarNoon',     s: 100, l: 95, okl: 1,    okc: 0,    t: sunTimes.solarNoon },  
   *   { label: 'noon+1h',       s:  90, l: 60, okl: 0.8,  okc: 0.15,  t: new Date(sunTimes.solarNoon.valueOf() + ms('1h')) },
   *   { label: 'goldenHour',    s:  90, l: 60, okl: 0.6,  okc: 0.35,  t: sunTimes.goldenHour }, 
   *   { label: 'nauticalDusk',  s:  10, l: 15, okl: 0.15, okc: 0.1,  t: sunTimes.nauticalDusk }, 
   *   { label: 'dayEnd',        s:   5, l: 10, okl: 0.1,  okc: 0.1,  t: dayEnd }, 
   * ];
   */

  let dayPoints = [
    { label: 'dayStart',      s:  15, l: 15, okl: 0.1,  okc: 0.1,  t: dayStart }, 
    { label: 'nauticalDawn',  s:  25, l: 20, okl: 0.15, okc: 0.1,  t: sunTimes.nauticalDawn }, 
    { label: 'goldenHourEnd', s:  90, l: 60, okl: 0.6,  okc: 0.35,  t: sunTimes.goldenHourEnd }, 
    { label: 'noon-1h',       s: 100, l: 75, okl: 0.8,  okc: 0.15,  t: new Date(sunTimes.solarNoon - ms('1h')) }, 
    { label: 'solarNoon',     s: 100, l:100, okl: 1,    okc: 0,    t: sunTimes.solarNoon },  
    { label: 'noon+1h',       s: 100, l: 75, okl: 0.8,  okc: 0.15,  t: new Date(sunTimes.solarNoon.valueOf() + ms('1h')) },
    { label: 'goldenHour',    s:  90, l: 60, okl: 0.6,  okc: 0.35,  t: sunTimes.goldenHour }, 
    { label: 'nauticalDusk',  s:  25, l: 20, okl: 0.15, okc: 0.1,  t: sunTimes.nauticalDusk }, 
    { label: 'dayEnd',        s:  15, l: 15, okl: 0.1,  okc: 0.1,  t: dayEnd }, 
  ];

  let hueBase = $derived( invlerp(dayStart, dayEnd, debug ? m.x/ww : now) * 360 * 24 * 4  );
  let hueOffset = $derived( invlerp(yearStart, yearEnd, now) * 360 );
  let hue = $derived( to2dp(hueBase + hueOffset) );
  let saturation = $derived(piecewiseLinear(
    dayPoints.map((i) => tp(i.t)),
    dayPoints.map((i) => i.okc), // change s to okc for oklch
    debug ? m.x/ww : tp(now)
  ));

  let lightness = $derived(piecewiseLinear(
    dayPoints.map((i) => tp(i.t)),
    dayPoints.map((i) => i.okl), // change l to okl for oklch
    debug ? m.x/ww : tp(now)
  ));

  /*const getHue = (time, dc) => to2dp( invlerp(
   *  yearStart, 
   *  yearEnd, 
   *  (debug ? dc/wh : time)
   *) * 360 + 180 );
   *
   *const getSaturation = (time, dc) => piecewiseLinear(
   *  dayPoints.map((i) => tp(i.t)),
   *  dayPoints.map((i) => i.okc),
   *  (debug ? dc/ww : tp(time))
   *);
   *
   *const getLightness = (time, dc) => piecewiseLinear(
   *  dayPoints.map((i) => tp(i.t)),
   *  dayPoints.map((i) => i.okl),
   *  (debug ? dc/ww : tp(time))
   *);*/

  const handleMousemove = (event) => { 
    m.x = event.clientX; 
    m.y = event.clientY; 
    dt.setTime(range(0, ww, dayStart, dayEnd, m.x));
  }

  function handleKeydown(event) {
    if (event.key === 'b') {
      debug = !debug;
    }
  }

  const setBackground = () => {
    document.body.style.setProperty('--background-colour', 'oklch(' + (to2dp(lightness)) + ' ' + (to2dp(saturation)) + ' ' + hue + ')');
    //document.body.style.setProperty('--background-colour', 'hsl(' + hue + ' ' + to2dp(saturation) + ' ' + to2dp(lightness) + ')');
  }

  onMount(() => {
    setBackground();
  });
  
  $effect(() => {
		const interval = setInterval(() => { now.setTime(Date.now()); }, 1000);
    setBackground();
		return () => { clearInterval(interval); };
	});

</script>

<svelte:window bind:innerWidth={ww} bind:innerHeight={wh} onmousemove={handleMousemove} onkeydown={handleKeydown} />

{#if debug}

  <div class="day-points">
      {#each dayPoints as point}
        <span class="point-marker" style:left={tp(point.t)*100 + '%'}>
          {point.label}<br>{point.t.toLocaleTimeString()}
        </span>
      {/each}

      <div class="now-marker" style:left={debug ? (m.x + 'px') : (dayPointMarkerPos + '%')}>
        {debug ? dt.toLocaleTimeString() : ''}
      </div>

      <div class="colour-values">chroma {to2dp(saturation)} / light {to2dp(lightness)} <br>chroma {to2dp(1-saturation)} / light {1}</div>

  </div>

  <div class="year-points">
    <div class="now-marker" style:top={yearPointMarkerPos + '%'}></div>
  </div>

{/if}

<style>
  .day-points, .year-points {
    --points-colour: contrast-color( var(--text-colour) );
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 1rlh;
    top: 0;
    left: 0;
    overflow: hidden;
    font-size: 0.75rem;
    pointer-events: none;
  }

  .year-points {
    width: var(--site-x-margin);
    height: 100vh;
  }

  .point-marker, .now-marker {
    position: absolute;
    display: block;
    border-left: 1px solid var(--points-colour);
    padding-left: 0.125rem;
    top: 0;
    width: 100%;
    height: 75%;
    
  }

  .now-marker {
    border-left-width: 2px;
    height: 100%;
  }

  .year-points .now-marker {
    border-left: none;
    border-top: 2px solid var(--points-colour);
  }

  .colour-values {
    margin-top: 60px;
    text-align: center;
    width: 100%;
  }
</style>