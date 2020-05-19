export default {
  data () {
    return {
      list: [],
      loading: false,
      page: {
        pageNum: 1,
        pageSize: 15,
        total: 0,
      },
      multipleSelection: []
    }
  },
  methods: {
    changePage (page) {
      this.page.pageNum = page
      this.getList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    routerTo (path, params) {
      this.$router.push({
        path: path,
        query: params ? params : {}
      })
    }
  },
  created () {
    this.getList()
  }
}