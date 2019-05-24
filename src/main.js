// 入口文件
import Vue from "vue"
// 导入根组件
import app from "./App.vue"


// 导入格式化插件
import moment from "moment"
// 定义Vue全局过滤器 (时间转换过滤器)
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})


// 1.1 导入路由的包
import VueRouter from "vue-router"
// 1.2 安装路由
Vue.use(VueRouter)

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
// 全局设置 post 时候表单数据格式组织形式(省得每次手写了)   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;



// 按需导入 Mint-UI 中的组件
import {Header, Swipe, SwipeItem, Button} from 'mint-ui'
Vue.component(Header.name, Header)//显示顶部区域
Vue.component(Swipe.name, Swipe);//展示首页轮播图组件
Vue.component(SwipeItem.name, SwipeItem);//展示首页轮播图组件
Vue.component(Button.name, Button);//展示按钮

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 1.3 导入我们自己配置的路由模块
import router from "./router.js"


var vm = new Vue({
    el: "#app",
    render: c => c(app),//渲染根组件
    router: router
})