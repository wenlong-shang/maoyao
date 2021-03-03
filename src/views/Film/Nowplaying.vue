<template>
    <div>
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-distance="10"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="false"
        >
            <li v-for="data in datalist" :key="data.filmId" @click="handChangePage(data.filmId)">
                <img :src="data.poster">
                <h3>{{data.name}}</h3>
                <p>观众评分：{{data.grade}}</p>
                <p v-if="data.actors">主演：{{data.actors | actorFilter}}</p>
                <p v-else>暂无主演</p>
            </li>
        </ul>
        <div v-show="isShowNow">正在加载中.....</div>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Indicator } from 'mint-ui'

Vue.filter('actorFilter', function (data) {
  // console.log(data);
  const newlist = data.map(item => item.name)
  // console.log(newlist);
  return newlist.join(' ')
})

export default {
  data () {
    return {
      datalist: [],
      loading: false,
      current: 1,
      total: 0,
      isShowNow: true
    }
  },
  mounted () {
    // axios.get("https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2710384").then(res=>{
    //     console.log(res.data);
    // })
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2710384',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614327060318038033301505","bc":"440300"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data);
      this.datalist = res.data.data.films
      this.total = res.data.data.total

      Indicator.close()
    })
  },
  methods: {
    handChangePage (id) {
      // console.log(id);
      // 编程式导航-路径跳转
      this.$router.push(`/detail/${id}`)

      // 编程式导航-名字跳转
      // this.$router.push({name:"detail",params:{id:id}})
    },
    loadMore () {
      // console.log('-------->到底了');

      this.loading = true
      this.current++
      console.log(this.total)
      // 数据加载完做判断，然后再向下滑停止请求数据
      if (this.datalist.length === this.total) {
        this.isShowNow = false
        console.log(this.total)

        return
      }

      axios({
        url: `https://m.maizuo.com/gateway?cityId=440300&pageNum=${this.current}&pageSize=10&type=1&k=2710384`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614327060318038033301505","bc":"440300"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    ul{
        li{
            overflow: hidden;
            padding: 10px;
            img{
                float: left;
                width: 100px;
            }
        }
    }
</style>
