import Vue from 'vue'
import Cookie from 'js-cookie'
const vm = new Vue({})

export default ({ $axios }) => {
  // 通用设置
  $axios.defaults.timeout = 10000

  $axios.onRequest((config) => {
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
    if (process.client) {
      vm.$loading().close()
    }
    return response.data
  })

  $axios.onError(() => {
    vm.$loading().close()
  })
}
