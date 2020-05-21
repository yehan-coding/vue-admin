<template>
  <el-card class="box-card list-container">
    <el-form class="form-box" :model="info" ref="info">
      <el-form-item label="" prop="avatar">
        <input type="hidden" v-model="info.avatar">
        <el-upload
          accept=""
          class="avatar-uploader"
          action=""
          :http-request="uploadImg"
          :show-file-list="false">
          <img v-if="info.avatar" :src="$imgServer + info.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="info.realname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select style="width: 100%;" v-model="info.sex" placeholder="请选择性别">
          <el-option label="男" :value="0"></el-option>
          <el-option label="女" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="info.phone"></el-input>
      </el-form-item>
      <el-form-item label="研究方向" prop="research_direction">
        <el-input v-model="info.research_direction"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="info.email"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="update">匹配</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      class="match-dialog"
      title=""
      :visible.sync="matchBox"
      width="40%"
      center>
      <el-dialog
        width="30%"
        title="请输入课题名称"
        :visible.sync="innerDialog"
        append-to-body>
        <el-input v-model="title"/>
        <div style="text-align: right;padding-top: 20px;">
          <el-button @click="confirm" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <div class="wrap" v-loading="loading">
        <el-row :gutter="20">
          <el-col v-for="item in teacherList" :key="item.name" :span="12" style="margin-bottom: 20px;">
            <div class="item" @click="openInnerDialog(item.user_id)">
              <el-avatar :src="$imgServer + item.avatar"></el-avatar>
              <p>
                <label>课题：</label>
                <span>{{ item.name }}</span>
              </p>
              <p>
                <label>类型：</label>
                <span>{{ item.type }}</span>
              </p>
              <p>
                <label>老师：</label>
                <span>{{ item.realname }}</span>
              </p>
            </div>
          </el-col>
        </el-row>
        <div style="text-align: center;">
          <el-button type="primary" @click="getTeacherList">换一批</el-button>
        </div>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { update, getTeacherList, confirmTopic } from '@/api/user'
import { uploadImg } from '@/api/file'

export default {
  data () {
    return {
      matchBox: false,
      teacherList: [],
      page: {
        pageSize: 4,
        pageNum: 1
      },
      loading: false,
      title: '',
      innerDialog: false,
      currentId: ''
    }
  },
  methods: {
    update () {
      update(this.info).then(res => {
        if (res.code === 200) {
          this.$store.commit('user/SET_INFO', res.data.user)
          this.page.pageNum = 1
          this.matchBox = true
          this.getTeacherList()
        }
      })
    },
    uploadImg (params) {
      const extName = params.file.name.split('.')[params.file.name.split('.').length - 1]
      if (extName !== 'jpg' && extName !== 'png') {
        this.$message({
          message: '请选择jpg、png文件上传',
          type: 'warning'
        })
        return false
      } else {
        const formData = new FormData()
        formData.append('file', params.file)
        uploadImg(formData).then(res => {
          if (res.code !== 200) {
            this.$message({
              message: '上传失败',
              type: 'warning'
            })
          } else {
            this.info.avatar = res.data.url
          }
        })
      }
    },
    openInnerDialog (id) {
      this.innerDialog = true
      this.currentId = id
    },
    getTeacherList () {
      this.loading = true
      getTeacherList({ pageSize: this.page.pageSize, pageNum: this.page.pageNum }).then(res => {
        this.loading = false
        if (res.data.list.length === 0 && this.page.pageNum === 1) {
          this.$message({
            message: '请填写正确的研究方向',
            type: 'warning'
          })
        } else if (res.data.list.length === 0 && this.page.pageNum > 1) {
          this.$message({
            message: '没有更多数据了！！',
            type: 'warning'
          })
        } else {
          this.teacherList = res.data.list
          this.page.pageNum ++
        }
      })
    },
    confirm () {
      confirmTopic({ name: this.title, id: this.currentId }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '提交成功！！',
            type: 'success'
          })
          this.innerDialog = false
          this.matchBox = false
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .list-container {
    margin: 20px;
    min-height: calc(100vh - 90px);
    .form-box {
      width: 500px;
      margin: auto;
    }
  }
  .avatar-uploader {
    text-align: center;
    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
  }
  .avatar {
    width: 98px;
    height: 98px;
    display: block;
  }
  .match-dialog {
    .wrap {
      min-height: 200px;
      .item {
        cursor: pointer;
        list-style: none;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 10px 10px 10px 80px;
        position: relative;
        .el-avatar {
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
        }
        p {
          clear: both;
          overflow: hidden;
          label {
            width: 42px;
            float: left;
          }
          span {
            width: calc(100% - 42px);
            float: left;
          }
        }
      }
    }
  }
</style>
