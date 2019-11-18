<template>
  <div v-show="showFlag" class="food" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click.stop.prevent="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldprice">￥{{food.oldPrice}}</span>
        </div>
      </div>
      <div class="cartcontrol-wrapper">
        <cart-control :food="food"></cart-control>
      </div>
      <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst" transition="fade">加入购物车</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartControl from '../../components/cartControl/cartcontrol.vue';
  import Vue from 'vue';

  export default {
    name: 'food',
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) { return; }
        this.$dispatch('cart.inc', event.target);
        Vue.set(this.food, 'count', 1);
      }
    },
    components: {
      'cartControl': cartControl
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0px
    top: 0px
    width: 100%
    bottom: 48px
    z-index: 30
    background: #fff
    &.move-transition
      transition: all 0.4s linear
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left：0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        height: 24px
        font-size: 14px
        color: rgb(240, 20, 20)
        margin-bottom: 8px
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      height: 24px
      line-height: 24px
      padding: 0 12px
      z-index: 10
      box-sizing: border-box
      border-radius: 12px
      font-size: 10px
      background: rgb(0, 160, 220)
      &.fade-transition
        transition: all 0.2s
        opacity: 1
      &.fade-enter,&.fade-leave
        opacity: 0
</style>
