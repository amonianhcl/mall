import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home/Home.vue'
import store from 'store'

Vue.use(VueRouter)

const Category = ()=> import('views/Category/Category')
const Cart = ()=> import('views/Cart/Cart')
const Profile = ()=> import('views/Profile/Profile')
const Detail = () => import('views/Detail/Detail')
const Login = () => import('views/Profile/Login')
const Register = () => import('views/Profile/Register')
const Createorder = () => import('views/Order/Createorder')
const Orderdetail = () => import('views/Order/Orderdetail')
const Orders = () => import('views/Order/Orders')
const Account = () => import('views/Profile/Account')
const Aboutus = () => import('views/Profile/Aboutus')
const Address = () => import('views/Profile/Address')
const Collection = () => import('views/Profile/Collection')
const Addressedit = () => import('views/Profile/Addressedit')

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
      title: "gourwuche",
      isAuthRequired: true
    }
  }
  ,
  {
    path:'/profile',
    component: Profile,
    meta: {
      title: "geren",
      isAuthRequired: true
    }
  },
  {
    path:'/detail',
    component: Detail,
    meta: {
      title: "xiangqing"
    }
  },
  {
    path:'/login',
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path:'/register',
    component: Register,
    meta: {
      title: "注册"
    }
  },
  {
    path:'/createorder',
    component: Createorder,
    meta: {
      title: "Create Order",
      isAuthRequired: true
    }
  },
  ,
  {
    path:'/orderdetail',
    component: Orderdetail,
    meta: {
      title: "Orderdetail",
      isAuthRequired: true
    }
  },
  ,
  {
    path:'/orders',
    component: Orders,
    meta: {
      title: "Orders",
      isAuthRequired: true
    }
  },
  {
    path:'/account',
    component: Account,
    meta: {
      title: "Account",
      isAuthRequired: true
    }
  },
  {
    path:'/aboutus',
    component: Aboutus,
    meta: {
      title: "Aboutus",
      isAuthRequired: true
    }
  },
  {
    path:'/address',
    component: Address,
    meta: {
      title: "Address",
      isAuthRequired: true
    }
  },
  {
    path:'/addressedit',
    component: Addressedit,
    meta: {
      title: "Address Edit",
      isAuthRequired: true
    }
  },
  {
    path:'/collection',
    component: Collection,
    meta: {
      title: "Collection",
      isAuthRequired: true
    }
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局导航守卫，跳转之前。。。
router.beforeEach((to,from,next) => {

  document.title = to.meta.title;

  //判断目标路由是否需要登录且没有登录
  let token = window.localStorage.getItem('token');
  if(token){
    store.dispatch('updateCartCount'); //登录状态下，路由跳转跟新购物车物品数量
    return next();
  }else if(to.meta.isAuthRequired){
    return next('/login'); //未登录状态下，目标路由需要认证，跳转到登录
  }else{
    return next();  //必须加上，否则页面无法正常显示
  }
 
})

export default router
