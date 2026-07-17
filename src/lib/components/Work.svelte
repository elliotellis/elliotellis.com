<script>
  import Text from "$lib/components/Text.svelte";
  import Image from "$lib/components/Image.svelte";
  let { data, active, toggleActive, muted, toggleMuted } = $props();
  let time = $state(0);
  let duration = $state(0);
</script>

<div 
  id={data.slug}
  class={['work', {active}]}
  style:float={Math.random() < 0.5 ? 'left': 'right'}
>

  <div 
    class="media-container" 
    style:aspect-ratio={data.aspectRatio[0] + ' / ' + data.aspectRatio[1]}
    style:--media-ratio-width={data.aspectRatio[0]}
    style:--media-ratio-height={data.aspectRatio[1]}
    style:--media-margin-top={Math.floor(Math.random() * 4)}
    style:--media-margin-right={Math.floor(Math.random() * 4)}
    style:--media-margin-bottom={Math.floor(Math.random() * 4)}
    style:--media-margin-left={Math.floor(Math.random() * 4)}
    data-orientation={parseInt(data.aspectRatio[0]) > parseInt(data.aspectRatio[1]) ? 'landscape' : parseInt(data.aspectRatio[0]) < parseInt(data.aspectRatio[1]) ? 'portrait' : 'square'}
    data-thumbnail-size={data.thumbnailSize}
  >
    <a class="work-anchor" href={'#' + data.slug} onclick={toggleActive}>Expand work</a>
    {#if data.video && data.videoThumbnail}
      <video 
        src={active ? data.video : data.videoThumbnail} 
        poster={data.image.small} 
        loading="lazy"
        bind:muted
        bind:currentTime={time}
        bind:duration
        loop autoplay playsinline
        disablepictureinpicture
      ></video>
    {:else}
      <Image
        original={data.image.original}
        small={data.image.small}
        srcset={data.image.srcset}
        srcsetWebp={data.image.srcsetWebp}
      />
    {/if}
  </div>

  <div class="work-footer">

    {#if active && data.video}
      <div class="media-duration">
        <div class="media-progress" style:--progress={(time / duration) * 100 + '%'}></div>
      </div>
    {/if}

      <div class="media-controls">
        {#if active && data.video}
          <button onclick={toggleMuted}>{muted ? 'Unmute' : 'Mute'}</button>
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

</div>

<style>
  .work {
    --caption-min-height: 3rlh;
    padding: var(--work-spacing-y) var(--work-spacing-x);
    max-width: 100%;
    float: left;
    display: flex;
    flex-direction: column;
    align-items: end; 
  }

  .media-container {
    max-width: 100%;
    max-height: calc(100vh - var(--caption-min-height) - var(--work-spacing-y));
  }

  :global(.gallery:has(.work:not(.active) .media-container:hover)) .work:not(:hover) .media-container::before {
    content: '';
    display: block;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: var(--background-colour);
  }

  .media-container {
    --media-margin-scale: 0.25;
    --media-scale: 0.5;
    --media-target-height: 12rlh;
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

  .media-container[data-thumbnail-size="larger"] {
    --media-target-height: 18rlh; 
  }

  .media-container[data-thumbnail-size="smaller"] {
    --media-target-height: 8rlh; 
  }

  /* might replace all the below breakpoints 
   * with no-breakpoint vw unit-based calculation instead 
   */

  @media only screen and (min-width: 32rem) {
    .media-container { 
      --media-margin-scale: 0.5;
      --media-scale: 0.625;
    } 
  }
  
  @media only screen and (min-width: 40rem) {
    .media-container { 
      --media-margin-scale: 0.75;
      --media-scale: 0.75;
    } 
  }

  @media only screen and (min-width: 48rem) {
    .media-container { 
      --media-margin-scale: 0.875;
      --media-scale: 0.875;
    } 
  }

  @media only screen and (min-width: 60rem) {
    .media-container { 
      --media-margin-scale: 1;
      --media-scale: 1; 
    } 
  }

  .work.active .media-container {
    height: auto;
  }

  .work:not(.active) .media-container {
    margin-top: round( calc( var(--media-margin-top) * var(--media-margin-scale) * 1rlh ), 1rlh);
    margin-right: round( calc( var(--media-margin-right) * var(--media-margin-scale) * 1rem ), 1rem);
    margin-bottom: round( calc( var(--media-margin-bottom) * var(--media-margin-scale) * 1rlh ), 1rlh);
    margin-left: round( calc( var(--media-margin-left) * var(--media-margin-scale) * 1rem ), 1rem);
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

  .work-footer {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.75rem;
    line-height: 0.75rlh;
  }

  .media-duration {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 0.125rlh;
  }

  .media-progress {
    position: absolute;
    width: var(--progress);
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--text-colour);
  }

  .caption-container {
    min-height: var(--caption-min-height);
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
    color: var(--grey-text-colour);
    float: left;
  }

</style>