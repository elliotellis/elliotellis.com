<script>
  import Text from "./Text.svelte";
  let { data, active, onToggle } = $props();
</script>
<!--
{const activeHeight   = 'clamp(' + data.galleryHeight + 'rlh, ' + (3 * data.galleryHeight) + 'rlh, round(down, calc(100vh - 2rlh), 1rlh)'}
{const inactiveHeight = data.galleryHeight + 'rlh'}

active ? activeHeight : inactiveHeight
-->

<div 
  id={data.slug}
  class={['work', {active}]}
>

  <div 
    class="media-container" 
    style:aspect-ratio={''/*data.aspectRatio*/}
    style:--media-height={''}
    style:--media-ratio-width={data.aspectRatio[0]}
    style:--media-ratio-height={data.aspectRatio[1]}
    data-orientation={parseInt(data.aspectRatio[1]) > parseInt(data.aspectRatio[0]) ? 'portrait' : 'landscape'}
  >
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
    --caption-min-height: 3rlh;
    padding-top: var(--work-spacing);
    margin-right: var(--work-spacing);
  }

  /*:global(.gallery:has(.work:hover)) .work:not(.active, :hover) {
    /* something - but this bugs on firefox *
  }*/

  .work.active {
    max-width: 100%;
  }

  .media-container {
    --media-scale: 1;
    --media-target-height: 10rlh;
    --media-scaled-target-height: calc( var(--media-scale) * var(--media-target-height) );
    --media-ratio-width: 1;
    --media-ratio-height: 1;
    --media-height: calc( var(--media-scaled-target-height) / sqrt( calc( var(--media-ratio-width) / var(--media-ratio-height) ) ) );
    --media-height-rounded: round( up, var(--media-height), 1rlh );
    --media-max-height: round( calc(100vh - var(--caption-min-height) - var(--work-spacing)), 1rlh );
    height: var(--media-height-rounded);
    max-height: var(--media-max-height);
    aspect-ratio: var(--media-ratio-width) / var(--media-ratio-height);
    position: relative;
  }

  .work.active .media-container {
    --media-target-height: 30rlh;
  }

  .media-container img,
  .media-container video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .work-anchor {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .caption-container {
    min-height: var(--caption-min-height);
  }

</style>