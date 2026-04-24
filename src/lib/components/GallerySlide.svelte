<script>
  let content = $props();
</script>

<div class="slide">
  {#if content.imgSrc && content.imgAlt}
    {#if content.videoSrc}
      <video src={content.videoSrc} poster={content.imgSrc} alt={content.imgAlt}></video>
    {:else}
      <img src={content.imgSrc} alt={content.imgAlt}>
    {/if}
  {:else}
    Error! No imgSrc and/or imgAlt.
  {/if}
</div>

<style>
  .slide {
    width: 100%;
    height: 100%;
  }

  img, video {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>