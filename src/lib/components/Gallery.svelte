<script>
  import Work from '$lib/components/Work.svelte';
  let { data } = $props();
  let activeWork = $state(undefined);
  $inspect(activeWork);
</script>

<div class="gallery">

  {#each data.data as work, i}
    <Work data={work} active={activeWork === i} onToggle={() => activeWork = activeWork === i ? undefined : i} />
  {/each}
  
</div>

<style>

  .gallery {
    --gallery-top-padding: 0;
    --background-colour: hsl(270 5 50);
    padding-top: var(--gallery-top-padding);
    background-color: var(--background-colour);
    color: white;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
  }

  @media only screen and (min-width: 32rem) {
    .gallery {
      grid-column: 2;
    }
  }

</style>