<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nabvar"></DetailNavBar>
    <Scroll class="conent" ref="scroll" @scroll="contentscroll" :probeType="3">
      <DetailSwiper :topImages="topimages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailInfo :detailInfo="detailInfo" @imgload="imgload"></DetailInfo>
      <DetailGoodsParam :paramInfo="paramInfo" ref="params"></DetailGoodsParam>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comments"></DetailCommentInfo>
      <GoodsList :goods="commend" ref="commend"></GoodsList>
    </Scroll>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailInfo from "./childComps/DetailInfo"
import DetailGoodsParam from "./childComps/DetailGoodsParam"
import DetailCommentInfo from "./childComps/DetailCommentInfo"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList"

import { getDetail, goods, shop ,GoodsParam ,getcommend} from "network/detail";
import {debounce} from "common/utils"
import {itemListenerMixin} from "common/mixin"
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topimages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      commend:[],
      themeTopYs:[],
      getThemeTop:null,
      currentIndex:null
    };
  },
  mixins:[itemListenerMixin],
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      const data = res.data.result;
      this.topimages = data.itemInfo.topImages;

      this.goods = new goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new shop(data.shopInfo);
      this.detailInfo=data.detailInfo;
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      if(data.rate.cRate !==0){
        this.commentInfo=data.rate.list[0]
      }
    });
    getcommend().then(res=>{
      this.commend =res.data.data.list   
    })
    this.getThemeTop =debounce(()=>{
        this.themeTopYs=[],
        this.themeTopYs.push(0),
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        this.themeTopYs.push(this.$refs.commend.$el.offsetTop)   
      })
  },
  
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    GoodsList,
  },
  methods:{
    imgload(){
      this.refresh()
      this.getThemeTop()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentscroll(position){
      const positionY= -position.y  
      const length =this.themeTopYs.length
      for(let i =0;i<length;i++){
        if(this.currentIndex !== i&&((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i==length-1 && positionY>=this.themeTopYs[i]))){
          this.currentIndex =i
          this.$refs.nabvar.currentIndex=this.currentIndex
        }
      }
    }
  },
  destroyed() {
    this.$bus.$off('itemimageload',this.itemImgListener)
  },
};
</script>
<style>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height:100vh;
}
.conent{
  height:calc(100% - 44px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>