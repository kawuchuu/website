<template>
  <div class="landing">
    <section class="top">
      <div class="top-text">
        <h2>Hey, I'm</h2>
        <h1>kawuchuu</h1>
      </div>
      <div class="circle-bg" />
    </section>
    <section class="sub-info">
      <div class="section-text">
        <div class="text">
          <h2>I am a</h2>
          <h1>Software Developer.
            <div class="box-thing" />
          </h1>
          <h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fuga accusamus quia tempore laborum quibusdam rerum quis totam ipsam suscipit enim, ea, quas quaerat, assumenda nulla magnam officia. Voluptates, eius!
          </h3>
        </div>
        <div class="scroller">
          <div class="scroller-container">
            <IndexScroller v-for="item in softwareItems" :project="item" :key="item.title" />
          </div>
        </div>
      </div>
      <div class="section-text">
        <div class="text">
          <h2>I am a</h2>
          <h1>Web Designer.
            <div class="box-thing" />
          </h1>
          <h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fuga accusamus quia tempore laborum quibusdam rerum quis totam ipsam suscipit enim, ea, quas quaerat, assumenda nulla magnam officia. Voluptates, eius!
          </h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      softwareItems: [
        {
          title: 'Firetail',
          desc: 'An open source music player'
        },
        {
          title: 'Lorikeet',
          desc: 'An all-purpose self-hosted Discord bot'
        },
        {
          title: 'Wattle',
          desc: 'A utility to remind you to stretch'
        },
        {
          title: 'Rosella',
          desc: 'An easy-to-use YouTube downloader'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-family: 'DM Serif Display';
  font-weight: normal;
  font-size: 4rem;
}

h2 {
  //font-weight: normal;
}

section.top {
  width: 100%;
  height: 460px;
  //background-color: #24ffad;
  background-color: #c0ffe4;
  overflow: hidden;

  .top-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;

    h1 {
      font-size: 6rem;
      margin-top: 0px;
      line-height: 1em;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 0px;
      color: #305747;
    }
  }

  .circle-bg {
    position: absolute;
    width: 100%;
    height: 500px;
    background-image: url('@/assets/circle-bg.svg');
    background-size: 200%;
    background-repeat: no-repeat;
    background-position: top center;
    z-index: 1;
  }
}

section.sub-info {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 0px 0px 10px;
    text-align: center;
    padding: 0px 150px;
    line-height: 1em;
  }

  .box-thing {
    width: 0%;
    height: 15px;
    background-color: #77ffcd;
    position: relative;
    bottom: 18px;
    z-index: -1;
    opacity: 1;
    transition: .25s;
    transition-property: opacity width;
  }

  .section-text:hover .box-thing {
    //opacity: 1;
    width: 75%;
  }

  h2 {
    margin-top: 0px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    opacity: 0.7;
  }

  h3 {
    font-weight: normal;
  }

  .section-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;
    padding-bottom: 30px;
    width: 100%;

    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 80%;

      h3 {
        max-width: 900px;
      }
    }
  }

  .scroller {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    overflow: hidden;
    overflow-x: auto;
    width: 100%;

    .scroller-container {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
  }

  .section-text:not(:last-child) {
    //border-bottom: solid 1px black;
  }
}
</style>
