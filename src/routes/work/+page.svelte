<script>
  import { page } from '$app/state';
  import Gallery from '$lib/components/Gallery.svelte';
  let { data } = $props();
</script>

<Gallery {data} />