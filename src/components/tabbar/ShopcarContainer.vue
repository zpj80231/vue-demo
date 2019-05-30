<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="mui-card" v-for="(goodsinfo, i) in goodslist" :key="goodsinfo.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getGoodsSelected[goodsinfo.id]"
                        @change="selectedChange(goodsinfo.id,$store.getters.getGoodsSelected[goodsinfo.id])"></mt-switch>&nbsp;&nbsp;
                    <img :src="goodsinfo.thumb_path" alt="">&nbsp;&nbsp;&nbsp;&nbsp;
                    <div class="info">
                        <h1>{{goodsinfo.title}}</h1>
                        <p>
                            <span class="price">￥{{ goodsinfo.sell_price }}</span>&nbsp;&nbsp;
                            <numbox :initCount="$store.getters.getGoodsCount[goodsinfo.id]" :goodsid="goodsinfo.id"></numbox>&nbsp;&nbsp;
                            <a href="#" @click="remove(goodsinfo.id,i)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <p>
                        <span class="zongji">总计</span><br>
                        以勾选商品&nbsp;<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>&nbsp;件&nbsp;
                        总价&nbsp;<span class="red">¥&nbsp;{{$store.getters.getGoodsCountAndAmount.amount}} </span>&nbsp;
                    </p>
                    <mt-button type="danger" @click="pay">去结算</mt-button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import numbox from "../subcomponents/shopcar_numbox.vue";
    import { Toast } from 'mint-ui';

    export default {
        data() {
            return {
                goodslist: [] // 购物车中所有商品的数据
            };
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            //显示购物车商品列表
            getGoodsList() {
                // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
                var idArr = [];
                this.$store.state.car.forEach(item => idArr.push(item.id));
                // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
                if (idArr.length <= 0) {
                    return;
                }
                // 获取购物车商品列表
                this.$http
                    .get("api/goods/getshopcarlist/" + idArr.join(","))
                    .then(result => {
                        if (result.body.status === 0) {
                            this.goodslist = result.body.message;
                        }
                    });
            },
            //当开关状态变化的时候，把最新的开关状态，同步到 store 中
            selectedChange(goodsid, status) {
                this.$store.commit("updateGoodsSelected",{id: goodsid, selected: status})
            },
            //从购物车中删除指定商品
            //1. 从显示购物车商品列表中删除
            //2. 从vuex公共仓库中删除
            remove(id,i) {
                this.goodslist.splice(i,1);
                this.$store.commit("removeFormCar",id)
            },
            pay(){
                Toast({message:"该功能暂未开发",duration: 1500})
            }
        },
        components: {
            numbox
        }
    };
</script>

<style lang="scss" scoped>
    .shopcar-container {
        overflow: hidden;
        .mui-card-content-inner {
            display: flex;
            align-items: center;
            img {
                width: 55px;
            }
            h1 {
                font-size: 14px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price {
                    color: red;
                    font-weight: bold;
                }
            }
        }

        .jiesuan {
            display: flex;//开启布局
            justify-content: space-between;//布局为两端对齐
            align-items: center;//居中
            font-size: 14px;
            p {
                margin: 2px;
            }
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
            .zongji {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
</style>