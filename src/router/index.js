import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home/Home.vue'

Vue.use(VueRouter)

const Category = ()=> import('views/Category/Category')
const Cart = ()=> import('views/Cart/Cart')
const Profile = ()=> import('views/Profile/Profile')
const Detail = () => import('views/Detail/Detail')

const routes = [
  {
    path:'/',
    redirect: '/home'  //容易写错成Home
  },
  {
    path:'/home',
    component: Home,
    meta:{
      title:"主页"
    }
  },
  {
    path:'/category',
    component: Category,
    meta: {
      title: "leibie"
    }
  }
  ,
  {
    path:'/cart',
    component: Cart,
    meta: {
      title: "gourwuche"
    }
  }
  ,
  {
    path:'/profile',
    component: Profile,
    meta: {
      title: "geren"
    }
  },
  {
    path:'/detail',
    component: Detail,
    meta: {
      title: "xiangqing"
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局导航守卫，跳转之前。。。
router.beforeEach((to,from,next) => {
  document.title = to.meta.title;
  //debugger
  next();//必须加上，否则页面无法正常显示
})

export default router
