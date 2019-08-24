<template>
 <el-card>
   <bread-crumb slot='header'>
   <template slot="title">
     内容列表
   </template>
   </bread-crumb>
  <el-form style="margin-left:40px">
    <el-form-item label="文章状态">
       <el-radio-group v-model="radio">
    <el-radio :label="1">全部</el-radio>
    <el-radio :label="2">草稿</el-radio>
    <el-radio :label="3">待审核</el-radio>
     <el-radio :label="4">审核成功</el-radio>
      <el-radio :label="5">审核失败</el-radio>
  </el-radio-group>
    </el-form-item>
    <el-form-item label="频道列表">
         <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="时间选择">
        <el-date-picker
      v-model="value1"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </el-form-item>
  </el-form>
  <div class="total_title">共找到{{page.total}}条符合条件的内容</div>
  <div class="content-list ">
    <div class="content-item" v-for=" (item,index) in list" :key="index">
      <div class="left">
        <img :src="item.cover.images[0]" alt="">
        <div class="info">
          <span>{{item.title}}</span>
          <el-tag style="width:60px;" :type="item.status|statusType">{{item.status |statusText }}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span>
          <i class="el-icon-edit">修改 </i>
        </span>
          <span>
          <i class="el-icon-delete">删除</i>
        </span>
      </div>
    </div>
  </div>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 3,
      value: '',
      value1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      list: [],
      page: {
        total: 0
      }
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    this.getArticles()
  } }
</script>

<style lang='less' scoped>
.total_title{
  height:60px;
  line-height: 60px;
  border-bottom:1px dotted #ccc;
}
.content-list{
  .content-item{
    display: flex;
    border-bottom: 1px solid #f2f3f5;
    padding: 10px;
    justify-content: space-between;
    .left{
      display: flex;
      align-items:center;
      img{
        width: 150px;
        height: 100px;
        border-radius: 4px;
      }
      .info{
        margin-left: 10px;
        display: flex;
        height: 100px;
        padding:5px 0;
        flex-direction: column;
        justify-content: space-between;
        .date{
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right{
      span,span i{
        font-size:12px;
        color:#333;
      }
      span{
        margin-right:6px;
      }
    }
  }
}
</style>
