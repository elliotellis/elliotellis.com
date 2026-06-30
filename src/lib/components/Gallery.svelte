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

<div class="gallery" bind:offsetWidth={galleryWidth}>
  <div class="slides-container" style:width={slideWidth * 2 + 'px'}>

    {#snippet slide(slide, i)}
      <div 
        class="slide" 
        style:background-color={slide.background} 
        style:width={slideWidth + 'px'}
        style:padding-top={slide.type === 'text' ? 'var(--top-padding)' : 0}
      >
        
          {#if slide.type === 'text'}
            <TextBlocks blocks={slide.textBlocks} />
          {:else if slide.type === 'image'} 
            <figure>
              <div class="media-container">
                <img src={asset('/images/' + slide.imgFilename)} alt={slide.imgAlt}>
              </div>
              <figcaption>
                <div class="text-container">
                  <p class="caption">{slide.caption}</p>
                </div>
              </figcaption>
            </figure>
          {/if}
        
      </div>
    {/snippet}

    {@render slide(content[currentSlideIndex])}
    {@render slide(content[nextSlideIndex])}

  </div>
  
  {#if content.length > 1}
    <Navigation prev={prevSlide} next={nextSlide} />
  {/if}
</div>

<style>

  .gallery {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .slides-container {
    height: 100%;
    display: flex;
    align-items: flex-start;
  }

  .slide {
    height: 100%;
  }

  figure {
    height: 100%;
  }

  .media-container {
    height: round(down, calc(100% - 3rlh), 1rlh);
  }

  img, video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  figcaption {
    height: 3rlh;
  }

  

</style>