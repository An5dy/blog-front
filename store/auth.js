import Cookie from 'js-cookie'
const AUTH_KEY = 'access_token'

export const state = () => {
  return {
    token: ''
  }
}

export const mutations = {
  SET_TOKEN: (state, action) => {
    state.token = action
  }
}

export const actions = {
  initToken({ commit }, payload) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', payload)
      resolve('操作成功')
    })
  },
  async handleLogin({ commit }, payload) {
    const response = await this.$axios.post('/api/admin/login', payload)
    const accessToken = response.data.access_token
    commit('SET_TOKEN', accessToken)
    Cookie.set(AUTH_KEY, accessToken, {
      expires: response.data.expires_in / 1440
    })
    return response
  }
}
