<template>
    <div class="swiper-container detailSwiper">
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
  data () {
    return {

    }
  },
  props: ['perview', 'myclassname'],
  mounted () {
    new Swiper('.' + this.myclassname, {
      slidesPerView: this.perview,
      spaceBetween: this.myclassname === 'actorswiper' ? 10 : 5,
      freeMode: true
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
