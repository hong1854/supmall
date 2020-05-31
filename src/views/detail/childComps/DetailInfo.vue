<template>
  <div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" 
  :src="item" alt="" @load="imgload"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      },
      counter:0,
      imagelength:0,
    }
  },
  methods: {
    imgload(){
      // if(++this.counter ===this.imagelength){
        this.$emit('imgload')
      // }
    }
  },
  watch: {
    detailInfo(){
      this.imagelength =this.detailInfo.detailImage[0].list.length
    }
  },
};
</script>
<style scoped>
.goods-info {
  padding: 20px 0;
}
.desc{
  font-size:14px;
  color:#222;
}
.info-key {
  color: #eb4868;
}
.info-list img {
  width: 100%;
}
</style>