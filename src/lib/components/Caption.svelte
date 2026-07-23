<script>
  let { children } = $props();
</script>

<p>
  {@render children()}
</p>

<style>
  p {
    margin-top: 0.5rlh;
    font-size: 0.75rem;
    line-height: 0.75rlh;
  }
</style>