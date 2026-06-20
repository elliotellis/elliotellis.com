<script>
  let { word, className, lineHeight, blockWidth, blockHeight, indentWidthAddition = $bindable() } = $props();
  let wordWidth = $state();
  let wordElement;
  let thisLine = $state(0);
  let totalLines = $state(0);

  function updateValues() {
    thisLine = wordElement.getBoundingClientRect().y / lineHeight + 1
    totalLines = blockHeight / lineHeight
    if (thisLine === totalLines) {
      indentWidthAddition = wordWidth
    } else {
      indentWidthAddition = 0
    }
  }

  $effect(() => {
    updateValues()
  });
</script>

<svelte:window onresize={updateValues} />

<span 
  style:height={lineHeight + 'px'}
  class={className}
  bind:offsetWidth={wordWidth}
  bind:this={wordElement}
  data-this-line={thisLine}
  data-last-line={totalLines}
  data-block-width={blockWidth}
  data-is-last-line={thisLine === totalLines ? 'true' : 'false'}
>{word}&nbsp;</span>

<style>
  span {
    display: inline-block;
  }
</style>