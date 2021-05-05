<template>
  <div id="my-tabbar">
    <van-tabbar v-model="active" active-color="var(--color-high-text)" router="true">
      <van-tabbar-item icon="wap-home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车
        <van-badge class="cart-badge" :content="$store.state.goodsNumInCart" max="99">
          <div ></div>
        </van-badge>
      </van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'MyTabBar',
  data(){
    return {
      active: 0
    }
  }
}
</script>

<style scoped>
.cart-badge{
  position: fixed;
  bottom: 40px;
}
</style>