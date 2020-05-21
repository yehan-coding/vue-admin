<template>
  <el-card class="box-card list-container">
    <el-form class="search-box" :model="search" size="small" ref="searchFrom">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="学生姓名" prop="name">
            <el-input v-model="search.name" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="getList" icon="el-icon-search">检索</el-button>
            <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" style="width: 100%" v-loading="loading" border>
      <el-table-column type="index" label="编号" align="center" width="50"></el-table-column>
      <el-table-column prop="name" label="标题" align="center"></el-table-column>
      <el-table-column prop="teachername" label="老师" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" :formatter="getStatus"></el-table-column>
      <el-table-column prop="time" label="时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" :disabled="scope.row.status !== 2" v-permission="['student']" @click="routerTo('/paper/add/')">撰写论文</el-button>
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
import { mySelectList } from '@/api/user'
import pagination from '@/mixins/pagination'
import permission from '@/directive/permission/index.js'

export default {
  directives: { permission },
  mixins: [pagination],
  data () {
    return {
      search: {
        name: '',
      },
      statusList: [
        { code: 0, label: '待审核' },
        { code: 1, label: '未通过' },
        { code: 2, label: '已审核' },
      ]
    }
  },
  methods: {
    getList () {
      this.loading = true
      mySelectList({ pageSize: this.page.pageSize, pageNum: this.page.pageNum, ...this.search }).then(res => {
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
      let typeArr = ['待审核', '未通过', '已审核']
      return typeArr[cellValue]
    },
    resetSearch () {
      this.search = {
        name: ''
      }
      this.getList()
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
