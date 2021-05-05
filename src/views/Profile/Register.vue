<template>
  <div>
    <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" />

    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="name"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
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
      <van-field
        v-model="password_confirmation"
        type="password"
        name="password_confirmation"
        label="重复密码"
        placeholder="重复密码"
        :rules="[{ required: true, message: '请重复密码' }]"
      />
      <div class="to-login" @click="$router.push('/login')">已有账号，前往登录</div>
      <div style="margin: 16px;">
        <van-button round block type="info" color="#7232dd" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { goRegist } from "network/auto";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      password: "",
      password_confirmation: "",
      email: "",
    };
  },
  computed: {},
  methods: {
    onClickLeft() {},
    onSubmit(values) {
      if (this.password === this.password_confirmation) {
        goRegist(values).then((res) => {
          //success,clear password
          //one account: hello@qq.com 123456
          //go to login
          console.log(res);
          if (res.status == "201") {
            Toast("注册成功");
            this.password = "";
            this.password_confirmation = "";

            setTimeout(() => {
              this.$router.push({ path: "/login" });
            }, 1000);
          }
        });
      } else {
        Notify("重复密码不一致");
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin: 100px 20px;
}
.to-login{
  margin:15px auto 20px 10px;
  color: var(--color-high-text);
}
</style>
