<script>
  import Work from '$lib/components/Work.svelte';
  let { works } = $props();
</script>

<section class="works main-content">

  {#each works as work}
    <Work content={work} />
  {/each}

</section>

<style>
  .works {
		--background-colour: var(--colour-lightgrey);
    background-color: var(--background-colour);
  }
</style>