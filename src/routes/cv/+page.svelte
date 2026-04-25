<script>
  import { page } from '$app/state';
  import Header from '$lib/components/Header.svelte';
  import SiteContainer from '$lib/components/SiteContainer.svelte';
</script>

<svelte:head>
  <!-- Page title -->
  <title>elliot ellis</title>
  <meta property="og:title" content={'' + ' &ndash; elliot ellis'}>
  <meta property="twitter:title" content={'' + ' &ndash; elliot ellis'}>
  <!-- Page image -->
  {#if ''}
    <meta property="og:image" content={''}>
    <meta name="twitter:image" content={''}>
  {/if}
  <!-- Page description -->
  {#if ''}
    <meta property="og:description" content={''}>
    <meta name="twitter:description" content={''}>
  {/if}
</svelte:head>


<SiteContainer print={true}>
  <Header showFullBio={false} showContact={false} sticky={false}>
    <div class="cv sidebar-content">

      <div class="sidebar-section">
        <h2>Key skills</h2>
        <ul>
          <li>Unique expertise in typography</li>
          <li>Code-driven problem solving</li>
          <li>Visual identity systems</li>
          <li>Motion graphics</li>
          <li>Devising systems and workflows</li>
          <li>Diligent and detailed artworking</li>
          <li>Accessible design ethos</li>
        </ul>
      </div>

      <div class="sidebar-section rule-above-2x">
        <h2>Software and tools</h2>
        <ul>
          <li>Adobe InDesign, Illustrator, Photoshop, After Effects</li>
          <li>Figma</li>
          <li>HTML, CSS, JavaScript</li>
          <li>After Effects expressions and scripts</li>
          <li>Svelte, React, Next.js</li>
          <li>Python</li>
          <li>DrawBot, Processing, p5.js</li>
        </ul>
      </div>

      <div class="sidebar-section rule-above-2x rule-below-1x">
        <h2>Education</h2>
        <ul>
          <li>
            <span class="bold">University of Reading</span><br>
            BA Graphic Communication, First
          </li>
        </ul>
      </div>

    </div>
  </Header>

  <section class="main-content">

    <div class="cv-main-column">
      <div class="contact-info rule-above-2x">
        <h3>Contact</h3>
        <ul>
          <li><a class="subtle-link" href="mailto:elliot@elliotellis.com">elliot@elliotellis.com</a></li>
          <li>+44 (0)7946 723996</li>
        </ul>
      </div>

      <div class="experiences rule-above-2x">

        <h2>Experience</h2>

        <div class="experience rule-above-1x">
          <h3>
            Freelance
            <span class="date">
              Since 2013; full-time since August 2025
            </span>
          </h3>
          <p>
            Design and development within culture, editorial, and fashion
          </p>
          <ul>
            <li>
              <span class="bold">The Guardian</span>
              <span class="date">February&ndash;March 2026</span><br>
              Digital design and motion graphics for video&nbsp;podcasts
            </li>
            <li>
              <span class="bold">IQ Magazine</span>
              <span class="date">November 2025 &ndash; February 2026</span><br>
              Editorial design for live music industry report publications
            </li>
            <li>
              <span class="bold">Korean Cultural Centre UK</span>
              <span class="date">July &ndash; September 2024</span><br>
              Rebrand and campaign design for K&#8209;Music&nbsp;Festival
            </li>
          </ul>
        </div>
        
        <div class="experience rule-above-1x">
          <h3>
            Barbican Centre
            <span class="date">
              January 2025 &ndash; July 2025
            </span>
          </h3>
          <p>Design, motion, code, and workflow strategy for Europe’s largest arts&nbsp;venue</p>
          <ul>
            <li>Large-scale campaign identities spanning digital and physical&nbsp;outputs</li>
            <li>
              Overhaul of studio’s design templates with efficient systems and 
              automation via&nbsp;code
            </li>
            <li>Project lead for redesign of flagship print publication, the&nbsp;Guide</li>
          </ul>
        </div>

        <div class="experience rule-above-1x">
          <h3>
            Fraser Muggeridge studio
            <span class="date">
              June 2022 &ndash; January 2023
            </span>
          </h3>
          <p>Collaborative design and coding as part of an esteemed practice</p>
          <ul>
            <li>Narrative motion graphics and film titles for Meta, EE, and Searchlight&nbsp;Pictures</li>
            <li>Code-driven print specimen for a Commercial Type variable&nbsp;font</li>
            <li>Visual identities and exhibition graphics for Towner&nbsp;Eastbourne</li>
          </ul>
        </div>

        <div class="experience rule-above-1x">
          <h3>
            E1
            <span class="date">July 2019 &ndash; May 2022</span>
          </h3>
          <p>Creative and digital design lead for an electronic music&nbsp;venue</p>
          <ul>
            <li>Brand identity evolution during definitive period for&nbsp;venue</li>
            <li>Art direction and motion graphics for event marketing</li>
            <li>Design and development of the venue’s website</li>
          </ul>
        </div>

      </div>
    </div>

  </section>
</SiteContainer>


<style>
  .contact-info {
    height: 6rem;
    margin-bottom: 4rem;
  }

  .contact-info ul {
    list-style-type: none;
    padding: 0;
  }

  .cv-main-column {
    position: relative;
  }

  .cv-main-column::before {
    content: '';
    width: 0;
    height: 100%;
    position: absolute;
    top: 0;
    left: -1.5rem;
    border-left: var(--base-rule-weight) solid var(--text-colour-minor);
  }

  .experience, .sidebar-section:not(:first-child) {
    margin-top: 3rem;
  }

  .sidebar-section:last-child {
    padding-bottom: 3rem;
  }

  h2, h3 {
    margin-top: 0;
  }

  .date {
    font-weight: var(--fontweight-reg);
    color: var(--text-colour-minor);
  }
</style>