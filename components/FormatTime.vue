<template>
  <div>{{ formatedTime }}</div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  name: 'FormatTime',
  props: {
    time: {
      type: String,
      required: true
    },
    fromNow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formatedTime() {
      moment.locale('zh-cn')
      const formatedTime = moment(this.time, 'YYYYMMDD H:mm:ss')
      return this.fromNow ? formatedTime.fromNow() : formatedTime.format('llll')
    }
  }
}
</script>
