<template>

    <Swiper class="detailswiper">
      <SwiperItem v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
 
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
  }
};
</script>
<style>
.detailswiper{
  height:300px;
  overflow: hidden;
}
</style>