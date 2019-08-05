import Vue from 'vue'

const vm = new Vue({})

export default (app) => {
  const axios = app.$axios
  // 通用设置
  axios.defaults.timeout = 10000
  axios.defaults.headers = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }

  axios.onRequest((config) => {
    if (process.client) {
      vm.$loading({
        lock: true,
        text: '努力加载中呀...',
        background: 'hsla(0,0%,100%,.9)'
      })
    }
  })

  axios.onResponse((response) => {
    if (process.client) {
      vm.$loading().close()
    }
    return response.data
  })

  // axios.onError((error) => {
  //   // parseInt(error.response && error.response.status)
  //   // app.redirect('/500')
  // })
}
