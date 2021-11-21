<template>
  <div class="wrapper">
    <section class="section-top">
      <h1>Our eco-friendly strategy</h1>
      <p>Like you, we believe our precious planet's environment is important and is in need of everyone's care. Here at Disgiced, we especially prioritise lowering our carbon footprint as much as possible. Here's how we're doing it.</p>
    </section>
    <section class="sources-section">
      <div class="inner right eco-friendly">
        <div class="titles">
          <div class="main-title normal">100% sustainable sources</div>
          <div class="title-sub normal">Our ingredients comes from 100% sustainable sources, so you can be sure you're not contributing to your carbon footprint. We care about the environment, just like you! Thank you for looking after our planet.</div>
        </div>
      </div>
    </section>
    <section class="eco-friendly-section">
      <div class="inner left eco-friendly">
        <div class="titles">
          <div class="main-title normal">100% recycled materials</div>
          <div class="title-sub normal">Our packaging is made of 100% recycled materials. This includes the bottles, labeling, lid, you name it. It's all made of recycled materials, ready to be recycled again once finished.</div>
        </div>
      </div>
    </section>
    <section class="neutral-section">
      <div class="inner right eco-friendly">
        <div class="titles">
          <div class="main-title normal">100% carbon neutral</div>
          <div class="title-sub normal">Disgiced is a carbon neutral business. Our office and manufacturing plants are 100% carbon neutral.</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="css" scoped>
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
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 50px;
}
.entice-section-top {
  background-color: #ffedd4;
}
.inner {
  max-width: 1200px;
  width: 100%;
  padding: 50px 25px;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right {
  background-position: right;
  align-items: flex-start;
  text-align: left;
}
.left {
  background-position: left;
  align-items: flex-end;
  text-align: right;
}
.entice-section-top .inner .title-sub {
  font-size: 52px;
}
.entice-section-top .inner .main-title {
  font-size: 96px;
  font-weight: 900;
}
.inner .title-sub.normal {
  font-size: 18px;
  margin-top: 25px;
  max-width: 730px;
}
.inner .main-title.normal {
  font-size: 56px;
  font-weight: 900;
}
.titles {
  margin-bottom: 40px;
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
.eco-friendly {
  height: 300px;
  color: #fff;
}
.eco-friendly-section {
  background: linear-gradient(to left, rgba(0,0,0,.65), rgba(0,0,0,.1)), url('/disgiced/recycling.jpg');
  background-size: cover;
  background-position: center;
}
.sources-section {
  background: linear-gradient(to right, rgba(0,0,0,.7), rgba(0,0,0,.3)), url('/disgiced/sugarcane.jpg');
  background-size: cover;
  background-position: center;
}
.neutral-section {
  background: linear-gradient(to right, rgba(0,0,0,.4), rgba(0,0,0,.1)), url('/disgiced/earth.jpg');
  background-size: cover;
  background-position: center;
}
.eco-friendly a {
  color: #84ec7a;
}
</style>

<style scoped>
@media screen and (max-width: 1150px) {
  .entice-section-top .inner .title-sub {
    font-size: 36px;
  }
  .entice-section-top .inner .main-title {
    font-size: 74px;
  }
  .inner .title-sub.normal.right-sub {
    font-size: 18px;
  }
  .inner .main-title.normal {
    font-size: 42px;
    font-weight: 900;
  }
  .inner {
    background-size: 50%;
  }

}
@media screen and (max-width: 850px) {
  .alt-milks {
    height: 400px;
  }
  .drinks-range {
    height: 550px;
  }
  .left, .right {
    text-align: center;
  }
  .inner {
    justify-content: flex-start;
    align-items: center;
    background-position: bottom;
  }
}
@media screen and (max-width: 500px) {
  .entice-section-top .inner .title-sub {
    font-size: 28px;
  }
  .entice-section-top .inner .main-title {
    font-size: 62px;
  }
  .inner .title-sub.normal.right-sub {
    font-size: 16px;
  }
  .inner .main-title.normal {
    font-size: 38px;
    font-weight: 900;
  }
  .inner {
    background-size: 85%;
  }
}
</style>
