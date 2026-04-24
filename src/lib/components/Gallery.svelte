<script>
  let { media } = $props();
  import Slide from '$lib/components/GallerySlide.svelte';
  import Navigation from '$lib/components/GalleryNavigation.svelte';

  let currentSlideIndex = $state(0);

  const prevSlide = () => {
    if (currentSlideIndex === 0) {
      currentSlideIndex = media.length - 1;
    } else {
      currentSlideIndex--;
    }
  }

  const nextSlide = () => {
    if (currentSlideIndex === media.length - 1) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex++;
    }
  }
</script>

<div class="gallery-container">

  {#if media.length === 0}
    Error! No media.
  {:else}
    <Slide 
      slideNumber={currentSlideIndex + 1}
      imgSrc={media[currentSlideIndex].imgSrc}
      imgAlt={media[currentSlideIndex].imgAlt}
      videoSrc={media[currentSlideIndex].videoSrc}
    />
  {/if}
  
  {#if media.length > 1}
    <Navigation prev={prevSlide} next={nextSlide} />
  {/if}
</div>

<style>

  .gallery-container {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    background-color: var(--colour-midgrey);
    position: relative;
  }

</style>