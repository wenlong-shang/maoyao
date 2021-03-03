<template>
    <nav>
        <ul>
            <router-link to="/film" tag="li" active-class="myactive">
                <span class="iconfont icon-dianying"></span>
                电影
            </router-link>
            <router-link to="/cinema" tag="li" active-class="myactive">
                <span class="iconfont icon-yingyuan"></span>
                影院
            </router-link>
            <router-link to="/center" tag="li" active-class="myactive">
                <span class="iconfont icon-wode"></span>
                我的
            </router-link>
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .myactive{
        color: red;
    }
    nav{
        position: fixed;
        bottom: 0px;left: 0px;
        width: 100%;
        background: white;
        ul{
            display: flex;
            li{
                flex: 1;
                line-height: 50px;
                text-align: center;
            }
        }
    }
</style>
