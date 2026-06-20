<script>
  let { word, blockWidth, blockHeight, lastLine = $bindable(), indentWidth = $bindable() } = $props();
  let windowWidth = $state(0);
  let wordWidth = $state();
  let wordHeight = $state();
  let wordElement;
  let thisWordsLine = $state(0);

  function updateValues() {
    thisWordsLine = wordElement.getBoundingClientRect().y / wordHeight + 1
    lastLine = thisWordsLine
    if (thisWordsLine === lastLine) {
      indentWidth += wordWidth
    }
  }

  $effect(() => {
    updateValues()
  });
</script>

<svelte:window onresize={updateValues} />

<span 
  bind:offsetWidth={wordWidth}
  bind:offsetHeight={wordHeight}
  bind:this={wordElement}
  data-this-line={thisWordsLine}
  data-last-line={lastLine}
  data-block-width={blockWidth}
  data-is-last-line={thisWordsLine === lastLine ? 'true' : 'false'}
>{word}&nbsp;</span>

<style>
  span {
    display: inline-block;
  }
</style>