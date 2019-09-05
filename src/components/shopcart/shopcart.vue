<template>
  <div class="shopcart">

    <div class="content">

      <div class="content-left">

        <div class="logo-wrapper">
          <div class="logo" :class="{'highLight':totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></i>
          </div>
          <div class="totalNumber" v-show="totalCount > 0">{{totalCount}}</div>
        </div>

        <div class="goodsAmount" :class="{'highLight':totalAmount > 0}">
            {{totalAmount}}元
        </div>

        <div class="deliveryPrice">
          另需配送费{{deliveryPrice}}元￥
        </div>

      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDescript}}
        </div>
      </div>
    </div>

    <div class="ball-container">
      <div transition="drop" v-for="ball in balls" v-show="ball.show" class="ball">
        <div class="inner inner-hook"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'shopCart',
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10, count: 2
            }
          ];
        }
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      };
    },
    computed: {
      totalAmount() {
        let _totalAmount = 0;
        this.selectFoods.forEach((item) => {
          _totalAmount = _totalAmount + item.price * item.count;
        });
        return _totalAmount;
      },
      totalCount() {
        let _totalCount = 0;
        this.selectFoods.forEach((item) => {
          _totalCount = _totalCount + item.count;
        });
        return _totalCount;
      },
      payDescript() {
        if (this.totalAmount === 0) {
          return '￥' + this.minPrice + '元起送';
        } else {
          if (this.totalAmount < this.minPrice) {
            const diff = this.minPrice - this.totalAmount;
            return '还差￥' + diff + '元起送';
          } else {
            return '去结算';
          }
        }
      },
      payClass() {
        if (this.totalAmount < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (ball.show === false) {
            ball.show = true;           // 关键，为了触发一个动画，具体看readme里的动画章节
            ball.el = el;
            this.dropBalls.push(ball);
            break;
          }
        }
      }
    },
    transitions: {
      drop: {
        beforeEnter(el) {
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show === true) {
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              el.style.display = '';
              el.style.webkitTransform = `translated3d(0, ${y}px, 0)`;
              el.style.transaction = `translated3d(0, ${y}px, 0)`;
              // el.style.webkitTransform = 'translated3d(0, -516px, 0)';
              // el.style.transaction = 'translated3d(0, -516px, 0)';
              let inner = el.getElementsByClassName('inner-hook')[0];
              // inner.style.webkitTransform = 'translated3d(289px, 0, 0)';
              // inner.style.transaction = 'translated3d(289px, 0, 0)';
              inner.style.webkitTransform = `translated3d(${x}px, 0, 0)`;
              inner.style.transaction = `translated3d(${x}px, 0,  0)`;
            }
          }
        },
        enter(el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight;   // 手动触发浏览器刷新
          this.$nextTick(() => {
            el.style.display = '';
            el.style.webkitTransform = 'translated3d(0, 0, 0)';
            el.style.transaction = 'translated3d(0, 0, 0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translated3d(0, 0, 0)';
            inner.style.transaction = 'translated3d(0, 0,  0)';
          });
        },
        afterEnter(el) {
          console.log('after enter');
          let ball = this.dropBalls.shift();
          if (ball === true) {
            ball.show = false;
            el.style.display = 'none';
            console.log(el.style.display);
          }
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highLight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highLight
                color: #fff
          .totalNumber
            position: absolute
            top: 0;
            right: 0;
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.4)
        .goodsAmount
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          box-sizing: border-box
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highLight
            color: #fff
        .deliveryPrice
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin: 12px 0 0 12px
          font-size: 10px
      .content-right
        flex: 0, 0, 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-transition
          transition: all 2s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%                    //把一个矩形，变成一个圆形的小球
            background: rgb(0, 160, 220)
            transition: all 2s linear
</style>
