export default (app) => {
  const axios = app.$axios
  // 通用设置
  axios.defaults.timeout = 10000
  axios.defaults.headers = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }

  axios.onRequest((config) => {})

  axios.onResponse((response) => {
    return response.data
  })

  // axios.onError((error) => {
  //   // parseInt(error.response && error.response.status)
  //   // app.redirect('/500')
  // })
}
