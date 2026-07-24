<script>
  import Image from '$lib/components/Image.svelte';
  import WorkActiveModal from '$lib/components/WorkActiveModal.svelte';
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  let { work, active, toggleActive, muted, toggleMuted, float } = $props();
  let opened = $state(false);
  let thumbnailEl;
  let thumbnailRect = $state({ w: 0, h: 0, x: 0, y: 0 });

  onMount(() => {
    let rect = thumbnailEl.getBoundingClientRect();
    thumbnailRect.w = rect.x; // to fix
    thumbnailRect.h = rect.x; // to fix
    thumbnailRect.x = rect.x; // to fix
    thumbnailRect.y = rect.y; // to fix
  });
</script>

<!--//////////////////////////////////////////////////////////////////////////////////////// -->
<!--//////////////////////////////////////////////////////////////////////////////////////// -->
<!--//////////////////////////////////////////////////////////////////////////////////////// -->

<div 
  id={work.slug} 
  class={['work', active && 'active']}
>
  <button 
    class="work-toggle" 
    style:width={dev ? "50%" : undefined} 
    onclick={() => {
      toggleActive();
      if (active && !opened) opened = true;
    }}
  >Expand work</button>

  <div 
    class="media-container media-thumbnail"
    bind:this={thumbnailEl}
    data-thumbnail-size={work.thumbnailSize}
    style:aspect-ratio={work.aspectRatio[0] + ' / ' + work.aspectRatio[1]} 
    style:--ratio-width={work.aspectRatio[0]}
    style:--ratio-height={work.aspectRatio[1]}
    style:--margin-top={Math.floor(Math.random() * 4)}
    style:--margin-bottom={Math.floor(Math.random() * 4)}
    style:--margin-left={Math.floor(Math.random() * 4)}
    style:--margin-right={Math.floor(Math.random() * 4)}
    /* Compatibility for browsers that don't support sqrt() CSS type */
    style:--width-calc={Math.sqrt(work.aspectRatio[0] / work.aspectRatio[1])}
    style:--height-calc={Math.sqrt(work.aspectRatio[1] / work.aspectRatio[0])}
  >
    <Image data={work.animation || work.image} />
  </div>

  {#if active}
    <WorkActiveModal {work} {thumbnailRect} {toggleActive} />
  {/if}

</div>

<!--//////////////////////////////////////////////////////////////////////////////////////// -->
<!--//////////////////////////////////////////////////////////////////////////////////////// -->
<!--//////////////////////////////////////////////////////////////////////////////////////// -->

<style>

  .work {
    padding: 1rlh var(--site-hmargin);
    position: relative;
  }

  :global(.work-toggle) {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 4;
  }

  .media-thumbnail {
    --base-size-default: 12rem;
    --base-size-default: 25svw;
    --base-size-small: calc( var(--base-size-default) * 2/3 );
    --base-size-large: calc( var(--base-size-default) * 4/3 );
    --base-size: var(--base-size-default);
    /* Compatibility for browsers that don't support sqrt() CSS type */
    width: calc( var(--base-size) * var(--width-calc) );
    height: calc( var(--base-size) * var(--height-calc) );
    /* Modern CSS syntax */
    width: calc( var(--base-size) * sqrt( var(--ratio-width) / var(--ratio-height) ) );
    height: calc( var(--base-size) * sqrt( var(--ratio-height) / var(--ratio-width) ) );
    width: calc( var(--base-size) * sqrt( var(--ratio-width) / var(--ratio-height) ) );
    height: calc( var(--base-size) * sqrt( var(--ratio-height) / var(--ratio-width) ) );
    --base-vmargin: 1rem;
    --base-vmargin: 1rlh;
    --base-vmargin: 2.5svh;
    margin-top: calc( var(--base-vmargin) * var(--margin-top) );
    margin-bottom: calc( var(--base-vmargin) * var(--margin-bottom) );
    --base-hmargin: 1rem;
    --base-hmargin: 2.5svw;
    margin-left: calc( var(--base-hmargin) * var(--margin-top) );
    margin-right: calc( var(--base-hmargin) * var(--margin-bottom) );
  }

</style>