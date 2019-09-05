# sell

> sell app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

```
#坑点
1.注意要是保持驼峰命名，驼峰字母前面要加-,HTML不区分大小写这个是原因

2.为了解决在PC端点击时触发两次, 使用event._constructed,如果_constructed说明是原生的事件，不处理，直接返回

#使用组件的顺序
1.import组件
  import 组件变量名 from 组件文件路径
  Ps. import cartControl from '../../components/cartControl/cartcontrol.vue';

2.注册组件
  components: {
        '组件变量名': 组件名称(相当于类名)
  }
   
3.通过Vue.set(变量, '属性', 值)，设置变量不存在的属性值是，可以被Vue观察到，从而导致界面刷新

#CSS
1. font-size: 0px 为了去掉元素之间的间隙

2. padding: 有时候可以在元素不增大的基础上，增大操作区域

#动画
当在VUE中与V-IF V-SHOW V-For一起使用时，才会触发动画效果

1. 当V-SHOW触发时，会触发enter和leave两个事件

2. 简单认为move-enter进入时效果，move-leave退出时效果

#VUE访问子组件
1. v-ref:xxx定义, 使用this.$refs.xxx来调用该元素的方法

#VUE访问元素
1. this.$els访问元素

#小球动画 Q&A
1.Q：为什么把balls设置为5  
　A: 认为就算连续点击，最大在空中飞行的小球不会超过5个
  

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
