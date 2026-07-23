<script>
  let { data } = $props();
</script>

<div class="image-container">
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
</div>

<style>

  .image-container {
    width: 100%;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

</style>