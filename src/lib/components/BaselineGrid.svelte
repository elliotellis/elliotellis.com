<script>
  let { on = false } = $props();
  let gridVisible = $state(false);

  function handleKeydown(event) {
    if (event.key === 'b') {
      gridVisible = !gridVisible;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if on && gridVisible}
  <style>
    body::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      --ccmb: rgba(255,255,255,1);
      --cbas: rgba(0,192,255,0.5);
      --ccap: rgba(255,192,0,0.5);
      background-image: 
        repeating-linear-gradient(
          transparent, transparent calc(1rlh - 1px), 
          var(--cbas) calc(1rlh - 1px), var(--cbas) 1rlh
        ),
        repeating-linear-gradient(
          transparent, transparent calc(0.75rlh - 1px),
          var(--ccap) calc(0.75rlh - 1px), var(--ccap) 0.75rlh
        ),
        repeating-linear-gradient(
          transparent, transparent calc(3rlh - 1px), 
          var(--ccmb) calc(3rlh - 1px), var(--ccmb) 3rlh
        );
        
      /*background-repeat: repeat-y;
      background-size: 100% 1rlh;
      mix-blend-mode: difference;*/
      z-index: 2;
      pointer-events: none;
    }
  </style>
{/if}