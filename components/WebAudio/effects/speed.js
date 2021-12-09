export default {
  rangeUpdate(parent, event) {
    parent.mediaAudio.playbackRate = event.target.value
  }
}
