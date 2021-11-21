<template>
  <div class="footer">
    <div class="company-info">
      <div class="logo"/>
      <div class="copyright">Copyright &copy; 2020 Disgiced</div>
    </div>
    <div class="footer-text">
      <div>Disclaimer: this website, along with the company, is only a concept.</div>
<!--       <a href="/">Go back home</a> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .footer {
    height: 50px;
    padding: 20px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .company-info {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 50px;
    height: 50px;
    background: no-repeat center url('/disgiced/logo-single.svg');
    background-size: contain;
  }
  .copyright {
    margin-left: 15px;
    font-size: 14px;
  }
  .footer-text {
    font-size: 14px;
    text-align: right;

    div, a {
      margin: 7px 0px;
    }

    a {
      color: #0066ff
    }

    a::before {
      content: '< '
    }
  }
</style>
