<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">提交评论</mt-button>

        <!-- 评论列表 -->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ comments.length - i }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? "用户: " + item.user_name + " 这哥们没有评价" : item.content }}
                </div>
            </div>

            <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
        </div>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                pageIndex: 1,//默认展示第一页数据
                comments: [],//所有评论数据
                msg: ""//我们自己输入的评论内容
            }
        },
        created() {
            this.getComments();
            //this.getMore(); 当点击获取更多评论的时候才生效
        },
        props: ["id"],//把父组件传过来的值取值
        methods: {
            getComments(){//获取评论的方法
                this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
                    .then(result => {
                        if(result.body.status === 0){
                            //首次展示的是第一页的评论
                            //当点击加载更多的时候，显示的应该是之前的数据加上最新的数据
                            this.comments =  this.comments.concat(result.body.message);
                        }else{
                            Toast("获取评论失败")
                        }
                    })
            },
            getMore(){//加载更多评论内容
                this.pageIndex++;
                this.getComments();
            },
            postComment(){//提交评论
                //先判断评论内容是否为空
                if(this.msg.trim().length === 0){
                    return Toast("评论内容不能为空空");
                }

                // 提交评论 接口中要求有3个参数
                // 参数1： 请求的URL地址
                // 参数2： 提交给服务器的数据对象 { content: this.msg }
                // 参数3： post定义提交时候，表单中数据的格式  { emulateJSON:true } 一般在main.js中设置为全局，省得每次都手写
                this.$http.post("api/postcomment/" + this.$route.params.id, {
                    content: this.msg.trim()})
                    .then(result => {
                        if(result.body.status === 0){
                            /*
                            //这是我的做法
                            this.comments =  this.comments.unshift(result.body.message);
                            this.getComments();
                            */

                            //这是老师的做法
                            // 1. 拼接出一个评论对象
                            var cmt = {
                                user_name: "匿名用户",
                                add_time: Date.now(),
                                content: this.msg.trim()
                            };
                            this.comments.unshift(cmt);
                            this.msg = "";
                        }else{
                            Toast("提交评论失败")
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cmt-container {
        h3 {
            font-size: 16px
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    line-height: 28px;
                    background-color: #ccc;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>