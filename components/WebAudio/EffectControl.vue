<template>
  <div class="control-item">
    <div class="item-title">
      <h2>{{ effectControl.title }}</h2>
      <span>-</span>
      <span ref="num" class="num">1x</span>
    </div>
    <input @input="rangeUpdate($parent, $event)" type="range" :min="effectControl.min" :max="effectControl.max" :value="effectControl.defaultValue" :step="effectControl.step">
    <div class="control-btns">
      <i class="material-icons clear" id="speedClear" title="Reset">update</i>
      <!-- <i class="material-icons" title="About this effect">info</i> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    effectControl: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      num: '1',
      effectModule: null
    }
  },
  methods: {
    async rangeUpdate(parent, event) {
      this.effectModule.rangeUpdate(parent, event)
      // for some dumb reason if i update this with vue data stuff the range input handle goes crazy so i have to do it like this lmao
      this.$refs.num.textContent = `${event.target.value}x`
    }
  },
  async mounted() {
    try {
      const module = await import(`@/components/WebAudio/effects/${this.effectControl.title.toLowerCase()}`)
      this.effectModule = module.default
      //if (this.effectModule.init) this.effectModule.init(this.$parent)
    } catch(e) {
      console.error(e)
    }
  }
}
</script>
