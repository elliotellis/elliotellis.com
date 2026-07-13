<script>
  let { original, small, srcset, srcsetWebp, alt } = $props();
</script>

<picture>
  <source srcset={srcsetWebp} type="image/webp">
  <img alt={alt} src={small} srcset={srcset} loading="lazy">
</picture>