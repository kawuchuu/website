<template>
  <div class="card-root">
    <div class="card-title">
      <div>
        <h1>{{ info.title }}</h1>
        <span><i class="material-icons">place</i> {{ info.location }}</span>
      </div>
      <span><i class="material-icons">schedule</i> {{ info.time }}</span>
    </div>
    <div class="evt-image" :style="img">
      <a v-if="!info.note.none" :href="info.note.url" target="_blank">{{ info.note.tag }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  computed: {
    img () {
      return `background-image: url('${this.info.img}')`
    }
  }
}
</script>

<style lang="scss" scoped>
.card-root {
  min-width: 425px;
  height: 250px;
  background: black;
  color: white;
  border: solid 1px white;
  border-radius: 10px;

  box-shadow: 0px 2px 10px rgba(0,0,0,.25);
  display: grid;
  grid-template-areas:
  "title"
  "image";
  grid-template-rows: 2.1fr 4fr;

  overflow: hidden;

  margin: 0px 20px;
  user-select: none;

  .card-title {
    grid-area: title;
    justify-self: start;
    align-self: center;
    padding: 0px 25px;

    display: flex;
    justify-content: space-between;

    width: 100%;

    h1 {
      font-size: 22px;
      font-family: 'Manrope', 'Barlow', 'Inter', sans-serif;
      font-weight: 600;
      margin-bottom: 6px;
    }

    span {
      display: flex;
      align-items: center;
    }

    i {
      margin-right: 7px;
      font-size: 22px;
    }
  }

  .evt-image {
    //background-image: url('http://theluxtraveller.com/wp-content/uploads/2015/06/Melbourne-at-night.jpg');
    background-size: cover;
    background-position: center;

    width: 100%;
    height: 100%;
    align-self: center;
    justify-self: center;
    border: solid black 7px;
    box-sizing: border-box;
    border-radius: 0px 0px 12px 12px;

    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    a {
      color: white;
      font-size: 0.7em;
      padding: 8px 10px;
      backdrop-filter: blur(10px);
      background: #00000056;
      border-radius: 5px 0px 0px 0px;
    }
  }
}

@media (max-width: 1050px) {
   .card-root {
     min-width: 290px;

     .card-title {
       h1 {
         font-size: 18px;
         text-align: left;
       }
       span {
         font-size: 12px;
       }
       i {
         font-size: 18px;
       }
     }
   }
}
</style>
