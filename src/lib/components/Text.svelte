<script>
  import { onDestroy, tick } from 'svelte';
  import { slide } from 'svelte/transition';
  let { type = "default", class: className, blocks, captionYear, children, dynamicIndents = true } = $props();
  let blockIndents = $state([0]);
  $inspect(children);

  function resetIndents() {
    if (dynamicIndents) {
      tick().then(() => {
        setTimeout(() => {
          blockIndents = [0];
        }, 10); // wait 10ms before resetting indents to 0 to prevent jittering when resizing
      });
    }
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

<div class={['text-container', className]} style:padding-top={type === 'caption' ? 'calc( var(--baseline-offset) + calc(calc(1lh - 1cap) / 2) )' : ''} bind:offsetWidth={null, resetIndents}>
  {#if children}
    {@render children()}
  {/if}

  {#if blocks}
    {#if captionYear}
      <p class="work-year">({captionYear})&nbsp;</p>
    {/if}
    {#each blocks as block, i (i)}
      <p class={type} {@attach dynamicIndents === true && blockIndents.length <= blocks.length && getNextIndent(i, 'p')} data-indent={blockIndents[i]}>
        {#if blockIndents[i] > 0}
          <span class="indent" style:width={blockIndents[i] + 'px'}></span>
        {/if}
        {@html block}
        <!--
        {#each block.portions as portion}
          {#if portion.className}
            <span class={portion.className}>{portion.text}</span>
          {:else if portion.type === 'link'}
            <a href={portion.url} class={portion.className}>{portion.text}</a>
          {:else}
            {portion.text}
          {/if}
        {/each}
        -->
      </p>
    {/each}
  {/if}
</div>

<style>

  .text-container {
    --baseline-offset: calc(calc(1rlh - 1rcap) / 2);
    padding-top: var(--baseline-offset);
    margin-bottom: calc( 0px - var(--baseline-offset) );
  }

  .indent {
    display: inline-block;
  }

  :global(.new-line) {
    margin-right: 100%;
  }

  .work-year {
    float: left;
  }

</style>