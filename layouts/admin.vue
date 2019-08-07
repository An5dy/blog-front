<template>
  <div>
    <no-ssr>
      <nuxt />
    </no-ssr>
  </div>
</template>

<script>
export default {
  middleware: ['auth']
}
</script>
