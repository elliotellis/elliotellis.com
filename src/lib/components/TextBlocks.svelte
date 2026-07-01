<script>
  import { onDestroy, tick } from 'svelte';
    import { slide } from 'svelte/transition';
  let { blocks = [] } = $props();
  let blockIndents = $state([0]);

  function resetIndents() {
    tick().then(() => {
      setTimeout(() => {
        blockIndents = [0];
      }, 10); // wait 10ms before resetting indents to 0 to prevent jittering when resizing
    });
  }

  function getNextIndent(i, blockTag) {
    return (element) => {
      tick().then(() => {
        const range = document.createRange();
        range.selectNodeContents(element);
        const rects = range.getClientRects();
        const indent = rects[rects.length - 1].width === 0 ? rects[rects.length - 2].width : rects[rects.length - 1].width;
        blockIndents[i+1] = indent;
      });
    }
  }
</script>

<div class="text-blocks text-container" bind:offsetWidth={null, resetIndents}>
  {#each blocks as block, i (i)}
    <p {@attach blockIndents.length <= blocks.length && getNextIndent(i, 'p')} data-indent={blockIndents[i]}>
      {#if blockIndents[i] > 0}
        <span class="indent" style:width={blockIndents[i] + 'px'}></span>
      {/if}
      {#each block.portions as portion}
        {#if portion.className}
          <span class={portion.className}>{portion.text}</span>
        {:else}
          {portion.text}
        {/if}
      {/each}
    </p>
  {/each}
</div>

<style>

  .indent {
    display: inline-block;
  }

  p {
    text-indent: 0;
  }

  :global(.new-line) {
    margin-right: 100%;
  }

</style>