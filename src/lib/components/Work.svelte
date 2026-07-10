<script>
  import Text from "$lib/components/Text.svelte";
  import Image from "$lib/components/Image.svelte";
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
    style:aspect-ratio={data.aspectRatio[0] + ' / ' + data.aspectRatio[1]}
    style:--media-ratio-width={data.aspectRatio[0]}
    style:--media-ratio-height={data.aspectRatio[1]}
    data-orientation={parseInt(data.aspectRatio[0]) > parseInt(data.aspectRatio[1]) ? 'landscape' : parseInt(data.aspectRatio[0]) < parseInt(data.aspectRatio[1]) ? 'portrait' : 'square'}
  >
    <a class="work-anchor" href={'#' + data.slug} onclick={onToggle}>Expand work</a>
    {#if data.video && data.videoThumbnail}
      <video src={active ? data.video : data.videoThumbnail} poster={data.image.small} muted loop autoplay playsinline></video>
    {:else}
      <Image
        original={data.image.original}
        small={data.image.small}
        srcset={data.image.srcset}
        srcsetWebp={data.image.srcsetWebp}
      />
    {/if}
  </div>

  {#if active && data.caption}
    <div class="caption-container">
      <Text type="caption">
        <p class="work-year">({data.year})&nbsp;</p>
        {@html data.caption}
      </Text>
    </div>
  {/if}

</div>

<style>
  .work {
    --caption-min-height: 3rlh;
    padding-top: var(--work-spacing);
    padding-right: var(--work-spacing);
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .media-container {
    max-width: 100%;
    max-height: calc(100vh - var(--caption-min-height) - var(--work-spacing));
  }

  /*:global(.gallery:has(.work:hover)) .work:not(.active, :hover) {
    /* something - but this bugs on firefox *
  }*/

  .media-container {
    --media-scale: 1;
    --media-target-height: 10rlh;
    --media-scaled-target-height: calc( var(--media-scale) * var(--media-target-height) );
    --media-ratio-width: 1;
    --media-ratio-height: 1;
    --media-height: calc( var(--media-scaled-target-height) / sqrt( calc( var(--media-ratio-width) / var(--media-ratio-height) ) ) );
    --media-height-rounded: round( up, var(--media-height), 1rlh );
    height: var(--media-height-rounded);
    position: relative;
    /*--media-max-height: round( calc(100vh - var(--caption-min-height) - var(--work-spacing)), 1rlh );
    max-height: var(--media-max-height);*/
  }

  .work.active .media-container {
    height: auto;
  }

  .media-container :global(img),
  .media-container :global(picture),
  .media-container video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
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
    font-size: 0.75rem;
    line-height: 0.75rlh;
  }

  .caption-container :global {
    .text-container {
      max-width: 24em;
    }

    p {
      font-size: inherit;
      line-height: inherit;
    }
  }

  .work-year {
    color: lightgray;
    float: left;
  }

</style>