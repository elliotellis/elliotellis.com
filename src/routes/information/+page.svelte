<script>
  import Text from "$lib/components/Text.svelte";
  const bio = [
    'Designer, developer, and typographer who makes graphics, websites, systems, and tools.',
    'Currently working on a freelance basis in culture, editorial, and fashion, my experience includes work with The Guardian, the Barbican Centre, WIRED, Fraser Muggeridge studio, Philharmonia, the University of Reading, and Geographer, among others.',
    'As a designer I’m best at editorial design, identities, and motion graphics – anything that benefits from a systematic approach and good typography. I use code as a key part of my practice, both to explore and execute creative ideas, and to automate processes and build efficient workflows.',
    'I also design and build websites that are uncomplicated and friendly, yet filled with personality and charm. Absent of annoyances, bloat, or invasive features, the sites I make allow visitors to form a trustworthy initial relationship with businesses and professionals.',
    'I’m based in London, but love working on projects with people anywhere in the world.',
  ];
  let colophon = [
    `This site was built with <a href="https://svelte.dev/" target="_blank">Svelte</a>,
    and uses <a href="https://getkirby.com/">Kirby</a> to manage content. The frontend is
    hosted on <a href="https://www.netlify.com/">Netlify</a> (for now) and the CMS on
    <a href="https://uberspace.de/">Uberspace</a>.`,
    `It uses <a href="https://umami.is/">Umami</a> for privacy-focused cookie–free analytics.`,
    `It is typeset in <a href="https://commercialtype.com/catalog/action_grotesque">Action Grotesque</a>.`
  ];
  colophon = [
    `This site was built with Svelte,
    and uses Kirby to manage content. The frontend is
    hosted on Netlify (for now) and the CMS on
    Uberspace.`,
    `It uses Umami for privacy-focused cookie–free analytics.`,
    `It is typeset in Action Grotesque.`
  ]
</script>

<div class="information-container">
  <Text class="biography" blocks={bio} dynamicIndents />
  <Text class="contact-info">
    <h4>Contact</h4>
    <p><a href="mailto:elliot@elliotellis.com">elliot@elliotellis.com</a></p>
  </Text>
  <Text class="colophon" blocks={colophon} dynamicIndents>
    <h4>Colophon</h4>
  </Text>
</div>

<style>

  .information-container {
    padding: var(--site-top-margin) var(--site-x-margin);
  }

  :global(.contact-info) a {
    text-decoration: none;
  }

</style>