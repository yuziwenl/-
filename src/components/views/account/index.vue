<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">账号信息</template>
      </bread-crumb>
<el-form label-width="100px">
    <el-form-item label="用户名称">
        <el-input v-model="formData.name" style="width:300px"></el-input>
    </el-form-item>
      <el-form-item label="用户简介">
        <el-input v-model="formData.intro" style="width:300px"></el-input>
    </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="formData.email" style="width:300px"></el-input>
    </el-form-item>
      <el-form-item label="用户手机号">
        <el-input style="width:300px" v-model="formData.mobile" disabled=""></el-input>
    </el-form-item>
      <el-form-item >
         <el-button type="primary">保存信息</el-button>
    </el-form-item>
    </el-form>
    <img class="head-img" :src="formData.photo?formData.photo:imgUrl" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      imgUrl: require('../../../assets/img/404.png'),
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: 'user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.head-img{
  position: absolute;
  left:500px;
  top:65px;
  height:250px;
  width: 250px;
  border-radius: 50%
}
</style>
