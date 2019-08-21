import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import seller from './components/seller/seller.vue';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';

// 安装路由模块
Vue.use(VueRouter);

// 路由器需要一个根组件
var app = Vue.extend(App);

// 实例一个路由
var vueRouter = new VueRouter();
// 配置路由表
vueRouter.map({
  '/goods': {component: goods},
  '/seller': {component: seller},
  '/ratings': {component: ratings}
});

// 启动路由，配置一个挂载点 此处为配置到一个ID->app的挂载点
vueRouter.start(app, '#app');
