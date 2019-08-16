<template>
  <li>
    <aside class="dates">{{ item.created_at }}</aside>
    <nuxt-link :to="{ name: 'articles-id', params: { id: item.id } }">
      <text-hover :text="item.title" />
    </nuxt-link>
    <h2>
      {{ item.sketch }}
    </h2>
  </li>
</template>

<script>
import TextHover from './TextHover'

export default {
  name: 'BlogItem',
  components: {
    TextHover
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  margin-bottom: 20px;
  list-style-position: outside;
  margin-left: 1.5em;
  &:last-child {
    margin-bottom: 0;
  }
  & + li {
    padding-top: 20px;
  }
  a {
    color: #333;
    display: block;
    font: 500 22px/1.8 'Helvetica Neue', helvetica, Arial, sans-serif;
  }
  .dates {
    float: right;
    position: relative;
    top: 1px;
    font: italic 14px/1.3em Georgia, serif;
    color: #bbb;
  }
  h2 {
    font: normal 16px/1.5em 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #aaa;
    margin-top: 2px;
  }
}
</style>
