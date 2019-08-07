import Token from '@/utils/token'

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
      const token = Token.get()
    }
  })
}
