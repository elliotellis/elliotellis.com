<script>
  import TextPortion from '$lib/components/TextPortion.svelte';
  import Word from '$lib/components/Word.svelte';
  let { data, thisParagraphIndent, nextParagraphIndent = $bindable() } = $props();
  let lineHeight = 20; // need to make this dynamic
  let blockWidth = $state();
  let blockHeight = $state();
  let lastLine = $state();
  let indentWidthAdditions = $state([]);
  $effect(() => {
    nextParagraphIndent = indentWidthAdditions.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  });
</script>

<p bind:offsetWidth={blockWidth} bind:offsetHeight={blockHeight}>
  <span 
    style:display={thisParagraphIndent > 0 ? 'inline-block' : 'none'}
    style:width={thisParagraphIndent + 'px'}
    style:height={lineHeight + 'px'}
  >&nbsp;</span>{#if data}
    {#each data.text.split(' ') as word, i}
      <Word {word} {lineHeight} {blockWidth} {blockHeight} bind:indentWidthAddition={indentWidthAdditions[i]} />
    {/each}
    <!--
    {#each data.portions as portion}
      <TextPortion {portion} {blockHeight} />
    {/each}
    -->
  {:else}
    Error: no data
  {/if}
</p>

<style>
  div {
    height: 20px;
    background-color: red;
    display: inline-block;
  }
</style>