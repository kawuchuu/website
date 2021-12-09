export default {
  init(app) {
    const trebleFilter = app.audioCtx.createBiquadFilter()
    trebleFilter.type = 'highshelf'
    trebleFilter.frequency.value = 2000
    return trebleFilter
  },
  rangeUpdate(parent, event) {
    parent.effectsStore.treble.gain.value = event.target.value
  }
}