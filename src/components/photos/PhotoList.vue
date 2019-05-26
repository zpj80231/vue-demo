<template>
    <div>
        <!-- 顶部滑动条区域 (有5个坑，看md说明解决)
             由于还需要滑动，这是个js事件，所以要引入mui的js -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!-- 选中高亮是这个类名 mui-active , 默认我们的全部分类是高亮-->
                    <!-- 注意下边是vue给类加属性 ：class="[x,xx,xxx]" -->
                    <a :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
                       v-for="item in cates"
                       :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a>

                </div>
            </div>
        </div>

        <!-- 图片列表区域 Mint-UI 提供的现成的组件 `lazy-load`-->
        <ul class="photo-list">
            <!-- 点击图片区域(包含点击摘要区域)跳转到图片详情 -->
            <router-link v-for="item in list" :key="item.id"
                         :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <!-- 图片显示摘要区域 -->
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    // 由于滑动需要js，所以导入mui的js
    import mui from '../../lib/mui/js/mui.min.js'

    /*
     // 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
     // 导入 mui.js
     // 调用官方提供的 方式 去初始化：
     mui('.mui-scroll-wrapper').scroll({ //但是初始化时机很重要，在这初始化滑动条不会滑动
     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
     });
     */

    export default{
        data(){
            return {
                cates: [], //滑动区域 所有分类的数组
                list: [] //图片列表的数组
            }
        },
        created(){//data和methods已经创建好了，dom还没有渲染
            this.getAllCategory();

            // 默认进入页面显示全部分类图片列表
            this.getPhotoListByCateId(0);
        },
        mounted() {//dom结构被渲染好并放到页面中的时候会执行，

            //只有当dom被渲染好并挂到页面之后，才会拿到 .mui-scroll-wrapper，滑动才有效
            //解决了这个问题，但是还会有底部区域的tabal不能点的问题，原因是js类名和tabal类名冲突了
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory(){//获取所有分类
                this.$http.get("api/getimgcategory").then(result => {
                    if (result.body.status === 0) {
                        // 手动拼接出一个最完整的 分类列表
                        result.body.message.unshift({title: "全部", id: 0});
                        this.cates = result.body.message;
                    }
                });
            },
            getPhotoListByCateId(cateId){//根据分类id获取图片列表
                this.$http.get("api/getimages/" + cateId).then(result => {
                    if (result.body.status === 0) {
                        this.list = result.body.message;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;

        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative; //相对定位 让文字显示在图片上

            img {
                width: 100%;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info {
                color: white;
                text-align: left;
                position: absolute; //绝对定位 让文字显示在图片上
                bottom: 0; //距离图片底部为0 让文字显示在图片上
                background-color: rgba(0,0,0,0.4); //修改背景色 让文字显示在图片上
                max-height: 82px;//给显示在图片的文字区域一个固定的高度
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>