<template>
  <el-card class="box-card list-container">
    <el-form class="form-box" :model="person" ref="info">
      <el-form-item label="" prop="avatar">
        <input type="hidden" v-model="person.avatar">
        <el-upload
          accept=""
          class="avatar-uploader"
          action=""
          :http-request="uploadImg"
          :show-file-list="false">
          <img v-if="person.avatar" :src="$imgServer + person.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="person.realname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select style="width: 100%;" v-model="person.sex" placeholder="请选择性别">
          <el-option label="男" :value="0"></el-option>
          <el-option label="女" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="person.phone"></el-input>
      </el-form-item>
      <el-form-item label="研究方向" prop="research_direction">
        <el-input v-model="person.research_direction"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="person.email"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="update">更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { detail, update } from '@/api/person'
import { uploadImg } from '@/api/file'

export default {
  data () {
    return {
      person: {}
    }
  },
  methods: {
    getDetail() {
      detail({ id: this.$route.params.id }).then(res => {
        this.person = res.data
      })
    },
    update () {
      update(this.person).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
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
            this.person.avatar = res.data.url
          }
        })
      }
    },
  },
  created () {
    this.getDetail()
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
