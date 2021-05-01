<template>
  <div>
    <van-grid :column-num="2">
      <van-grid-item v-for="(item,key) in tabgoods" :key="key" >
        <a @click="clickItem(item.id)">
          <img :src="item.cover_url" />
          <div class="item-title">{{item.title}}</div>          
        </a>
        <div>
          <span class="item-price">¥{{item.price}}</span>
          <van-icon name="star-o" />
          <span class="item-collect">{{item.collects_count}}</span>
        </div>
      </van-grid-item>
    </van-grid>
    
  </div>
</template>

<script>
export default {
  props: {
    tabgoods: Array
  },
  methods:{
    clickItem(id){
      // if(this.$route.path.includes("/detail"))
      //   console.log("dupliacted path")
      // this.$router.push({path:"/detail",query:{id}})
      // console.log(this.$route.query)
      this.$emit("goItemDetail",id);
    }
  }
};
</script>

<style scoped >
div {
  
  text-align: center;
  /* background-color: grey; */
  font-size: 12px;
}
img {
  width: 95%;
  /* height: 120px; */
  display: block;
  margin: auto;
}
.item-title{ 
  margin: 10px 0 2px 0;
  color: var(--color-text);
  
}
.item-price{
  color: var(--color-high-text);
  padding-right: 10px;
}
van-icon{
}
</style>
