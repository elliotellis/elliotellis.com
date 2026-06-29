<script>
  let { content } = $props();
  import Navigation from '$lib/components/GalleryNavigation.svelte';
  import TextBlocks from '$lib/components/TextBlocks.svelte';

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

<div class="gallery">
  {#each content as slide}
    <div class="slide" style:background-color={slide.background}>
      {#if slide.type === 'text'}
        <br>
        <TextBlocks blocks={slide.textBlocks} />
      {:else if slide.type === 'image'}
        <img src={slide.imgSrc} alt={slide.imgAlt}>
      {/if}
    </div>
  {/each}
  
  {#if content.length > 1}
    <Navigation prev={prevSlide} next={nextSlide} />
  {/if}
</div>

<style>

  .gallery {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .slide {
    width: 100%;
    height: 100%;
    padding-top: var(--top-padding);
  }

  img, video {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

</style>