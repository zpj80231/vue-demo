<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>

        <hr>

        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                info: {} // 图文数据
            };
        },
        created() {
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc() {
                this.$http
                    .get("api/goods/getdesc/" + this.id)
                    .then(result => {
                        if (result.body.status === 0) {
                            this.info = result.body.message[0];
                        }
                    });
            }
        }
    };
</script>

<!--把scoped去掉，不然的话图片显示过大-->
<style lang="scss">
    .goodsdesc-container {
        padding: 4px;
        h3 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>
