<script>
    import { redirect } from "@sveltejs/kit";

  let { children, print = false } = $props();
</script>

<div class="site-container">
  {@render children()}
</div>

<style>
  .site-container {
    width: 100%;
    display: grid;
    grid-template-columns: [site-start] 1fr [divider] 2fr [site-end];
  }

  .site-container > :global(*) {
    grid-column: site-start / site-end;
    padding: var(--site-margin);
  }

  @media only screen and (56rem < width) {
    
    .site-container > :global(.side-content) {
      grid-column: site-start / divider;
    }

    .site-container > :global(.main-content) {
      grid-column: divider / site-end;
    }

  }

  @media only print and (orientation: portrait) {

    .site-container > :global(.side-content) {
      grid-column: site-start / divider;
    }
    
    .site-container > :global(.main-content) {
      grid-column: divider / site-end;
    }

  }
</style>


{#if print} 
<style>

  @media only screen {
    .site-container {
      margin: 0 auto;
      outline: 1px solid red;
    }
  }

  .site-container {
    max-width: 59.5rem;
    grid-template-columns: [site-start] 1fr [divider] 2fr [site-end];
  }

</style>
{/if}