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
  Pagination,
  Tag,
  Dialog,
  Select,
  Option,
  Switch,
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
  Vue.use(Pagination)
  Vue.use(Tag)
  Vue.use(Dialog)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Switch)
  Vue.use(Scrollbar)
  Vue.use(Loading.directive)
  Vue.prototype.$ELEMENT = { size: 'small' }
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$confirm = MessageBox.confirm
}
