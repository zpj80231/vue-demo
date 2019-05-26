<template>
    <div>
         <!-- 轮播图区域 -->
        <!--
            多个地方用到了轮播图，把轮播图单独抽取为一个组件
            :lunbotuList : 每个要遍历的轮播图数组
            :isfull      : 要遍历的轮播图宽度是否为100%(商品列表详情的轮播图宽为100%就不好看了)
        -->
        <lunbotu :lunbotuList="lunbotuList" :isfull="true"></lunbotu>

        <!-- 六宫格 -->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoslist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></router-link></li>
         </ul>


    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import lunbotu from '../subcomponents/swiper.vue'

export default {
    data(){
        return {
            lunbotuList: []
        }
    },
    created() {
        this.getLunbotu();
    },
    methods: {
        getLunbotu(){ //获取轮播图的方法
            this.$http.get("api/getlunbo").then(result => {
                 console.log(result.body);
                if (result.body.status === 0) {
                  // 成功了
                  this.lunbotuList = result.body.message;
                } else {
                  // 失败的
                  Toast("加载轮播图失败。。。");
                }
              });
        }
    },
    components: {
        lunbotu
    }
}

</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
        width: 60px;
        height: 60px;
    }
    .mui-media-body {
        font-size: 13px;
    }
}

.mui-table-view .mui-grid-view .mui-grid-9 {
    border: 0;
}
</style>