<template>
  <div id="home">
    <NavBar class="homeNav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl :title="['流行','新款','精选']" class="tabcontor" @tabClick="tabClick" ref="tabcontent1" v-show="tabfixed"></TabControl>
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="conetentscroll"
      :pullUpload="true"
      @pullingUp="pullingUpclick"
    >
      <HomeSwiper :banner="banner" @swiperload="swiperload"></HomeSwiper>
      <HomeRecommendView :recommend="recommend"></HomeRecommendView>
      <FeatureView></FeatureView>
      <TabControl
        :title="['流行','新款','精选']"
        class="tabconterol"
        @tabClick="tabClick"
        ref="tabcontent2"
      ></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop class="back-top" @click.native="backClick" v-show="tabfixed"></BackTop>
  </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  data() {
    return {
      banner: [],
      // keyword:[],
      // dKeyword:[],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isshow: false,
      taboffSetTop: null,
      tabfixed: false,
      saveY:0,
    };
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    //监听item里图片加载完成
    this.$bus.$on("itemimageload", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 网络请求事件
     */
    //防抖函数

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        (this.banner = res.data.data.banner.list),
          // this.keyword=res.data.data.keyword,
          // this.dKeyword=res.data.data.dKeyword,
          (this.recommend = res.data.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    swiperload() {
      this.taboffSetTop = this.$refs.tabcontent2.$el.offsetTop;
    },
    /**
     * 事件监听方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontent1.currentIndex=index
      this.$refs.tabcontent2.currentIndex=index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    conetentscroll(position) {
      //判断backTOp是否显示
      this.isshow = -position.y > 1000;
      //决定tabcontrol是否吸顶
      this.tabfixed = -(position.y) > this.taboffSetTop;
    },
    pullingUpclick() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY =this.$refs.scroll.scroll.y
  },
};
</script>
  
<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.homeNav {
  background-color: var(--color-tint);
  color: #fff;
}
.tabcontor{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>