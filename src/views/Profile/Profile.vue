<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <van-cell title="我的收藏" is-link to="/collection" />
    <van-cell title="我的订单" is-link to="/orders" />
    <van-cell title="账号管理" is-link to="/account" />
    <van-cell title="地址管理" is-link to="/address" />
    <van-cell title="关于我们" is-link to="/aboutus" />
    <van-button class="logout" round color="#7232dd" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  name: 'Profile',
  methods: {
    onClickLeft() {
      
    },
    logout(){
      window.localStorage.setItem('token','');
      Toast.success("退出成功");
      setTimeout(()=>{
        this.$router.push('/login')
      },1000)
    },
  },
}
</script>

<style scoped>
.logout{
  width: 80%;
  display: block;
  margin: auto;
}
</style>