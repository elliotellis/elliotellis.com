<script>
  import TextPortion from '$lib/components/TextPortion.svelte';
  import Word from '$lib/components/Word.svelte';
  let { data } = $props();
  let blockWidth = $state();
  let blockHeight = $state();
  let lastLine = $state();
  let nextParagraphIndent = $state(0);
  $effect(() => {
    console.log('Last line: ' + lastLine)
    console.log('Block width: ' + blockWidth)
  });
</script>

<p bind:offsetWidth={blockWidth} bind:offsetHeight={blockHeight} data-lines={lastLine}>
  {#if data}
    {#each data.text.split(' ') as word}
      <Word {word} {blockWidth} {blockHeight} bind:lastLine={lastLine} bind:indentWidth={nextParagraphIndent} />
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

<div style={'width: ' + nextParagraphIndent + 'px;'}></div>

<style>
  div {
    height: 20px;
    background-color: red;
    display: inline-block;
  }
</style>