<script>
  import { tick } from 'svelte';
  let { blocks = [] } = $props();
  let containerElement = $state(null);
  let blockIndents = $state([0]);
  function getNextIndent(i) {
    return (element) => {
      tick().then(() => {
        const range = document.createRange();
        range.selectNodeContents(element);
        const rects = range.getClientRects();
        blockIndents[i+1] = rects[rects.length - 1].width;
      });
    }
  }
  function handleResize() {
    tick().then(() => {
      blockIndents = [0];
    });
  }
</script>
<!-- {@attach blockIndents.length <= blocks.length && getNextIndent(i)}  -->
<div class="text-container" bind:offsetWidth={null, handleResize}>
  {#each blocks as block, i (i)}
    <p 
      {@attach blockIndents.length <= blocks.length && getNextIndent(i)}
    >
      <span class="indent" style:width={(blockIndents[i] ? blockIndents[i] : 0) + 'px'}>

      </span>{#each block.portions as portion}
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
  .indent {
    display: inline-block;
  }
  p {
    text-indent: 0;
  }
</style>