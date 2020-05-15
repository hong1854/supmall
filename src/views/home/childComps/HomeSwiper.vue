<template>
  <Swiper>
      <SwiperItem v-for="item in banner" :key="item.link">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgload">
        </a>
      </SwiperItem>
    </Swiper>
</template>
<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  data() {
    return {
      isload:false
    }
  },
  props:{
    banner:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  components:{
    Swiper, 
    SwiperItem,
  },
  methods:{
    imgload(){
      if(!this.isload){
         this.$emit('swiperload')
         this.isload=true
      }
     
      
    }
  }
}
</script>
<style>
  
</style>