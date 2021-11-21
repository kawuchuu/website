<template>
  <div class="wrapper">
    <section class="section-top">
      <h1>We are Disgiced.</h1>
      <p>Located in Melbourne, Australia, we are a small 3-person group with a goal of providing a way for everyone to enjoy flavoured milk, regardless of whether you cannot drink or dislike cow's milk, all while putting our precious planet's environment first.</p>
    </section>
    <section class="points">
      <section class="block no-dairy">
        <h1>Non-dairy milk</h1>
        <p>Our drinks contain no dairy, instead using non-dairy milks such as Almond milk, Soy milk and Coconut milk. Now everyone can enjoy flavoured milk.</p>
      </section>
      <section class="block environment">
        <h1>Eco-friendly</h1>
        <p>We care deeply about the planet's environment. All products we make are sustainable and we contribute to our carbon footprints as little as possible.</p>
        <router-link to="/environment" class="nav-link">Learn more</router-link>
      </section>
      <section class="block australia">
        <h1>Australian Made</h1>
        <p>Our products are manufactured here in Australia, with majority of ingredients sourced from Australian farmers and businesses.</p>
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
section.points {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
}
section.block {
  background: red;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.block h1 {
  font-size: 42px;
  margin-top: 0;
  margin-bottom: 15px;
}
.block p {
  width: 450px;
  margin-bottom: 30px;
}
section.environment {
  background: linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.25)), url('/disgiced/eco.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #fff;
}
section.australia {
  background: linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.25)), url('/disgiced/melbourne.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #fff;
}
section.no-dairy {
  background: linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.25)), url('/disgiced/almondsfull.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #fff;
}
.nav-link {
  font-weight: 600;
  font-size: 22px;
  color: var(--nav-link)
}
.nav-link:after {
  content: '>';
  margin-left: 10px;
}
.environment a {
  color: #84ec7a;
}
</style>
