<template>
  <div>
    <div class="tab-control">
      <div
        v-for="(item,index) in title"
        :key="item.title"
        class="tab-control-item"
        :class="{active:index==currentIndex}"
        @click="itemclick(index)"
      >
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  }
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>