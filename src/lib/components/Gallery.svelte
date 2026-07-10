<script>
  import Work from '$lib/components/Work.svelte';
  let { data } = $props();
  let activeWork = $state(undefined);
</script>

<div class="gallery">

  {#each data.data as work, i}
    <Work data={work} active={activeWork === i} onToggle={() => activeWork = activeWork === i ? undefined : i} />
  {/each}
  
</div>

<style>

  .gallery {
    --text-colour: white;
    --work-spacing: 2rlh;
    --gallery-top-padding: calc( var(--site-top-margin) - var(--work-spacing) );
    --background-colour: hsl(270 5 50);
    padding-top: var(--gallery-top-padding);
    padding-bottom: 6rlh;
    background-color: var(--background-colour);
    color: var(--text-colour);
    display: flex;
  }

</style>