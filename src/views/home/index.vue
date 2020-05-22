<template>
  <el-card class="box-card list-container">
    <el-row class="row-box" :gutter="20">
      <el-col :span="8">
        <el-card class="box-card person-count" shadow="never">
          <div slot="header" class="clearfix">
            <span>人员统计</span>
          </div>
          <div class="person-wrap">
            <div class="item">
              <p>{{ userCount.admin }}</p>
              <p>管理员</p>
            </div>
            <div class="item">
              <p>{{ userCount.teacher }}</p>
              <p>老师</p>
            </div>
            <div class="item">
              <p>{{ userCount.student }}</p>
              <p>学生</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card person-regist" shadow="never">
          <div slot="header" class="clearfix">
            <span>最新公告</span>
          </div>
          <div class="board-card" v-html="notice.content"></div>
        </el-card>
      </el-col>
      <el-col :span="24" style="padding-left: 30px;padding-right: 30px;">
        <el-carousel indicator-position="none" class="swiper" height="600px">
          <el-carousel-item v-for="item in swiperList" :key="item.id">
            <img style="width: 100%;height: 100%;" :src="$imgServer + item.image">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { countUser, firstNotice, getSwiperList } from '@/api'

export default {
  name: 'Home',
  data () {
    return {
      userCount: {},
      notice: {},
      swiperList: []
    }
  },
  methods: {
    getCountData () {
      countUser().then(res => {
        this.userCount = res.data
      })
    },
    getFirstNotice () {
      firstNotice().then(res => {
        this.notice = res.data
      })
    },
    getSwiperList () {
      getSwiperList().then(res => {
        this.swiperList = res.data.list
      })
    }
  },
  created () {
    this.getCountData()
    this.getFirstNotice()
    this.getSwiperList()
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  margin: 20px;
  min-height: calc(100vh - 90px);
  .row-box {
    .el-card {
      border: none;
      background: transparent;
      border-radius: 0;
      /deep/ .el-card__header {
        border-bottom: none;
      }
      &.person-count {
        .person-wrap {
          display: flex;
          justify-content: space-around;
          align-items: center;
          .item {
            width: 30%;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            height: 150px;
            background-color: #fff;
            text-align: center;
            p {
              margin: 0;
              &:first-child {
                font-size: 48px;
                line-height: 70px;
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
      &.person-regist {
        .board-card {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          padding: 10px;
          height: 150px;
          overflow-y: scroll;
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
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
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
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
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
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
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
