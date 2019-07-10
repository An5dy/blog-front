<template>
  <li>
    <aside class="dates">{{ item.created_at }}</aside>
    <a href="#">
      {{ item.title }}
      <h2>
        <p>{{ item.main }}</p>
      </h2>
    </a>
  </li>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  margin-bottom: 20px;
  list-style-position: outside;
  margin-left: 1.5em;

  & + li {
    padding-top: 20px;
  }

  a {
    color: #333;
    display: block;
    font: 500 22px/1.7 "Helvetica Neue", helvetica, Arial, sans-serif;

    &:hover {
      text-decoration: none;
      color: #5694f1;
    }
  }

  .dates {
    float: right;
    position: relative;
    top: 1px;
    font: italic 14px/1.3em Georgia, serif;
    color: #bbb;
  }

  p {
    font: 400 17px/1.8 "Helvetica Neue", helvetica, Arial, sans-serif;
  }
}
</style>
