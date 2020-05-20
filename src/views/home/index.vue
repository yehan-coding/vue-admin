<template>
  <div class="home-container">
    home
  </div>
</template>

<script>
import BarChart from '@/components/Echart/BarChart'
import PancakeChart from '@/components/Echart/PancakeChart'
import { list } from '@/api'

export default {
  name: 'Home',
  components: {
    BarChart,
    PancakeChart
  },
  data () {
    return {
      newsList: []
    }
  },
  methods: {
    getNews () {
      const req1 = list({pageSize: 1, pageNum: 1, title: "", date: [], type: "行业动态"})
      const req2 = list({pageSize: 1, pageNum: 1, title: "", date: [], type: "科技成果"})
      Promise.all([req1, req2]).then(res => {
        res.map(item => {
          this.newsList.push(item.data.list[0])
        })
      })
    }
  },
  created () {
    this.getNews()
  },
  filters: {
    formatDate (val) {
      return val.split(' ')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  background-color: #EFF1F4;
  .row-box {
    padding: 20px;
    .el-card {
      border: none;
      background: transparent;
      border-radius: 0;
      /deep/ .el-card__header {
        border-bottom: none;
      }
      &.person-count {
        /deep/ .el-card__body {
          padding: 0;
        }
        .el-row {
          .el-col {
            div {
              height: 110px;
              background-color: #fff;
              margin-bottom: 20px;
              text-align: center;
              p {
                margin: 0;
                &:first-child {
                  font-size: 48px;
                  line-height: 50px;
                  color: #303331;
                  padding-top: 20px;
                }
                &:last-child {
                  font-size: 14px;
                  line-height: 40px;
                  color: #606662;
                }
              }
            }
          }
        }
      }
      &.person-regist {
        /deep/ .el-card__body {
          padding: 0;
        }
        .chart-box {
          height: 240px;
          background-color: #fff;
          overflow: hidden;
          .bar {
            padding: 15px;
            width: 70%;
            display: inline-block;
          }
          .circle {
            padding: 15px;
            width: 29%;
            display: inline-block;
          }
        }
      }
      &.latest-project {
        /deep/ .el-card__body {
          padding: 0;
        }
        .project-con {
          height: 260px;
          background-color: #fff;
          padding: 15px;
          .left {
            height: 100%;
            position: relative;
            .el-image {
              width: 340px;
              height: 100%;
              display: inline-block;
              /deep/ .image-slot {
                font-size: 30px;
                width: 100%;
                height: 100%;
                background: #f5f7fa;
                color: #909399;
                position: relative;
                i {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
            .content {
              width: calc(100% - 400px);
              height: 100%;
              display: inline-block;
              position: absolute;
              right: 0;
              .title {
                font-size: 16px;
                color: #303331;
                clear: both;
                span {
                  float: right;
                  color: #909993;
                }
              }
              p {
                font-size: 14px;
                color: #909993;
                line-height: 1.5;
              }
            }
          }
          .right {
            height: 100%;
            .item {
              p {
                font-size: 14px;
                color: #303331;
                clear: both;
                span {
                  float: right;
                  color: #909993;
                }
              }
            }
          }
        }
      }
      &.industry-news {
        /deep/ .el-card__body {
          padding: 0;
        }
        .news-con {
          height: 260px;
          background-color: #fff;
          padding: 15px;
          position: relative;
          .el-image {
            width: 340px;
            height: 100%;
            display: inline-block;
            /deep/ .image-slot {
              font-size: 30px;
              width: 100%;
              height: 100%;
              background: #f5f7fa;
              color: #909399;
              position: relative;
              i {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
          .content {
            width: calc(100% - 380px);
            height: 100%;
            display: inline-block;
            position: absolute;
            right: 15px;
            .title {
              font-size: 16px;
              color: #303331;
              clear: both;
              span {
                float: right;
                color: #909993;
              }
            }
            p {
              font-size: 14px;
              color: #909993;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
}
</style>
