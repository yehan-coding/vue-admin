<template>
  <el-card class="box-card list-container">
    <el-form class="search-box" size="small">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item>
            <el-upload
              class="upload-demo"
              action=""
              :http-request="uploadImg"
              :show-file-list="false">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" style="width: 100%" v-loading="loading" border>
      <el-table-column type="index" label="编号" align="center" width="50"></el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 150px; height: 100px"
            :src="$imgServer + scope.row.image"
            fit="scale-down"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" :formatter="getStatus"></el-table-column>
      <el-table-column label="审核" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="audit(scope.row.id, 0)">展示</el-button>
          <el-button size="mini" type="primary" @click="audit(scope.row.id, 1)">隐藏</el-button>
          <el-button size="mini" type="danger" @click="delet(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        background
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        :total="page.total"
        @next-click="changePage"
        @prev-click="changePage"
        @current-change="changePage">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { list, audit, delet, upload } from '@/api/swiper'
import pagination from '@/mixins/pagination'

export default {
  mixins: [pagination],
  data () {
    return {
      swiperList: []
    }
  },
  methods: {
    getList () {
      this.loading = true
      list({ pageSize: this.page.pageSize, pageNum: this.page.pageNum }).then(res => {
        this.page.total = res.data.totalRow
        this.list = res.data.list
        this.loading = false
      })
    },
    delet (id) {
      delet({ id: id }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    getStatus (row, column, cellValue, index) {
      let typeArr = ['展示', '隐藏']
      return typeArr[cellValue]
    },
    audit (id, flag) {
      let send = { id: id, status: flag }
      audit(send).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '审核完成',
            type: 'success'
          })
          this.getList()
          this.dialogShow ? this.dialogShow = false : ''
        }
      })
    },
    uploadImg (params) {
      const extName = params.file.name.split('.')[params.file.name.split('.').length - 1]
      if (extName !== 'jpg' && extName !== 'png') {
        this.$message({
          message: '请选择jpg、png文件上传',
          type: 'warning'
        })
        return false
      } else {
        const formData = new FormData()
        formData.append('file', params.file)
        upload(formData).then(res => {
          if (res.code !== 200) {
            this.$message({
              message: '上传失败',
              type: 'warning'
            })
          } else {
            this.getList()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-container {
    margin: 20px;
    min-height: calc(100vh - 90px);
    .search-box {
      .el-input {
        width: auto;
      }
    }
    .el-pagination {
      margin-top: 1rem;
      text-align: center;
    }
  }
</style>
