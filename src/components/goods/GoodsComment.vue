<template>
    <div>
        <!--把id属性传过去-->
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>

<script>
    //导入评论子组件
    import cmtbox from "../subcomponents/comment.vue";

    export default {
        //注册评论子组件进来
        components: {
            cmtbox
        }
    };
</script>

<style lang="scss" scoped>

</style>
