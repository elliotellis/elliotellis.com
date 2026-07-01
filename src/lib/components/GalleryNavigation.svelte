<script>
  let { prev, next } = $props();
</script>

<button class="gallery-arrow prev" onclick={prev}>
  <span><!-- &#x2190; --></span>
</button>

<button class="gallery-arrow next" onclick={next}>
  <span><!-- &#x2192; --></span>
</button>

<style>
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