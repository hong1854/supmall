<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/Maintabbar";

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
