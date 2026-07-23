<script>
  import Work from '$lib/components/Work.svelte';
  import { onMount, tick } from 'svelte';
  let { data } = $props();
  let activeWork = $state(undefined);
  let activeWorkSlug = $derived( data.works[activeWork].slug );
  let works = $state(null);
  let muted = $state(true);
  let y = $state(undefined);
  let workEl = $state(undefined);
  const paradiddle = ['L', 'R', 'L', 'L', 'R', 'L', 'R', 'R'];

  function shuffle(array) {
    for (let i = array.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; }
    return array; }

  onMount(() => {
    muted = true;
    works = shuffle(data.data);
  });
</script>

<div class="gallery">

  {#if works}
    {#each works as work, i}
      <Work
        data={work} 
        active={activeWork === i} 
        toggleActive={() => activeWork = activeWork === i ? undefined : i}
        {muted}
        toggleMuted={() => muted = !muted}
        float={paradiddle[i % paradiddle.length] === 'L' ? 'left' : 'right'}
      />
    {/each}
  {/if}
  
</div>

<style>

  .gallery {
    --work-spacing-x: 0.5rem;
    --work-spacing-y: 1rlh;
    --gallery-top-padding: calc( var(--site-top-margin) - var(--work-spacing-y) );
    padding-top: var(--gallery-top-padding);
    padding-bottom: 6rlh;
    min-height: 100vh;
    color: var(--text-colour);
    overflow: hidden;
    /* display: flex;
    flex-wrap: wrap; */
  }

  @media only screen and (min-width: 32rem) {
    .gallery {
      --work-spacing-x: 1rem;
    }
  }

</style>