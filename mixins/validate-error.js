export default {
  data() {
    return {
      errors: {
        category_id: null,
        title: null
      }
    }
  },
  methods: {
    _resetErros() {
      this.errors = {}
    },
    _setErrors(data) {
      const errors = data.errors
      if (typeof errors !== 'undefined') {
        const keys = Object.keys(errors)
        for (const key of keys) {
          this.$set(this.errors, key, errors[key][0])
        }
      }
    }
  }
}
