<template>
  <div>
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" fixed />
    <div class="content">
      <div class="order-status">
        <p>订单状态：{{statusString}}</p>
        <p>订单编号：{{id}}</p>
        <p>下单时间：{{created_at}}</p>
        <van-button type="primary" block v-if="status == 1" @click="payOrder"
          >去支付</van-button
        >
        <van-button type="default" block @click="confirmOrder"
          >确认订单</van-button
        >
      </div>
      <div class="good-item" v-for="item in goods" :key="item.id">
        <van-card
          :num="item.num"
          :price="item.goods.price"
          :desc="item.goods.description"
          :title="item.goods.title"
          :thumb="item.goods.cover_url"
        />
      </div>
    </div>
    <popuppay
      v-if="isShow"
      :payCode="paycode"
      @closePopup="onClose"
    />
  </div>
</template>

<script>
import Popuppay from "./Popuppay";
import { getPayCode, checkPayStatus, getOrderDetail } from "network/order";
import { Toast } from "vant";
export default {
  components: { Popuppay },
  name: "Orderdetail",
  data() {
    return {
      id: null,
      status: 0,
      created_at:'',
      goods:[],
      isShow: false,
      paycode:{ 
        payCode_aliyun: "",
        payCode_weixin: ""
      },
    };
  },
  computed:{
    statusString(){
      switch (this.status){
        case 1: return '新订单 ' 
          break;
        case 2: return '已支付'
          break;
        case 3: return '已发货'
          break;
        case 4: return '已确认收货'
          break;
        case 5: return '已过期'
          break;
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    getOrderDetail(this.id, "include=orderDetails.goods" ).then((res) => {
      console.log(res);
      this.status = res.status;
      this.id = res.id;
      this.created_at = res.created_at;
      this.goods=res.orderDetails.data;
      //
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    payOrder() {
      this.isShow = true;
      getPayCode(this.id, { type: "aliyun" }).then((res) => {
        this.paycode.payCode_aliyun = res.qr_code_url;
        this.paycode.payCode_weixin = res.qr_code_url; //TODO:

        let timer = setInterval(() => {
          if (this.isShow) {
            checkPayStatus(this.id).then((res2) => {
              if (res2 == 2) {
                clearInterval(timer);
                this.status = 2;
                this.isShow = false;

                Toast.success("支付成功");
              }
            });
          }else{
            clearInterval(timer)
          }
        }, 4000);
      });
    },
    onClose() {
      this.isShow=false;
      console.log("close pay popup");
    },
    confirmOrder() {},
  },
};
</script>
<style scoped>
.content {
  margin: 50px auto;
}
</style>
