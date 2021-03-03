<template>
    <div>
        <div class="headerBackground">
            <div class="header">
                <img src="../assets/下载.png">
                <span>立即登录</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log('局部盘查')

    if (true) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
    .headerBackground{
        width: 100%;height: 170px;
        background: url(../assets/bg.png);
        .header{
            padding-top: 60px;
            padding-left: 20px;
            color: white;
            display: flex;
            align-items: center;
            img{
                width: 60px;
                border-radius: 50%;
                margin-right: 20px;
            }
            // span{
            //     line-height: 60px;
            //     display: inline-block;
            //     height: 60px;
            // }
        }
    }
</style>
