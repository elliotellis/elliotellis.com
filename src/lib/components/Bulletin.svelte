<script>
  let html = $state('Dusk Dawn');

  $effect(() => {
    const ctx = document.getElementById("bulletin").getContext("2d");
    ctx.font = "48px serif";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(html, 10, 50);
  })
</script>

<div class="bulletin-container">
  <p class="editable-text" bind:innerHTML={html} contenteditable="true"></p>
  <canvas
    id="bulletin"
    class="bulletin-canvas"
  ></canvas>
</div>

<style>

  .bulletin-container {
    padding: var(--site-top-margin) 0;
    height: calc(100vh - var(--site-top-margin));
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .editable-text {
    --target-font-size: 10vw;
    font-weight: 800;
    font-size: clamp(2rem, var(--target-font-size), 10rem);
    line-height: 1.25;
    text-align: center;
  }

  @media only screen and (min-width: 40rem) {
    .editable-text {
      --target-font-size: 10vw;
    }
  }

  .bulletin-canvas {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: auto;
  }

</style>