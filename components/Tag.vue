<template>
  <div class="tag" :class="tagStyle">{{tag}}</div>
</template>

<script>
export default {
  props: ['tag'],
  computed: {
    tagStyle() {
      switch(this.tag) {
        case 'Node.js': {
          return 'nodejs'
        }
        case 'Vue': {
          return 'vue'
        }
        case 'Swift': {
          return 'swift'
        }
        case 'SwiftUI': {
          return 'swiftui'
        }
        default: {
          return ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  font-size: 0.8em;
  margin: 0px 3px;
  background: #00ffa2;
  border-radius: 5px;
  padding: 3px 7px;
}

.tag:first-child {
  margin: 0px 3px 0px 0px;
}

.tag.nodejs {
  background: #68A063;
  color: white;
}

.tag.vue {
  background: #33485E;
  color: white;
}

.tag.nuxt {
  background: #00DC81;
}

.tag.swift {
  background: #f05137;
  color: white;
}

.tag.swiftui {
  background: #0137A2;
  color: white;
}
</style>
