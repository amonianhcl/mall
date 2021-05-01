<template>
  <div id="home-page">
    <van-nav-bar title="图书商城" left-arrow @click-left="onClickLeft" fixed />

    <van-swipe autoplay="3000">
      <van-swipe-item v-for="(image, index) in slides" :key="index">
        <img class="swipe-img" v-lazy="image.img_url" />
      </van-swipe-item>
    </van-swipe>

    <recommand class="recommand" :goods="recommands.list"></recommand>

    <goods-tab
      class="tab"
      :tabs="{ sales: '畅销', new: '新书', recommend: '精选' }"
    ></goods-tab>
  </div>
</template>

<script>
import Recommand from "./ChildComps/Recommand";
import GoodsTab from "components/content/GoodsTab";
import { getHomeAllData } from "network/home";
import { Toast } from "vant";

export default {
  name: "Home",
  components: {
    Recommand,
    GoodsTab,
  },
  data() {
    return {
      slides: [],
      recommands: { page: 0, list: [] },    
      categories: [],
    };
  },
  mounted() {
 
      getHomeAllData().then((res) => {
        this.slides.push(...res.slides);
        this.recommands.page = res.goods.current_page;
        this.recommands.list = res.goods.data.slice(0, 4);
        // console.log(res);
      })

  },
  
  methods: {
    onClickLeft() {
      Toast("go left");
    }
  },
};
</script>

<style scoped>
#home-page {
  height: 100vh;
  position: relative;
  /* padding-bottom: 50px; */
}
.swipe-img {
  height: 200px;
  width: 100%;
}
.recommand {
  margin-top: 10px;
  padding-bottom: 12px;
  border-bottom: solid 5px #f0f0f0;
}
</style>
