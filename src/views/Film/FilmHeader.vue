<template>
    <div>
        <ul>
            <router-link to="/film/nowplaying" tag="li" active-class="active">正在热映</router-link>
            <router-link to="/film/comingsoon" tag="li" active-class="active">即将上演</router-link>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    ul{
        display: flex;
        li{
            flex: 1;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: white;
        }
    }
    .active{
        color: red;
    }
    .fixed{
        position: fixed;
        left: 0px;top: 0px;
        width: 100%;height: 40px;
        background: white;
    }
</style>
