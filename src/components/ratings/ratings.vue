<template>
  <div class="ratings" v-el:ratings>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show = "showContent(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span :class="{'icon-thumb_up':rating.rateType===0}"></span>{{rating.text}}
                  <span class="item" v-for="item in rating.recommend" >{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  import BScroll from 'better-scroll';
  import split from '../../components/split/split';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import star from '../../components/star/star.vue';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    name: 'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$els.ratings, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      });
    },
    events: {
      'ratingtype.select'(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      'ratingtype.onlyContent'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    methods: {
      showContent(type, text) {
        if (this.onlyContent && !text) {
          return false;
        } else {
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        }
      }
    },
    components: {
      'star': star,
      'split': split,
      'ratingselect': ratingselect
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    left: 0
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        .score
          font-size: 24px
          line-height: 28px
          color: rgb(255, 153, 0)
          margin-bottom: 6px
        .title
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
          margin-bottom: 8px
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px, 24px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            font-size: 12px
            color: rgb(7, 17, 27)
            display: inline-block
            vertical-align: top
            line-height: 18px
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .delivery
            font-size: 12px
            color: rgb(147, 153, 159)
            margin-left: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              vertical-align: top
              margin-right: 6px
            .delivery
              display: inline-block
              vertical-align: top
              font-size: 10px
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
            margin-bottom: 18px
          .recommend
            line-height: 16px
            font-size: 0px
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              color: rgb(7, 17, 27)
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: $fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
</style>
