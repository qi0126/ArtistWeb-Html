<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
        <el-breadcrumb-item :to="{ path: '/' }">Artist后台</el-breadcrumb-item>
        <el-breadcrumb-item>推广栏目</el-breadcrumb-item>
        <el-breadcrumb-item>快捷推广</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <div class="hr"/>
        快捷推广
        <div class="top_righttxt">
          <el-checkbox v-model="open_tf" size="small">开启</el-checkbox>
          快速推广数量：
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="small" @click="speedPromo_dialog = true">设置推广类别</el-button>
            <el-dialog
            title="设置推广类别"
            :visible.sync="speedPromo_dialog"
            width="950px">
            <div class="content">
                  <div class="item" v-for="kind in allKinds" :key="kind.parent">
                      <div class="parent">
                        <el-radio v-model="kind_checked" :label="kind.parent">{{kind.parent}}</el-radio>
                      </div>
                      <div class="child" v-show="kind.childs.length > 0">
                        【 <el-radio v-model="kind_checked" class="childText" :label="child" v-for="child in kind.childs" :key="child">{{ child }}</el-radio> 】
                      </div>
                  </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="speedPromo_dialog = false">取 消</el-button>
              <el-button type="primary" @click="speedPromo_dialog = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <el-row>
            <el-col :span="6" v-for="(o, index) in 5" :key="o" class="speedpromo_elcol">
              <div class="speedpromo_bigdiv">
                  <el-checkbox v-model="speedpromo_checked" class="speedpromo_checkbox"></el-checkbox>
                  <div class="speed_div">
                    <el-input v-model="speedpromo_txt" placeholder="请输入内容" class="speedpromo_txt" size="small"></el-input>
                    <p>
                      <img src="/static/imgs/test.png" class="image" @click="imgset_dialog = true">
                    </p>
                    <p>孔雀造型吊垫</p>
                    <p class="sub_text">孔雀造型吊垫</p>
                  </div>
              </div>
            </el-col>
          </el-row>
          <el-dialog
            title="设置图标"
            :visible.sync="imgset_dialog"
            width="950px">
            <div>
              <el-button size="small">上传图片</el-button>
              <el-button size="small" type="primary">批量删除</el-button>
            </div>
            <div>
              <el-row>
                <el-col :span="6" style="padding:10px">
                    <!-- <el-upload
                      action=""
                      list-type="picture-card"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                      图片比例1:1
                    </el-upload> -->
                  <input type="file" ref="uploadimg_file" style="display:none;" @change="upload_file"></input>
                  <div class="upload_bigdiv" @click="upload">
                    <div class="add_text">+</div>
                    <p>上传图片</p>
                    <p>尺寸比例为1：1</p>
                  </div>
                </el-col>
                <el-col :span="6" v-for="(o, index) in 16" :key="o" style="padding:10px">
                  <div class="img_bigdiv">
                    <div class="img_div">
                      <el-checkbox v-model="img_checked"></el-checkbox>
                      <el-button size="mini" type="primary" icon="el-icon-close" class="img_del_but"></el-button>
                    </div>
                    <img src="/static/imgs/test.png" class="image" @mouseover="img_over" @mouseout="img_out">
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      //快捷推广的开启
      open_tf: true,
      //推广类别数量
      options: [
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        },
        {
          value: "6",
          label: "6"
        },
        {
          value: "7",
          label: "7"
        },
        {
          value: "8",
          label: "8"
        }
      ],
      value: "4",
      speedpromo_checked: true, //推广图片选中
      speedpromo_txt: "孔雀造型吊垫", //快捷推广

      //“设置推广类别”弹出框
      speedPromo_dialog: false,
      
      // 全部推广类别
      allKinds: [
        { parent: "推荐产品", childs: [] },
        { parent: "人气产品", childs: [] },
        {
          parent: "丝丝心印系列",
          childs: [
            "子类1",
            "子类2",
            "子类3",
            "子类4",
            "子类5",
            "子类6",
            "子类7",
            "子类8",
            "子类9",
            "子类10",
            "子类11",
            "子类12",
            "子类13"
          ]
        }
      ],
      kind_checked: "子类13", //推广类别选中项
      imgset_dialog: false, //设置图标弹出框
      img_checked: "" //现在默认图标
    };
  },
  methods: {
    //产品图片编辑与鼠标移进
    img_over() {
      console.log("aaaa");
    },
    //产品图片鼠标移出
    img_out() {
      console.log("aaaa");
    },
    //点击图片上传
    upload() {
      this.$refs.uploadimg_file.click();
    },
    //图片上传改变
    upload_file(elem){
      console.log(this.$refs.uploadimg_file.value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url);
      // this.dialogVisible = true;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
$font-color = #999
.hr
  border-top 1px solid #ddd
  height 3px
  margin 24px 0 24px 0
.redfont
  padding-left 10px
  border-left 3px solid $base-color
.top_righttxt
  width 90%
  float right
  text-align right
.upload_bigdiv
  width 180px
  height 124px
  border 1px dashed $base-color
  text-align center
  border-radius 3px
  line-height 40px
  font-size 20px
  padding 20px
  color $base-color
  .add_text
    font-size 50px
.speedpromo_elcol
  padding 12px
  .speedpromo_bigdiv
    width 88%
    line-height 30px
    text-align center
    box-shadow 2px 2px 8px #d8d8d8
    border 1px solid #f2f2f2
    border-radius 5px
    font-size 16px
    color #333
    .speedpromo_checkbox
      float left
      margin-left 8px
    .speed_div
      padding 20px
      .speedpromo_txt
        width 160px
        padding-bottom 10px
      .image
        width 90%
        height 250px
  .sub_text
    color #999
.img_bigdiv
  width 220px
  height 166px
  .img_div
    border 1px solid $base-color
    position absolute
    width 220px
    height 166px
    .img_del_but
      float right
.item
  width 100%
  margin-bottom 30px
  display flex
  align-items top
  .child .el-radio
    color #999
  .text
    white-space nowrap
</style>