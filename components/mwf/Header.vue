<template>
  <div class="header-root" :class="scrollBG">
    <section class="left">
      <img class="main-logo" src="@/assets/mwf/logo-colourful-small.png">
    </section>
    <section class="normal-links">
      <div class="links">
        <a href="#Schedule">Schedule</a>
        <a href="#Book">Book</a>
        <a href="#Maps">Map</a>
        <a href="#About">About</a>
        <a href="#FAQ">FAQ</a>
      </div>
    </section>
    <section class="mobile-links">
      <i class="material-icons">menu</i>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isScroll: false
    }
  },
  computed: {
    scrollBG () {
      if (this.isScroll) {
        return 'scroll'
      } else {
        return ''
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.header-root {
  width: 100%;
  height: 80px;
  background: transparent;
  padding: 20px 30px;

  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 2;
  font-size: 1.1em;

  transition: 0.25s;
  transition-property: color, background, opacity;
}

.main-logo {
  height: 40px;
  width: auto;
  opacity: 0;
  filter: brightness(10);
}

.header-root.scroll {
  background: black;

  box-shadow: 0px 1px 5px rgba(0,0,0,.2);

  .main-logo {
    opacity: 1;
  }
}

@keyframes cuteAnimation {
  0% {
    background: linear-gradient(to right, #E000FF 25%, #FFFF00 25% 50%, #00D4FF 50% 75%, white 75%);
  }
  25% {
    background: linear-gradient(to right, #FFFF00 25%, #00D4FF 25% 50%, white 50% 75%, #E000FF 75%);
  }
  50% {
    background: linear-gradient(to right, #00D4FF 25%, white 25% 50%, #E000FF 50% 75%, #FFFF00 75%);
  }
  75% {
    background: linear-gradient(to right, white 25%, #E000FF 25% 50%, #FFFF00 50% 75%, #00D4FF 75%);
  }
}

.header-root.scroll::after {
  content: '';
  position: absolute;
  height: 3px;
  background: linear-gradient(to right, #E000FF 25%, #FFFF00 25% 50%, #00D4FF 50% 75%, white 75%);
  right: 0;
  left: 0;
  top: 80px;

  animation: cuteAnimation 2s infinite;
}

.links {
  a {
    margin: 0px 10px;
    text-decoration: none;
    color: white;
  }
}

.mobile-links {
  display: none;
}

@media (max-width: 1050px) {
  .header-root {
    padding: 15px 15px;
    height: 70px;
  }
  .header-root.scroll::after {
    top: 70px;
  }
  .normal-links {
    display: none;
  }
  .mobile-links {
    display: block;
  }
  .main-logo {
    height: 28px;
  }
}
</style>
