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
      if (process.client) {
        Cookie.set('access_token', payload)
      }
      resolve('操作成功')
    })
  },
  async handleLogin({ commit }, payload) {
    const response = await this.$axios.post('/api/admin/login', payload)
    const accessToken = response.data.access_token
    commit('SET_TOKEN', accessToken)
    Cookie.set(AUTH_KEY, accessToken)
    return response
  },
  async handleLogout({ commit }) {
    const response = await this.$axios.post('/api/admin/logout')
    commit('SET_TOKEN', '')
    Cookie.remove(AUTH_KEY)
    return response
  },
  resetToken({ commit }) {
    commit('SET_TOKEN', '')
    Cookie.remove(AUTH_KEY)
    location.reload()
  },
  async updatePassword({ commit }, payload) {
    const response = await this.$axios.post('/api/admin/password', payload)
    return response
  },
  async refreshToken({ dispatch }, payload) {
    await dispatch('initToken', payload)
  }
}
