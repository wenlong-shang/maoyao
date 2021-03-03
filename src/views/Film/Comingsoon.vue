<template>
    <div>
        <ul>
            <li v-for="data in $store.state.comingList" :key="data.filmId">
                <img :src="data.poster">
                <h3>{{data.name}}</h3>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$store.dispatch('getComingListAction')
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
