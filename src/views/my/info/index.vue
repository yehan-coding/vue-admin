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
      title=""
      :visible.sync="matchBox"
      width="30%"
      center>
      <div>
        <el-button @click="getTeacherList">换一批</el-button>
        <ul>
          <li v-for="item in teacherList" :key="item.name">
            <p>课题：{{ item.name }}</p>
            <p>类型：{{ item.type }}</p>
            <p>老师：{{ item.realname }}</p>
          </li>
        </ul>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { update, getTeacherList } from '@/api/user'
import { uploadImg } from '@/api/file'

export default {
  data () {
    return {
      matchBox: false,
      teacherList: [],
      page: {
        pageSize: 4,
        pageNum: 1
      }
    }
  },
  methods: {
    update () {
      update(this.info).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('user/SET_INFO', res.data.user)
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
    getTeacherList () {
      getTeacherList({ pageSize: this.page.pageSize, pageNum: this.page.pageNum }).then(res => {
        if (res.data.list.length === 0) {
          this.$message({
            message: '请填写正确的研究方向',
            type: 'warning'
          })
        } else {
          this.teacherList = res.data.list
          this.page.pageNum ++
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
</style>
