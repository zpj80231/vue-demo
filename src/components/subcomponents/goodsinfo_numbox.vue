<template>
    <!-- mui 拿来即用 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
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
            //当数量发生变化的时候
            countChanged() {
                //把最新的数量发给父组件
                this.$emit('getcount',parseInt(this.$refs.numbox.value))
            }
        },
        props: ["max"],
        watch: {
            //监听传过来的属性max,当max传过来时 看mui文档为numbox设置最大最小值等
            max: function (newValue, oldValue) {
                mui(".mui-numbox").numbox().setOption('max',newValue)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>