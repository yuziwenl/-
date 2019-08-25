<template>
<!-- 上面 -->
 <el-card>
   <bread-crumb slot='header'>
   <template slot="title">
     内容列表
   </template>
   </bread-crumb>
  <el-form style="margin-left:40px">
    <el-form-item label="文章状态">
       <el-radio-group v-model="formData.status" @change='getChange'>
    <el-radio :label="5">全部</el-radio>
    <el-radio :label="0">草稿</el-radio>
    <el-radio :label="1">待审核</el-radio>
     <el-radio :label="2">审核成功</el-radio>
      <el-radio :label="3">审核失败</el-radio>
  </el-radio-group>
    </el-form-item>
    <el-form-item label="频道列表">
         <el-select v-model="channel_id" placeholder="请选择" @change='getChange'>
    <el-option

      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="时间选择">
        <el-date-picker
         @change='getChange'
        value-format='yyyy-MM-dd'
      v-model="dateChange"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </el-form-item>
  </el-form>
  <!-- 下面 -->
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
        <span style='cursor:pointer'>
          <i class="el-icon-edit" @click="goEdit(item)">修改 </i>
        </span>
          <span style='cursor:pointer'>
          <i class="el-icon-delete"  @click="delItem(item)" >删除</i>
        </span>
      </div>
    </div>
  </div>
  <el-row type="flex" justify="center" style='margin:20px 0'>
      <el-pagination @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>
    </el-row>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      channel_id: null,
      dateChange: null,
      formData: {
        status: 5
      },
      channels: [],
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    goEdit (item) {
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    delItem (item) {
      this.$confirm('你是否要删除').then(() => {
        this.$axios({
          methods: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then(result => {
          this.getArticles()
        })
      })
    },
    // box () {
    //   let params = {
    //     status: this.formData.status === 5 ? null : this.formData.status,
    //     channel_id: this.value,
    //     begin_pubdate: this.value1 && this.value1.length ? this.value1[0] : null,
    //     end_pubdate: this.value1 && this.value1.length > 1 ? this.value1[1] : null,
    //     page: this.page.currentPage,
    //     per_page: this.page.pageSize
    //   }
    //   return params
    // },
    changePage (newpage) {
      this.page.currentPage = newpage
      // this.$axios({
      //   url: '/articles',
      //   params: {
      //     status: this.formData.status === 5 ? null : this.formData.status,
      //     channel_id: this.value,
      //     begin_pubdate: this.value1 && this.value1.length ? this.value1[0] : null,
      //     end_pubdate: this.value1 && this.value1.length > 1 ? this.value1[1] : null,
      //     page: this.page.currentPage,
      //     per_page: this.page.pageSize
      //   }
      // }).then(result => {
      //   this.list = result.data.results
      // })
      this.getArticles()
    },
    getChange () {
      this.page.currentPage = 1
      // this.$axios({
      //   url: '/articles'

      // }).then(result => {
      //   this.list = result.data.results
      //   this.page.total = result.data.total_count
      // })
      this.getArticles()
    },
    getArticles () {
      this.$axios({
        url: '/articles',
        params: {
          status: this.formData.status === 5 ? null : this.formData.status,
          channel_id: this.channel_id,
          begin_pubdate: this.dateChange && this.dateChange.length ? this.dateChange[0] : null,
          end_pubdate: this.dateChange && this.dateChange.length > 1 ? this.dateChange[1] : null,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }

      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
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
    this.getChannels()
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
