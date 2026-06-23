<script>
  let { content } = $props();
  import Gallery from '$lib/components/Gallery.svelte';
</script>

<div class="work rule-below-1x">
  <!-- https://svelte.dev/playground/7c0339d9aeb64b8c9b4bf402c71d791e?version=5.55.4 -->
  <Gallery media={content.media} />
  <div class="work-text">
    <h3>{content.title} <span class="information">{content.information}</span></h3>
    <p class="description">{content.description}</p>
  </div>
</div>

<style>

  .work:not(:first-child) {
    margin-top: var(--site-margin);
  }

  .information {
    font-weight: var(--fontweight-reg);
    font-size: 0.8rem;
    text-transform: uppercase;
    display: inline-block;
    margin-left: 0.25rem;
  }

  p {
    margin-top: 0;
  }

</style>