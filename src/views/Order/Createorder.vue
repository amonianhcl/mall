<template>
  <div>
    <van-nav-bar title="生成订单" left-arrow @click-left="onClickLeft" fixed />
    <div id="content">
      <van-contact-card
        v-if="!address.id"
        add-text="添加收货地址"
        type="add"
        @click="onAdd"
      />
      <van-contact-card
        v-else
        type="edit"
        :name="`${address.name}  ${address.phone}`"
        :tel="`${address.province} ${address.city} ${address.address}`"
        @click="onEdit"
      />
      <div class="good-item" v-for="item in cartList" :key="item.id">
        <van-card
          :num="item.num"
          :price="item.goods.price"
          :desc="item.goods.description"
          :title="item.goods.title"
          :thumb="item.goods.cover_url"
        />
      </div>

      <popuppay
        v-if="isShow"
        :payCode="paycode"
        @closePopup="onClose(id)"
      />

      <van-submit-bar
        class="submit-bar"
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import {
  getOrderPreview,
  submitOrder,
  getPayCode,
  checkPayStatus,
} from "network/order";
import Popuppay from "./Popuppay";

export default {
  name: "Createorder",
  components: { Popuppay },
  data() {
    return {
      id: 0,
      address: {},
      cartList: [],
      isShow: false,
      paycode:{
        payCode_aliyun: "",
        payCode_weixin: "",
      }
    };
  },
  computed: {
    totalPrice() {
      return (
        this.cartList.reduce(
          (pre, curItem) => pre + curItem.num * curItem.goods.price,
          0
        ) * 100
      );
    },
  },
  mounted() {
    getOrderPreview().then((res) => {
      // console.log(res);
      let addr = res.address;
      if (addr.length > 0) {
        this.address = addr[0];
      }
      this.cartList = res.carts;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push({ path: "/addressedit" });
    },
    onEdit() {
      this.$router.push({ path: "/address" });
    },
    onClose() {
      this.isShow= false;
      this.$router.push({ path: "/orderdetail", query: { id: this.id } });
    },
    async onSubmit() {
      let order = await submitOrder({ address_id: this.address.id });
      this.id = order.id;
      this.$store.dispatch("updateCartCount");

      this.isShow = true;
      let payCode = await getPayCode(order.id, { type: "aliyun" });
      this.paycode.payCode_aliyun = payCode.qr_code_url;
      this.paycode.payCode_weixin = payCode.qr_code_url; //TODO:
      let timer = setInterval(() => {
        if (this.isShow) {
          checkPayStatus(order.id).then((res) => {
            if (res == 2) {
              clearInterval(timer);
              this.$router.push({
                path: "/orderdetail",
                query: { id: order.id },
              });
            }
          });
        }else{
          clearInterval(timer)
        }
      }, 2000);
    },
  },
};
</script>

<style scoped>
#content {
  margin: 50px auto;
}
.submit-bar {
  position: fixed;
  bottom: 50px;
}
</style>
