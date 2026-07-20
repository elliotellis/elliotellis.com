<script>
  import Text from '$lib/components/Text.svelte';
  let { data } = $props();
  $inspect(data);
</script>

<div class="page cover-letter">
  <div class="letter-body">
    <Text>
      <p>
        <strong>Interactive developer</strong>&nbsp;&nbsp;The Guardian, July 2026
      </p>

        <br>
    </Text>
    <Text blocks={data.coverLetter} dynamicIndents />
    <Text>
      <br>
      <p>
        Kind regards, <br>
        Elliot Ellis
      </p>
    </Text>
  </div>
  <div class="letter-head">
    <Text>
      <h1 class="cv-name">elliot ellis</h1>
    </Text>
    <Text type="caption">
      <p style="margin-top: 0.772lh"><span class="ty-sc">Portfolio</span></p>
      <p><a href="https://elliotellis.com">elliotellis.com</a></p>
    </Text>
    <Text type="caption">
      <p style="margin-top: 0.772lh"><span class="ty-sc">Contact</span></p>
      <p><a href="mailto:elliot@elliotellis.com">elliot@elliotellis.com</a></p>
      <p>07946 723996</p>
    </Text>
  </div>
</div>

<style>

  :global {
    .page *,
    .page p {
      font-size: 0.725rem;
      line-height: 0.8rlh;
      --base-line-length: 38em;
    }
  }

  .page {
    display: grid;
    grid-template-columns: 32rem 1rem 12rem;
    break-after: page;
  }

  @media only print {
    .page {
      padding: 2rlh var(--site-x-margin);
    }
  }

  @media only screen {
    .page {
      padding: var(--site-top-margin) var(--site-x-margin);
    }
  }

  .letter-body {
    grid-column: span 1;
  }

  .letter-head {
    grid-column: 3;
  }

  .main-col {
    grid-column: span 1;
  }

  .side-col {
    grid-column: 3;
  }

  .cv-subtitle {
    font-weight: var(--fontweight-reg);
  }

  .cv-contact-info {
    margin-top: 0.5lh;
  }

  .cv-contact-info p {
    float: left;
    margin-right: 0.5em;
  }

  .cv-item {
    margin-top: 3lh;
  }

  .exp-header span::after {
    content: '\2002';
  }

  .exp-body {
    margin-top: 0.5lh;
  }

  .bullets :global(p) {

    margin-top: 0.25lh;
  }

  .bullets :global(p::before) {
    content: '\2192\00a0';
  }

  .sidebar-bullets :global(p:not(:first-child)) {
    margin-top: 0.25lh;
  }

</style>