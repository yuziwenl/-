<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">账号信息</template>
      </bread-crumb>
<el-form label-width="100px" ref='userForm' :model='formData' :rules="rules">
    <el-form-item prop="name" label="用户名称">
        <el-input v-model="formData.name" style="width:300px"></el-input>
    </el-form-item>
      <el-form-item label="用户简介">
        <el-input v-model="formData.intro" style="width:300px"></el-input>
    </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formData.email" style="width:300px"></el-input>
    </el-form-item>
      <el-form-item label="用户手机号">
        <el-input style="width:300px" v-model="formData.mobile" disabled=""></el-input>
    </el-form-item>
      <el-form-item >
         <el-button type="primary" @click='saveUserInfo'>保存信息</el-button>
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
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 2, max: 10, message: '用户名必须控制2-10个字符'
        }],
        email: [{ required: true, message: '邮箱不能为空'
        }, {
          pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确'
        }]
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
    },
    saveUserInfo () {
      this.$refs.userForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'patch',
            url: '/user/profile',
            data: this.formData
          }).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
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
