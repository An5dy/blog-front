import Vue from 'vue'
import {
  Button,
  Autocomplete,
  Loading,
  Form,
  FormItem,
  Input
} from 'element-ui'

export default () => {
  Vue.use(Button)
  Vue.use(Autocomplete)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Loading.directive)
  Vue.prototype.$ELEMENT = { size: 'small' }
  Vue.prototype.$loading = Loading.service
}
