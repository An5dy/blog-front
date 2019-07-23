<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
    <back-to-top></back-to-top>
  </div>
</template>

<script>
import BackToTop from "@/components/BackToTop";

export default {
  name: "App",
  components: {
    BackToTop
  }
};
</script>
