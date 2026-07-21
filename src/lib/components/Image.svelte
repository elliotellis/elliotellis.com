<script>
  let { src, srcset, srcsetWebp, alt } = $props();
</script>

<picture>
  <source srcset={srcsetWebp} type="image/webp">
  <img alt={alt} src={src} srcset={srcset} loading="lazy">
</picture>