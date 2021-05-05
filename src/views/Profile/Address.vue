<template>
  <div>
    <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
    <div id="address-list">
      <van-swipe-cell
        v-for="item in list"
        :key="item.id"
        :before-close="beforeClose"
        :name="item.id"
        right-width="50px"
      >
        <div class="address-item">
          <div class="accessor">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.phone }}</span>
            <van-tag type="danger" plain v-if="item.is_default">默认</van-tag>
          </div>
          <div class="accessor-address">
            <div class="address">
              {{
                `${item.province} ${item.city} ${item.county} ${item.address}`
              }}
            </div>
            <van-icon
              class="edit"
              size="25px"
              name="edit"
              @click="onEdit(item.id)"
            />
          </div>

          <van-checkbox
            class="set-default"
            icon-size="18px"
            :name="item.id"
            v-model="item.is_default"
            @click="onSetDefault"
            >默认地址</van-checkbox
          >
        </div>

        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>

    <van-button
      class="btn"
      round
      type="primary"
      color="#7232dd"
      block
      @click="onAdd"
      >添加地址</van-button
    >
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";

import {
  getAddressList,
  setAddressDefault,
  deleteAddress,
} from "network/address";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Toast.loading("地址加载中");
      getAddressList()
        .then((res) => {
          this.list = res.data;
          Toast.clear();
        })
        .catch((err) => {});
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push({ path: "/addressedit" });
    },
    onEdit(index) {
      this.$router.push({
        path: "/addressedit",
        query: { id: index },
      });
    },
    onSetDefault() {
      console.log("set defualt");
      //
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
              deleteAddress(instance.name).then((res) => {
                Toast.success("删除成功");
                this.init();
              });
              instance.close();
            })
            .catch((err) => {});
          break;
      }
    },
  },
};
</script>

<style scoped>
#address-list {
  margin-top: 8px;
}
#address-list van-swipe-cell {
  margin: 5px auto;
}
.address-item {
  padding-left: 30px;
  border-bottom: solid 1px #f0f0f0;
}
.address-item .accessor {
  margin-bottom: 10px;
  padding-top: 8px;
}
.address-item .accessor .name {
  font-size: 20px;
  color: black;
}
.address-item .accessor .phone,
.name {
  margin-right: 10px;
}
.accessor-address {
  display: flex;
  justify-content: space-between;
}
.address {
  width: 85%;
}
.edit {
  margin-right: 30px;
}
.set-default {
  height: 40px;
  font-size: 14px;
  color: var(--color-text);
}
.delete-button {
  height: 100%;
}
.btn {
  position: absolute;
  bottom: 55px;
  left: 5%;
  right: 5%;
  width: 90%;
}
</style>
