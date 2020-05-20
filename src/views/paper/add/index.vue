<template>
  <el-card class="box-card add-container">
    <div slot="header" class="clearfix">
      <el-page-header @back="$router.go(-1)" :content="$route.meta.title"></el-page-header>
    </div>
    <el-form ref="paper" :rules="formRule" :model="paper" label-width="50px" label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="paper.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="url">
        <input type="hidden" v-model="paper.url">
        <el-upload
          accept=""
          class="avatar-uploader"
          action=""
          :http-request="uploadImg"
          :show-file-list="false">
          <img v-if="paper.url" :src="$imgServer + paper.url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor v-model="paper.content" :image-server="$imgServer + '/upload/updateImg'"></editor>
      </el-form-item>
      <el-form-item>
        <template v-if="!$route.meta.isUpdate">
          <el-button type="primary" size="small" @click="addArticle">发布</el-button>
          <el-button size="small" @click="resetForm">取消</el-button>
        </template>
        <template v-else>
          <el-button type="primary" size="small" @click="updatePaper">更新</el-button>
          <el-button size="small" @click="resetForm" v-if="!$route.meta.isUpdate">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { add, detail, update } from '@/api/paper'
import { uploadImg } from '@/api/file'
import editor from '@/components/editor'

export default {
  components: {
    editor
  },
  data() {
    return {
      noticeType: [
        { typeId: 0, type: '发布' },
        { typeId: 1, type: '草稿' }
      ],
      paper: {
        title: '',
        content: '',
        url: ''
      },
      formRule: {
        title: [
          { required: true, message: '标题不能为空' }
        ],
        content: [
          { required: true, message: '内容不能为空' }
        ],
        url: [
          { required: true, message: '请上传图片' }
        ]
      }
    }
  },
  methods: {
    addArticle () {
      this.$refs.paper.validate((valid) => {
        if (valid) {
          add(this.paper).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.go(-1)
            }
          })
        } else {
          return false
        }
      })
    },
    updatePaper () {
      this.$refs.paper.validate((valid) => {
        if (valid) {
          let send = {
            id: this.paper.id,
            title: this.paper.title,
            content: this.paper.content,
            url: this.paper.url
          }
          update(send).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.go(-1)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs.paper.resetFields()
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
            this.paper.url = res.data.url
          }
        })
      }
    },
    getDetail (id) {
      detail({ id: id }).then(res => {
        if (res.code === 200) {
          this.paper = res.data
        }
      })
    }
  },
  created () {
    if (this.$route.meta.isUpdate) {
      this.getDetail(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-container {
    margin: 20px;
    min-height: calc(100vh - 90px);
    .el-pagination {
      margin-top: 1rem;
      text-align: center;
    }
    .el-form-item {
      /deep/ .el-radio-group {
        .el-radio {
          display: block;
          margin-bottom: 15px;
        }
      }
    }
  }
  .avatar-uploader {
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
    width: 132px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 132px;
    height: 78px;
    display: block;
  }
  .markdown-editor {
    min-height: 660px;
  }
</style>
