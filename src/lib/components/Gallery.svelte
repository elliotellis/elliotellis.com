<script>
  let { data } = $props();
  let activeWork = $state(undefined);

  const handleClick = (i) => {
    if (activeWork === i) {
      activeWork = undefined
    } else {
      activeWork = i;
    }
  }

  $inspect(activeWork);
</script>


<div class="gallery">

  {#each data.data as work, i}
    <div 
      id={'work--' + work.slug}
      class={['work', i === activeWork ? 'open' : '']}
      style:height={i === activeWork ? '' : work.galleryHeight + 'rlh'}
    >

      <a href={''} onclick={handleClick(i)}>
        <div class="media-container">
          {#if work.video}
            <video src={work.video} muted loop autoplay playsinline></video>
          {:else}
            <img src={work.image} alt={work.alt}>
          {/if}
        </div>
      </a>

      {#if i === activeWork && work.caption}
        <div class="caption-container">
          <div class="text-container">
            {@html work.caption}
          </div>
        </div>
      {/if}

    </div>
  {/each}
  
</div>

<style>

  .gallery {
    --gallery-top-padding: 0;
    --captions-height: 2rlh;
    padding-top: var(--gallery-top-padding);
    background-color: hsl(270 5 50);
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  @media only screen and (min-width: 32rem) {
    .gallery {
      --gallery-top-padding: 4rlh;
      grid-column: 2;
    }
  }

  .work {
    margin-right: 2rlh;
    margin-bottom: 2rlh;
  }

  .work.open {
    min-width: 66.67%;
    min-height: 6rlh;
    max-height: round(down, 100vh, 1rlh);
  }

  .work.open .media-container {
    height: round(down, calc(100vh - var(--captions-height)), 1rlh);
  }

  .media-container {
    width: auto;
    height: 100%;
  }

  .media-container img,
  .media-container video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .caption-container {
    height: --captions-height;
  }

</style>