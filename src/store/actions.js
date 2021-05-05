import {getCart} from "network/cart"

export default {
  updateCartCount({commit}){
    getCart().then(res => {
      commit('setGoodsNumInCart',res.data.length);
    })
  }
}