<template>
  <div :style="`background-image: url('${pimg}')`" :class="show" />
</template>

<script>
export default {
  props: ['pimg', 'cur-img'],
  computed: {
    show () {
      if (this.curImg === this.$vnode.key) {
        return 'show'
      } else {
        return 'hide'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes zoomie {
  from {
    transform: scale(1)
  }
  to {
    transform: scale(1.1);
  }
}

@keyframes zoomieOut {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1.2);
  }
}

.show {
  opacity: 1;
  animation: zoomie 5s linear;
  transform: scale(1.1);
}
.hide {
  opacity: 0;
  animation: zoomieOut 5s linear;
  transform: scale(1.2);
}
</style>
