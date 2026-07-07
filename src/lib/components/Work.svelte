<script>
    import Text from "./Text.svelte";

  let { data, active, onToggle } = $props();
</script>

<div 
  id={data.slug}
  class={['work', {active}]}
  style:--work-height={active ? ('clamp(' + data.galleryHeight + 'rlh, ' + (3 * data.galleryHeight) + 'rlh, round(down, calc(100vh - 2rlh), 1rlh)') : (data.galleryHeight + 'rlh')}
>

  <div class="media-container" style:aspect-ratio={data.aspectRatio}>
    <a class="work-anchor" href={'#' + data.slug} onclick={onToggle}>Expand work</a>
    {#if data.video && data.videoThumbnail}
      <video src={active ? data.video : data.videoThumbnail} muted loop autoplay playsinline></video>
    {:else}
      <img src={data.image} alt={data.alt}>
    {/if}
  </div>

  {#if active && data.caption}
    <div class="caption-container">
      <Text type="caption">
        {@html data.caption}
      </Text>
    </div>
  {/if}

</div>

<style>
  .work {
    --work-height: 12rlh;
    --work-top-padding: 3rlh;
    --caption-min-height: 3rlh;
    height: calc(var(--work-height) + var(--work-top-padding));
    padding-top: var(--work-top-padding);
    margin-right: 3rlh;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .work.active {
    min-width: 66.67%;
    max-width: 100%;
    min-height: 6rlh;
    max-height: round(down, 100vh, 1rlh);
  }

  .work.active .media-container {
    max-height: calc(var(--work-height) - var(--caption-min-height));
  }

  .media-container {
    width: auto;
    height: 100%;
  }

  .media-container img,
  .media-container video {
    width: auto;
    height: 100%;
  }

  /*.media-container {
    width: auto;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
  }*/

  .work-anchor {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  /*.media-container img,
  .media-container video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }*/

  .caption-container {
    min-height: var(--caption-min-height);
  }

</style>