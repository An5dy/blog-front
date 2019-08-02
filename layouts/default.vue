<template>
  <div>
    <blog-nav />
    <blog-profile />
    <nuxt />
    <blog-footer />
    <back-to-top />
  </div>
</template>

<script>
import BlogNav from '@/components/BlogNav.vue'
import BackToTop from '@/components/BackToTop.vue'
import BlogFooter from '@/components/BlogFooter.vue'
import BlogProfile from '@/components/BlogProfile.vue'

export default {
  components: {
    BackToTop,
    BlogNav,
    BlogProfile,
    BlogFooter
  }
}
</script>
