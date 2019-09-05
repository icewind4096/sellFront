<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count > 0" @click="decCart" transition="move">
      <span class="inner icon-remove_circle_outline"></span>   <!-- 内层负责平移 -->
    </div>

    <div class="cart-count" v-show="food.count > 0">
      {{food.count}}
    </div>

    <div class="cart-increase icon-add_circle" @click="incCart">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    name: 'cartControl',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      incCart(event) {
        if (!event._constructed) { return; }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
          this.food.count = 1;
        } else {
          this.food.count = this.food.count + 1;
        }
        this.$dispatch('cart.inc', event.target);
      },
      decCart(event) {
        if (!event._constructed) { return; } // 为了解决在PC端点击时触发两次 如果_constructed说明是原生的事件，不处理，直接返回
        this.food.count = this.food.count - 1;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .cartcontrol
    font-size: 0px
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3d(0, 0, 0)             //动画结束位置
        .inner
          display: inline-block
          line-height: 24px
          font-size: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter,&.move-leave                     //动画开始
        opacity: 0
        transform: translate3d(24px, 0, 0)          //24px移动到0px
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 16px
      color: rgb(147, 153, 159)
    .cart-increase
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
