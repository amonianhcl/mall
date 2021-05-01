import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import { Tabbar, TabbarItem, Sidebar, SidebarItem  } from 'vant';
import { NavBar, Badge ,Collapse, CollapseItem} from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Tab, Tabs ,Tag} from 'vant';
import { Sticky ,Button} from 'vant';
import { Grid, GridItem } from 'vant';
import { Icon ,Card} from 'vant';
import { PullRefresh  } from 'vant';

//设置加载过程中的图片loading(懒加载的图片尚未过来时)
Vue.use(Lazyload,{options:{
  loading: require("./assets/img/logo1.png")
}});
Vue.use(Icon).use(Badge).use(Tab).use(Tabs).use(Swipe);
Vue.use(SwipeItem).use(Sidebar).use(SidebarItem );
Vue.use(Sticky).use(Collapse).use(CollapseItem);
Vue.use(Tabbar).use(Button);
Vue.use(TabbarItem).use(Tag);
Vue.use(NavBar);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(PullRefresh);
Vue.use(Card);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
