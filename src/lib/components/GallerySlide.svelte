<script>
  let content = $props();
</script>

<div class="slide">
  {#if content.imgSrc}
    {#if content.videoSrc}
      <video src={content.videoSrc} poster={content.imgSrc} alt={content.imgAlt} muted autoplay loop playsinline></video>
    {:else}
      <enhanced:img src={content.imgSrc} alt={content.imgAlt} />
    {/if}
  {:else}
    Error! No imgSrc and/or imgAlt.
  {/if}
</div>

<style>
  .slide {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  img, video {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
</style>