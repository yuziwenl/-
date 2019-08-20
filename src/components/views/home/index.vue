<template>
<el-container>
  <el-aside style="width:200px;background-color:#323745;height:100vh">
    <layout-aside></layout-aside>
  </el-aside>
  <el-container>
    <el-header>头部区域</el-header>
    <el-main>中间区域</el-main>
  </el-container>
</el-container>
</template>

<script>
import layoutAside from '@/components/views/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>
<style lang="less" scoped>

</style>
