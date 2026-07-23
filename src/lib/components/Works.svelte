<script>
  import { onMount } from "svelte";
  import Image from '$lib/components/Image.svelte';
  import Caption from '$lib/components/Caption.svelte';
  let { data } = $props();
  let works = $state(null);

  let galleryWidth = $state();

  let activeWorkIndex = $state(undefined);

  const paradiddle = ['L', 'R', 'L', 'L', 'R', 'L', 'R', 'R'];

  function shuffle(array) {
    for (let i = array.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; }
    return array; }

  onMount(() => {
    works = shuffle(data.works);
  });
</script>

<div class="works-gallery" bind:clientWidth={galleryWidth} >

  {#if works}
    <pre>
      {JSON.stringify(works[0], null, 2)}
    </pre>

    {#each works as work, w}
      {const active = activeWorkIndex === w ? true : false}
      <div 
        id={work.slug} 
        class={['work', active && 'active']}
        style:float={paradiddle[w % paradiddle.length] === 'L' ? 'left' : 'right'}
      >

        <div class="work-media">

          <div 
            class="media-container media-thumbnail"
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

          <div class="media-container media-main">
            {#if active}
              {#if work.video}
                <VideoInterface video={work.video} image={work.image} />
              {:else}
                <Image data={work.image} />
              {/if}
            {/if}
          </div>
        </div>

        {#if active}
          <div class="work-caption">
            {#each work.caption as cap, c}
              <Caption>{cap}</Caption>
            {/each}
          </div>
        {/if}

      </div>
    {/each}
  {/if}
  
</div>

<style>

  .works-gallery {
    padding-top: var(--site-top-margin);
    padding-bottom: 6rlh;
    min-height: 100vh;
    overflow: hidden;
  }

  .work {
    padding: 1rlh var(--site-hmargin);
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