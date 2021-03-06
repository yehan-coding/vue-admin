<template>
  <el-card class="box-card list-container">
    <el-form class="search-box" :model="searchForm" size="small" ref="searchFrom">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="文章名称" prop="title">
            <el-input v-model="searchForm.title" placeholder="请输入文章名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="searchForm.type" size="small" placeholder="请选择文章类型">
              <el-option v-for="item in articleType" :key="item.typeId" :label="item.type" :value="item.typeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="getList" icon="el-icon-search">检索</el-button>
            <el-button type="primary" @click="toAdd" icon="el-icon-circle-plus-outline" v-permission="['admin']">创建</el-button>
            <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" style="width: 100%" v-loading="loading" border>
      <el-table-column type="index" label="编号" align="center" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column label="内容" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.content | htmlToTxt }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center" :formatter="getType"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" :formatter="getStatus"></el-table-column>
      <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
      <el-table-column prop="ytime" label="浏览时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="routerTo(`/notice/detail/${scope.row.id}`)" v-permission="['teacher', 'student']">查看</el-button>
          <el-button size="mini" type="primary" @click="routerTo(`/notice/update/${scope.row.id}`)" v-permission="['admin']">编辑</el-button>
          <el-button size="mini" type="danger" @click="delet(scope.row.id)" v-permission="['admin']">删除</el-button>
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
import { list, delet } from '@/api/notice'
import pagination from '@/mixins/pagination'
import permission from '@/directive/permission/index.js'

export default {
  directives: { permission },
  mixins: [pagination],
  data () {
    return {
      articleType: [
        { typeId: 0, type: '发布' },
        { typeId: 1, type: '草稿' }
      ],
      searchForm: {
        title: '',
        type: 0
      }
    }
  },
  methods: {
    getList () {
      this.loading = true
      list({ pageSize: this.page.pageSize, pageNum: this.page.pageNum, ...this.searchForm }).then(res => {
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
    getType (row, column, cellValue, index) {
      let typeArr = ['发布', '草稿']
      return typeArr[cellValue]
    },
    getStatus (row, column, cellValue, index) {
      let typeArr = ['已读', '未读']
      return typeArr[cellValue]
    },
    toAdd () {
      this.$router.push('/notice/add')
    },
    resetSearch () {
      this.searchForm = {
        title: '',
        date: [],
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
