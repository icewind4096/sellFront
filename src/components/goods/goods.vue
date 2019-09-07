<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectMenu($index, $event)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:food-wrapper>
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="descript">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span>￥{{food.price}}</span><span class="old" v-show="food.oldprice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
    </div>
    <shop-cart v-ref:shopcart :select-foods="selectFoods" :delivery-Price="seller.deliveryPrice" :min-Price="seller.minPrice"></shop-cart>
  </div>
</template>

<script type="text/ecmascript-6">
  import shopCart from '../../components/shopcart/shopcart.vue';
  import cartControl from '../../components/cartControl/cartcontrol.vue';
  import BScroll from 'better-scroll';

  const ERR_OK = 0;

  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        if (this.listHeight.length > 0) {
          var _height = 0;
          for (var i = 0; i < this.listHeight.length; i++) {
            if (this.scrollY === 0) { return 0; };
            if (this.scrollY >= _height && this.scrollY < this.listHeight[i]) {
              return i - 1;
            };
            _height = this.listHeight[i];
          };
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) { return; } // 为了解决在PC端点击时触发两次 如果_constructed说明是原生的事件，不处理，直接返回
        var foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook');
        this.foodsScroll.scrollToElement(foodList[index], 300);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodWrapper, {
          click: true,
          probeType: 3 // 要BScroll实时通知滚动的位置
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        var foodsList = this.$els.foodWrapper.getElementsByClassName('food-list-hook');
        var height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodsList.length; i++) {
          var item = foodsList.item(i);
          height = height + item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _drop(target) {
        this.$refs.shopcart.drop(target);
      }
    },
    events: {
      'cart.inc'(target) {
        this._drop(target);
      }
    },
    components: {
      'shopCart': shopCart,
      'cartControl': cartControl
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
    .goods
      display: flex
      position: absolute
      top: 174px                //174px是头部组件的高度，详情查看标记图片
      width: 100%
      bottom: 46px              //距离底部边缘46像素
      overflow: hidden          //超过部分隐藏
      .menu-wrapper
        flex: 0 0 80px          //不等分 不缩放 占位80px
        width: 80px
        background: #f3f5f7
        .menu-item
          display: table
          height: 54px
          width: 56px
          line-height: 14px
          padding: 0 12px
          &.current
            position: relative
            margin-top: -1px
            z-index: 10
            background: rgb(255, 255, 255)
            font-weight: 700
            .text
              boarder-none()
          .text
            display: table-cell
            width: 56
            vertical-align: middle
            font-size: 12px
            border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
      .foods-wrapper
        flex: 1
        .title
          height: 26px
          line-height: 26px
          padding-left: 14px
          font-size: 12px
          color: rgb(147, 153, 159)
          border-left: 2px solid #d9ddd1
          background:= #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex; 1
            .name
              margin-top: 2px
              margin-bottom: 8px
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .descript
              margin-bottom: 8px
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)
            .extra
              font-size: 10px
              height: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
              .count
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
              right: 0px
              bottom: 12px
</style>
