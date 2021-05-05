import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '../store/mutations'
import actions from '../store/actions'

Vue.use(Vuex)
const state={
  goodsNumInCart:0,
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
