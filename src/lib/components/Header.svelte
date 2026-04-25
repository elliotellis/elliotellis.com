<script>
  let { children, sticky = true, toggleFullBio = true, showFullBio = true, showContact = true } = $props();
  let open = $state(false);
  let openToggleText = $state('(more +)');

  const toggleOpen = () => {
    open = !open;
    openToggleText = (open) ? '(less \u2212)' : '(more +)';
  }
</script>

<header class="header side-content">
  <h1>
    elliot<br>
    ellis
  </h1>
  <div class="header-body rule-above-2x">
    {#if showFullBio}
      <div class="info-container rule-below-1x">
        <div class="bio">
          <p>
            Designer and developer<span class:hidden={open || toggleFullBio === false ? false : true}>&nbsp;who likes to work with 
            type, code, and information, to&nbsp;create graphics, websites, identity systems, 
            and custom design&nbsp;tools.</span>
          </p>
          <p class:hidden={open || toggleFullBio === false ? false : true}>
            Currently working on a freelance basis in the fields of art, culture, 
            editorial, fashion, and music, he also regularly works on motion graphics, 
            editorial design, film titles, and exhibitions.
          </p>
          <p class:hidden={open || toggleFullBio === false ? false : true}>
            Elliot’s experience includes work with The&nbsp;Guardian, the Barbican Centre, 
            Fraser Muggeridge studio, Searchlight Pictures, and Commercial&nbsp;Type.
          </p>
          <p class="location">
            <span class:hidden={open || toggleFullBio === false ? false : true}>He lives and works in&nbsp;</span>London, UK<span class:hidden={open || toggleFullBio === false ? false : true}>.</span>
          </p>
        </div>
        {#if toggleFullBio}
          <button class="open-toggle" onclick={toggleOpen}>{openToggleText}</button>
        {/if}
      </div>
    {/if}
    {@render children?.()}
    {#if showContact}
      <div class="contact-container rule-below-1x">
        <p class="email">
          <a class="subtle-link" href="mailto:elliot@elliotellis.com">elliot@elliotellis.com</a>
        </p>
      </div>
    {/if}
  </div>
</header>

{#if sticky}
<style>
  @media only screen and (56rem < width) {
    .header {
      position: sticky;
      top: 0;
      max-height: 100vh;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
</style>
{/if}

<style>

  .header {
    min-height: 0;
  }

  h1 {
    margin: 0;
    font-size: 3.1875rem;
    line-height: 3rem;
    font-weight: 800;
    color: var(--key-colour);
  }

  .header-body {
    margin-top: 4rem;
  }

  .info-container {
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

</style>