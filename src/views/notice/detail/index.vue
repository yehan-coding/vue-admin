<template>
  <el-card class="box-card detail-container">
    <div slot="header" class="clearfix">
      <el-page-header @back="$router.go(-1)" :content="$route.meta.title"></el-page-header>
    </div>
    <div class="content">
      <h3>{{ article.title }}</h3>
      <div class="author">
        <span>作者：{{ article.name }}</span>
        <span>发布时间：{{ article.ctime }}</span>
      </div>
      <div class="context" v-html="article.content"></div>
    </div>
  </el-card>
</template>

<script>
import { detail } from '@/api/notice'

export default {
  data () {
    return {
      article: {}
    }
  },
  methods: {
    getDetail (id) {
      detail({ id: id }).then(res => {
        if (res.code === 200) {
          this.article = res.data
        }
      })
    }
  },
  created () {
    this.getDetail(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    margin: 20px;
    min-height: calc(100vh - 90px);
    .content {
      h3 {
        text-align: center;
      }
      .author {
        text-align: center;
        font-size: .875rem;
        margin: 1.5rem auto;
        span {
          margin: 0 30px;
        }
      }
      .context {
        font-size: 1rem;
        line-height: 1.5;
      }
    }
  }
</style>
