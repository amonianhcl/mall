<template>
  <div>
    <van-nav-bar title="图书详情" left-arrow @click-left="onClickLeft" fixed/>
    <div class="page">
      <img :src="goods.cover_url" />
      <van-card
        :num="goods.stock"
        :price="goods.price"
        :desc="goods.description"
        :title="goods.title"
      >
        <template #tags>
          <van-tag plain type="danger">推荐</van-tag>
          <van-tag plain type="danger">新款</van-tag>
        </template>
        <template #footer>
          <van-button type="warning"  @click="addBookInCart">加购物车</van-button>
          <van-button type="danger"  @click="goBuyItem">立即购买</van-button>
        </template>
      </van-card>

      <van-tabs v-model="active">
        <van-tab title="详情"><div v-html="goods.details"/></van-tab>
        <van-tab title="热评">
          <div class="comments" v-if="hasComment">{{ goods.comments }}</div>
          <div class="comments" v-else>no comments</div>
        </van-tab>
        <van-tab title="相关推荐">
          <good-tab-item :tabgoods="like_goods" @goItemDetail="onDetail"></good-tab-item>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getDetail } from "network/detail";
import GoodTabItem from "components/content/GoodTabItem"
import { addCart } from "network/cart"
import { Toast } from 'vant';

export default {
  name: "Detail",
  components:{ GoodTabItem },
  data() {
    return {
      active: 0,
      goods: {},
      like_goods: [],
    };
  },
  computed: {
    hasComment() {
      return this.goods.comments !== undefined && this.goods.lenght > 0
        ? true
        : false;
    },
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  created() {
    // debugger
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    fetchData(){
      let id = this.$route.query.id;
      getDetail(id).then((res) => {
        this.goods = res.goods;
        this.like_goods = res.like_goods;
        // console.log(this.goods);
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onDetail(id){
      if(this.$route.query.id == id)
        console.log("dupliacted path")
      else
        this.$router.push({path:"/detail",query:{id}})
      
    },
    addBookInCart(){
      addCart({
        goods_id: this.goods.id,
        num: 1
        }).then(res =>{
          if(res.status=='201' || res.status=='204'){
            Toast.success("添加成功");
            this.$store.dispatch("updateCartCount")
          }
        })
    },
    goBuyItem(){
      addCart({
        goods_id: this.goods.id,
        num: 1
        }).then(res =>{
          if(res.status=='201' || res.status=='204'){
            this.$router.push({path:'/cart'})
          }
        })
    }
  },
  
};
</script>

<style scoped>
.page {
  margin: 50px auto;
}
.comments {
  height: 100px;
}
.van-card__title {
  font-size: var(--font-size);
  height: 20px;
  margin-bottom: 5px;
}
</style>
