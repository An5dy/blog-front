import Vue from 'vue'
import { Button, Autocomplete, Loading } from 'element-ui'

export default () => {
  Vue.use(Button)
  Vue.use(Autocomplete)
  Vue.use(Loading.directive)
  Vue.prototype.$ELEMENT = { size: 'small' }
  Vue.prototype.$loading = Loading.service
}
