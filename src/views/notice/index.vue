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
            <el-button type="primary" @click="toAdd" icon="el-icon-circle-plus-outline">创建</el-button>
            <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" style="width: 100%" v-loading="loading" border>
      <el-table-column type="index" label="编号" align="center" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="content" label="内容" align="center"></el-table-column>
      <el-table-column prop="TIME" label="发布时间" align="center" :formatter="getDate"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="routerTo(`/notice/update/${scope.row.id}`)">编辑</el-button>
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
import { list, delet } from '@/api/notice'
import pagination from '@/mixins/pagination'

export default {
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
      let typeArr = ['行业动态']
      return typeArr[cellValue]
    },
    getDate (row, column, cellValue, index) {
      return cellValue.split(' ')[0]
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
