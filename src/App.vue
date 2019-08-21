<template>
  <v-header></v-header>
  <div>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>

      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>

      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
  </div>
  <!-- 路由展示区 -->
  <router-view></router-view>
</template>

<script>
  import header from './components/header/header.vue';
  export default {
    components: {'v-header': header}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  //#是id选择器 .是class选择器
  .tab
    display:flex
    width: 100%
    height: 40px
    line-height: 40px
    //border-1px在mixin.styl里面定义的一个类似函数的css
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      // &标识父元素, 此处标识.tab-item
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
