<template>
  <el-card class="box-card add-container">
    <div slot="header" class="clearfix">
      <el-page-header @back="$router.go(-1)" :content="$route.meta.title"></el-page-header>
    </div>
    <el-form ref="topic" :rules="formRule" :model="topic" label-width="50px" label-position="top">
      <el-form-item label="课题" prop="name">
        <el-input v-model="topic.name"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="topic.type"></el-input>
      </el-form-item>
      <el-form-item>
        <template v-if="!$route.meta.isUpdate">
          <el-button type="primary" size="small" @click="addTopic">发布</el-button>
          <el-button size="small" @click="resetForm">取消</el-button>
        </template>
        <template v-else>
          <el-button type="primary" size="small" @click="updateTopic">提交</el-button>
          <el-button size="small" @click="resetForm" v-if="!$route.meta.isUpdate">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { add, detail, update } from '@/api/research'

export default {
  data() {
    return {
      topic: {
        name: '',
        type: ''
      },
      formRule: {
        name: [
          { required: true, message: '课题不能为空' }
        ],
        type: [
          { required: true, message: '类型不能为空' }
        ]
      }
    }
  },
  methods: {
    addTopic () {
      this.$refs.topic.validate((valid) => {
        if (valid) {
          add(this.topic).then(res => {
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
    updateTopic () {
      this.$refs.topic.validate((valid) => {
        if (valid) {
          let send = {
            id: this.topic.id,
            name: this.topic.name,
            type: this.topic.type
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
      this.$refs.topic.resetFields()
    },
    getDetail (id) {
      detail({ id: id }).then(res => {
        if (res.code === 200) {
          this.topic = res.data
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
