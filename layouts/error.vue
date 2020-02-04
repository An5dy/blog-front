<template>
  <div class="error-container">
    <div class="charector-wrap fast">
      <nuxt-link to="/">
        <div class="charector" />
      </nuxt-link>
    </div>
    <div class="error-message">
      <h1 class="error-title">404</h1>
      <p class="error-subtitle">你查找的页面似乎出去玩啦。</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'no-layout',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.error-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC',
    'WenQuanYi Micro Hei', sans-serif;
  width: 100%;
  height: 100vh;
  text-align: center;
  display: table;
  .fast {
    @-webkit-keyframes fast {
      0% {
        background-position: 0 0;
      }
      14.3% {
        background-position: -180px 0;
      }
      28.6% {
        background-position: -360px 0;
      }
      42.9% {
        background-position: -540px 0;
      }
      57.2% {
        background-position: -720px 0;
      }
      71.5% {
        background-position: -900px 0;
      }
      85.8% {
        background-position: -1080px 0;
      }
      100% {
        background-position: 0 0;
      }
    }
    .charector {
      -webkit-animation-name: fast;
      -webkit-animation-duration: 650ms;
    }
  }
  .charector-wrap {
    width: 180px;
    height: 280px;
    margin: 0 auto;
    margin-top: 40px;
    .charector {
      width: 180px;
      height: 300px;
      background: url('~static/images/charector.png') 0 0 no-repeat;
      -webkit-animation-iteration-count: infinite; // 动画无限播放
      -webkit-animation-timing-function: step-start; // 马上跳到动画每一结束桢的状态
    }
  }
  .error-message {
    .error-title {
      color: #646464;
      font-size: 40px;
      line-height: 1.5;
      font-weight: 600;
    }
    .error-subtitle {
      color: #646464;
      line-height: 1.5;
    }
  }
}
</style>
