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
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}
          <el-tooltip class="item" effect="dark" content="点击查看原因" placement="top">
            <font style="cursor: pointer;" v-if="scope.row.status == 1" @click="showReason(scope.row.context)"> {{ `(查看原因)` }}</font>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" :disabled="scope.row.status !== 1" v-permission="['student']" @click="openUpdateBox(scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" :disabled="scope.row.status !== 2" v-permission="['student']" @click="routerTo('/paper/add/')">撰写论文</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="audit-box" title="不通过原因" :visible.sync="reasonBox" width="30%" center>
      <el-input type="textarea" :autosize="{ minRows: 6, maxRows:8}" :value="reason" disabled></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="reasonBox = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="audit-box" title="修改" :visible.sync="showUpdateBox" width="30%" center>
      <el-input type="textarea" :autosize="{ minRows: 6, maxRows:8}" v-model="currentName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </span>
    </el-dialog>
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
import { updateTopic } from '@/api/paper'
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
      ],
      reasonBox: false,
      reason: '',
      showUpdateBox: false,
      currentName: '',
      currentId: ''
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
    showReason (reason) {
      this.reasonBox = true
      this.reason = reason
    },
    openUpdateBox (row) {
      this.showUpdateBox = true
      this.currentName = row.name
      this.currentId = row.id
    },
    confirmUpdate () {
      updateTopic({ id: this.currentId, name: this.currentName }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.showUpdateBox = false
          this.currentName = ''
          this.currentId = ''
          this.getList()
        }
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
    resetSearch () {
      this.search = {
        name: ''
      }
      this.getList()
    }
  },
  computed: {
    getStatus () {
      return (status) => {
        let typeArr = ['待审核', '未通过', '已审核']
        return typeArr[status]
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
