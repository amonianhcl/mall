<template>
  <div>
    <van-nav-bar title="用户登录" left-arrow @click-left="onClickLeft" />

    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="email"
        name="email"
        label="用户邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写用户邮箱' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="to-regist" @click="$router.push('/register')">若无账号，请先注册</div>
      <div style="margin: 16px;">
        <van-button round block type="info" color="#7232dd" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { goLogin } from "network/auto";
import { Toast } from "vant"
export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    onClickLeft() {},
    onSubmit(values) {
      goLogin(values).then((res) => {
        //success,clear password
        //one account: hello@qq.com 123456
        //go to -1?
        console.log(res);

        Toast.success("登录成功");
        //store token
        window.localStorage.setItem("token", res.access_token);
        //clear info
        this.password = "";
        this.email = "";
        //redirect
        setTimeout(() => {
          this.$router.go(-1);
        }, 200);
      });
    },
  },
};
</script>

<style scoped>
.form {
  margin: 100px 20px;
}
.to-regist{
  margin:15px auto 20px 10px;
  color: var(--color-high-text);
}
</style>
