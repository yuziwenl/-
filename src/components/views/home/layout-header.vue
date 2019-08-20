<template>
  <el-row style='padding:12px 0' type="flex" justify="space-between">
    <el-col :span="18" style='display:flex;align-items:center'>
      <i style='font-size:20px;margin-right:4px' class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育有限股份公司</span>
    </el-col>
    <el-col :span="3" style="display">
        <img style='width:40px;height:40px;border-radius:50%;margin-right:10px;align-items:center' src="@/assets/img/avatar.jpg" alt="">
         <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        我是56<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >个人信息</el-dropdown-item>
        <el-dropdown-item >git地址</el-dropdown-item>
        <el-dropdown-item >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style>
</style>
