<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          class="title-item"
          :class="{active:index ==currentIndex}"
          :key="item"
          @click="titleclick(index)"
        >{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleclick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backclick(){
      this.$router.back()
    }
  }
};
</script>
<style>
.back img {
  margin-top: 12px;
}
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>