<script>
  import { onMount } from 'svelte';
  import Paragraph from '$lib/components/Paragraph.svelte'
  let { blocks = [] } = $props();
  let containerElement = $state(null);
  let blockIndents = $state([0]);
  function handleNextIndent(index, width) {
    // The width of paragraph i's last line becomes
    // the indent for paragraph i+1
    blockIndents[index + 1] = width;
  }
  let lastContainerWidth = null;

  $effect(() => {
    if (!containerElement) return;
    const observer = new ResizeObserver(() => {
      const newWidth = entries[0].contentRect.width;

      // Skip the initial fire on observe() — lastContainerWidth is null
      if (lastContainerWidth === null) {
        lastContainerWidth = newWidth;
        return;
      }

      // Only reset on an actual width change
      if (Math.abs(newWidth - lastContainerWidth) > 1) {
        lastContainerWidth = newWidth;
        blockIndents = [0];
      }
      
    });
    observer.observe(containerElement);
    return () => observer.disconnect();
  });
</script>

<div class="text-container" bind:this={containerElement}>
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
    width: 300px;
    font-size: 1rem;
    line-height: var(--line-height);
    color: contrast-color(var(--background-colour))
  }
</style>