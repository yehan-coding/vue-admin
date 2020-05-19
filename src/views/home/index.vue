<template>
  <div class="home-container">
    <el-row class="row-box" :gutter="20">
      <el-col :span="8">
        <el-card class="box-card person-count" shadow="never">
          <div slot="header" class="clearfix">
            <span>人员统计</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                <p>10</p>
                <p>管理员</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <p>10</p>
                <p>团队成员</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <p>10</p>
                <p>专家</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <p>10</p>
                <p>企业用户</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <p>10</p>
                <p>政府用户</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <p>10</p>
                <p>普通用户</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card person-regist" shadow="never">
          <div slot="header" class="clearfix">
            <span>人员注册</span>
          </div>
          <div class="chart-box">
            <div class="bar">
              <bar-chart />
            </div>
            <div class="circle">
              <pancake-chart />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card latest-project" shadow="never">
          <div slot="header" class="clearfix">
            <span>最新项目</span>
          </div>
          <el-row class="project-con" :gutter="100">
            <el-col :span="12" class="left">
              <el-image>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="content">
                <div class="title">
                  标题
                  <span>2019-02-26</span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, pariatur autem rem cupiditate a dicta quisquam eum adipisci at quo facere, nisi consequuntur harum ipsam cumque recusandae corrupti eius? Provident?
                </p>
              </div>
            </el-col>
            <el-col :span="12" class="right">
              <div class="item">
                <p>
                  标题
                  <span>2019-02-26</span>
                </p>
              </div>
              <div class="item">
                <p>
                  标题
                  <span>2019-02-26</span>
                </p>
              </div>
              <div class="item">
                <p>
                  标题
                  <span>2019-02-26</span>
                </p>
              </div>
              <div class="item">
                <p>
                  标题
                  <span>2019-02-26</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card industry-news" shadow="never">
          <div slot="header" class="clearfix">
            <span>行业动态</span>
          </div>
          <div class="news-con">
            <el-image :src="$imgServer + newsList[0].image">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div class="content">
              <div class="title">
                {{ newsList[0].title }}
                <span>{{ newsList[0].ctime | formatDate }}</span>
              </div>
              <p>
                {{ newsList[0].about }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card industry-news" shadow="never">
          <div slot="header" class="clearfix">
            <span>科技成果</span>
          </div>
          <div class="news-con">
            <el-image :src="$imgServer + newsList[1].image">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div class="content">
              <div class="title">
                {{ newsList[1].title }}
                <span>{{ newsList[1].ctime | formatDate }}</span>
              </div>
              <p>
                {{ newsList[1].about }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
