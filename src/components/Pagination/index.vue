<template>
  <div class="pagination-container">
    <el-pagination
      style="text-align:right;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @next-click="nextPage"
      @prev-click="lastPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Object,
      default: function() {
        return {
          currentPage: 0,
          pageSize: 0,
          total: 0
        }
      }
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [15, 50, 100]
      }
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit('changePage', {  currentPage: this.page.currentPage, pageSize: pageSize })
    },
    handleCurrentChange(currentPage) {
      this.$emit('changePage', {  currentPage: currentPage, pageSize: this.page.pageSize })
    },
    lastPage() {
      this.page.currentPage --
      this.$emit('changePage', { currentPage: this.page.currentPage, pageSize: this.page.pageSize })
    },
    nextPage() {
      this.page.currentPage ++ 
      this.$emit('changePage', { currentPage: this.page.currentPage, pageSize: this.page.pageSize })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container{
  height: 60px;
  position: relative;
  .el-pagination{
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translateY(-50%);
  }
}
</style>
