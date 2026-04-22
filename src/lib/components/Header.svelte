<header class="header">
  <h1>
    elliot<br>
    ellis
  </h1>
  <p class="mini-bio rule rule-4x">
    Designer and developer<br>
    London, UK
  </p>
</header>

<style>

  .header {
		--background-colour: var(--colour-white);
    background-color: var(--background-colour);
    height: auto;
  }

  h1 {
    margin: 2rem 0 0;
    font-size: 3.375rem;
    line-height: 3rem;
    color: var(--key-colour);
  }

  .mini-bio {
    margin-top: 4rem;
  }

  .mini-bio::after {
    content: '(+)';
    text-align: right;
    float: right;
  }

</style>