export default {
  init(app) {
    return app.audioCtx.createGain()
  },
  rangeUpdate(parent, event) {
    parent.effectsStore.gain.gain.value = event.target.value
  }
}
