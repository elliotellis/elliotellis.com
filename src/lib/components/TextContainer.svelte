<script>
  import Paragraph from '$lib/components/Paragraph.svelte'
  let { blocks } = $props();
  let paragraphIndents = $state([0]);
  $inspect(paragraphIndents);
</script>

<div class="text-container">
  {#each blocks as block, i}
    <Paragraph data={block} thisParagraphIndent={paragraphIndents[i]} bind:nextParagraphIndent={paragraphIndents[i+1]} />
  {/each}
</div>