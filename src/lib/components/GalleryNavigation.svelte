<script>
  let { prev, next } = $props();
</script>

<button class="gallery-arrow prev" onclick={prev}>
  <span>&#x2190;</span>
</button>

<button class="gallery-arrow next" onclick={next}>
  <span>&#x2192;</span>
</button>

<style>
  button {
    border: none;
    background: transparent;
    margin: 0;
    padding: 0;
    color: inherit;
    font: inherit;
    width: 10%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button.next {
    left: 90%;
  }

  span {
    display: block;
  }
</style>