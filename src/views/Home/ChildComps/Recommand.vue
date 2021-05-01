<template>
  <div id="re">
    <div class="re-item" v-for="good in goods" :key="good.id">
      <a :alt="good.description" @click="goToDetail(good.id)">
        <img v-lazy="good.cover_url"/>
        <p>{{good.title.slice(1,-1)}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommand",
  props:{
    goods:{
      type: Array,
      default: []
    }
  },
  methods:{
    goToDetail(id){
      this.$router.push({path:'/detail',query:{id}})
    }
  }
}
</script>

<style scoped>
#re {
  display: flex;
  justify-content: space-around;
  
}
#re .re-item{
  width:60px;
}
#re img{
  width: 50px;
  margin: auto;
  display: block;
}
#re p{
  font-size: 12px;
  text-align: center;
}
</style>