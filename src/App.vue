<template>
  <div>
    <tabbar v-show="isTabbarShow"></tabbar>
    <router-view></router-view>
    <div class="distance"></div>
  </div>
</template>

<script>
import tabbar from './components/Tabbar' // 导入所有接口
import { mapState } from 'vuex' // {mapState}这种写法是选择导入vuex中的方法，只导入某几个接口
// import bus from '@/bus'

export default {
  data () {
    return {
      // isShow:true,
    }
  },
  // beforeMount(){
  //   // 事件总线实例
  //   bus.$on("hide",(data)=>{
  //     this.isShow = data;
  //   })
  // },
  computed: {
    ...mapState(['isTabbarShow'])
  },
  components: {
    tabbar
  }
}
</script>

<style lang="scss">
*{
  margin: 0;padding: 0;
}
html{
  height: 100%;
}
li{
  list-style: none;
}
.distance{
  width: 100%;height: 50px;
}
</style>
