<template>
  <div class="project-scroll">
    <div class="project-icon" />
    <div class="details">
      <div class="title">
        <h2>{{ project.title }}</h2>
        <span v-if="project.private">Private</span>
      </div>
      <p>{{ project.desc }}</p>
      <div class="tags">
        <Tag v-for="item in project.tags" :tag="item" :key="item" />
      </div>
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
  width: 360px;
  height: 130px;
  //background: red;
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  padding: 0px 17px 0px 5px;
  align-items: center;
  margin: 0px 5px;
  border-radius: 10px;
  transition: 0.15s;
  transition-property: background-color;

  .project-icon {
    width: 75px;
    height: 75px;
    background: var(--fg-accent);
    justify-self: center;
    border-radius: 200px;
    //box-shadow: 0px 2px 8px rgba(0,0,0,.15);
  }

  .details {
    .title, p {
      margin: 0px;
      margin-bottom: 8px;
    }

    .title {
      display: flex;
      align-items: center;

      h2 {
        margin: 0px;
        margin-right: 10px;
      }

      span {
        font-size: 0.9em;
        margin-top: 3px;
        opacity: 0.5;
      }
    }

    .tags {
      display: flex;
      align-items: center;
    }
  }
}

.project-scroll:hover {
  background-color: var(--fg-accent-hv);
}
</style>
