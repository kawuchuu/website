<template>
  <div class="footer">
    <div class="content">
      <div class="left">
        <p>
          This website is for educational purposes and is not indicative of any real-life events.<br>
          The Victorian State Government and City of Melbourne do not endorse this website.
        </p>
      </div>
      <div class="right">
        <div class="imgs">
          <img class="com" src="@/assets/mwf/com.svg">
          <img class="vic" src="@/assets/mwf/vicgov.png">
        </div>
      </div>
    </div>
    <div class="footer-inner" />
  </div>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 160px;
  color: white;

  transform: translateY(20px);

  .footer-inner {
    width: 100%;
    height: 100%;
    transform: skewY(-3deg) translateY(-90px);
    background: black;
  }

  .footer-inner::after {
    content: '';
    position: absolute;
    height: 6px;
    background: linear-gradient(to right, #E000FF 25%, #FFFF00 25% 50%, #00D4FF 50% 75%, white 75%);
    right: 0;
    left: 0;
    top: 0;
  }

  .content {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'left right';
    align-items: center;

    .left {
      grid-area: left;
      margin-left: 40px;
      margin-bottom: 20px;
      font-size: 0.7em;
      opacity: 0.5;
    }

    .left:hover {
      opacity: 1;
    }

    .right {
      grid-area: right;
      justify-self: right;
      align-self: flex-start;
      margin-right: 50px;

      .imgs {
        display: flex;
        align-items: center;

        .com {
          width: 150px;
          height: auto;
          margin-right: 40px;
        }

        .vic {
          width: 100px;
          height: auto;
        }
      }
    }
  }
}

@media (max-width: 1050px) {
  .footer {
    .content {
      grid-template-columns: none;
      grid-template-rows: 2fr 1fr;
      grid-template-areas:
      'right'
      'left';
      transform: translateY(-25px);

      .left {
        margin-bottom: 0px;
        margin-left: 0px;
        margin: 0px 30px;
        font-size: 0.6em;
        text-align: center;
      }

      .right {
        align-self: center;
        justify-self: center;
        margin-bottom: 40px;
        margin-right: 0px;

        .imgs {
          .com {
            width: 120px;
          }

          .vic {
            width: 80px;
          }
        }
      }
    }
  }
}
</style>
