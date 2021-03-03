import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { HIDE_TABBAR_MUTATION } from '@/type'
import { Indicator } from 'mint-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTabbarShow: true,
    comingList: []
  },
  mutations: { // 唯一修改状态的位置，这个过程是同步的
    [HIDE_TABBAR_MUTATION] (state, data) {
      state.isTabbarShow = data
    },
    ShowTabbar (state, data) {
      state.isTabbarShow = data
    },
    comingListMutation (state, data) {
      state.comingList = data
    }
  },
  actions: {
    // 异步处理
    getComingListAction (store) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      axios({
        url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=6077095',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614327060318038033301505","bc":"440300"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data);
        store.commit('comingListMutation', res.data.data.films)
        Indicator.close()
      })
    }
  },
  getters: {
    // comingListGetter(state){
    //   return state.comingList.filter((item,index)=>index<3);
    // }
  },
  modules: {
  }
})
