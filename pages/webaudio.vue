/**
 * TODO: Convert this page from vanilla JS to Vue + TS.
 */

<template>
  <div class="app">
    <div class="bg-container">
      <div class="bg"></div>
    </div>
    <div class="wrapper-ontop disclaimer">
      <div class="ontop">
        <h1>Disclaimer</h1>
        <p>Some controls may exceed healthy volume levels. Please use at your own risk.</p>
        <p>You can view this message again by clicking 'disclaimer' at the bottom of the page.</p>
        <br>
        <button id="closeDisclaimer">Got it</button>
      </div>
    </div>
    <div class="nav-bar">
      <div class="nav-bar-container">
        <a href="/">
          <i class="material-icons">arrow_back_ios</i>
          <span>Back to kawuchuu</span>
        </a>
      </div>
    </div>
    <div class="content-container">
      <div class="content">
        <h1>Web Audio API</h1>
        <p class="description">Try out these effects made available using the Web Audio API here!</p>
        <div class="controls">
          <div class="status">
            <div class="file-select">
              <label for="selectFile">Select File</label>
              <input autocomplete="false" type="file" style="display: none" id="selectFile">
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
                <span id="songCurrent">-:--</span>
                <input type="range" id="seekRange" value="0" step=0.5>
                <span id="songDuration">-:--</span>
              </div>
            </div>
          </div>
          <div id="speedRange" class="control-item">
            <div class="item-title">
              <h2>Speed</h2>
              <span>-</span>
              <span class="num">1x</span>
            </div>
            <input type="range" min="0.05" max="3" value="1" step="0.05">
            <div class="control-btns">
              <i class="material-icons clear" id="speedClear" title="Reset">update</i>
              <!-- <i class="material-icons" title="About this effect">info</i> -->
            </div>
          </div>
          <div id="gainRange" class="control-item">
            <div class="item-title">
              <h2>Gain</h2>
              <span>-</span>
              <span class="num">1x</span>
            </div>
            <input type="range" min="0" max="15" value="1" step="0.2">
            <div class="control-btns">
              <i class="material-icons clear" id="gainClear" title="Reset">update</i>
              <!-- <i class="material-icons" title="About this effect">info</i> -->
            </div>
          </div>
          <div id="trebleRange" class="control-item">
            <div class="item-title">
              <h2>Treble</h2>
              <span>-</span>
              <span class="num">1x</span>
            </div>
            <input type="range" min="1" max="40" value="1" step="0.2">
            <div class="control-btns">
              <i class="material-icons clear" id="trebleClear" title="Reset">update</i>
              <!-- <i class="material-icons" title="About this effect">info</i> -->
            </div>
          </div>
          <div id="bassRange" class="control-item">
            <div class="item-title">
              <h2>Bass</h2>
              <span>-</span>
              <span class="num">1x</span>
            </div>
            <input type="range" min="1" max="40" value="1" step="0.2">
            <div class="control-btns">
              <i class="material-icons clear" id="bassClear" title="Reset">update</i>
              <!-- <i class="material-icons" title="About this effect">info</i> -->
            </div>
          </div>
          <div id="reverbRange" class="control-item">
            <div class="item-title">
              <h2>Reverb</h2>
              <span>Gain</span>
              <span>-</span>
              <span class="num">0x</span>
            </div>
            <input type="range" min="0" max="5" value="0" step="0.2">
            <div class="control-btns">
              <i class="material-icons clear" id="reverbClear" title="Reset">update</i>
              <!-- <i class="material-icons" title="About this effect">info</i> -->
            </div>
          </div>
          <!-- <div class="control-item">
                        <h2>Channel</h2>
                    </div> -->
        </div>
        <div class="footer">
          <p>Copyright &copy; 2021 kawuchuu</p>
          <span id="disclaimerShow">Disclaimer</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let ctx;
let gainFilter;
let bassFilter;
let trebleFilter;
let reverbConvolver;
let ctxBufferSource;
let ctxConvolverSource;
let impulseData;
let convolver;
let convolverGain;
let bkBuffer;
let addSeekBy = 0;
let isPlaying = false;
let seekIntervalMain = null;

let speedRange = document.querySelector('#speedRange input');
let gainRange = document.querySelector('#gainRange input');
let trebleRange = document.querySelector('#trebleRange input');
let bassRange = document.querySelector('#bassRange input');
let reverbRange = document.querySelector('#reverbRange input');
let fileName = document.querySelector('#fileName');
let playingAni = document.querySelector('.playing-ani');
let pausePlay = document.querySelector('#pausePlay');
let stopBtn = document.querySelector('#stop');
let controls = document.querySelector('.controls');
let seekRange = document.querySelector('#seekRange');
let songDuration = document.querySelector('#songDuration');
let songCurrent = document.querySelector('#songCurrent');

let seekInterval = () => {
    window.dispatchEvent(seek);
}

const timeFormat = s => {
    if (isNaN(s)) return '-:--'
    let min = Math.floor(s / 60);
    let sec = Math.floor(s - (min * 60));
    if (sec < 10){
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

let createNewAudioCtx = async hasGotBuffer => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();
    gainFilter = ctx.createGain();
    bassFilter = ctx.createBiquadFilter();
    trebleFilter = ctx.createBiquadFilter();
    ctxBufferSource = ctx.createBufferSource();
    bassFilter.type = 'lowshelf';
    trebleFilter.type = 'highshelf';
    bassFilter.frequency.value = 200;
    trebleFilter.frequency.value = 2000;
    if (!hasGotBuffer) {
        let resp = await fetch('./subway.wav');
        let data = await resp.arrayBuffer();
        let waitForThing = new Promise(resolve => {
            ctx.decodeAudioData(data, impulseBuffer => {
                ctxConvolverSource = ctx.createBufferSource();
                convolver = ctx.createConvolver();
                convolver.buffer = impulseBuffer;
                convolver.normalize = true;
                convolverGain = ctx.createGain();
                console.log('wooooo');
                impulseData = impulseBuffer;
                resolve();
            })
        })
        await waitForThing;
    } else {
        ctxConvolverSource = ctx.createBufferSource();
        convolver = ctx.createConvolver();
        convolver.buffer = impulseData;
        convolver.normalize = true;
        convolverGain = ctx.createGain();
        console.log('wooooo');
    }
    console.log('Created new AudioContext with filters');
}

let playingAnimationToggle = enable => {
    if (enable) {
        playingAni.classList.add('start');
    } else {
        playingAni.classList.remove('start');
    }
}

document.querySelector('#selectFile').addEventListener('input', evt => {
    if (!evt.target.files[0]) return;
    if (ctx) ctx.close();
    isPlaying = false
    clearInterval(seekIntervalMain)
    songCurrent.textContent = '-:--'
    songDuration.textContent = '-:--'
    playingAnimationToggle(false);
    fileName.textContent = "Reading file...";
    pausePlay.textContent = 'play_arrow';
    controls.classList.remove('active');
    let audioFile = evt.target.files[0];
    if (!audioFile.type.startsWith('audio')) {
        fileName.textContent = "You didn't select an audio file!"
        console.error('The file selected is not an audio file.');
        return;
    }
    /* window.mutag.fetch(audioFile).then(tags => {
        console.log(tags)
    }) */
    let reader = new FileReader();
    reader.readAsArrayBuffer(audioFile);
    reader.onload = () => {
        readFile(reader.result, audioFile.name);
    }
})

let readFile = async (buffer, name) => {
    fileName.textContent = "Preparing file...";
    let waitForNewCtx = new Promise(async resolve => {
        await createNewAudioCtx();
        console.log('lol yeah finish')
        resolve();
    })
    await waitForNewCtx;
    let getBuffer = await ctx.decodeAudioData(buffer).catch(e => {
        fileName.textContent = "Failed to decode audio data!"
    })
    if (!getBuffer) return
    bkBuffer = getBuffer;
    fileName.textContent = `${name}`;
    addSeekBy = 0;
    play(getBuffer, 0);
    console.log('done!');
}

let play = (buffer, time) => {
    ctxBufferSource.buffer = buffer;
    ctxBufferSource.loop = false;
    ctxBufferSource.playbackRate.value = speedRange.value;
    gainFilter.gain.value = gainRange.value;
    trebleFilter.gain.value = trebleRange.value;
    bassFilter.gain.value = bassRange.value;
    ctxBufferSource.connect(gainFilter)
                .connect(bassFilter)
                .connect(trebleFilter)
                .connect(ctx.destination);
    console.log(ctxConvolverSource)
    ctxConvolverSource.buffer = buffer;
    ctxConvolverSource.loop = false;
    ctxConvolverSource.playbackRate.value = speedRange.value;
    convolverGain.gain.value = reverbRange.value;
    ctxConvolverSource.connect(convolver).connect(convolverGain).connect(ctx.destination);
    if (time) {
        ctxBufferSource.start(0, time, ctxBufferSource.buffer.duration);
        ctxConvolverSource.start(0, time, ctxBufferSource.buffer.duration);
    } else {
        ctxBufferSource.start(0);
        ctxConvolverSource.start(0);
    }
    controls.classList.add('active');
    seekRange.max = ctxBufferSource.buffer.duration;
    ctxBufferSource.addEventListener('ended', () => {
        isPlaying = false
        doSeek(0)
    })
    if (ctx.state == 'running') {
        playingAnimationToggle(true);
        pausePlay.textContent = 'pause';
        if (!isPlaying) {
            seekRange.value = 0
            songCurrent.textContent = '0:00'
        }
        let thingy = 1000 / parseFloat(speedRange.value)
        clearInterval(seekIntervalMain)
        seekIntervalMain = setInterval(seekInterval, thingy);
        songDuration.textContent = timeFormat(ctxBufferSource.buffer.duration)
        isPlaying = true
    }
}

let doSeek = async time => {
    ctx.close();
    addSeekBy = time;
    let waitForNewCtx = new Promise(async resolve => {
        await createNewAudioCtx(true);
        console.log('lol yeah finish')
        resolve();
    })
    await waitForNewCtx;
    play(bkBuffer, time);
}

speedRange.addEventListener('input', evt => {
    ctxBufferSource.playbackRate.value = evt.target.value;
    ctxConvolverSource.playbackRate.value = evt.target.value;
    clearInterval(seekIntervalMain);
    let thingy = 1000 / parseFloat(evt.target.value)
    seekIntervalMain = setInterval(seekInterval, thingy);
    console.log(thingy)
    //seekRange.max = ctxBufferSource.buffer.duration / parseFloat(evt.target.value);
    document.querySelector('#speedRange div.item-title span.num').textContent = `${evt.target.value}x`;
})

gainRange.addEventListener('input', evt => {
    gainFilter.gain.value = evt.target.value;
    document.querySelector('#gainRange div.item-title span.num').textContent = `${evt.target.value}x`;
})

trebleRange.addEventListener('input', evt => {
    trebleFilter.gain.value = evt.target.value - 1;
    document.querySelector('#trebleRange div.item-title span.num').textContent = `${evt.target.value}x`;
})

bassRange.addEventListener('input', evt => {
    bassFilter.gain.value = evt.target.value - 1;
    document.querySelector('#bassRange div.item-title span.num').textContent = `${evt.target.value}x`;
})

reverbRange.addEventListener('input', evt => {
    convolverGain.gain.value = evt.target.value;
    document.querySelector('#reverbRange div.item-title span.num').textContent = `${evt.target.value}x`;
})

pausePlay.addEventListener('click', evt => {
    if (!ctx || ctx.state == 'closed') {
        fetch('./default.mp3').then(resp => {
            resp.arrayBuffer().then(buffer => {
                readFile(buffer, "albie - drifting away");
            })
        })
    } else if (ctx.state == 'running') {
        ctx.suspend();
        evt.target.textContent = 'play_arrow';
        playingAnimationToggle(false);
        isPlaying = false
        clearInterval(seekIntervalMain)
    } else if (ctx.state == 'suspended') {
        ctx.resume();
        evt.target.textContent = 'pause'
        playingAnimationToggle(true);
        let thingy = 1000 / parseFloat(speedRange.value)
        seekIntervalMain = setInterval(seekInterval, thingy);
        isPlaying = true
    }
})

stopBtn.addEventListener('click', evt => {
    isPlaying = false
    clearInterval(seekIntervalMain)
    songCurrent.textContent = '-:--'
    songDuration.textContent = '-:--'
    if (ctx) ctx.close();
    fileName.textContent = "No song playing...";
    playingAnimationToggle(false);
    pausePlay.textContent = 'play_arrow';
    controls.classList.remove('active');
})

//event handling for seeking! such a stupid way of doing it but i have no other choice :(

const seek = new Event('seek');

let seekEvtFunc = () => {
    if (ctx) {
        seekRange.value++;
        songCurrent.textContent = timeFormat(seekRange.value)
    }
}

window.addEventListener('seek', seekEvtFunc);

seekRange.addEventListener('mousedown', () => {
    window.removeEventListener('seek', seekEvtFunc);
})

seekRange.addEventListener('mouseup', () => {
    window.addEventListener('seek', seekEvtFunc);
})

seekRange.addEventListener('input', e => {
    songCurrent.textContent = timeFormat(e.target.value)
})

seekRange.addEventListener('change', e => {
    doSeek(e.target.value);
})

//background animation

let bg = document.querySelector('.bg');

let mouseX = 0;
let mouseY = 0;
let bgMoveX = 0;
let bgMoveY = 0;
let speed = 0.03;

let doAnimation = () => {
    let distanceX = mouseX - bgMoveX;
    let distanceY = mouseY - bgMoveY;
    bgMoveX = bgMoveX + (distanceX * speed);
    bgMoveY = bgMoveY + (distanceY * speed);
    bg.style.left = bgMoveX + 'px';
    bg.style.top = bgMoveY + 'px';
    requestAnimationFrame(doAnimation)
}

doAnimation();

window.addEventListener('pointermove', evt => {
    if (evt.pointerType != 'mouse') {
        mouseX = 0;
        mouseY = 0;
        return;
    }
    mouseX = evt.pageX / 30;
    mouseY = evt.pageY /22;
})

document.querySelectorAll('.clear').forEach(el => {
    switch(el.id) {
        case "speedClear":
            el.addEventListener('click', () => {
                speedRange.value = 1;
                ctxBufferSource.playbackRate.value = 1;
                ctxConvolverSource.playbackRate.value = 1;
                clearInterval(seekIntervalMain);
                seekIntervalMain = setInterval(seekInterval, parseFloat(1) * 1000);
                seekRange.max = ctxBufferSource.buffer.duration / parseFloat(1);
                document.querySelector('#speedRange div.item-title span.num').textContent = `1x`;
            })
            break;
        case "gainClear":
            el.addEventListener('click', () => {
                gainRange.value = 1;
                gainFilter.gain.value = 1;
                document.querySelector('#gainRange div.item-title span.num').textContent = `1x`;
            })
            break;
        case "trebleClear":
            el.addEventListener('click', () => {
                trebleRange.value = 0;
                trebleFilter.gain.value = 0;
                document.querySelector('#trebleRange div.item-title span.num').textContent = `0x`;
            })
            break;
        case "bassClear":
            el.addEventListener('click', () => {
                bassRange.value = 0;
                bassFilter.gain.value = 0;
                document.querySelector('#bassRange div.item-title span.num').textContent = `0x`;
            })
            break;
        case "reverbClear":
            el.addEventListener('click', () => {
                reverbRange.value = 0;
                convolverGain.gain.value = 0;
                document.querySelector('#reverbRange div.item-title span.num').textContent = `0x`;
            })
            break;
        default:
            console.log('what lol')
    }
})

const disclaimer = document.querySelector('.disclaimer')

if (!localStorage.getItem('wa-disclaimer-accept')) {
    disclaimer.classList.add('show')
}

document.querySelector('#closeDisclaimer').addEventListener('click', () => {
    disclaimer.classList.remove('show')
    disclaimer.classList.add('hide')
    localStorage.setItem('wa-disclaimer-accept', true)
})

document.querySelector('#disclaimerShow').addEventListener('click', () => {
    disclaimer.classList.add('show')
})
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=DM+Serif+Display&display=swap');

:root {
    --wa-bg: #000000;
    --wa-txt: white;
    --wa-hl: rgba(255, 255, 255, 0.10);
    --wa-bgop: rgba(0, 0, 0, 0.5);
/*     scrollbar-color: black;
    scrollbar-width: thin; */
}

/* ::-webkit-scrollbar {
    background: var(--wa-bg);
    width: 14px;
}

::-webkit-scrollbar-thumb {
    background: var(--wa-hl);
    border: solid 4px var(--wa-bg);
    border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,.4);
}

::-webkit-scrollbar-thumb:active {
    background: var(--wa-txt);
} */

body {
    font-family: 'DM Sans', 'JetBrains Mono', 'Inter', sans-serif;
    background: var(--wa-bg);
    color: var(--wa-txt);
    margin: 0;
}

.bg-container {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    opacity: 0.2;
}

.bg {
    width: 100%;
    height: 100%;
    background-image: url('../assets/bg.svg');
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    transform: scale(1.5)
}

div.nav-bar-container {
    display: flex;
    align-items: center;
    border-bottom: solid 1px var(--wa-txt);
    padding: 20px 0px;
}

div.nav-bar-container a, .ontop a {
    color: var(--wa-txt);
    text-decoration: none;
    display: flex;
    align-items: center;
}

div.nav-bar-container a:hover span, .ontop a:hover span {
    text-decoration: underline;
}

div.nav-bar-container a:active, .ontop a:active {
    opacity: 0.5;
}

div.nav-bar-container a:active span, .ontop a:active span {
    text-decoration: underline;
}

div.nav-bar {
    padding: 0px 20px;
    background: var(--wa-bgop);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    position: fixed;
    z-index: 2;
    width: calc(100% - 40px);
}

div.content-container {
    display: flex;
    justify-content: center;
}

div.content {
    width: 80%;
    max-width: 1080px;
    padding: 40px 0px;
    margin-top: 65px;
}

h1 {
    font-size: 72px;
    font-family: 'DM Serif Display', 'DM Sans', 'Inter', sans-serif;
    letter-spacing: 0em;
    font-weight: normal;
    margin-bottom: 5px;
    margin-top: 0px;
}

p.description {
    margin-bottom: 5px;
}

div.controls {
    width: 100%;
    min-height: 550px;
    margin-top: 35px;
    display: grid;
    gap: 20px;
    box-sizing: border-box;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    justify-content: center;
}

div.controls.active div.control-item div.item-title, div.controls.active div.control-item input, div.controls.active div.control-item div.control-btns {
    opacity: 1;
    pointer-events: all;
}

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
}

div.controls.active div.control-item {
    border-color: white;
}

div.control-item h2 {
    font-weight: normal;
    font-size: 26px;
    margin: 0;
}

div.control-btns {
    display: flex;
    align-items: center;
    margin-top: 30px;
}

div.control-btns i {
    margin: 0 15px;
    padding: 5px;
    border-radius: 50px;
    border: solid 1px transparent;
    cursor: pointer;
    user-select: none;
}

div.control-btns i:first-child {
    margin: 0px;
}

.item-title {
    display: flex;
    align-items: center;
    margin: 0 0 30px;
}

.item-title span {
    font-size: 26px;
    margin-left: 10px;
    opacity: 0.5;
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

.file-select {
    align-self: center;
    justify-self: center;
    text-align: center;
    min-width: 48%;
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

.file-select p {
    margin: 30px 0 0;
    font-size: 12px;
    opacity: 0.5;
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
}

.playing-ani {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 21px;
    height: 15px;
}

.playing-ani .bar {
    min-width: 4px;
    height: 25%;
    background: var(--wa-txt);
    margin: 0 2px;
    transition: 0.25s;
    transition-property: height;
}

.playing-ani.start .bar {
    animation: barmove 0.75s infinite ease-out alternate;
}

@keyframes barmove {
    from {
        height: 25%;
    }
    to {
        height: 100%;
    }
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
}

.song-name span {
    margin-left: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.song-icon-controls {
    margin-top: 20px;
}

.song-icon-controls i {
    margin: 0 5px;
    user-select: none;
    -moz-user-select: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50px;
    border: solid 1px transparent;
}

.song-icon-controls i:hover, div.control-btns i:hover {
    background: var(--wa-hl);
    border-color: var(--wa-txt);
}

.song-icon-controls i:active, div.control-btns i:active {
    background: var(--wa-hl);
    opacity: 0.5;
    border-color: var(--wa-txt);
}

.song-icon-controls i:first-child {
    margin-left: 0px;
}

.seek-container {
    margin-top: 15px;
    display: grid;
    grid-template-columns: 60px 1fr 60px;
    align-items: center;
}

#songDuration {
    margin-left: 15px;
}

#songCurrent {
    margin-right: 15px;
}

div.wrapper-ontop {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10;
    background: var(--wa-bg);
}

div.ontop {
    padding: 0px 40px;
}

div.ontop h1 {
    font-size: 42px;
    border-bottom: solid 1px var(--wa-txt);
    padding-bottom: 15px;
    margin-bottom: 30px;
}

div.ontop a {
    margin-top: 40px;
}

div.footer {
    margin-top: 40px;
    border-top: 1px solid var(--wa-txt);
    font-size: 12px;
    display: flex;
    align-items: center;
}

div.footer p::after {
    content: '|';
    margin: 0px 10px;
}

div.footer span {
    text-decoration: underline;
    cursor: pointer;
}

div.footer span:hover {
    opacity: 0.7;
}

@keyframes open {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes close {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes inneropen {
    from {
        transform: scale(0.95);
    }
    to {
        transform: scale(1);
    }
}

@keyframes innerclose {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0.95);
    }
}

div.wrapper-ontop.disclaimer {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    opacity: 0;
    pointer-events: none;
    transform: scale(1);
}

div.wrapper-ontop.disclaimer.hide {
    animation: close .35s;
}

div.wrapper-ontop.disclaimer.hide .ontop {
    animation: innerclose .35s;
}

div.wrapper-ontop.disclaimer.show .ontop {
    animation: inneropen .35s;
}

div.wrapper-ontop.disclaimer.show {
    opacity: 1;
    animation: open .35s;
    pointer-events: all;
}

@media (max-width: 1050px) {
    div.control-item {
        grid-column: 1 / 4;
        height: 170px;
    }
    div.status {
        height: 170px;
    }
}

@media (max-width: 750px) {
    div.status {
        grid-template-columns: none;
        grid-template-rows: 1fr 10px 1fr;
        height: 325px;
        gap: 30px;
        padding: 0 20px;
    }

    div.file-select {
        align-self: flex-end;
    }

    div.divider {
        height: 1px;
        width: 100%;
        border-left: none;
        border-bottom: solid 1px var(--wa-txt);
    }

    div.status-controls {
        text-align: center;
        align-self: flex-start;

    }

    .song-name {
        justify-content: center;
    }

    .song-icon-controls i:first-child {
        margin-left: 5px;
    }

    .song-name span {
        font-size: 14px;
    }

    h1 {
        font-size: 3em;
        margin-top: 10px;
        text-align: center;
    }

    p {
        text-align: center;
    }

    .bg-container {
        display: none;
    }

    div.wrapper-ontop {
        text-align: center;
    }
}

@media (prefers-color-scheme: light) {
    :root {
        --wa-bg: #f7f7f7;
        --wa-txt: #131313;
        --wa-hl: rgb(19 19 19 / 10%);
        --wa-bgop: rgb(247 247 247 / 30%);
    }

    div.control-item {
        border-color: rgb(19 19 19 / 35%);
    }

    div.controls.active div.control-item {
        border-color: #131313;
    }

    div.wrapper-ontop.disclaimer {
        background: rgb(247 247 247 / 50%)
    }

    label, button {
        color: var(--wa-txt)
    }
}
</style>
