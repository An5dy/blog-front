<template>
  <el-form
    ref="setting"
    :rules="rules"
    :model="setting"
    label-width="100px"
    size="normal"
    style="max-width: 500px;"
  >
    <el-form-item :error="uploadError" label="头像">
      <el-upload
        :headers="uploadHeaders"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        class="avatar-uploader"
        action="/api/admin/settings/avatar"
        name="image"
      >
        <img v-if="setting.avatar" :src="setting.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </el-form-item>
    <el-form-item :error="errors.title" label="标题" prop="title">
      <el-input v-model="setting.title" />
    </el-form-item>
    <el-form-item :error="errors.sketch" label="简介" prop="sketch">
      <el-input v-model="setting.sketch" />
    </el-form-item>
    <el-form-item>
      <el-button
        @click="handleUpdateOrCreate"
        style="width: 100%; margin-top: 20px;"
        size="medium"
        type="primary"
        >确认设置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from 'js-cookie'
import { Upload, Message } from 'element-ui'
import ValidateError from '@/mixins/validate-error'

export default {
  layout: 'admin',
  components: {
    ElUpload: Upload
  },
  mixins: [ValidateError],
  data() {
    return {
      uploadError: null,
      uploadHeaders: {
        Accept: process.env.API_HEADER,
        Authorization: `Bearer ${Cookie.get('access_token')}`
      },
      rules: {
        title: [
          {
            required: true,
            message: '标题 不能为空。',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '标题 不能大于 50 个字符串。',
            trigger: 'blur'
          },
          {
            type: 'string',
            message: '标题 必须是字符串。',
            trigger: 'blur'
          }
        ],
        sketch: [
          {
            required: true,
            message: '简介 不能为空。',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '简介 不能大于 255 个字符串。',
            trigger: 'blur'
          },
          {
            type: 'string',
            message: '简介 必须是字符串。',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    setting() {
      return this.$store.state.setting.setting
    }
  },
  async asyncData({ store }) {
    await store.dispatch('setting/fetchAdminSetting')
  },
  methods: {
    async handleAvatarSuccess(res, file) {
      const avatarUrl = res.data.path
      const oldAvatar = this.setting.avatar
      try {
        if (typeof oldAvatar !== 'undefined') {
          await this.$axios.post('/api/admin/images', {
            img_path: oldAvatar,
            _method: 'DELETE'
          })
        }
        this.setting.avatar = avatarUrl
      } catch (err) {
        const data = err.response.data
        const errors = data.errors
        if (typeof errors !== 'undefined') {
          this.uploadError = errors.img_path[0]
        } else {
          Message({
            message: data.message,
            type: 'error',
            center: true
          })
        }
      }
    },
    async handleUpdateOrCreate() {
      const valid = await this.$refs.setting.validate()
      if (valid) {
        try {
          await this.$store.dispatch('setting/handleUpdate', {
            title: this.setting.title,
            sketch: this.setting.sketch
          })
        } catch (error) {
          const data = error.response.data
          this._setErrors(data)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff !important;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
