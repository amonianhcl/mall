<template>
  <div>
    <van-popup
        v-model="isShow"
        position="bottom"
        closeable
        @close="onClose"
        :style="{ height: '50%' }"
      >
        <van-grid :border="false" :column-num="2">
          <van-grid-item>
            支付宝二维码</br>
            <van-image :src="paycode.payCode_aliyun" />
          </van-grid-item>
          <van-grid-item>
            微信二维码</br>
            <van-image :src="paycode.payCode_weixin" />
          </van-grid-item>
        </van-grid>
      </van-popup>
  </div>
</template>

<script>
export default {
  name:'Popuppay',
  props:{
    showPopup:{
      type: Boolean,
      default: true,
    },
    payCode:Object
  },
  data(){
    return {
      isShow:this.showPopup,
      paycode:this.payCode
    }
  },
  mounted(){
    console.log(this.payCode)
  },
  methods:{
    onClose(){
      console.log(this.paycode)
      this.$emit('closePopup');
    }
  }
}
</script>

<style scoped>

</style>