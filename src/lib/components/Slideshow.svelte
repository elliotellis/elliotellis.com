<script>
	import { asset } from '$app/paths';
  import Navigation from '$lib/components/SlideshowNavigation.svelte';
  import Text from '$lib/components/Text.svelte';
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

</script>

{#snippet slideMarkup(slide, current, showCaption)}
  <div 
    class={[
      'slide', 
      slide.background ? 'has-custom-background' : '',
      current ? 'is-current' : ''
    ]} 
    
  >

    {#if slide.type === 'text'}
      <Text blocks={slide.mainText} dynamicIndents={true} />

    {:else if slide.type === 'image'} 
      <div class={['media-container', slide.layout]}>
        <img src={asset('/media/' + slide.imgFilename)} alt={slide.imgAlt}>    
      </div>

    {:else if slide.type === 'animation'}
      <div class="media-container">
        <video src={asset('/media/' + slide.videoFilename)} muted autoplay loop playsinline></video>
      </div>

    {/if}

    {#if slide.caption}
      <div class="caption-container">
        <Text blocks={slide.caption} />
      </div>
    {/if}
  </div>
{/snippet}

{#each content as slide, i}
  {@render slideMarkup(slide, i === currentSlideIndex ? true : false, true)}
{/each}

{#if content.length > 1}
  <Navigation prev={prevSlide} next={nextSlide} />
{/if}


<style>

  .slide {
    padding-top: 1rlh;
    grid-column: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1; 
    opacity: 0.05;
    mix-blend-mode: soft-light;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--slide-background);
    transition: opacity 0.05s, filter 0.05s;
    pointer-events: none;
  }

  .slide.has-custom-background {
    color: contrast-color(var(--slide-background));
  }

  .slide.is-current {
    z-index: 0;
    opacity: 0.95;
    filter: none;
    mix-blend-mode: normal;
    pointer-events: unset;
  }

  /*.slide :global(.text-container) {
    padding-left: var(--site-x-margin);
    padding-right: var(--site-x-margin);
  }*/

  .media-container {
    width: 100%;
    height: round(down, calc(100% - var(--caption-height)), 1rlh);
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
  
  .caption-container {
    width: 100%;
    height: var(--caption-height);
  }

</style>