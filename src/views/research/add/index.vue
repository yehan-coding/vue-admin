<template>
  <el-card class="box-card add-container">
    <div slot="header" class="clearfix">
      <el-page-header @back="$router.go(-1)" :content="$route.meta.title"></el-page-header>
    </div>
    <el-form ref="notice" :rules="formRule" :model="notice" label-width="50px" label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="notice.title"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="notice.type" size="small" placeholder="请选择文章类型">
          <el-option v-for="item in noticeType" :key="item.typeId" :label="item.type" :value="item.typeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor v-model="notice.content" :image-server="$imgServer + '/update/uploadByteam'"></editor>
      </el-form-item>
      <el-form-item>
        <template v-if="!$route.meta.isUpdate">
          <el-button type="primary" size="small" @click="addArticle">发布</el-button>
          <el-button size="small" @click="resetForm">取消</el-button>
        </template>
        <template v-else>
          <el-button type="primary" size="small" @click="updateArticle">更新</el-button>
          <el-button size="small" @click="resetForm" v-if="!$route.meta.isUpdate">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { add, detail, update } from '@/api/notice'
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
      notice: {
        title: '',
        content: '',
        type: 0
      },
      formRule: {
        title: [
          { required: true, message: '标题不能为空' }
        ],
        content: [
          { required: true, message: '内容不能为空' }
        ],
        type: [
          { required: true, message: '请选择类型' }
        ]
      }
    }
  },
  methods: {
    addArticle () {
      this.$refs.notice.validate((valid) => {
        if (valid) {
          add(this.notice).then(res => {
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
    updateArticle () {
      this.$refs.notice.validate((valid) => {
        if (valid) {
          let send = {
            id: this.notice.id,
            title: this.notice.title,
            content: this.notice.content,
            type: this.notice.type
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
      this.$refs.notice.resetFields()
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
            this.article.image = res.url
          }
        })
      }
    },
    getDetail (id) {
      detail({ id: id }).then(res => {
        if (res.code === 200) {
          this.notice = res.data
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
