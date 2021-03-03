<template>
    <div v-if="filminfo">
        <!-- v-if="filminfo"解决初始渲染出错问题，刚开始渲染，filminfo为null，报错，axios请求的数据回来后，filminfo为真，页面渲染出来，filminfo赋值为{}时，filminfo.name不报错,filminfo.a.name就会报错 -->
        <div class="poster">
            <img :src="filminfo.poster" ref="poster">   <!-- 问题：如何用ref获得这里的DOM节点? -->
        </div>
        <h2>{{filminfo.name}}</h2>
        <h3>演职人员</h3>
        <swiper perview="4" class="actorswiper" myclassname="actorswiper">
            <!-- perview="4" class="actorswiper" myclassname="actorswiper"解决同一页面中有两个用相同组件的swiper时出现的一些问题 -->
            <div class="swiper-slide" v-for="(data,index) in filminfo.actors" :key="index">
                <div class="avatarAddress">
                    <img :src="data.avatarAddress">
                </div>
                <p>{{data.name}}</p>
                <p>{{data.role}}</p>
            </div>
        </swiper>
        <h3>剧照</h3>
        <swiper perview="2" class="stillswiper" myclassname="stillswiper">
            <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="index">
                <div class="still">
                    <img :src="data">
                </div>
            </div>
        </swiper>
    </div>
</template>

<script>
import axios from 'axios'
import swiper from '@/views/Detail/DetailSwiper'
import { HIDE_TABBAR_MUTATION } from '@/type'
import { Indicator } from 'mint-ui'
// import bus from '@/bus'

export default {
  data () {
    return {
      filminfo: null
    }
  },
  components: {
    swiper
  },
  props: ['id'],
  beforeMount () {
    // bus.$emit("hide",false)
    // this.$store.state.isTabbarShow = false;  这种方法不科学
    this.$store.commit(HIDE_TABBAR_MUTATION, false)/* 第一个参数是mutations的名字 */
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    // console.log('要id以获取详情信息',this.$route.params.id,this.id);
    // console.log(this.$route);

    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.id}&k=7646833`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614327060318038033301505","bc":"440300"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data)
      this.filminfo = res.data.data.film //  第一个data是axios自己封装的data
      Indicator.close()
    })
  },
  beforeDestroy () {
    // bus.$emit("hide",true)
    // this.$store.state.isTabbarShow = true;
    this.$store.commit('ShowTabbar', true)
  }
}

</script>

<style lang="scss" scoped>
    .poster{
        width: 100%;height: 240px;
        overflow: hidden;
        position: relative;
        img{
            width: 100%;
            position: absolute;
            top: -70px;
        }
    }
    .actorswiper,.stillswiper{
        padding-left: 10px;
    }
    .avatarAddress{
        width: 85px;height: 90px;
        position: relative;
        overflow: hidden;
        img{
            width: 100%;
            position: absolute;
            top: -10px;
        }
    }
    .still{
        width: 160px;height: 110px;
        position: relative;
        overflow: hidden;
        img{
            width: 100%;height: 100%;
            position: absolute;
            top: -25px;
        }
    }
</style>
