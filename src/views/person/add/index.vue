<template>
  <el-card class="box-card list-container">
    <el-form class="form-box" :model="person" ref="info">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="person.username"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="person.phone"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="addHandle">确定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { add } from '@/api/person'

export default {
  data () {
    return {
      person: {}
    }
  },
  methods: {
    addHandle() {
      add(this.person).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.person = {}
        }
      })
    }
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
