
import {debounce} from "common/utils"
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh:null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener =()=>{
      this.refresh()
    }
    this.$bus.$on("itemimageload",this.itemImgListener)  
  },
}
export const BackTopMixin ={
  data() {
    return {
      isshow: false,
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
  },
  components:{
    BackTop,
  }
}