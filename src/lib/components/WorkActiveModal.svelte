<script>
  import { onMount } from 'svelte';
  import VideoInterface from '$lib/components/VideoInterface.svelte';
  import Image from '$lib/components/Image.svelte';
  import Caption from '$lib/components/Caption.svelte';
  import { dev } from '$app/environment';
  let { work, thumbnailRect, toggleActive } = $props();
  let canShow = $state(false);
  let mediaEl;
  let mediaRect = $state({ w: 0, h: 0, x: 0, y: 0 });

  onMount(() => {
    let rect = mediaEl.getBoundingClientRect();
    mediaRect.w = rect.x; // to fix
    mediaRect.h = rect.x; // to fix
    mediaRect.x = rect.x; // to fix
    mediaRect.y = rect.y; // to fix
    canShow = true;
  });
</script>

<div class="active-work-modal">

  <button 
    class="work-toggle" 
    style:width={dev ? "50%" : undefined} 
    onclick={toggleActive}
  >Close work</button>

  <div 
    class="media-container media-main"
    style:opacity={canShow ? "1" : "0"}
    bind:this={mediaEl}
  >
    {#if work.video}
      <VideoInterface video={work.video} image={work.image} />
    {:else}
      <Image data={work.image} />
    {/if}
  </div>

  <div class="work-caption">
    {#each work.caption as cap, c}
      <Caption>{cap}</Caption>
    {/each}
  </div>

</div>


<div 
  class="active-work-animation-box"
  style:top={canShow ? mediaRect.y : thumbnailRect.y}
  style:left={canShow ? mediaRect.x : thumbnailRect.x}
  style:width={canShow ? mediaRect.w : thumbnailRect.w}
  style:height={canShow ? mediaRect.h : thumbnailRect.h}
></div>

<style>

  .active-work-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 1rlh var(--site-hmargin);
    background-color: hsl(from var(--background-colour) h s l / 95%);
    display: flex;
    flex-direction: column;
    z-index: 5;
  }

  .media-main {

  }

  .active-work-animation-box {
    position: absolute;
    border: 1px solid var(--text-colour);
    transition: top 1s, left 1s, width 1s, height 1s;
    z-index: 5;
  }

</style>