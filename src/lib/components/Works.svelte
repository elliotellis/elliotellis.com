<script>
  import Work from '$lib/components/Work.svelte';
  let { works } = $props();
</script>

<section class="works section">

  {#each works as work}
    <Work content={work} />
  {/each}

</section>

<style>
  .works {
		--background-colour: var(--colour-lightgrey);
    background-color: var(--background-colour);
  }

  @media only screen and (56rem < width) {
    .works {
      grid-column: divider / site-end;
    }
  }
  
</style>