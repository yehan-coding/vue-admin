<template>
  <el-card class="box-card list-container">
    <el-form class="search-box" :model="research" size="small" ref="searchFrom">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="课题名称" prop="name">
            <el-input v-model="research.name" placeholder="请输入课题名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="getList" icon="el-icon-search">检索</el-button>
            <el-button type="primary" @click="routerTo('/person/add/')" icon="el-icon-circle-plus-outline">添加老师</el-button>
            <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" style="width: 100%" v-loading="loading" border>
      <el-table-column type="index" label="编号" align="center" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
      <el-table-column prop="role_id" label="角色" align="center" :formatter="getRole"></el-table-column>
      <el-table-column prop="research_direction" label="研究方向" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" :formatter="getSex"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column label="审核" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="routerTo(`/person/detail/${scope.row.user_id}`)">查看</el-button>
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
import { list } from '@/api/person'
import pagination from '@/mixins/pagination'

export default {
  mixins: [pagination],
  data () {
    return {
      research: {
        name: ''
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
      list({ pageSize: this.page.pageSize, pageNum: this.page.pageNum, ...this.research }).then(res => {
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
    getSex (row, column, cellValue, index) {
      let typeArr = ['男', '女']
      return typeArr[cellValue]
    },
    getRole (row, column, cellValue, index) {
      let typeArr = ['', '管理员', '老师', '学生']
      return typeArr[cellValue]
    },
    audit (id, flag) {
      let send = flag === 1 ? { id: id, status: flag, content: this.reason } : { id: id, status: flag, }
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
    resetSearch () {
      this.research = {
        name: '',
        status: '',
        type: ''
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
