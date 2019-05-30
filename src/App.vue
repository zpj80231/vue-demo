<template>
    <div class="app-container">
        <!-- 顶部区域 -->
        <mt-header fixed title="Vue-Demo">
            <router-link v-show="isBack" to slot="left">
                <mt-button icon="back" @click="prevWeb">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- 中间的 路由 router-view 区域 -->
        <transition><!-- 包裹动画 -->
            <router-view></router-view><!-- 这是放置路由的坑 -->
        </transition>
        <!-- 底部区域 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-zpj" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-zpj" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-zpj" to="/shopcar">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                <span class="mui-badge" id="badge">
                    {{ $store.getters.getAllCount }}
                </span>
            </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-zpj" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        methods: {
            prevWeb() {
                this.$router.go(-1);
            }
        },
        computed: {
            // 顶部的浏览器是否返回
            isBack() {
                // 如果路由地址不是 /home 就出现返回按钮
                return this.$route.path != "/home";
            }
        }
    };
</script>

<style lang="scss" scoped>

    .app-container {
        /*
            让各组件显示在 顶部区域 和 底部区域 之间
            overflow-x: hidden 防止顶部和底部区域跟着动画移动
        */
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;
        background-color: #fff;
    }

    .mint-header.is-fixed {
        z-index: 99; //防止图片列表忘上划的时候盖住顶部区域
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }

    //该类名解决显示图片列表分类的坑： 底部 tabbar无法切换的问题 把所有.mui-tab-item 改为 .mui-tab-item-随便写
    .mui-bar-tab .mui-tab-item-zpj.mui-active {
        color: #007aff;
    }

    .mui-bar-tab .mui-tab-item-zpj {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-zpj .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-zpj .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
