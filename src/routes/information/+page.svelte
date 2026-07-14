<script>
  import Text from "$lib/components/Text.svelte";
  const bio = [
    { portions: [{ text: 'elliot is a designer, developer, and typographer who makes graphics, websites, systems, and tools.' }] },
    { portions: [{ text: 'When working on things like visual identities, motion graphics, editorial design, exhibition graphics, and film titles, it is his critical, cross-disciplinary, and characterful approach to problem solving that offers an original angle to any project.' }] },
    { portions: [{ text: 'His coding background means he especially enjoys to build websites, custom design tools, scripts, and systematic workflows.' }] },
    { portions: [{ text: 'Currently working on a freelance basis in culture, editorial, and fashion, he has worked with The Guardian, the Barbican Centre, WIRED, Fraser Muggeridge studio, Philharmonia, the University of Reading, and Geographer, among others.' }] },
  ];
</script>

<div class="information-container">
  <Text class="biography" blocks={bio} dynamicIndents />
  <Text class="contact-info">
    <h4>Contact</h4>
    <p><a href="mailto:elliot@elliotellis.com">elliot@elliotellis.com</a></p>
  </Text>
  <Text class="colophon">
    <h4>Colophon</h4>
    <p>
      This site was built with <a href="https://svelte.dev/" target="_blank">Svelte</a>,
      and uses <a href="https://getkirby.com/">Kirby</a> to manage content. The frontend is
      hosted on <a href="https://www.netlify.com/">Netlify</a> (for now) and the CMS on
      <a href="https://uberspace.de/">Uberspace</a>.
    </p>
    <p>
      It uses <a href="https://umami.is/">Umami</a> for privacy-focused cookie-free analytics.
    </p>
    <p>It is typeset in <a href="https://commercialtype.com/catalog/action_grotesque">Action Grotesque</a>.</p>
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