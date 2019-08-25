<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="80px" class="publish-form">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="contene" label="内容">
        <quill-editor v-model="formData.content" style="width:800px;height:400px;margin-bottom:100px" placeholder="请输入内容"></quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type" @change='changeType'>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publish(false)" type="primary">发布</el-button>
        <el-button  @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [
          { required: true, message: '标题内容不能为空' },
          {
            min: 5,
            max: 30,
            message: '标题内容要在5-30之间'
          }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    changeType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    publish (draft) {
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          let{ articleId } = this.$route.params
          let method = articleId ? 'put' : 'post'
          let url = articleId ? `/articles/${articleId}` : `/articles`
          this.$axios({
            method,
            url,
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getId () {
      let{ articleId } = this.$route.params
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    let{ articleId } = this.$route.params
    articleId && this.getId()
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.publish-form {
  margin-left: 50px;
}
</style>
