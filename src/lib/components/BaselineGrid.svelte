<script>
  let { on = false, mode = 'constant' } = $props();
  let showGrid = $state(false);

  /*function handleKeydown(event) {
    if (event.key === 'B') {
      if (mode === 'offByDefault') {
        showGrid = true;
      } else {
        showGrid = false;
      }
    }
  }*/
</script>

<!--<svelte:window onkeydown={on && mode != 'constant' ? handleKeydown : null} />-->

{#if on}
  <style>
    body::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(to top, 
          rgba(255,255,255,0.5) 0, 
          transparent 1px 50%, 
          rgba(255,255,255,0.25) 50%, 
          transparent calc(50% + 1px) 100%
        );
      background-repeat: repeat-y;
      background-size: 100% 1rlh;
      /*mix-blend-mode: difference;*/
      z-index: 2;
      pointer-events: none;
    }
  </style>
{/if}
<!--
{#if on && mode != 'constant' && showGrid === false}
  <style>
    body::before {
      background: none;
    }
  </style>
{/if}
-->