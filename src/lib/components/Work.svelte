<script>
  import Text from "$lib/components/Text.svelte";
  import Image from "$lib/components/Image.svelte";
    import { onMount } from "svelte";
  let { data, active, toggleActive, muted, toggleMuted, float } = $props();
  let time = $state(0);
  let duration = $state(0);
</script>

<div 
  id={data.slug}
  class={['work', {active}]}
  style:float={float}
> 
    <div 
      class="media-container" 
      style:aspect-ratio={data.aspectRatio[0] + " / " + data.aspectRatio[1]}
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
      {#if active && data.video}
        <video 
          src={data.video} 
          poster={data.image.small} 
          loading="lazy"
          bind:muted
          bind:currentTime={time}
          bind:duration
          loop autoplay playsinline
          disablepictureinpicture
        ></video>
      {:else if active}
        <Image
          original={data.image.original}
          src={data.image.small}
          srcset={data.image.srcset}
          srcsetWebp={data.image.srcsetWebp}
          alt={data.alt}
        />
      {:else}
        {#if data.videoThumbnail.gif || data.videoThumbnail.webp}
          <Image
            src={data.videoThumbnail.gif}
            srcsetWebp={data.videoThumbnail.webp}
            alt={data.alt}
          />
        {:else}
          <Image
            src={data.imageThumbnail ? data.imageThumbnail.small : data.image.small}
            srcset={data.imageThumbnail ? data.imageThumbnail.srcset : data.image.srcset}
            srcsetWebp={data.imageThumbnail ? data.imageThumbnail.srcsetWebp : data.image.srcsetWebp}
            alt={data.alt}
          />
        {/if}
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
        <Text type="caption" blocks={data.caption} captionYear={data.year} dynamicIndents={false} />
      </div>
    {/if}

  </div>

</div>

<style>
  .work {
    --caption-min-height: 3rlh;
    padding: var(--work-spacing-y) var(--work-spacing-x);
    float: left;
    /* display: flex;
    flex-direction: column;
    align-items: end;  */
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
    /* display: inline-flex; */
    position: relative;
  }

  .media-container[data-thumbnail-size="larger"] {
    --media-target-height: 18rlh; 
  }

  .media-container[data-thumbnail-size="smaller"] {
    --media-target-height: 8rlh; 
  }

  .work:not(.active) .media-container {
    margin-top: round( calc( var(--media-margin-top) * 2.5vh ), 1rlh);
    margin-bottom: round( calc( var(--media-margin-bottom) * 2.5vh ), 1rlh);
    margin-right: round( calc( var(--media-margin-right) * 2.5vw ), 1rem);
    margin-left: round( calc( var(--media-margin-left) * 2.5vw ), 1rem);
  }

  /* might replace all the below breakpoints 
   * with no-breakpoint vw unit-based calculation instead 
   */

  @media only screen and (min-width: 32rem) {
    .media-container { 
      --media-scale: 0.625;
    } 
  }
  
  @media only screen and (min-width: 40rem) {
    .media-container { 
      --media-scale: 0.75;
    } 
  }

  @media only screen and (min-width: 48rem) {
    .media-container { 
      --media-scale: 0.875;
    } 
  }

  @media only screen and (min-width: 60rem) {
    .media-container { 
      --media-scale: 1; 
    } 
  }

  .media-container :global(img),
  .media-container video {
    display: block;
    width: auto;
    height: 100%;
    /*display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;*/
  }

  .work.active .media-container {
    width: 100%;
    height: auto;
    position: relative;
  }

  .work.active .media-container :global(img),
  .work.active .media-container video {
    display: block;
    width: 100%;
    height: auto;
    max-height: calc(100vh - var(--caption-min-height) - var(--work-spacing-y));
  }

  .work-anchor {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 4;
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

  .media-controls {
    margin-right: 1rem;
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

</style>