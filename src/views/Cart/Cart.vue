<template>
  <div>
    <van-nav-bar
      :title="'购物车(' + $store.state.goodsNumInCart + ')'"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-checkbox-group
      id="cart-list"
      ref="checkboxGroup"
      v-model="selected"
      @change="updateChecked"
    >
      <van-swipe-cell
        v-for="item in items"
        :key="item.id"
        :before-close="beforeClose"
        :name="item.id"
        right-width="50px"
      >
        <div class="good-item">
          <van-checkbox :name="item.id" />
          <div class="good-img">
            <img :src="item.goods.cover_url" />
          </div>
          <div class="good-infos">
            <p>{{ item.goods.title }}</p>
            <p class="desc">{{ item.goods.description }}</p>
            <div class="good-btn">
              <div class="price">¥ {{ item.goods.price.toFixed(2) }}</div>
              <div class="good-count">
                <van-stepper
                  v-model="item.num"
                  theme="round"
                  :max="item.goods.stock"
                  button-size="22"
                  disable-input
                  :name="item.id"
                  @change="updateNum"
                />
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>

    <van-submit-bar class="operation" :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-button
        v-if="selected.length != items.length"
        type="primary"
        @click="checkAll"
        >全选</van-button
      >
      <van-button v-else disabled type="primary">全选</van-button>
      <van-button type="info" @click="toggleAll">反选</van-button>
    </van-submit-bar>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import {
  getCart,
  modifyCartNum,
  removeFromCart,
  changeCartStatus,
} from "network/cart";

export default {
  name: "Cart",
  data() {
    return {
      items: [],
      selected: [],
    };
  },
  computed: {
    totalPrice() {
      return this.items
        .filter((n) => n.is_checked == 1)
        .reduce(
          (pre, curI) => pre + (curI.goods.price) * curI.num *100,
          0
        );
    },
  },
  created() {
    this.initCartList();
  },
  methods: {
    initCartList() {
      Toast.loading("加载中");
      getCart("include=goods").then((res) => {
        if (res.data && res.data.length > 0) {
          this.items = res.data;
          // console.log(res.data)
          this.selected = res.data
            .filter((n) => n.is_checked == 1)
            .map((item) => item.id); //get selected
        }

        Toast.clear();
      });
    },
    onClickLeft() {},
    onSubmit(){
      this.$router.push({path:'/createorder',query:{}})
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？",
          })
            .then(() => {
              removeFromCart(instance.name).then((res) => {
                this.initCartList();
                this.$store.dispatch("updateCartCount"); //异步方式跟新
              });
              instance.close();
            })
            .catch((err) => {});
          break;
      }
    },
    updateNum(value, id) {
      modifyCartNum(id.name, { num: value }).then((res) => {});
      this.items.forEach((item) => {
        if (item.id == id.name) {
          item.num = value;
        }
      });
    },
    updateChecked(checked) {
      console.log("即使刚从服务器初始化也会调用更新。。。。");
      console.log(this.items)
      console.log(this.selected)
      changeCartStatus({ cart_ids: checked }).then((res) => { //update server data
        this.items.forEach(item =>{//update local data
          if(this.selected.includes(item.id)){
            item.is_checked=1;
          }else{
            item.is_checked=0;
          }
        })
      });
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
  },
};
</script>

<style scoped>
#cart-list {
  margin-top: 10px;
  /* margin-bottom: 100px; */
  /* background-color: lightslategray; */
}
.delete-button {
  height: 100%;
}
.van-checkbox {
  margin: auto 12px;
}
.good-item {
  display: flex;
  height: 90px;
  margin: 5px auto;
}
.good-item .good-img img {
  width: 88px;
  height: 100%;
  border-radius: 9px;
}
.good-item .good-infos {
  flex: 1;
  margin-left: 8px;
}
.good-item .good-infos .desc {
  color: lightslategray;
  margin: 5px auto;
}
.good-item .good-btn {
  display: flex;
  justify-content: space-between;
}
.good-item .good-infos .price {
  color: var(--color-high-text);
  margin-top: 10px;
  font-size: 18px;
}
.good-item .good-count {
  padding-top: 7px;
  margin-right: 10px;
}
.operation {
  position: sticky;
  bottom: 50px;
}
.operation .price {
  line-height: 50px;
}
</style>
