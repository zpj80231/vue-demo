<template>
    <div class="newsinfo-container">
        <!-- 头标题 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
            <span>点击：{{ newsinfo.click }}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!--
            评论区域：  引入评论子组件
            :id为 详情组件向评论子组件传值
         -->
        <comment :id="this.id"></comment>
    </div>
</template>

<script type="text/javascript">
    // 1. 导入评论子组件
    import comment from "../subcomponents/comment.vue"

    export default{
        data() {
            return {
                id: this.$route.params.id,
                newsinfo: {}
            }
        },
        created() {
            this.getNewsInfo();
        },
        methods: {
            getNewsInfo() {//获取新闻详情
                this.$http.get("api/getnew/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.newsinfo = result.body.message[0];
                    } else {
                        Toast("获取新闻详情失败");
                    }
                })
            }
        },
        components: {
            //2. 子组件能已 html标签 形式 在模板中显示
            "comment": comment
        }
    }
</script>
/*
  我的理解就是设置为 两端对齐
  display: flex;
  justify-content: space-between;
*/

<style lang="scss">
    .newsinfo-container {
        padding: 0 4px;
        .title {
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle {
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content {
            img {
                width: 100%;
            }
        }
    }
</style>