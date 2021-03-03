<template>
    <div>
        <p>请选择城市</p>
        <mt-index-list ref="mylist">
            <mt-index-section :index="data.index" v-for="data in datalist" :key="data.index">
                <div @click="handleClick(city.cityId,city.name)" v-for="city in data.list" :key="city.cityId">
                    <mt-cell :title="city.name"></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.$refs.mylist.$el.style.height = document.documentElement.clientHeight - 50 + 'px'

    axios({
      url: 'https://m.maizuo.com/gateway?k=9783542',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614327060318038033301505","bc":"110100"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.datalist = this.handleCity(res.data.data.cities)
      Indicator.close()
    })
  },
  methods: {
    handleCity (datalist) {
      // console.log(datalist);
      const letterArr = []
      for (let i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      // console.log(letterArr);
      const newlist = []
      for (let j = 0; j < letterArr.length; j++) {
        const arr = datalist.filter(item => item.pinyin.substring(0, 1) === letterArr[j].toLowerCase())
        // console.log(arr);
        if (arr.length > 0) {
          newlist.push({
            index: letterArr[j],
            list: arr
          })
        }
      }
      // console.log(newlist);
      return newlist
    },
    handleClick (id, name) {
      console.log(id)
      localStorage.setItem('cityId', id)
      localStorage.setItem('cityName', name)
      this.$router.push('/film')
    }
  }
}
</script>

<style lang="scss" scoped>
    p{
        text-align: center;
        margin: 20px auto;
    }
</style>
