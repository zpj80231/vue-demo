<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <!-- vue给类加个属性判断 图片宽度是否要为100% -->
                <img :src="item.img" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        //子组件接受父组件传来的参数
        props: ["lunbotuList", "isfull"]
    }

</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            text-align: center;

            img {
                height: 100%;
                //width: 100%;
            }

            .full {
                width: 100%;
            }
        }
    }
</style>