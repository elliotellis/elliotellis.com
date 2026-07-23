<script>
  import Text from "$lib/components/Text.svelte";
  const bio = [
    'Designer, developer, and typographer who makes graphics, websites, systems, and tools.',
    'Currently working on a freelance basis in culture, editorial, and fashion, my experience includes work with The Guardian, the Barbican Centre, WIRED, Fraser Muggeridge studio, Philharmonia, the University of Reading, and Geographer, among others.',
    'As a designer I’m best at editorial design, identities, and motion graphics – anything that benefits from a systematic approach and good typography. I use code as a key part of my practice, both to explore and execute creative ideas, and to automate processes and build efficient workflows.',
    'I also design and build websites that are uncomplicated, friendly, and charmful. Absent of annoyances, bloat, or invasive features, the sites I make allow visitors to form a trustworthy initial relationship with businesses and professionals.',
    'I’m based in London, but love working on projects with people anywhere in the world.',
  ];
  let colophon = [
    `This site is built with <a href="https://svelte.dev/" target="_blank">Svelte</a>,
    and uses <a href="https://getkirby.com/" target="_blank">Kirby</a> to manage content. The frontend is
    hosted on <a href="https://www.netlify.com/" target="_blank">Netlify</a> (for now) and the CMS on
    <a href="https://uberspace.de/" target="_blank">Uberspace</a>.
    It uses <a href="https://umami.is/" target="_blank">Umami</a> for privacy-focused cookie–free analytics.`,
    `It is very new and very much a work in progress! The source code is 
    <a href="https://github.com/elliotellis/elliotellis.com" target="_blank">on GitHub</a>.`,
    `It is typeset in <a href="https://commercialtype.com/catalog/action_grotesque" target="_blank">Action Grotesque</a>.`
  ];
</script>

<div class="information-container">
  <Text class="biography" blocks={bio} dynamicIndents />
  <Text class="contact-info">
    <h4>Contact</h4>
    <p><a href="mailto:elliot@elliotellis.com">elliot@elliotellis.com</a></p>
  </Text>
  <div class="colophon">
    <Text type="caption" blocks={colophon} dynamicIndents={false} />
  </div>
</div>

<style>

  .information-container {
    padding: var(--site-top-margin) var(--site-hmargin);
  }

  :global(.contact-info) a {
    text-decoration: none;
  }

  .colophon {
    margin-top: 6lh;
  }

</style>