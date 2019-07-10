import Vue from "vue";
import {
  Button,
  Loading,
  Form,
  FormItem,
  Input,
  Menu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MessageBox,
  Scrollbar,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Table,
  TableColumn,
  Pagination,
  Tag,
  Select,
  Option,
  Message
} from "element-ui";

Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Scrollbar);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Select);
Vue.use(Option);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
