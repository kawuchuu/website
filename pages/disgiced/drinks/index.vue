<template>
  <div class="wrapper">
    <section class="section-top">
      <h1>Drinks</h1>
      <p>We offer a wide range of flavours and milks!</p>
    </section>
    <section class="ex-wide flavours">
      <section class="chocolate">
        <router-link to="drinks/flavour?drink=chocolate">
          <div class="flavour-wrapper">
            <div class="flavour-title">Iced Chocolate</div>
          </div>
        </router-link>
      </section>
      <section class="coffee">
        <router-link to="drinks/flavour?drink=coffee">
          <div class="flavour-wrapper">
            <div class="flavour-title">Iced Coffee</div>
          </div>
        </router-link>
      </section>
      <section class="caramel">
        <router-link to="drinks/flavour?drink=caramel">
          <div class="flavour-wrapper">
            <div class="flavour-title">Caramel</div>
          </div>
        </router-link>
      </section>
      <section class="strawberry">
        <router-link to="drinks/flavour?drink=strawberry">
          <div class="flavour-wrapper">
            <div class="flavour-title">Strawberry</div>
          </div>
        </router-link>
      </section>
      <section class="vanilla">
        <router-link to="drinks/flavour?drink=vanilla">
          <div class="flavour-wrapper">
            <div class="flavour-title">Vanilla</div>
          </div>
        </router-link>
      </section>
      <section class="mocha">
        <router-link to="drinks/flavour?drink=mocha">
          <div class="flavour-wrapper">
            <div class="flavour-title">Mocha</div>
          </div>
        </router-link>
      </section>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
section.wide {
  width: 100%;
  max-width: 1200px;
}
section.title {
  margin-bottom: 40px;
}
section.title h1 {
  font-size: 58px;
  font-weight: 800;
  margin-bottom: 10px;
}
section.title p {
  font-size: 20px;
}
section.ex-wide {
  width: 100%;
}
.section-top {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin-bottom: 50px;
}
.section-top h1 {
  font-size: 72px;
  margin-bottom: 30px;
}
.section-top p {
  max-width: 720px;
}
section.flavours {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
}
section.flavours section {
  width: 500px;
  height: 500px;
  transition: 0.2s;
  background-size: 75%;
  background-repeat: no-repeat;
  background-position: bottom right;
}
section.flavours section:hover {
  transform: scale(1.05);
  z-index: 2;
  box-shadow: 0px 5px 30px rgba(0,0,0,.25);
}
.flavour-wrapper {
  padding: 30px 40px;
  height: calc(100% - 60px);
  width: calc(100% - 80px);
}
.flavour-title {
  font-size: 48px;
  font-weight: 800;
}
.chocolate, .chocolate a {
  background-color: #63412b;
  background-image: url('/disgiced/chocolate.png');
  color: #fff;
}
.coffee {
  background-color: #eccfa6;
  background-image: url('/disgiced/coffee.png')
}
.caramel {
  background-color: #eba958;
  background-image: url('/disgiced/caramel.png');
}
.strawberry {
  background-color: #ffb9c2;
  background-image: url('/disgiced/strawberry.png');
}
.vanilla {
  background-color: #faedc9;
  background-image: url('/disgiced/vanilla.png');
}
.mocha, .mocha a {
  background-color: #8c5bb9;
  background-image: url('/disgiced/mocha.png');
  color: #fff;
}
</style>
