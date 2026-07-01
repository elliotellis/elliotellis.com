<script>
	import { asset } from '$app/paths';
  import Navigation from '$lib/components/GalleryNavigation.svelte';
  import TextBlocks from '$lib/components/TextBlocks.svelte';
  let { content } = $props();
  let galleryWidth = $state(0);
  let currentSlideIndex = $state(0);
  let nextSlideIndex = $derived(getNextSlideIndex(currentSlideIndex));
  const slideWidth = $derived(galleryWidth * 0.9);

  function getNextSlideIndex(currentIndex) {
    return currentIndex === (content.length - 1) ? 0 : currentIndex + 1;
  }

  const prevSlide = () => {
    if (currentSlideIndex === 0) {
      currentSlideIndex = content.length - 1;
    } else {
      currentSlideIndex--;
    }
  }

  const nextSlide = () => {
    if (currentSlideIndex === content.length - 1) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex++;
    }
  }

  $inspect("Current " + currentSlideIndex);
  $inspect("Next " + nextSlideIndex);
</script>

<div class="gallery">
  <div class="slides-container">

    {#snippet slide(slide, showCaption)}
      <div class={['slide', slide.background ? 'has-custom-background' : '']} style:--slide-background={slide.background}>

        {#if showCaption}
          <div class="caption-container">
            <TextBlocks blocks={slide.caption} />
          </div>
        {/if}

        {#if slide.type === 'text'}
          <TextBlocks blocks={slide.mainText} dynamicIndents={true} />

        {:else if slide.type === 'image'} 
          <div class={['media-container', slide.layout]}>
            <img src={asset('/media/' + slide.imgFilename)} alt={slide.imgAlt}>    
          </div>

        {:else if slide.type === 'animation'}
          <div class="media-container">
            <video src={asset('/media/' + slide.videoFilename)} muted autoplay loop playsinline></video>
          </div>

        {/if}
      </div>
    {/snippet}

    {@render slide(content[currentSlideIndex], true)}
    {@render slide(content[nextSlideIndex])}

  </div>
  
  {#if content.length > 1}
    <Navigation prev={prevSlide} next={nextSlide} />
  {/if}
</div>

<style>

  .gallery {
    --text-y-margin: 5rlh;
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .slides-container {
    height: 100%;
    display: flex;
    align-items: flex-start;
    padding-left: var(--prev-area-width);
  }

  .slides-container > * {
    flex-shrink:  0;
  }

  .slide {
    width: calc(100vw - var(--prev-area-width) - var(--next-area-width));
    height: 100%;
    display: flex;
    align-items: flex-start;
    background-color: var(--slide-background);
  }

  .slide.has-custom-background {
    color: contrast-color(var(--slide-background));
  }

  :global(.text-container) {
    margin-top: var(--text-y-margin);
  }
  
  .caption-container {
    width: var(--header-width);
    padding-left: var(--site-x-margin);
    padding-right: var(--site-x-margin);
  }

  .media-container {
    /*height: round(down, calc(100% - 3rlh), 1rlh);*/
    height: 100%;
    display: flex;
    align-items: start;
  }

  .media-container.cover img, 
  .media-container.cover video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img, video {
    display: block;
    max-width: 100%;
    max-height: 100%;
  } 

</style>