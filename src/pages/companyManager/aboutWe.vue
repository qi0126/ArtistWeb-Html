<template>
  <div class="aboutWe">
    <div class="headerWrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>Artist</el-breadcrumb-item>
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="contentWrapper">
      <div class="itemWrapper" v-for="item in testData" :key="item.id">
        <div class="tip">
          <span>{{item.title}}</span>
        </div>
        <div class="imgs">
          <div
            class="imgsPlace bt-hover"
            :class="{'selImgItem':selItemId==item.id && selImgIndex==index}"
            v-for="(img,index) in item.imgs"
            @mouseover="imgMouseover(item.id,index)"
            @mouseout="imgMouseout(item.id,index)">
            <i class="el-icon-close closeIcon bt-hover" v-show="selItemId==item.id && selImgIndex==index"></i>
            <img :src="img" alt="暂无图片" class="imgChild">
          </div>
          <div class="addImgPlace bt-hover" onClick="uploadImg.click()">
            <i class="el-icon-circle-plus-outline"></i>
            <span>点击上传图片</span>
            <span>建议图片尺寸比例为2:1</span>
          </div>
        </div>
        <div class="desc">
          <el-input
            type="textarea"
            :maxlength="500"
            :rows="5"
            v-model="item.desc"
            placeholder="请填写500字以内的公司简介">
          </el-input>
        </div>
      </div>
    </div>

    <input type="file" id="uploadImg" @change="uploadImgEvent" hidden>
  </div>
</template>

<script type="text/ecmascript-6">
import utils from '@/commons/Batar/utils'
export default {
  data() {
    return {
      testData: [
        {
          id: '1',
          title: '关于集团',
          imgs: [
            '/static/imgs/test.png',
            '/static/imgs/test.png',
            '/static/imgs/test.png'
          ],
          desc: '这是集团简介'
        },
        {
          id: '2',
          title: '关于公司',
          imgs: [
            '/static/imgs/test.png',
            '/static/imgs/test.png',
            '/static/imgs/test.png'
          ],
          desc: '这是公司简介'
        }
      ],
      selItemId: '',
      selImgIndex: ''
    }
  },
  methods: {
    uploadImgEvent(e) {
      utils.encodeBase64(e).then(data => {})
    },
    imgMouseover(itemId,imgIndex) {
      this.selItemId = itemId
      this.selImgIndex = imgIndex
    },
    imgMouseout(itemId,imgIndex) {
      this.selItemId = ''
      this.selImgIndex = ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
.aboutWe
  .headerWrapper
    padding-bottom 10px
  .contentWrapper
    .itemWrapper
      padding 0 10px 20px 10px
      box-shadow 0 0 20px #E9E9E9
      margin-top 10px
      border-radius 5px
      .tip
        padding 15px 0
        font-size 14px
        border-bottom 1px solid #D9D9D9
        span
          padding-left 10px
          border-left 3px solid $base-color
      .imgs
        display flex
        flex-wrap wrap
        margin 20px 0
        .imgsPlace, .addImgPlace
          width 200px
          height 100px
          .imgChild
            width 100%
            height 100%
          .closeIcon
            position absolute
            top 7px
            right 7px
            color $base-color
            font-weight bold
        .imgsPlace
          position relative
          margin-right 20px
          border-radius 5px 
          overflow hidden
          box-sizing border-box
        .selImgItem
          background: linear-gradient(orange, $base-color);
          padding: 2px;
        .addImgPlace
          color $base-color
          border 1px dashed $base-color
          border-radius 5px
          display flex
          flex-direction column
          justify-content center
          align-items center
          line-height 15px
          font-size 12px
</style>
