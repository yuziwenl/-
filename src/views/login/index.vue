<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form :model='formData' :rules='rules' ref='loginForm'>
              <el-form-item prop='mobile'>
                  <el-input v-model='formData.mobile' placeholder='请输入手机号'></el-input>
              </el-form-item>
              <el-form-item prop='code'>
                  <el-input  v-model='formData.code' style='width:67%' placeholder='请输入验证码'></el-input>
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
            <el-form-item prop='check'>
                <el-checkbox  v-model='formData.check' >我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button @click='login' type='primary' style='width:100%'>登录</el-button>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var func = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('您必须同意协议'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '登录手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码必须为6位数字' }
        ],
        check: [{
        //   message: '您必须无条件被坑',
          validator: func
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          }).then(result => {
            // console.log(result.data.data)
            window.localStorage.setItem('user-info', JSON.stringify(result.data.data))
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
    width:100%;
    height:100vh;
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-card{
        width: 420px;
        height:360px;
        .title {
            text-align: center;
            margin-bottom: 30px;
            img {
                width: 200px;
                height: 45px;
            }
        }
    }
}
</style>
