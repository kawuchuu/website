<template>
  <div class="container">
    <FakeBook :active="bookThingActive" />
    <section class="header">
      <div class="bg">
        <Background v-for="(item, index) in imgs" :key="index" :cur-img="curImg" :pimg="item" />
      </div>
      <div class="header-wrapper">
        <img class="main-logo" src="@/assets/mwf/Logo-var2op3.svg">
        <div class="info-header">
          <h2>28 June - 4 July</h2>
          <div class="instant-nav-btns">
            <div class="nav-btn">
              <a href="#">Book Tickets</a>
            </div>
            <div class="nav-btn">
              <a href="#">See Schedule</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="Schedule" class="schedule">
      <div class="schedule-inner">
        <h1>Upcoming Events</h1>
        <div
          ref="cards"
          class="events-wrapper"
          :style="cursorChange"
          @mousedown="startDrag"
          @mousemove="dragging"
          @pointerup="stopDrag"
          @mouseleave="stopDrag"
        >
          <div class="fade left">
            <i class="material-icons">arrow_back_ios</i>
          </div>
          <div class="cards-container">
            <ScheduleCards v-for="item in events" :key="item.id" :info="item" />
          </div>
          <div class="fade right">
            <i class="material-icons">arrow_forward_ios</i>
          </div>
        </div>
      </div>
    </section>
    <section id="Maps" class="map">
      <div class="map-inner">
        <h1>Event Map</h1>
        <LeafletMap />
      </div>
    </section>
    <section id="About" class="about">
      <div class="lmao">
        <div class="about-wrap">
          <div class="about-inner">
            <h1>The largest festival ever held in Melbourne</h1>
            <p>
              Experience Melbourne like you've never experienced it before.
              From Melbourne Zoo, to the Sidney Myer Music Bowl, everyone is celebrating this
              uniquely wonderful city.
            </p>
          </div>
        </div>
        <div class="bg-thing-wrap">
          <div class="bg-thing" style="background-image: url('/mwf/flinders-front.jpg')" />
        </div>
      </div>
    </section>
    <section class="about a2">
      <div class="lmao">
        <div class="about-wrap">
          <div class="about-inner">
            <h1>Experience a unique Melbourne</h1>
            <p>
              Enjoy a wide range of activities and events, like the Royal Botanic Garden's photography workshop,
              to the Melbourne Winter Festival live performance in the Sidney Myer Music Bowl!
            </p>
          </div>
        </div>
        <div class="bg-thing-wrap">
          <div class="bg-thing" style="background-image: url('/mwf/laneway.jpg')" />
        </div>
      </div>
    </section>
    <section class="book">
      <div class="title">
        <h1>Book your concert tickets</h1>
        <p>Ready to jam to the nightly Melbourne Winter Festival live performance? Book your tickets below!</p>
        <div class="button" @click="showBook">
          <span>Book tickets</span>
          <i class="material-icons">open_in_new</i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FakeBook from '@/components/mwf/FakeBook.vue'
import Background from '@/components/mwf/Background.vue'
import Footer from '@/components/mwf/Footer.vue'
import Header from '@/components/mwf/Header.vue'
import LeafletMap from '@/components/mwf/LeafletMap.vue'
import ScheduleCards from '@/components/mwf/ScheduleCards.vue'

export default {
  components: {
    FakeBook,
    Background,
    Footer,
    Header,
    LeafletMap,
    ScheduleCards
  },
  layout: 'mwf',
  data () {
    return {
      imgs: [
        '/mwf/hosier-lane-front.jpg',
        '/mwf/colour.jpg',
        '/mwf/arcade.jpg',
        '/mwf/musicbowl.jpg'
      ],
      curImg: 0,
      events: [
        {
          title: 'Photography Workshop',
          time: '09:00',
          location: 'Royal Botanic Gardens',
          img: '/mwf/bgardens.jpg',
          note: {
            tag: 'City of Melbourne',
            url: 'https://whatson.melbourne.vic.gov.au/things-to-do/royal-botanic-gardens-victoria'
          },
          id: 'evt-1'
        },
        {
          title: 'Australian Animals',
          time: '12:00',
          location: 'Melbourne Zoo',
          img: '/mwf/melbzookoala.jpg',
          note: {
            tag: 'City of Melbourne',
            url: 'https://whatson.melbourne.vic.gov.au/things-to-do/melbourne-zoo'
          },
          id: 'evt-2'
        },
        {
          title: 'History of Melbourne',
          time: '13:30',
          location: 'National Gallery of Victoria',
          img: '/mwf/ngv.jpg',
          note: {
            tag: 'Visit Victoria',
            url: 'https://www.visitmelbourne.com/regions/Melbourne/Things-to-do/Art-theatre-and-culture/Art-galleries/NGV-International'
          },
          id: 'evt-3'
        },
        {
          title: 'Free MCG Tour',
          time: '14:45',
          location: 'Melbourne Cricket Ground',
          img: '/mwf/mcg.jpg',
          note: {
            tag: 'Melbourne Cricket Ground',
            url: 'https://mcg.org.au/about-us/about-the-mcg'
          },
          id: 'evt-4'
        },
        {
          title: 'Twilight Market',
          time: '16:30',
          location: 'Queen Victoria Market',
          img: '/mwf/qvm.jpg',
          note: {
            tag: 'Visit Victoria',
            url: 'https://www.visitvictoria.com/regions/Melbourne/Things-to-do/Shopping/Markets/Queen-Victoria-Market'
          },
          id: 'evt-5'
        },
        {
          title: 'MWF Live Performance',
          time: '20:00',
          location: 'Sidney Myer Music Bowl',
          img: '/mwf/musicbowl.jpg',
          note: {
            none: true
          },
          id: 'evt-6'
        }
      ],
      isMouseDown: false,
      bookThingActive: false
    }
  },
  computed: {
    cursorChange () {
      if (this.isMouseDown) {
        return 'cursor: grabbing'
      } else {
        return ''
      }
    }
  },
  mounted () {
    setInterval(() => {
      if (this.curImg === this.imgs.length - 1) {
        this.curImg = 0
      } else {
        this.curImg++
      }
    }, 5000)
  },
  methods: {
    startDrag () {
      this.isMouseDown = true
    },
    dragging (evt) {
      if (this.isMouseDown) {
        this.$refs.cards.scrollLeft -= evt.movementX
      }
    },
    stopDrag (evt) {
      let toStopAt = 0
      // 465px width
      for (let i = 0; i < this.events.length; i++) {
        const cardEl = document.querySelector('.cards-container').children[i].getBoundingClientRect()
        if (cardEl.x < -440) {
          continue
        } else if (cardEl.x >= -192) {
          toStopAt = i + 1
          break
        } else if (cardEl.x < -193) {
          toStopAt = i + 2
          break
        }
      }
      this.isMouseDown = false
      this.$refs.cards.scrollTo({
        left: 465 * toStopAt - 465,
        behavior: 'smooth'
      })
    },
    showBook () {
      this.bookThingActive = true
    },
    hideBook () {
      this.bookThingActive = false
    }
  }
}
</script>

<style lang="scss">
.about {
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  max-height: 650px;
  background-color: black;
  color: white;

  transform: skewY(0deg);
  overflow: hidden;

  .lmao {
    width: 100%;
    height: 900px;
    position: relative;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'about bgthing';
    align-items: center;
    //transform: skewY(-3deg);

    overflow: hidden;

    .about-wrap {
      align-self: center;
      justify-self: center;
      transform: skewX(-15deg);
    }
    .about-inner {
      grid-area: about;
      margin-bottom: 50px;
      transform: skewX(15deg);
      padding: 0px 10px 0px 70px;
    }
    .bg-thing-wrap {
      grid-area: bgthing;
      width: 100%;
      height: 100%;
      transform: skew(-15deg) translate(87px);
      overflow: hidden;
    }
    .bg-thing {
      height: 120%;
      width: 120%;
      transform: skewX(15deg) translate(-87px);
      background-size: cover;
      background-position: center;
    }
    h1 {
      font-family: var(--header);
      font-size: 3.6em;
      letter-spacing: -0.03em;
      font-weight: normal;
      margin-top: 0px;
    }
    p {
      margin-top: 25px;
      font-size: 1.4em;
      padding-right: 20px;
      line-height: 1.45em;
    }
  }
}

.about::after {
  content: '';
  position: absolute;
  height: 6px;
  background: linear-gradient(to left, #E000FF 25%, #FFFF00 25% 50%, #00D4FF 50% 75%, white 75%);
  right: 0;
  left: 0;
  top: 0;
}

.map::after {
  content: '';
  position: absolute;
  height: 6px;
  background: linear-gradient(to right, #E000FF 25%, #FFFF00 25% 50%, #00D4FF 50% 75%, white 75%);
  right: 0;
  left: 0;
  top: 0;
}

.book::after {
  content: '';
  position: absolute;
  height: 6px;
  background: linear-gradient(to left, #E000FF 25%, #FFFF00 25% 50%, #00D4FF 50% 75%, white 75%);
  right: 0;
  left: 0;
  top: 0;
}

.about.a2::after {
  background: linear-gradient(to right, #E000FF 25%, #FFFF00 25% 50%, #00D4FF 50% 75%, white 75%);
}

#poly1 {
  width: 0;
  height: 0;
}

.schedule {
  z-index: 1;

  height: 500px;

  transform: skewY(0deg);
  background-color: black;
  background-image: url(@/assets/mwf/background.svg);
  background-size: cover;
  background-position: center;
  color: white;

  .schedule-inner {
    //transform: skewY(-3deg);

    clip-path: url(#poly2clip);

    display: grid;
    grid-template-rows: 200px 1fr;

    h1 {
      font-size: 3.5em;
      font-family: var(--header);
      letter-spacing: -0.04em;
      font-weight: normal;
      align-self: center;
      justify-self: center;
    }

    .events-wrapper {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      overflow-x: auto;
      cursor: grab;
      padding-bottom: 40px;

      .fade {
        width: 100px;
        height: 680px;

        position: absolute;
        pointer-events: none;

        display: none;
        align-items: center;

        i {
          font-size: 3.5em;
          text-shadow: 0px 2px 8px rgb(0,0,0);
          pointer-events: all;
          cursor: pointer;

          /* padding: 30px 20px;
          background: rgba(0,0,0,.25);
          border-radius: 20px; */
        }

        i:hover {
          opacity: 0.75;
        }
      }

      .fade.left {
        left: 0;
        justify-content: flex-end;
      }

      .fade.right {
        right: 0;
        justify-content: flex-start;
      }

      .cards-container {
        padding: 0px 20px;

        display: flex;

        //align-items: center;
        justify-content: flex-start;

        width: 100%;
      }
    }
    .events-wrapper::-webkit-scrollbar {
      background: transparent;
      height: 10px;
      display: none;
    }

    .events-wrapper::-webkit-scrollbar-thumb {
      background: #ffffff8e;
      border-radius: 20px;
    }

    .events-wrapper:hover::-webkit-scrollbar {
      display: block;
    }

    .events-wrapper:hover {
      padding-bottom: 30px;
    }
  }
}

.bg {
  position: absolute;
  width: 100%;
  height: 740px;
  z-index: -1;
  filter: brightness(0.5);
  top: 0;
  overflow: hidden;

  background-color: black;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    transition: 1.5s;
    transition-property: opacity, transform;
    transform: scale(1.1);
  }
}

.header-wrapper {
  padding: 0px 15%;
  display: flex;
  align-items: center;

  .info-header {
    margin-left: 80px;
    margin-top: 25px;

    h2 {
      font-size: 52px;

      margin: 0;
    }
  }
}

.header {
  width: 100%;
  height: 550px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  //text-align: center;
  padding-top: 40px;

  transition: 0.5s;
  //text-shadow: 0px 1px 10px rgba(0,0,0,0.9);

  h1 {
    font-size: 4.5em;
    font-family: var(--header);
    font-weight: normal;
    letter-spacing: -0.03em;
  }

  .main-logo {
    filter: brightness(10);
    width: 500px;
    height: auto;
  }

  .instant-nav-btns {
    margin-top: 20px;

    display: flex;
    flex-direction: column;

    .nav-btn {
      margin-bottom: 10px;

      a {
        color: #70c6ff;
        text-decoration: none;
        font-size: 1.6em;
      }

      a:hover {
        text-decoration: underline;
      }

      a:after {
        content: ' >';
      }
    }
  }
}

.map {
  height: 800px;
  width: 100%;
  transform: skewY(0deg);
  background-image: url('@/assets/mwf/background-lines.svg');
  background-position: center;
  background-size: cover;

  .map-inner {
    display: grid;
    grid-template-rows: 200px 1fr;
    color: white;
    height: 100%;
    width: 100%;

    h1 {
      font-size: 3.5em;
      font-family: var(--header);
      letter-spacing: -0.04em;
      font-weight: normal;
      align-self: center;
      justify-self: center;
      text-align: center;
    }
  }
}

.book {
  height: 600px;
  width: 100%;
  transform: skewY(0deg);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 100px;

    h1 {
      font-size: 3.5em;
      font-family: var(--header);
      letter-spacing: -0.04em;
      font-weight: normal;
      margin-bottom: 30px;
    }

    p {
      font-size: 1.4em;
    }
  }

  .button {
    padding: 15px 20px;
    border: solid 6px;
    width: 250px;
    border-top-color: #E000FF;
    border-right-color: #FFFF00;
    border-bottom-color: #00D4FF;
    border-left-color: white;
    border-radius: 15px;
    font-size: 1.4em;
    margin-top: 50px;
    cursor: pointer;
    user-select: none;

    display: flex;
    align-items: center;
    justify-content: center;

    i {
      margin-left: 10px;
    }
  }

  .button:hover {
    background: #ffffff21;
  }

  .button:active {
    background: #ffffff21;
    opacity: 0.5;
  }
}

/*
* wahoo mobile stuff
*/

@media (min-width: 1051px) {
  .about.a2 {
    .lmao {
      grid-template-areas: 'bgthing about';

      p {
        padding-right: 0px;
        padding-left: 20px;
      }

      .bg-thing-wrap {
        transform: skew(-15deg) translate(-87px);
      }

      .bg-thing {
        transform: skew(15deg) translate(87px);
      }

      .about-inner {
        text-align: right;
        padding: 0px 70px 0px 10px;
      }
    }
  }
}

@media (max-width: 1250px) {
  .header-wrapper {
    padding: 0 8%;
  }
}

@media (max-width: 1050px) {
  .header-wrapper {
    flex-direction: column;

    .main-logo {
      width: 280px;
    }

    .info-header {
      margin-left: 0px;
      margin-top: 40px;
      text-align: center;

      h2 {
        font-size: 2em;
      }

      .instant-nav-btns {
        .nav-btn {
          a {
            font-size: 1.25em;
          }
        }
      }
    }
  }

  .schedule {
    .schedule-inner {
      h1 {
        font-size: 2.6em;
        text-align: center;
      }

      .events-wrapper {
        padding-right: 10px;

        .cards-container {
          padding: 0px;
        }
      }
    }
  }

  .map {
    height: 600px;

    .map-inner {
      grid-template-rows: 150px 1fr;

      h1 {
        font-size: 2.6em;
      }
    }
  }

  .book {
    height: 550px;

    .title {
      h1 {
        font-size: 2.4em;
      }

      p {
        font-size: 1em;
      }

      .button {
        font-size: 1.1em;
        padding: 15px 20px;
        width: 200px;
      }
    }
  }

  .about {
    max-height: 800px;

    .lmao {
      grid-template-columns: none;
      grid-template-rows: 2fr 1fr;
      grid-template-areas:
      'about'
      'bgthing';

      .about-wrap {
        transform: skewX(0deg) skewY(-3deg);

        .about-inner {
          transform: skewX(0deg) skewY(3deg);
          margin-bottom: 30px;
          text-align: center;
          padding: 0px 30px;

          h1 {
            font-size: 2.25em;
          }

          p {
            padding-right: 0px;
            font-size: 1em;
          }
        }
      }

      .bg-thing-wrap {
        transform: skew(0deg) skewY(-3deg) translate(0px) translateY(-20px);
        height: 135%;

        .bg-thing {
          transform: skewX(0deg) skewY(3deg) translateY(-20px);
        }
      }
    }
  }
}
</style>
