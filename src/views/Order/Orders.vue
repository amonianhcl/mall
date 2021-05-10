<template>
  <div>
    <van-nav-bar title="管理订单" left-arrow @click-left="onClickLeft" fixed />
    <div id="content">
      <van-tabs v-model="active" @change="onChange">
        <van-tab title="全部订单"></van-tab>
        <van-tab title="未支付"></van-tab>
        <van-tab title="已支付"></van-tab>
        <van-tab title="已发货"></van-tab>
        <van-tab title="已完成"></van-tab>
        <van-tab title="已过期"></van-tab>
      </van-tabs>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item, key) in list" :key="key">
            <div class="order-title">
              <div class="title-no">{{ item.order_no }} </div>
              <div class="title-status">{{statusString[item.status]}}</div>
            </div>
            <van-card 
              v-for="(sub,skey) in item.orderDetails.data" :key="skey"
              :num="sub.num"
              :price="sub.price"
              :desc="sub.goods.description"
              :title="sub.goods.title"
              :thumb="sub.goods.cover_url"
            />
            <div class="order-price">实付款¥{{item.amount}}</div>
            <div class="order-more" v-if="item.status==1">
              <van-button type="default" plain round>修改地址</van-button>
              <van-button type="warning" plain round @click="payOrder(item.id)">付 款</van-button>
            </div>
            <div class="order-more" v-if="item.status==2">
              <van-button type="default" plain round>提醒发货</van-button>
              <van-button type="default" plain round>修改地址</van-button>
            </div>
            <div class="order-more" v-if="item.status==3">
              <van-button type="default" plain round>延长收货</van-button>
              <van-button type="default" plain round>查看物流</van-button>
              <van-button type="warning" plain round>确认收货</van-button>
            </div>
            <div class="order-more" v-if="item.status==4">
              <van-button type="default" plain round>加入购物车</van-button>
              <van-button type="default" plain round>查看物流</van-button>
              <van-button type="warning" plain round>评  价</van-button>
            </div>
            <div class="order-more" v-if="item.status==5">
              <van-button type="default" plain round>删除订单</van-button>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>      
    </div>
    <popuppay
      v-if="isShow"
      :payCode="paycode"
      @closePopup="onClose"
    />
  </div>
</template>

<script>
import { getOrderList,getPayCode } from "network/order";
import Popuppay from './Popuppay'
export default {
  components: { Popuppay },
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 0,
      title: "",
      status: 0,
      statusString:['','待付款','买家已付款','卖家已发货','交易完成','交易过期'],
      isShow: false,
      paycode:{ 
        payCode_aliyun: "",
        payCode_weixin: ""
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onChange(i) {
      this.status = this.active;
      this.page =0;
      this.list = [];
      this.onLoad();
    },
    onLoad() {//滚动时，滚动条与底部距离小于 offset 时触发onLoad:loading=true
      //判断是否时刷新状态
        if (this.refreshing) {
          //下拉会触发：refreshing=true,加载数据时清空列表并还原状态
          this.list = [];
          this.page = 0;
          this.refreshing = false;
        }
      getOrderList({
        page: ++this.page, //请求下一页
        title: this.title,
        status: this.status,
        include: "orderDetails.goods",
      }).then((res) => {
        

        //添加数据，并关闭加载状态
        console.log(res);
        this.list = this.list.concat(res.data);
        let totalPages = res.meta.pagination.total_pages;
        this.loading = false;

        //无更多数据时，打开完成状态
        if (this.page >= totalPages) {
          this.finished = true;
        }
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    payOrder(id) {
      this.isShow = true;
      getPayCode(id, { type: "aliyun" }).then((res) => {
        this.paycode.payCode_aliyun = res.qr_code_url;
        this.paycode.payCode_weixin = res.qr_code_url; //TODO:

        let timer = setInterval(() => {
          if (this.isShow) {
            checkPayStatus(id).then((res2) => {
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
  },
};
</script>

<style scoped>
#content {
  margin: 50px auto;
}
.order-title{
  margin: 8px auto 4px;
  display: flex;
  justify-content: space-between;
}
.title-no{
  margin-left: 18px;
}
.title-status{
  margin-right: 10px;
  color:var(--color-high-text)
}
.order-price{
  text-align: right;
  padding-right: 10px;
  margin: 6px auto;
}
.order-more{
  text-align: right;
  padding-right: 10px;
  margin-bottom: 10px;
}
</style>
