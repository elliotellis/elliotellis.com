<script>
  import Paragraph from '$lib/components/Paragraph.svelte'
  let { blocks } = $props();
</script>

<div class="text-container">
  {#each blocks as block}
    <Paragraph data={block} />
  {/each}
</div>