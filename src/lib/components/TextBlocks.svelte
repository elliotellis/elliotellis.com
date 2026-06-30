<script>
  import { tick } from 'svelte';
  let { blocks = [] } = $props();
  let containerElement = $state(null);
  let blockIndents = $state([0]);
  function getNextIndent(i, blockTag) {
    return (element) => {
      tick().then(() => {
        const range = document.createRange();
        range.selectNodeContents(element);
        const rects = range.getClientRects();
        if (blockTag === 'ul') {
          blockIndents[i+1] = rects[rects.length - 1].width + blockIndents[i];
        } else {
          blockIndents[i+1] = rects[rects.length - 1].width;
        }
      });
    }
  }
  function handleResize() {
    tick().then(() => {
      blockIndents = [0];
    });
  }
</script>

<div class="text-container" bind:offsetWidth={null, handleResize}>
  {#each blocks as block, i (i)}
    {#if block.type === 'paragraph'}
      <p {@attach blockIndents.length <= blocks.length && getNextIndent(i, 'p')} data-indent={blockIndents[i]}>
        <span class="indent" style:width={(blockIndents[i] ? blockIndents[i] : 0) + 'px'}>
        </span>{#each block.portions as portion}
          {#if portion.className}
            <span class={portion.className}>{portion.text}</span>
          {:else}
            {portion.text}
          {/if}
        {/each}
      </p>
    {:else if block.type === 'unorderedList'}
      <ul {@attach blockIndents.length <= blocks.length && getNextIndent(i, 'ul')} data-indent={blockIndents[i]}>
        {#each block.items as item}
          <li>
            <span class="indent" style:width={(blockIndents[i] ? blockIndents[i] : 0) + 'px'}></span>
            {item.text}
          </li>
        {/each}
      </ul>
    {/if}
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