<template>
    <div class="swiper-container filmswiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
  mounted () {
    new Swiper('.filmswiper', {
      loop: true,
      // 分页器
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
    .swiper-pagination{
        text-align: right;
    }
</style>
