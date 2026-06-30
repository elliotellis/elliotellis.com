<script>
  let { content } = $props();
  import Navigation from '$lib/components/GalleryNavigation.svelte';
  import TextBlocks from '$lib/components/TextBlocks.svelte';
  let galleryWidth = $state(0);
  let currentSlideIndex = $state(0);
  const slideWidth = $derived(galleryWidth * 0.9);

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
</script>

<div class="gallery" bind:offsetWidth={galleryWidth}>
  <div class="slides-container" style:width={slideWidth * 2 + 'px'}>
    {#each content as slide, i}
      {#if i === currentSlideIndex}
        <div class="slide" style:background-color={slide.background} style:width={slideWidth + 'px'}>
          {#if slide.type === 'text'}
            <br>
            <TextBlocks blocks={slide.textBlocks} />
          {:else if slide.type === 'image'} 
            <img src={slide.imgSrc} alt={slide.imgAlt}>
          {/if}
        </div>
      {:else if i === currentSlideIndex + 1}
        <div class="slide" style:padding-left={slideWidth * galleryWidth} style:background-color={slide.background} style:width={slideWidth + 'px'}>
          {#if slide.type === 'text'}
            <br>
            <TextBlocks blocks={slide.textBlocks} />
          {:else if slide.type === 'image'}
            <img src={slide.imgSrc} alt={slide.imgAlt}>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
  
  {#if content.length > 1}
    <Navigation prev={prevSlide} next={nextSlide} />
  {/if}
</div>

<style>

  .gallery {
    width: 100%;
    height: 100%;
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
    padding-top: var(--top-padding);
  }

  img, video {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

</style>