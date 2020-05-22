<template>
  <el-card class="box-card list-container">
    <el-form class="search-box" :model="research" size="small" ref="searchFrom">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="课题名称" prop="name">
            <el-input v-model="research.name" placeholder="请输入课题名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="课题类型" prop="type">
            <el-input v-model="research.type" placeholder="请输入课题类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="审核状态" prop="status">
            <el-select v-model="research.status" size="small" placeholder="请选择状态">
              <el-option v-for="item in statusList" :key="item.code" :label="item.label" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="getList" icon="el-icon-search">检索</el-button>
            <el-button type="primary" @click="toAdd" icon="el-icon-circle-plus-outline">创建</el-button>
            <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" style="width: 100%" v-loading="loading" border>
      <el-table-column type="index" label="编号" align="center" width="50"></el-table-column>
      <el-table-column prop="name" label="课题名称" align="center"></el-table-column>
      <el-table-column prop="type" label="课题类型" align="center"></el-table-column>
      <el-table-column prop="realname" label="发布人" align="center"></el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}
          <el-tooltip class="item" effect="dark" content="点击查看原因" placement="top">
            <font style="cursor: pointer;" v-if="scope.row.status == 1" @click="showReason(scope.row.content)"> {{ `(查看原因)` }}</font>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" :disabled="scope.row.status === 0 || scope.row.status === 2" @click="routerTo(`/research/update/${scope.row.id}`)">重新提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="audit-box" title="不通过原因" :visible.sync="reasonBox" width="30%" center>
      <el-input type="textarea" :autosize="{ minRows: 6, maxRows:8}" :value="reason" disabled></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="reasonBox = false">确 定</el-button>
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
import { my, delet, audit } from '@/api/research'
import pagination from '@/mixins/pagination'

export default {
  mixins: [pagination],
  data () {
    return {
      researchType: [
        { typeId: 0, type: '发布' },
        { typeId: 1, type: '草稿' }
      ],
      research: {
        name: '',
        type: '',
        status: ''
      },
      statusList: [
        { code: 0, label: '待审核' },
        { code: 1, label: '未通过' },
        { code: 2, label: '已审核' },
      ],
      reasonBox: false,
      reason: ''
    }
  },
  methods: {
    getList () {
      this.loading = true
      my({ pageSize: this.page.pageSize, pageNum: this.page.pageNum, ...this.research }).then(res => {
        this.page.total = res.data.totalRow
        this.list = res.data.list
        this.loading = false
      })
    },
    showReason (reason) {
      this.reasonBox = true
      this.reason = reason
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
    toAdd () {
      this.$router.push('/research/add')
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
