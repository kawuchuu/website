export default {
  init(app) {
    const bassFilter = app.audioCtx.createBiquadFilter()
    bassFilter.type = 'lowshelf'
    bassFilter.frequency.value = 200
    return bassFilter
  },
  rangeUpdate(parent, event) {
    parent.effectsStore.bass.gain.value = event.target.value
  }
}