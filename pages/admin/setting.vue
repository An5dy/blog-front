<template>
  <el-form label-width="100px" size="normal" style="max-width: 500px;">
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action="/api/admin/settings/avatar"
        name="image"
        :headers="uploadHeaders"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="setting.avatar" :src="setting.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="setting.title" />
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="setting.sketch" />
    </el-form-item>
    <el-form-item>
      <el-button
        style="width: 100%; margin-top: 20px;"
        size="medium"
        type="primary"
        @click="handleUpdateOrCreate"
        >确认设置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from 'js-cookie'
import { Upload } from 'element-ui'

export default {
  layout: 'admin',
  components: {
    ElUpload: Upload
  },
  data() {
    return {
      uploadHeaders: {
        Accept: process.env.API_HEADER,
        Authorization: `Bearer ${Cookie.get('access_token')}`
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
      const data = {
        img_path: this.setting.avatar,
        _method: 'DELETE'
      }
      try {
        await this.$axios.post('/api/admin/images', data)
        this.setting.avatar = avatarUrl
      } catch (error) {}
    },
    async handleUpdateOrCreate() {
      try {
        await this.$store.dispatch('setting/handleUpdate', {
          title: this.setting.title,
          sketch: this.setting.sketch
        })
      } catch (error) {}
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
