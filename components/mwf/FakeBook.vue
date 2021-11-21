<template>
  <div :class="showPanel" class="panel-container">
    <div class="panel">
      <div class="top">
        <span class="top-msg">Book Tickets</span>
        <i class="material-icons" @click="hidePanel">close</i>
      </div>
      <div class="content">
        <p>
          On a real festival site, this is where you would book tickets.
          Obviously this site isn't real, so there's nothing to see here!
        </p>
        <br>
        <p>
          In case you encountered this site by accident, this is my SAT (School Assessed Task) for
          my VCE Units 3 &amp; 4 (Year 12) Visual Communication Design class. The theme I chose for my SAT was a winter festival
          held in Melbourne. I decided to create a website for my first presentation and a shirt design
          for my second. What you're looking at right now is my first presentation!
        </p>
        <br>
        <p>
          Like stated in the footer, this is entirely for educational purposes and is not endorsed
          by the City of Melbourne or the Victorian State Government; they aren't aware this exists.
        </p>
      </div>
    </div>
    <div class="panel-bg" @click="hidePanel" />
  </div>
</template>

<script>
export default {
  props: ['active'],
  computed: {
    showPanel () {
      if (this.active) {
        return 'show'
      } else {
        return ''
      }
    }
  },
  methods: {
    hidePanel () {
      this.$parent.hideBook()
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes preventClick {
    from {
        pointer-events: all;
    }
    to {
        pointer-events: all;
    }
}
@keyframes showPanel {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes hidePanel {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}
.panel-container {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 20;
    top: 0;
    opacity: 0;
    transition: 0.25s;
    transition-property: opacity;
    pointer-events: none;
    animation: preventClick 0.5s;
    color: white;
}
.panel-container.show {
    pointer-events: all;
    opacity: 1;
    animation: preventClick 0.5s;
}
.panel-container .panel {
    animation: hidePanel 0.25s;
}
.panel-container.show .panel {
    animation: showPanel 0.25s;
}
.panel {
    max-width: 600px;
    width: 90%;
    max-height: 80%;
    border-radius: 10px;
    background-color: #282828;
    z-index: 21;
    position: fixed;
    //border: solid 2px var(--bd);
    overflow: hidden;
}
.top {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
}
.top span {
    font-size: 20px;
    font-weight: bold;
}
.error {
    display: flex;
    align-items: center;
    color: #ff3a3a;
}
.error i {
    margin-right: 15px;
}
.top i {
    font-size: 26px;
    cursor: pointer;
}
.top i:hover {
    opacity: 0.55;
}
.top i:active {
    opacity: 0.35;
}
.panel-bg {
    position: fixed;
    z-index: 20;
    background-color: rgba(0,0,0,.8);
    width: 100%;
    height: 100%;
    /* backdrop-filter: blur(10px); */
}
.content {
    width: 100%;
    height: 100%;
    max-height: 420px;
    transition: 0.25s;
    transition-property: height;
    padding: 25px;
    padding-top: 5px;

    overflow: hidden;
    overflow-y: auto;
}
</style>
