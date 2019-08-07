const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    let accessToken = null
    if (req.headers.cookie) {
      const cookie = cookieparser.parse(req.headers.cookie)
      accessToken = cookie.access_token
    }
    await dispatch('auth/initToken', accessToken)
  }
}
