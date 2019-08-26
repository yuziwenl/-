<template>
  <el-card v-loading='loading'>
      <el-tabs v-model="activeName">
          <el-tab-pane  name='material' label="素材库">
              <div class="material-list">
                  <el-card v-for="item in list" :key='item.id' class="material-item">
                      <img :src="item.url" alt="" @click='selectOneImg(item)'>
                  </el-card>
              </div>
              <el-row style="margin:10px 0" type="flex" justify="center">
                  <el-pagination background layout="prev,pager,next"
                  :total="page.total"
                  :current-page="page.currentPage"
                  :page-size="page.pageSize"
                  @current-change='changePage'
                  ></el-pagination>
              </el-row>
          </el-tab-pane>
          <el-tab-pane name="upload" label="上传图片">
             <el-upload :http-request="uploadImg" class="avatar-uploader" action :show-file-list="false">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: 'user/images',
        data,
        method: 'post'
      }).then(result => {
        this.loading = false
        this.$emit('selectOneImg', result.data.url)
      })
    },
    selectOneImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    getMaterial () {
      let pageParams = { page: this.page.currentPage, per_page: this.page.pageSize }
      this.$axios({
        url: '/user/images',
        params: { collect: false, ...pageParams }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>
<style lang='less' scoped>
.material-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .material-item {
    margin: 5px 0;
    width: 150px;
    height: 150px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
