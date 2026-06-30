<script>
  import Paragraph from '$lib/components/Paragraph.svelte'
  let { children, blocks = [] } = $props();
  let blockIndents = $state([0]);
  function getNextIndent(i) {
    return (element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const rects = range.getClientRects();
      blockIndents.push(rects[rects.length - 1].width);
      //blockIndents[i+1] = rects[rects.length - 1].width;
      $inspect(element);
    }
  }
</script>

<div class="text-container">
  {#each blocks as block, i (i)}
    <p {@attach blockIndents.length <= blocks.length && getNextIndent(i)} style:text-indent={blockIndents[i] + 'px'}>
      {#each block.portions as portion}
        {#if portion.className}
          <span class={portion.className}>{portion.text}</span>
        {:else}
          {portion.text}
        {/if}
        <!--
        {#each portion.text.split(' ') as word, j (j)}
          <span class={portion.className}>{word}&nbsp;</span>
        {/each}
        -->
      {/each}
    </p>
    
    <!--  
    <Paragraph 
      data={block} 
      thisIndent={blockIndents[i] ?? 0}
      onNextIndent={(width) => handleNextIndent(i, width)}
      //bind:nextIndent={paragraphIndents[i+1]}
    />-->
  {/each}
</div>

<style>
  span {
    display: inline-block;
  }
</style>