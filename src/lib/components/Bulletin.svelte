<script></script>

<div class="bulletin-container">
  <p class="editable-text" contenteditable="true">
    Vote <br>Binface
  </p>
</div>

<style>

  .bulletin-container {
    padding: var(--site-top-margin) 0;
    height: calc(100vh - var(--site-top-margin));
    display: flex;
    align-items: center;
    justify-content: center;
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

</style>