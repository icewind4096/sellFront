import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import seller from './components/seller/seller.vue';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';

import './common/stylus/index.styl';

// 注册路由模块
Vue.use(VueRouter);

// 注册resource模块
Vue.use(VueResource);

// 路由器需要一个根组件
var app = Vue.extend(App);

// 实例一个路由
var vueRouter = new VueRouter({
  linkActiveClass: 'active'
});
// 配置路由表
vueRouter.map({
  '/goods': {component: goods},
  '/seller': {component: seller},
  '/ratings': {component: ratings}
});

// 启动路由，配置一个挂载点 此处为配置到一个ID->app的挂载点
vueRouter.start(app, '#app');

// 跳转到某一个页面
// vueRouter.go('/goods');
