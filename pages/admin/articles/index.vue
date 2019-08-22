<template>
  <div class="artcile-container">
    <div class="menus-bar">
      <el-button
        type="success"
        icon="el-icon-edit"
        size="small"
        @click="handleCreate"
      >
        新增
      </el-button>
    </div>
    <el-table :data="list">
      <el-table-column prop="id" label="序号" align="center" width="50" />
      <el-table-column prop="title" align="center" label="标题" width="200" />
      <el-table-column
        prop="category.title"
        label="分类"
        align="center"
        width="100"
      />
      <el-table-column label="标签" prop="tags" align="center" width="500">
        <template slot-scope="scope">
          <el-tag
            v-for="(tag, index) in scope.row.tags"
            :key="index"
            closable
            size="mini"
            style="margin-right: 5px"
            type="primary"
            @close="handleTagClose(tag, scope.row.tags)"
            >{{ tag.title }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="skims" align="center" label="浏览量" />
      <el-table-column prop="likes" align="center" label="点赞量" />
      <el-table-column prop="comments" align="center" label="评论量" />
      <el-table-column label="发布状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_published"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="0"
            @change="handlePublish(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        align="center"
        width="200"
        label="发布时间"
      />
      <el-table-column label="操作" align="center" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="meta.current_page"
        :page-size="meta.per_page"
        :total="meta.total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  computed: {
    list() {
      return this.$store.state.article.list
    },
    meta() {
      return this.$store.state.article.meta
    }
  },
  async asyncData({ store }) {
    await store.dispatch('article/fetchArticles', {
      path: '/api/admin/articles'
    })
  },
  methods: {
    handleCreate() {
      this.$router.push('/admin/articles/create')
    },
    async handleCurrentChange(page) {
      try {
        await this.$store.dispatch('article/fetchArticles', {
          path: '/api/admin/articles',
          params: { page }
        })
      } catch (error) {}
    },
    handleEdit(row) {
      this.$router.push({
        name: 'admin-articles-id-edit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('article/deleteArticle', row.id)
        })
        .catch(() => {})
    },
    handleTagClose(tag, tags) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('article/deleteTag', tag.id).then(() => {
            tags.forEach((item, index, array) => {
              if (item.id === tag.id) {
                array.splice(index, 1)
              }
            })
          })
        })
        .catch(() => {})
    },
    async handlePublish(row) {
      try {
        if (row.is_published === 0) {
          await this.$store.dispatch('article/lowerArticle', row.id)
        } else {
          await this.$store.dispatch('article/upperArticle', row.id)
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.artcile-container {
  .menus-bar {
    text-align: right;
    margin-bottom: 20px;
  }
  .pagination {
    padding-top: 40px;
    width: 100%;
    margin: 0 auto;
    .el-pagination {
      text-align: right;
      padding-right: 0px;
    }
  }
}
</style>
