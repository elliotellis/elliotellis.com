<script>
  import Paragraph from '$lib/components/Paragraph.svelte'
  let { blocks = [] } = $props();
  let blockIndents = $state([0]);
  function handleNextIndent(index, width) {
    // The width of paragraph i's last line becomes
    // the indent for paragraph i+1
    blockIndents[index + 1] = width;
  }
</script>

<div class="text-container">
  {#each blocks as block, i (i)}
    <Paragraph 
      data={block} 
      thisIndent={blockIndents[i] ?? 0}
      onNextIndent={(width) => handleNextIndent(i, width)}
      //bind:nextIndent={paragraphIndents[i+1]}
    />
  {/each}
</div>

<style>
  .text-container {
    --line-height: 1.25rem;
    font-size: 1rem;
    line-height: var(--line-height);
    color: contrast-color(var(--background-colour))
  }
</style>