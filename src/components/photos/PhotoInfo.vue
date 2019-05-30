<template>
    <div class="photoinfo-container">
        <!-- 头标题 -->
        <h3 class="title">{{ photoinfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!--
            缩略图区域
            预览缩略图续安装插件: npm i vue-preview -s
            $preview.open
        -->
        <div class="suoluetu">
            <!-- 最新缩略图版插件和之前不一样，看这里
             https://blog.csdn.net/qq_36742720/article/details/83270636
             -->
            <vue-preview :slides="list"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="photoinfo-content" v-html="photoinfo.content"></div>

        <!-- 评论子组件区域 -->
        <!-- 1.3 向评论子组件传值 -->
        <photoinfo-pl :id="id"></photoinfo-pl>

    </div>
</template>

<script>
    //1.1 导入现有的评论子组件
    import comment from "../subcomponents/comment.vue"

    export default{
        data(){
            return{
                id: this.$route.params.id,//接受参数：图片id
                photoinfo:{},//图片详情
                list:[]//图片缩略图数组
            }
        },
        created(){
            this.getPhotoInfo();
            this.getSuoLueTu();
        },
        methods:{
            // 获取图片的详情
            getPhotoInfo(){
                this.$http.get("api/getimageInfo/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.photoinfo = result.body.message[0];
                    }
                });
            },
            // 获取图片缩略图
            getSuoLueTu(){
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        /*
                        缩略图：
                         注意： img标签上的class不能去掉
                         注意： 每个 图片数据对象中，必须有 w 和 h 属性
                        */
                        // 循环每个图片数据，补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                            item.msrc = item.src;//msrc：小图像,到时候让后端传个小图像过来
                        });
                        // 把完整的数据保存到 list 中
                        this.list = result.body.message;
                    }
                });
            }
        },
        components:{
            //1.2 注册评论子组件
            "photoinfo-pl": comment
        }
    }
</script>

<style lang="scss" scoped>
    .photoinfo-container {
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
        .photoinfo-content {
            font-size: 13px;
            line-height: 20px;
        }
        .suoluetu {
            img {
                width: 60px;
                height: 80px;
                margin: 5px;
                box-shadow: 0 0 8px #999;
            }
        }
    }
</style>

<style lang="scss">
    .photoinfo-container {
        .suoluetu {
            .my-gallery{
                display: flex;
                flex-wrap: wrap;
            }
            figure {
                width: 60px;
                height: 80px;
                margin: 10px;
                box-shadow: 0 0 8px #999;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>