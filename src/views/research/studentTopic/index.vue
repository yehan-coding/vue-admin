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
      <el-table-column prop="name" label="论文名称" align="center"></el-table-column>
      <el-table-column prop="studentname" label="学生" align="center"></el-table-column>
      <el-table-column prop="time" label="时间" align="center"></el-table-column>
      <el-table-column label="审核" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" :disabled="scope.row.status === 1 || scope.row.status === 2" @click="audit(scope.row.id, 2)">通过</el-button>
          <el-button size="mini" type="danger" :disabled="scope.row.status === 1 || scope.row.status === 2" @click="openDialog(scope.row.id, 1)">不通过</el-button>
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
    <el-dialog
      title="不通过原因"
      :visible.sync="dialogShow"
      width="30%"
      center>
      <div>
        <el-input style="margin-top: 10px;" v-model="reason" placeholder="请输入审核不通过原因"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="audit(currentId, paramsFlag)">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { studentTopicList, paperAudit } from '@/api/research'
import pagination from '@/mixins/pagination'

export default {
  mixins: [pagination],
  data () {
    return {
      researchType: [
        { typeId: 0, type: '发布' },
        { typeId: 1, type: '草稿' }
      ],
      search: {
        name: '',
      },
      statusList: [
        { code: 0, label: '待审核' },
        { code: 1, label: '未通过' },
        { code: 2, label: '已审核' },
      ],
      dialogShow: false,
      reason: '',
      currentId: '',
      paramsFlag: ''
    }
  },
  methods: {
    getList () {
      this.loading = true
      studentTopicList({ pageSize: this.page.pageSize, pageNum: this.page.pageNum, ...this.search }).then(res => {
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
    audit (id, flag) {
      let send = flag === 1 ? { id: id, status: flag, context: this.reason } : { id: id, status: flag, }
      paperAudit(send).then(res => {
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
    openDialog (id, flag) {
      this.dialogShow = true
      this.currentId = id
      this.paramsFlag = flag
    },
    cancelDialog () {
      this.dialogShow = false
      this.currentId = ''
      this.paramsFlag = ''
      this.reason = ''
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
