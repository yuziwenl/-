<template>
<el-container>
  <el-aside :style="{width}" style='background-color:#323745;min-height:100vh'>
    <layout-aside></layout-aside>
  </el-aside>
  <el-container>
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <el-main style="padding:0">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import eventBus from '../../../utils/eventBus'
export default {
  data () {
    return {
      width: '200px'
    }
  },
  created () {
    eventBus.$on('collapseOrclose', () => {
      this.width = this.width === '200px' ? '60px' : '200px'
    })
  }
}
</script>
<style lang="less" scoped>

</style>
