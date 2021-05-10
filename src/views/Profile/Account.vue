<template>
  <div>
    <van-nav-bar title="我的账号" left-arrow @click-left="onClickLeft" fixed />
    <div class="info">
      <img :src="userInfo.avatar_url"/>
      <p>{{ userInfo.name }}</p>
    </div>
  </div>
</template>

<script>
import {getUser,updateUser} from 'network/auto'

export default {
  name: "Account",
  data(){
    return {
      userInfo:{},
    }
  },
  mounted(){
    getUser().then(res=>{
      console.log(res)
      this.userInfo=res;
    })
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.info{
  margin: 50px auto;
}
.info img{
  width: 40%;

}
</style>