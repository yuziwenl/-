<template>
  <div class="layout-aside">
    <div class="title">
      <img :src="collapse?smallImg:bigImg" :style="{width:collapse?'30px':'120px'}" alt="">
    </div>
    <el-menu
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      :collapse="collapse"
      :collapse-transition="false"
      :router='true'>
<el-menu-item index='/home'>首页</el-menu-item>
<el-submenu index='1'>
  <template slot='title'>
      <span >内容管理</span>
  </template>
  <el-menu-item index='/home/publish'>发布文章</el-menu-item>
  <el-menu-item index='/home/content'>内容列表</el-menu-item>
  <el-menu-item index='/home/material'>素材管理</el-menu-item>
  <el-menu-item index='/home/comment'>评论列表</el-menu-item>
</el-submenu>
<el-submenu index='fans'>
   <template slot='title'>
      <span >粉丝管理</span>
  </template>
   <el-menu-item index='/home/fansdata'>图文数据</el-menu-item>
  <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
  <el-menu-item index='/home/fansimg'>粉丝画像</el-menu-item>
  <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
</el-submenu>
<el-menu-item index='/home/account'>
  <span>账户信息</span>
</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import eventBus from '../../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false,
      bigImg: require('@/assets/img/logo_admin.png'),
      smallImg: require('@/assets/img/toutiao.png')
    }
  },
  created () {
    eventBus.$on('collapseOrclose', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang='less' scoped>
.layout-aside{
  .title{
    padding:15px 0;
    text-align: center;
    background-color: #2e2f32;
    img{
      width:120px;
      height:30px;
    }
  }
}

</style>
