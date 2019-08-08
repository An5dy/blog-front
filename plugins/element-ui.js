import Vue from 'vue'
import {
  Button,
  Autocomplete,
  Loading,
  Form,
  FormItem,
  Input,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Dialog,
  Scrollbar,
  MessageBox
} from 'element-ui'

export default () => {
  Vue.use(Button)
  Vue.use(Autocomplete)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItemGroup)
  Vue.use(MenuItem)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Dialog)
  Vue.use(Scrollbar)
  Vue.use(Loading.directive)
  Vue.prototype.$ELEMENT = { size: 'small' }
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$confirm = MessageBox.confirm
}
