<template>
  <div>
    <van-nav-bar title="图书分类" left-arrow @click-left="onClickLeft" />

    <div class="main-content">
      <van-sidebar class="siderbar" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            v-for="item in categories"
            :key="item.id"
            :title="item.name"
            :name="item.name"
          >
            <van-sidebar-item
              v-for="subitem in item.children"
              :key="subitem.id"
              :title="subitem.name"
              @click="onChange(subitem.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodsitem">
        <van-tabs v-model="active" @click="onClickTab" animated>
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评化排序"></van-tab>
        </van-tabs>
        <van-card
          v-for="item in goods[orderTypes[active]].list"
          :key="item.id"
          :num="1"
          :price="item.price"
          desc="描述信息"
          :title="item.title"
          :thumb="item.cover_url"
          @click="onClickBook(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories, getGoods } from "network/category";

export default {
  name: "Category",
  data() {
    return {
      orderTypes: ["sales", "price", "comments_count"],
      activeKey: 0,
      activeName: 0,
      active: 0, //tab index
      categories: [],
      goods: {
        sales: { page: 1, list: [] },
        price: { page: 1, list: [] },
        comments_count: { page: 1, list: [] },
      },
      currentCId: null,
    };
  },
  computed: {},
  mounted() {
    async function loadDefaultData(orderType) {
      //request two parts data which are related
      try {
        let res_Category = await getCategories();
        let currentCId = res_Category.categories[0].children[0].id;
        let res_goods = await getGoods(currentCId, orderType);
        return {
          currentCId,
          categories: res_Category.categories,
          tabgoods: res_goods.goods.data,
        };
      } catch (err) {
        console.log(err);
      }
    }

    loadDefaultData(this.orderTypes[this.active]).then((res) => {
      console.log(res);
      this.currentCId = res.currentCId;
      this.categories = res.categories;
      this.goods[this.orderTypes[this.active]].list = res.tabgoods;
    });
  },
  methods: {
    onClickLeft() {},
    onChange(cid, page = 1) {
      //for siderbar changed, request new list
      if (cid === this.currentCId) return;
      let ot = this.orderTypes[this.active];
      getGoods(cid, ot, page).then((res) => {
        this.goods[ot].page = page;
        this.goods[ot].list = res.goods.data;
        // console.log(res)
      });
      this.currentCId = cid;
    },
    onClickBook(id){
      this.$router.push({path:'/detail',query:{id}})
    },
    onClickTab(name){ //for tabs changed
      console.log(name)
      ///avoid duplicated request same list

      getGoods(this.currentCId,this.orderTypes[name]).then(res =>{
        console.log(res)
      })
    }
  },
};
</script>

<style scoped>
.main-content {
  display: flex;
}

.siderbar {
  width: 130px;
  margin-top: 50px;
}
.goodsitem {
  flex: 1;
}
</style>
