<template>
  <div id="tabs">
    <van-tabs
      v-model="active"
      @click="clickTab"
      animated
      swipeable
      color="var(--color-tint)"
      sticky
      offset-top="46px"
    >
      <van-tab v-for="(tabtitle, key) in tabs" :key="key" :title="tabtitle">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh(key)">
          <good-tab-item :tabgoods="goods[key].list" @goItemDetail="onDetail"></good-tab-item>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import GoodTabItem from "./GoodTabItem";
import { getHomeTabGoods } from "network/home";
export default {
  components: { GoodTabItem },
  props: {
    tabs: Object,
  },
  data() {
    return {
      active: 0,
      isLoading: false,
      goods: {
        sales: { page: 1, list: [] },
        new: { page: 1, list: [] },
        recommend: { page: 1, list: [] },
      },
    };
  },
  mounted(){
    getHomeTabGoods("sales").then((res) => {
        // console.log(res)
        this.goods.sales.page = res.goods.current_page;
        this.goods.sales.list = res.goods.data;
      });

      getHomeTabGoods("new").then((res) => {
        // console.log(res)
        this.goods.new.page = res.goods.current_page;
        this.goods.new.list = res.goods.data;
      });

      getHomeTabGoods("recommend").then((res) => {
        // console.log(res)
        this.goods.recommend.page = res.goods.current_page;
        this.goods.recommend.list = res.goods.data;
      });
  },
  methods: {
    clickTab(title, name) {
      console.log("get goods of", title);
      console.log(this.active);
    },
    onRefresh(key) {
      let nextPage = this.goods[key].page + 1; //request for next page
      getHomeTabGoods(key, nextPage).then((res) => {
          this.goods[key].page = nextPage;
          this.goods[key].list.push(...res.goods.data)
          console.log(...res.goods.data)
        });

      setTimeout(() => {       
        console.log("刷新成功", nextPage);
        this.isLoading = false;
      }, 1000);
    },
    onDetail(id){
      this.$router.push({path:"/detail",query:{id}})
    }
  },
};
</script>

<style scoped>
#tabs {
}
</style>
