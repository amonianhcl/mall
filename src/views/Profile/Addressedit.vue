<template>
  <div>
    <van-nav-bar title="编辑地址" left-arrow @click-left="onClickLeft" fixed />

    <van-address-edit
      class="address-edit"
      :area-list="areaList"
      :address-info="addressInfo"
      show-set-default
      show-search-result
      detail-rows= 2
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />

  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { addAddress,updateAddress,getAddress } from 'network/address';

export default {
  data() {
    return {
      areaList,
      addressInfo:{},
      searchResult: [],
      address:{}
    };
  },
  mounted(){
    let info = this.$route.query;
    if(info.id){
      getAddress(info.id).then(res=>{
        this.addressInfo={
          name: res.name,
          tel: res.phone,
          province: res.province,
          city: res.city,
          county: res.county,
          addressDetail: res.address,
          isDefault: res.is_default,
          areaCode: "140105",
        }      
      })
      
    }
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    onSave(value) {   
      console.log(value)
      debugger
      let id = this.$route.query.id;
      let data = {
        name: value.name,
        address: value.addressDetail,
        phone: value.tel,
        province: value.province,
        city: value.city,
        county: value.county,
        is_default: value.isDefault?1:0,
      };

      if(id){
        updateAddress(id,data).then(res=>{
          Toast.success('跟新成功');
        })
      }else{        
        addAddress(data).then(res=>{
          Toast.success('保存成功');        
        });
      }
      this.$router.go(-1);     
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style scoped>
.address-edit{
  margin: 50px auto;
}
</style>
