<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-set-default
      show-search-result
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
    };
  },
  mounted(){
    let info = this.$route.query;
    if(Object.keys(info).length>0){
      getAddress(info.id).then(res=>{
        // this.addressInfo = res.;
      })
      
    }
  },
  methods: {
    onSave(value) {   
      debugger
      let data = {
        name: value.name,
        address: value.addressDetail,
        phone: value.tel,
        province: value.province,
        city: value.city,
        county: value.county,
        is_default: value.isDefault?1:0,
      };
      console.log(data);
      addAddress(data).then(res=>{
        Toast.success('保存成功');
        this.$router.go(-1);
      })
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
