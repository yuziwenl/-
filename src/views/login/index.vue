<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form>
              <el-form-item>
                  <el-input placeholder='请输入手机号'></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input style='width:67%' placeholder='请输入验证码'></el-input>
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
            <el-form-item>
                <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' style='width:100%'>登录</el-button>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
