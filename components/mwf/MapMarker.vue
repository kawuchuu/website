<template>
  <l-marker :lat-lng="marker.location">
    <l-popup>
      <h3>{{ marker.popup.title }}</h3>
      <div class="label">
        <i class="material-icons">place</i>
        <span>{{ marker.popup.location }}</span>
      </div>
      <div class="label">
        <i class="material-icons">schedule</i>
        <span>{{ marker.popup.time }}</span>
      </div>
    </l-popup>
  </l-marker>
</template>

<script>
export default {
  props: ['marker']
}
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 5px;
}

.label {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  i {
    margin-right: 5px;
    font-size: 1.8em;
  }
}
</style>
