<script>
  let { data } = $props();
</script>

<picture>
  {#if data.srcsetWebp}
    <source srcset={data.srcsetWebp} type="image/webp">
  {/if}
  <img 
    alt={data.alt}
    src={data.src} 
    srcset={data.srcset} 
    loading="lazy"
  >
</picture>