<template>
    <!-- mui 拿来即用 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        mounted() {
            //mui文档中：mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化
            mui(".mui-numbox").numbox();
        },
        methods: {
            //当购物车中的数量变化的时候 vuex中的数量也得变(因为我们购物车的数据都是从vuex中获取的)
            countChanged(){
                this.$store.commit("updateGoodsInfo",{
                    id:this.goodsid,
                    count: this.$refs.numbox.value
                })
            }
        },
        props:["initCount","goodsid"]
    }
</script>

<style lang="scss" scoped>

</style>