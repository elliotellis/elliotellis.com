<script>
  import Work from '$lib/components/Work.svelte';
  import { onMount } from 'svelte';
  let { data } = $props();
  let activeWork = $state(undefined);
  let works = $state(null);

  function shuffle(array) {
    for (let i = array.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; }
    return array; }

  onMount(() => {
    works = shuffle(data.data);
  });
</script>

<div class="gallery">

  {#if works}
    {#each works as work, i}
      <Work data={work} active={activeWork === i} onToggle={() => activeWork = activeWork === i ? undefined : i} />
    {/each}
  {/if}
  
</div>

<style>

  .gallery {
    --text-colour: white;
    --work-spacing: 2rlh;
    --gallery-top-padding: calc( var(--site-top-margin) - var(--work-spacing) );
    --gallery-background-colour: hsl(270 5 50);
    padding-top: var(--gallery-top-padding);
    padding-bottom: 6rlh;
    background-color: var(--gallery-background-colour);
    background-color: oklch(from var(--background-colour) 0.5 0.01 h);
    min-height: 100vh;
    color: var(--text-colour);
    overflow: hidden;
  }

</style>