<script>
  import { tick, untrack } from 'svelte';
  import Word from '$lib/components/Word.svelte';
  let { data, thisIndent = 0, onNextIndent /*, nextIndent = $bindable()*/ } = $props();
  let lineHeight = 20; // need to make this dynamic
  let blockWidth = $state();
  let blockHeight = $state();
  let lastLine = $state();
  let indentWidthAdditions = $state([]);
  let paragraphElement = $state(null);
  let visible = $state(false);
  let blockYPos = $state();
  let lastLineInfo = $state();

  export function getLastLineWidth(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const rects = range.getClientRects();
    if (rects.length === 0) return { text: '', width: 0 };
    // The last rect corresponds to the last visual line
    const lastRect = rects[rects.length - 1];
    // To get the actual text on the last line, iterate through text nodes
    // and find which ones sit on the same Y position as lastRect
    const lastLineY = lastRect.top;
    const lastLineText = getLastLineText(element, lastLineY, rects);
    return { text: lastLineText, width: lastRect.width };
  }

  function getLastLineText(element, lastLineY, allRects) {
    // Walk all text nodes, create micro-ranges, check if they're on the last line
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    let lastLineText = '';
    for (const node of textNodes) {
      for (let i = 0; i < node.textContent.length; i++) {
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const charRects = range.getClientRects();
        if (charRects.length > 0) {
          // Allow small tolerance for sub-pixel differences
          if (Math.abs(charRects[0].top - lastLineY) < 2) {
            lastLineText += node.textContent[i];
          }
        }
      }
    }
    return lastLineText.trimEnd();
  }

  $effect(() => {
    thisIndent;
    untrack(() => {
      if (!paragraphElement) return;

      // tick() ensures the layout is fully settled
      // (needed because $effect fires after DOM update but
      //  potentially before browser has done layout/paint)
      tick().then(() => {
        if (!paragraphElement) return;
        const { width } = getLastLineWidth(paragraphElement);
        onNextIndent?.(width);
        visible = true;
      });
    });
    //blockYPos = paragraphElement.getBoundingClientRect().y
    //nextIndent = indentWidthAdditions.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    /*
    if (thisIndent > 0) {
      lastLineInfo = getLastLineWidth(paragraphElement);
		  nextIndent = lastLineInfo.width;
      console.log(lastLineInfo.text);
    }*/
  });
  /*
  onMount(() => {
    console.log('PARAGRAPH ' + {thisBlock} + ' MOUNTED');
		lastLineInfo = getLastLineWidth(paragraphElement);
		nextIndent = lastLineInfo.width;
    console.log(lastLineInfo.text);
	});*/
  
</script>

<p bind:this={paragraphElement} style:opacity={visible ? '1' : '0'} bind:offsetWidth={blockWidth} bind:offsetHeight={blockHeight}>
  <span 
    style:display={thisIndent > 0 ? 'inline-block' : 'none'}
    style:width={thisIndent + 'px'}
  >&nbsp;</span>{#if data}
    {#each data.portions as portion}
      {#if portion.className}
        <span class={portion.className}>{portion.text}&nbsp;</span>
      {:else}
        {portion.text}
      {/if}
    <!--
      {#each portion.text.split(' ') as word, i}
        <Word {word} className={portion.className} {lineHeight} {blockWidth} {blockHeight} {blockYPos} bind:indentWidthAddition={indentWidthAdditions[i]} />
      {/each}
    -->
    {/each}
  {:else}
    Error: no data
  {/if}
</p>

<style>
  span {
    height: var(--line-height);
  }
</style>