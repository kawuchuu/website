<template>
  <div class="app">
    <div class="content-container">
      <div class="content">
        <div class="title">
          <h1>Audio Toys</h1>
          <h2>Preview</h2>
        </div>
        <div class="controls" :class="isActive">
          <div class="status">
            <div class="file-select">
              <label for="selectFile">Select File</label>
              <input autocomplete="false" type="file" style="display: none" id="selectFile" @input="newFileInput">
              <p>Files selected here are not uploaded to the internet.</p>
            </div>
            <div class="divider"></div>
            <div class="status-controls">
              <div class="song-name">
                <div class="playing-ani">
                  <div class="bar one"></div>
                  <div class="bar two"></div>
                  <div class="bar three"></div>
                </div>
                <span id="fileName">No song playing...</span>
              </div>
              <div class="song-icon-controls">
                <i id="pausePlay" class="material-icons" title="Pause/play">play_arrow</i>
                <i id="stop" class="material-icons" title="Stop">stop</i>
              </div>
              <div class="seek-container">
                <span id="songCurrent">{{ songTime }}</span>
                <div ref="seekBarWrapper" class="seek-bar-inner-container" @mouseover="seekHover" @mouseleave="seekLeave" @mousedown="seekDown">
                    <div class="seek-bar" ref="seekBar">
                        <div ref="seekFill" :style="fill" class="fill"></div>
                        <!-- <div ref="seekFillHover" class="fill-hover"></div> -->
                        <div ref="handle" class="handle"></div>
                        <!-- <div ref="hoverIndicate" class="seek-hover-indicate">
                            <div class="num">{{ hoverIndicateNum }}</div>
                        </div> -->
                    </div>
                </div>
                <span id="songDuration">{{ songDuration }}</span>
              </div>
            </div>
          </div>
          <WebAudioEffectControl v-for="item in effectControls" :effectControl="item" :key="item.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      effectControls: [
        {
          title: 'Speed',
          min: 0.1,
          max: 3,
          defaultValue: 1,
          step: 0.05
        },
        {
          title: 'Gain',
          min: 0,
          max: 15,
          defaultValue: 1,
          step: 0.2
        },
        {
          title: 'Treble',
          min: 1,
          max: 40,
          defaultValue: 1,
          step: 0.2
        },
        {
          title: 'Bass',
          min: 1,
          max: 40,
          defaultValue: 1,
          step: 0.2
        },
        /*{
          title: 'Reverb',
          min: 0,
          max: 5,
          defaultValue: 0,
          step: 0.2
        }, */
      ],
      audioCtx: null,
      mediaAudio: new Audio(),
      mainSourceNode: MediaElementAudioSourceNode,
      audioDestination: null,
      currentFileName: 'Test File Name',
      isFirstRun: true,
      isActive: '',
      effectsStore: {},
      audio: {
        currentTime: null,
        duration: null
      },
      seekMouse: {
        down: false,
        over: false
      }
    }
  },
  computed: {
    fill() {
      return `width: ${(this.audio.currentTime / this.audio.duration) * 100}%`
    },
    songDuration() {
      return this.timeFormat(this.audio.duration)
    },
    songTime() {
      return this.timeFormat(this.audio.currentTime)
    }
  },
  methods: {
    newFileInput(evt) {
      this.isActive = ''
      if (!evt.target.files[0]) return
      const file = evt.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = this.readFile
    },
    readFile(a) {
      const dataUrl = a.target.result
      this.createNewAudioCtx(dataUrl)
    },
    async createNewAudioCtx(dataUrl) {
      if (this.isFirstRun) {
        this.audioCtx = new (AudioContext || webkitAudioContext)()
        this.mainSourceNode = this.audioCtx.createMediaElementSource(this.mediaAudio)
        const effectsCompleted = []
        this.effectControls.forEach(async (f, i, ar) => {
          try {
            const title = f.title.toLowerCase()
            const module = await import(`@/components/WebAudio/effects/${title}`)
            if (!module.default.init) return
            const effect = module.default.init(this)
            this.effectsStore[title] = effect
            if (effectsCompleted.length === 0) {
              this.mainSourceNode.connect(this.effectsStore[title])
            } else {
              this.effectsStore[effectsCompleted[effectsCompleted.length - 1]].connect(this.effectsStore[title])
            }
            console.log(i, ar.length - 1)
            if (i == ar.length - 1) {
              const lastEffect = Object.keys(this.effectsStore)[Object.keys(this.effectsStore).length - 1]
              console.log('happened', lastEffect)
              this.effectsStore[lastEffect].connect(this.audioCtx.destination)
            }
            effectsCompleted.push(title)
          } catch(e) {
            console.error(e)
          }
        })
        this.isFirstRun = false
      } else {
        this.mediaAudio.removeEventListener('timeupdate', this.timeUpdate)
      }
      this.mediaAudio.src = dataUrl.toString()
      this.mediaAudio.preservesPitch = false
      this.mediaAudio.playbackRate = 1
      this.mediaAudio.play()
      this.mediaAudio.addEventListener('timeupdate', this.timeUpdate)
      this.isActive = 'active'
    },
    timeUpdate() {
      this.audio.currentTime = this.mediaAudio.currentTime
      this.audio.duration = this.mediaAudio.duration
    },
    getP(e, el) {
      let pBar = (e.clientX - el.getBoundingClientRect().x) / el.clientWidth;
      pBar = this.clamp(0, pBar, 1);
      return pBar;
    },
    clamp(min, val, max) {
      return Math.min(Math.max(min, val), max);
    },
    seekMove(evt) {
      if (!this.seekMouse.down) return
      const pBar = this.getP(evt, this.$refs.seekBar)
      this.$refs.seekFill.style.width = pBar * 100 + '%'
      this.audio.currentTime = pBar * this.audio.duration
    },
    seekUp(evt) {
      window.removeEventListener('mousemove', this.seekMove)
      window.removeEventListener('mouseup', this.seekUp)
      if (!this.seekMouse.down) return
      this.seekMouse.down = false
      const pBar = this.getP(evt, this.$refs.seekBar)
      this.$refs.seekFill.width = pBar * 100 + '%'
      if (!this.seekMouseOver) {
        this.$refs.handle.classList.remove('hover')
      }
      this.mediaAudio.addEventListener('timeupdate', this.timeUpdate)
      this.mediaAudio.currentTime = pBar * this.audio.duration
    },
    seekDown(evt) {
      const pBar = this.getP(evt, this.$refs.seekBar)
      this.seekMouse.down = true
      this.mediaAudio.removeEventListener('timeupdate', this.timeUpdate)
      window.addEventListener('mousemove', this.seekMove)
      window.addEventListener('mouseup', this.seekUp)
      this.$refs.seekFill.style.width = pBar * 100 + '%'
    },
    seekHover() {
      this.seekMouse.over = true
      this.$refs.handle.classList.add('hover')
    },
    seekLeave() {
      this.seekMouse.over = false
      if (this.seekMouse.down) return
      this.$refs.handle.classList.remove('hover')
    },
    timeFormat(s) {
      if (isNaN(s)) return '-:--'
      let min = Math.floor(s / 60);
      let sec = Math.floor(s - (min * 60));
      if (sec < 10){
        sec = `0${sec}`;
      }
      return `${min}:${sec}`;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

:root {
  --wa-bg: #000000;
  --wa-txt: white;
  --wa-hl: rgba(255, 255, 255, 0.10);
  --wa-bgop: rgba(0, 0, 0, 0.5);
}

body {
  font-family: 'DM Sans', 'JetBrains Mono', 'Inter', sans-serif;
  background: var(--wa-bg);
  color: var(--wa-txt);
  margin: 0;
  user-select: none;
  -moz-user-select: -moz-none;
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  width: 80%;
  max-width: 1080px;
  padding: 40px 0px;
}

label, button {
  color: white;
  padding: 10px 15px;
  border: solid 1px var(--wa-txt);
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  background: none;
  font-family: 'DM Sans', 'Inter', sans-serif;
  outline: none;
  font-size: 16px;
}

label:hover, button:hover {
  background: var(--wa-hl);
}

label:active, button:active {
  background: var(--wa-hl);
  opacity: 0.5;
}

.song-icon-controls i:hover, div.control-btns i:hover {
  background: var(--wa-hl);
  border-color: var(--wa-txt) !important;
}

.song-icon-controls i:active, div.control-btns i:active {
  background: var(--wa-hl);
  opacity: 0.5;
  border-color: var(--wa-txt) !important;
}

input[type=range] {
  width: 100%;
  margin: 0;
  background-color: transparent;
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  background: none;
  border: solid 1px var(--wa-txt);
  border-radius: 10px;
  width: 100%;
  height: 6px;
  cursor: pointer;
}

input[type=range]::-webkit-slider-thumb {
  margin-top: -7px;
  width: 18px;
  height: 18px;
  background: var(--wa-bg);
  border: 1px solid var(--wa-txt);
  border-radius: 20px;
  cursor: pointer;
  -webkit-appearance: none;
}

input[type=range]::-moz-range-track {
  background: none;
  border: solid 1px var(--wa-txt);
  border-radius: 10px;
  width: 100%;
  height: 6px;
  cursor: pointer;
}

input[type=range]::-moz-range-thumb {
  margin-top: -7px;
  width: 18px;
  height: 18px;
  background: var(--wa-bg);
  border: 1px solid var(--wa-txt);
  border-radius: 20px;
  cursor: pointer;
}

#stop, div.seek-container {
  opacity: 0.35;
  pointer-events: none;
}

div.controls.active #stop, div.controls.active div.seek-container {
  opacity: 1;
  pointer-events: all;
}

div.control-item div.item-title, div.control-item input, div.control-item div.control-btns {
  opacity: 0.35;
}

div.controls.active div.control-item div.item-title, div.controls.active div.control-item input, div.controls.active div.control-item div.control-btns {
  opacity: 1;
  pointer-events: all;
}

div.title {
  display: flex;
  align-items: center;

  h2 {
    margin-left: 10px;
    opacity: 0.6;
  }
}

div.controls {
  width: 100%;
  min-height: 550px;
  margin-top: 10px;
  display: grid;
  gap: 20px;
  box-sizing: border-box;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-content: center;

  div.status {
    min-height: 115px;
    grid-column: 1 / 4;
    border: 1px solid;
    display: grid;
    grid-template-columns: 1fr 40px 2fr;
    gap: 20px;
    padding: 0 40px;
    background: var(--wa-bgop);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);

    .file-select {
      align-self: center;
      justify-self: center;
      text-align: center;
      min-width: 48%;

      p {
        margin: 30px 0 0;
        font-size: 12px;
        opacity: 0.5;
      }
    }

    .divider {
      width: 1px;
      height: 80%;
      border-left: solid 1px var(--wa-txt);
      align-self: center;
      justify-self: center;
    }

    .status-controls {
      min-width: 48%;
      align-self: center;

      .song-icon-controls {
        margin-top: 20px;

        i {
          margin: 0 5px;
          user-select: none;
          -moz-user-select: none;
          cursor: pointer;
          padding: 5px;
          border-radius: 50px;
          border: solid 1px transparent;
        }
      }
    }

    .playing-ani {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 21px;
      height: 15px;

      .bar {
        min-width: 4px;
        height: 25%;
        background: var(--wa-txt);
        margin: 0 2px;
        transition: 0.25s;
        transition-property: height;
      }
    }

    @keyframes barmove {
      from {
        height: 25%;
      }
      to {
        height: 100%;
      }
    }

    .playing-ani.start .bar {
      animation: barmove 0.75s infinite ease-out alternate;
    }

    .playing-ani .bar.two {
      animation-delay: 0.25s;
    }

    .playing-ani .bar.three {
      animation-delay: 0.5s;
    }

    .song-name {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .seek-container {
      margin-top: 15px;
      display: grid;
      grid-template-columns: 60px 1fr 60px;
      align-items: center;

      #songDuration {
        margin-left: 15px;
        text-align: center;
      }

      #songCurrent {
        margin-right: 15px;
        text-align: center;
      }

      .seek-bar-inner-container {
        padding-top: 3px;
        padding-bottom: 3px;
        position: relative;
        z-index: 15;
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
      }
      .seek-bar {
        margin: 10px 0px;
        width: 100%;
        background: black;
        display: flex;
        align-items: center;
        border-radius: 999px;
        height: 4px;
        z-index: 5;
        border: solid 1px white;
      }
      .seek-bar.hover, .fill.hover {
        height: 5px;
      }
      .fill {
        height: 4px;
        background: #1e1e1e;
        border-radius: 10000px;
        //transition: cubic-bezier(0, 1, 0.35, 1) .15s;
        width: 0%;
        z-index: 2;
      }
      .fill-hover {
        height: 4px;
        background-color: #ffffff36;
        border-radius: 10px;
        position: absolute;
        opacity: 0;
      }
      .handle {
        width: 10px;
        height: 10px;
        background: black;
        border-radius: 11111px;
        margin-left: -5px;
        transform: scale(1.5);
        transition: all .1s;
        z-index: 3;
        border: solid 1px white;
      }
      .handle.hover {
        width: 14px !important;
        height: 14px !important;
        transition: all .1s !important;
      }
    }
  }

  div.control-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(255,255,255,.35);
    padding: 0px 30px;
    pointer-events: none;
    background: var(--wa-bgop);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);

    h2 {
      font-weight: normal;
      font-size: 26px;
      margin: 0;
    }

    .control-btns {
      display: flex;
      align-items: center;
      margin-top: 30px;

      i {
        margin: 0 15px;
        padding: 5px;
        border-radius: 50px;
        border: solid 1px transparent;
        cursor: pointer;
        user-select: none;
      }

      i:first-child {
        margin: 0px;
      }
    }

    .item-title {
      display: flex;
      align-items: center;
      margin: 0 0 30px;

      span {
        font-size: 26px;
        margin-left: 10px;
        opacity: 0.5;
      }
    }
  }
}
</style>
