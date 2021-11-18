<template>
  <div class="project-scroll">
    <div class="project-icon" />
    <div class="details">
      <h2>{{ project.title }}</h2>
      <p>{{ project.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project']
}
</script>

<style lang="scss" scoped>
.project-scroll {
  text-align: left;
  min-width: 320px;
  height: 110px;
  //background: red;
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  padding: 0px 20px 0px 5px;
  align-items: center;
  margin: 0px 10px;
  border-radius: 10px;
  transition: 0.15s;
  transition-property: background-color;

  .project-icon {
    width: 75px;
    height: 75px;
    background: #00ffa2;
    justify-self: center;
    border-radius: 200px;
    //box-shadow: 0px 2px 8px rgba(0,0,0,.15);
  }

  .details {
    h2, p {
      margin: 10px 0px;
    }
  }
}

.project-scroll:hover {
  background-color: #dafff1;
}
</style>
