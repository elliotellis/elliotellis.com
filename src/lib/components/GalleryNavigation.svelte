<script>
  let { prev, next } = $props();
  let m = $state({ x: 0, y: 0 });
  let w = $state({ w: 0, h: 0 });

  let arrowText = $derived(m.x > w.w / 2 ? '\u2192' : '\u2190');

  const handleMousemove = (event) => { 
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<svelte:window bind:innerWidth={w.w} bind:innerHeight={w.h} onmousemove={handleMousemove} />

<button class="gallery-arrow prev" onclick={prev}>
  <span><!-- &#x2190; --></span>
</button>

<button class="gallery-arrow next" onclick={next}>
  <span><!-- &#x2192; --></span>
</button>

<div class="cursor-arrow" style:top={m.y + 'px'} style:left={m.x + 'px'}>{arrowText}</div>

<style>

  .cursor-arrow {
    position: absolute;
    font-size: 4rem;
    z-index: 3;
    pointer-events: none;
  }

  button {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button.prev {
    width: var(--prev-area-width);
  }

  button.next {
    width: var(--next-area-width);
    left: calc(100vw - var(--next-area-width));
  }

  span {
    display: block;
  }
</style>