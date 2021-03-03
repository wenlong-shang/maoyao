<template>
    <div>
        <div class="city" @click="handleClick">
            {{cityName}}
        </div>
        <swiper :key="looplist.length" ref="myswiper"> <!-- film组件加载后，swiper立刻创建，但是axios请求的数据还没回来，looplist是个空数组，在swiper组件中已经初始化了，所以不用key会有问题，动态key值解决swiper初始化过早问题，动态key值变化，之间创建的swiper会被删掉重新创建新的 -->
            <div class="swiper-slide" v-for="data in looplist" :key="data.bannerId">
                <img :src="data.imgUrl">
            </div>
        </swiper>
        <filmheader :class="isFixed ? 'fixed' : ''"></filmheader>
        <router-view></router-view>
    </div>
</template>

<script>
import swiper from '@/views/Film/Swiper'
// import 'swiper/css/swiper.min.css'
import axios from 'axios'
import filmheader from '@/views/Film/FilmHeader'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      looplist: [],
      isFixed: false,
      cityName: '城市'
    }
  },
  components: {
    swiper,
    filmheader
  },
  methods: {
    handleScroll () {
      const scrollTop = document.documentElement.scrollTop
      const swiperHeight = this.$refs.myswiper.$el.offsetHeight
      if (scrollTop >= swiperHeight) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    handleClick () {
      this.$router.push('/city')
    }
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.cityName = localStorage.getItem('cityName')
    axios({
      url: 'https://m.maizuo.com/gateway?type=2&cityId=440300&k=4967178',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614327060318038033301505","bc":"440300"}',
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      // console.log(res);
      this.looplist = res.data.data

      Indicator.close()
    })
    window.onscroll = this.handleScroll // 在window下写表示所有组件都有window.onscroll
  },
  beforeDestroy () {
    window.onscroll = null // 使handleScroll事件不影响其他组件
  }
}
</script>

<style lang="scss" scoped>
    .swiper-slide{
        img{
            width: 100%;
        }
    }
    .city{
        width: 38px;height: 30px;
        padding: 0 5px;
        border-radius: 15px;
        background: rgba(0,0,0,0.4);
        position: absolute;
        top: 10px;left: 10px;
        z-index: 2;
        color: white;
        text-align: center;
        line-height: 30px;
        font-size: 13px;
    }
</style>
