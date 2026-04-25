<script>
  let open = $state(false);
  let openToggleText = $state('(more +)');
  const toggleOpen = () => {
    open = !open;
    openToggleText = (open) ? '(less \u2212)' : '(more +)';
  }
</script>

<header class="header section">
  <h1>
    elliot<br>
    ellis
  </h1>
  <div class="info-container rule-above-2x rule-below-1x" class:open={open ? true : false}>
    <div class="bio">
      <p>
        Designer and developer<span class:hidden={open ? false : true}>&nbsp;who likes to work with 
        type, code, and information, to&nbsp;create graphics, websites, identity systems, 
        and custom design&nbsp;tools.</span>
      </p>
      <p class:hidden={open ? false : true}>
        Currently working on a freelance basis in the fields of art, culture, 
        editorial, fashion, and music, he also regularly works on motion graphics, 
        editorial design, film titles, and exhibitions.
      </p>
      <p class:hidden={open ? false : true}>
        Elliot’s experience includes work with The&nbsp;Guardian, the Barbican Centre, 
        Fraser Muggeridge studio, Searchlight Pictures, and Commercial&nbsp;Type.
      </p>
      <p class="location">
        <span class:hidden={open ? false : true}>He lives and works in&nbsp;</span>London, UK<span class:hidden={open ? false : true}>.</span>
      </p>
    </div>
    <!--
    <div class="colophon" class:hidden={open ? false : true}>
      <p class="caption">Website built with <a href="https://svelte.dev/">Svelte</a> and hosted on <a href="https://www.netlify.com/">Netlify</a>. Typeset in <a href="https://commercialtype.com/catalog/delegate">Delegate</a>.</p>
    </div> -->
    <button class="open-toggle" onclick={toggleOpen}>{openToggleText}</button>
  </div>
  <div class="contact-container rule-below-1x">
    <p class="email">
      <a href="mailto:elliot@elliotellis.com">elliot@elliotellis.com</a>
    </p>
  </div>
</header>

<style>

  .header {
    min-height: 0;
  }

  @media only screen and (56rem < width) {
    .header {
      position: sticky;
      top: 0;
      grid-column: site-start / divider;
      max-height: 100vh;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }

  h1 {
    margin: 0;
    font-size: 3.1875rem;
    line-height: 3rem;
    font-weight: 800;
    color: var(--key-colour);
  }

  .info-container {
    margin-top: 4rem;
    position: relative;
  }

  .open-toggle {
    color: var(--text-colour-minor);
    margin-top: 2rem;
  }

  .location:has(.hidden) {
    margin-top: 0;
  }

  .email {
    margin-top: 1rem;
  }

  .email a {
    text-decoration: none;
  }

</style>