<template>
  <div class="top-bar" :class="topClass">
    <div class="inner">
      <router-link to="/disgiced"><div class="logo"/></router-link>
      <div class="links">
        <router-link to="/disgiced/drinks">Drinks</router-link>
        <router-link to="/disgiced/about">About</router-link>
        <router-link to="/disgiced/environment">Environment</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    topClass () {
      return this.topBar
    }
  },
  data () {
    return {
      topBar: 'top'
    }
  },
  mounted () {
    window.addEventListener('scroll', evt => {
      if (evt.target.scrollingElement.scrollTop <= 30) {
        this.topBar = 'top'
      } else {
        this.topBar = 'scrolling'
      }
    })
  }
}
</script>

<style lang="css" scoped>
  .top-bar {
    width: 100vw;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 10;
    height: 105px;
    transition: 0.25s;
    transition-property: height;
  }
  .top-bar.scrolling {
    box-shadow: 0px 1px 10px rgba(0,0,0,.15);
    height: 80px;
  }
  .inner {
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 50px;
  }
  .logo {
    width: 65px;
    height: 65px;
    background-image: url('/disgiced/logo-single.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .logo:hover {
    transform: rotate(10deg) scale(1.1);
  }
  div.links a {
    padding: 0 15px;
    font-size: 18px;
  }
  .router-link-active {
    font-weight: bold;
  }
</style>
