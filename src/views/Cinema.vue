<template>
    <div class="cinema" :style="mystyle">
        <!-- 动态设置内联样式 -->
        <ul>
            <!-- npm 下载better-scroll -->
            <li v-for="data in datalist" :key="data.cinemaId">
                {{data.name}}
                <p>{{data.address}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      datalist: [],
      mystyle: {
        height: '0px'
      }
    }
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.mystyle.height = document.documentElement.clientHeight - 50 + 'px'

    const id = localStorage.getItem('cityId')
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=9567355`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614327060318038033301505","bc":"440300"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      // console.log(res.data);
      this.datalist = res.data.data.cinemas
      Indicator.close()

      // 数据全部插入dom节点后才会调用nextTick
      this.$nextTick(() => {
        BScroll.use(ScrollBar)
        BScroll.use(MouseWheel)
        new BScroll('.cinema', {
          scrollbar: {
            fade: true,
            interactive: true
          },
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300
          }
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
    .cinema{
        overflow: hidden;
        position: relative;/* 解决滚动条出界问题 */
        ul{
            li{
                height: 70px;
            }
        }
    }
</style>
