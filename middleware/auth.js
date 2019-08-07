const guard = ['/admin']

export default function({ route, store, redirect }) {
  const token = store.state.auth.token
  const path = route.fullPath

  if (token) {
    if (path === '/admin/login') {
      redirect('/admin')
    }
  } else if (guard.includes(path) !== -1) {
    redirect('/admin/login')
  }
}
