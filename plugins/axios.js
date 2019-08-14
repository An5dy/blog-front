import Vue from 'vue'
import Cookie from 'js-cookie'
const vm = new Vue({})

export default ({ store, $axios, redirect }) => {
  // 通用设置
  $axios.defaults.timeout = 10000

  $axios.onRequest((config) => {
    config.headers.Accept = process.env.API_HEADER
    if (process.client) {
      // 防止客户端获取不到 token 的问题
      config.headers.Authorization = `Bearer ${Cookie.get('access_token')}`
      vm.$loading({
        lock: true,
        text: '努力加载中呀...',
        background: 'hsla(0,0%,100%,.9)'
      })
    }
  })

  $axios.onResponse((response) => {
    const authorization = response.headers.authorization
    if (authorization) {
      const accessToken = authorization.replace(/Bearer /, '')
      store.dispatch('auth/refreshToken', accessToken)
    }
    if (process.client) {
      vm.$loading().close()
    }
    return response.data
  })

  $axios.onError((error) => {
    if (process.client) {
      vm.$loading().close()
    }
    const code = parseInt(error.response && error.response.status)
    switch (code) {
      case 404:
        redirect('/404')
        break
      case 500:
        redirect('/500')
        break
    }
  })
}
