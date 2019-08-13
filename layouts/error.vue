<template>
  <div class="container">
    <div class="fof">
      <h1 v-if="error.statusCode === 404">Error 404</h1>
      <h1 v-else>Error 500</h1>
      <p class="description">
        <nuxt-link to="/">back to home <i class="el-icon-right"></i></nuxt-link>
      </p>
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
.container {
  font-family: 'Lato', sans-serif !important;
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
  .fof {
    display: table-cell;
    vertical-align: middle;
    h1 {
      color: #888 !important;
      font-size: 50px;
      display: inline-block;
      padding-right: 12px;
      animation: type 0.5s alternate infinite;
    }
    .description {
      margin-top: 20px;
      a {
        color: #8a8a8a;
        font-size: 18px;
        &:hover {
          color: #5694f1;
        }
      }
    }
  }

  @keyframes type {
    from {
      box-shadow: inset -3px 0px 0px #888;
    }
    to {
      box-shadow: inset -3px 0px 0px transparent;
    }
  }
}
</style>
