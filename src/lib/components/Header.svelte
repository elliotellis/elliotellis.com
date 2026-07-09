<script>
  import { page } from '$app/state';
  import Text from "$lib/components/Text.svelte";
</script>

<header>
  <Text>
    <h1 class="site-name">
      <a href="/">elliot ellis</a>
    </h1>
    <nav class="main-nav">
      <ul>
        <li class={page.route.id === '/work' ? 'current' : ''}><a href="/work">Work</a></li>
        <li class={page.route.id === '/information' ? 'current' : ''}><a href="/information">Information</a></li>
      </ul>
    </nav>
  </Text>
  <!-- <Text blocks={content[0].mainText} dynamicIndents /> -->
</header>

<style>

  header {
    padding: var(--site-top-margin) var(--site-x-margin) 1rlh;
    z-index: 2;
  }

  header a {
    text-decoration: none;
  }

  @media only screen and (min-width: 32rem) {
    header {
      position: fixed;
      grid-column: span 1;
    }
  }

  .main-nav {
    margin-top: 2rlh;
  }

  .current {
    opacity: 0.75;
  }

  .current a:hover {
    color: inherit;
    background-color: inherit;
    background-blend-mode: unset;
  }

  .current::before {
    content: '\2192\a0';
  }

</style>