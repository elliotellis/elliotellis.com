<script>
  let { children } = $props();
</script>

<div class="gallery-container">
  {@render children()}
</div>

<style>
  .gallery-container {
    width: 100%;
    margin-left: 2rem;
  }
</style>