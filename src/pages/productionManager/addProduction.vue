<template>
  <div class="addProduction">
    <div class="headerWrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>Artist</el-breadcrumb-item>
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="picWrapper">
      <div class="top">
        <span class="title">产品图片</span>
        <div class="topBtns">
          <el-button class="upload" type="primary" icon="el-icon-upload" size="mini" plain>上传图片</el-button>
          <el-button class="delete" type="danger" icon="el-icon-delete" size="mini">批量删除</el-button>
        </div>
      </div>
      <div class="bottom">
        <div class="buttomItem bt-hover" v-for="proImg in allImgs"
             @mouseover="overImg(proImg.id)" 
             @mouseout="outImg(proImg.id)">
          <i class="iconfont" :class="{'cbIcon':proImg.id==hoverIndex,'cbSelIcon':selectedImgIds.indexOf(proImg.id)!=-1}"></i>
          <img :src="proImg.src" class="myImg" @click="tapImg(proImg.id)">
          <i class="iconfont" @click.stop="delPic" :class="{'closeIcon':proImg.id==hoverIndex}"></i>
        </div>
      </div>
    </div>

    <div class="baseInfo">
      <div class="title">
        <span>产品基本信息</span>
      </div>
      <div class="content">
        <div class="prokind item">
          <span class="text">产品类别：</span>
          <el-input v-model="prokind" size="small" placeholder="请填写产品分类"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="proNum item">
          <span class="text">产 品 编 号：</span>
          <el-input v-model="proNum" size="small" placeholder="请填写产品编号"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="proName item">
          <span class="text">产品名称：</span>
          <el-input v-model="proName" size="small" placeholder="请填写产品名称"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="providerNum item">
          <span class="text">供应商编号：</span>
          <el-input v-model="providerNum" size="small" placeholder="请填写供应商编号"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="proDesc item">
          <span class="text">产品描述：</span>
          <el-input v-model="proDesc" size="small" type="textarea" :rows="4" placeholder="请填写对产品的描述"></el-input>
        </div>
      </div>
    </div>

    <div class="property">
      <div class="title">
        <span>产品属性</span>
      </div>
      <div class="content">
        <div class="proCz item">
          <span class="text">产品材质：</span>
          <el-input v-model="proCz" size="small" placeholder="请填写产品材质"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="wgxt item">
          <span class="text">外观形态：</span>
          <el-input v-model="wgxt" size="small" placeholder="请填写产品外观形态"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="proCs item">
          <span class="text">产品成色：</span>
          <el-input v-model="proCs" size="small" placeholder="请填写产品成色"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="proGy item">
          <span class="text">表面工艺：</span>
          <el-input v-model="proGy" size="small" placeholder="请填写表面工艺"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="shrq item">
          <span class="text">适合人群：</span>
          <el-input v-model="shrq" size="small" placeholder="请填写适合人群"></el-input>
          <span class="pointer">*</span>
        </div>
        <div class="zzgy item">
          <span class="text">制造工艺：</span>
          <el-input v-model="zzgy" size="small" placeholder="请填写制造工艺"></el-input>
          <span class="pointer">*</span>
        </div>
      </div>
    </div>

    <div class="specification">
      <div class="title">
        <span class="text">产品规格</span>
        <el-button type="primary" size="small" icon="el-icon-circle-plus" class="btn">添加新的产品规格</el-button>
      </div>
      <div class="content">
        <el-table
          stripe
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            align="center"
            label="克重"
            width="160">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="长度"
            width="160">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="宽度"
            width="160">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="高度"
            width="160">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="圈口"
            width="160">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="内径"
            width="160">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="面宽"
            width="160">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="字印"
            width="160">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="长宽高"
            width="200">
            <template slot-scope="scope">
              <el-input size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            width="180"
            label="操作">
            <template slot-scope="scope">
              <div class="proOptions">
                <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="generalize">
      <div class="top">
        <span class="title">产品推广</span>
      </div>
      <div class="content">
        <div class="item" v-for="kind in allKinds">
          <div class="parent">
            <el-radio v-model="selProTg" :label="kind.parent">{{kind.parent}}</el-radio>
          </div>
          <div class="child" v-show="kind.childs.length > 0">
            【 <el-radio v-model="selProTg" class="childText" :label="child" v-for="child in kind.childs" :key="child">{{ child }}</el-radio> 】
          </div>
        </div>
      </div>
    </div>
    
    <div class="btnWrapper">
      <el-button type="primary" plain>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      allKinds: [
        { parent: "推荐产品", childs: [] },
        { parent: "人气产品", childs: [] },
        {
          parent: "丝丝心印系列",
          childs: ["子类1", "子类2", "子类3", "子类4", "子类5", "子类6", "子类7", "子类8", "子类9", "子类10", "子类11", "子类12", "子类13"]
        }
      ], // 全部种类
      selProTg: "", // 选择的产品推广种类
      tableData: ["1", "2"],
      proCz: "", // 材质
      wgxt: "", // 外观形态
      proCs: "", // 成色
      proGy: "", // 表面工艺
      shrq: "", // 适合人群
      zzgy: "", // 制造工艺
      prokind: "", // 产品种类
      proNum: "", // 产品编号
      proName: "", // 产品名称
      providerNum: "", // 供应商编号
      proDesc: "", // 产品描述
      allImgs: [
        { id: "1", src: "/static/imgs/test.png" },
        { id: "2", src: "/static/imgs/test.png" },
        { id: "3", src: "/static/imgs/test.png" }
      ],
      selectedImgs: [], // 被选择的照片
      hoverIndex: -1, // hover时的索引
      tabIndex: -1, // 点击时的索引
      selectedImgIds: [] // 被选择的照片id数组
    };
  },
  methods: {
    tapImg(id) {
      if (this.selectedImgIds.indexOf(id) != -1) {
        let result = this.selectedImgIds.filter(function(imgIndex) {
          return imgIndex != id;
        });
        this.selectedImgIds = result;
      } else {
        this.selectedImgIds.push(id);
      }
    },
    delPic() {
      console.log("删除图片");
    },
    overImg(id) {
      this.hoverIndex = id;
    },
    outImg() {
      this.hoverIndex = -1;
    }
  },
  watch: {
    test(val) {
      console.log(val);
    },
    selectedImgIds(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
$base-box-shadow = 0 0 10px #e5e5e5
$base-border-radius = 5px
.addProduction
  color #999999
  .picWrapper
    border-radius $base-border-radius
    margin-top 20px
    box-shadow $base-box-shadow
    padding-left 20px
    .top
      height 50px
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #D9D9D9
      .title
        color #333333
        padding-left 8px
        border-left 2px solid $base-color
      .topBtns
        margin-right 10px
    .bottom
      display flex
      flex-wrap wrap
      padding-bottom 15px
      .buttomItem
        margin 15px 15px 0 0
        position relative
        border-radius 5px 
        overflow hidden
        .myImg
          box-sizing border-box
          width 140px
          height 105px
          &:hover
            background: linear-gradient(orange, $base-color);
            padding: 2px;
        .cbIcon, .closeIcon, .cbSelIcon
          position absolute
        .cbIcon, .cbSelIcon
          top 5px
          left 5px
        .closeIcon
          top 5px
          right 5px
        .cbIcon:after
          content '\e658'
          color gray
        .cbSelIcon:after
          content '\e66a'
          color $base-color
        .closeIcon:after
          content '\e656'
          color $base-color
          font-size 10px
  .baseInfo
    border-radius $base-border-radius
    margin-top 20px
    box-shadow $base-box-shadow
    padding-left 20px
    .title
      height 50px
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #D9D9D9
      span
        color #333333
        padding-left 8px
        border-left 2px solid $base-color
    .content
      margin-top 30px
      margin-right 20px
      display flex
      flex-wrap wrap
      justify-content space-between
      .item
        width 45%
        margin-bottom 30px
        display flex
        align-items center
        .pointer
          color $base-color
          margin-left 10px
          font-weight bold
        .text
          white-space nowrap
      .proDesc
        align-items flex-start
        width 100%
  .property
    border-radius $base-border-radius
    margin-top 20px
    box-shadow $base-box-shadow
    padding-left 20px
    .title
      height 50px
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #D9D9D9
      span
        color #333333
        padding-left 8px
        border-left 2px solid $base-color
    .content
      margin-top 30px
      margin-right 20px
      display flex
      flex-wrap wrap
      justify-content space-between
      .item
        width 45%
        margin-bottom 30px
        display flex
        align-items center
        .text
          white-space nowrap
        .pointer
          color $base-color
          margin-left 10px
          font-weight bold
  .specification
    border-radius $base-border-radius
    margin-top 20px
    box-shadow $base-box-shadow
    padding 0 0 64px 20px
    .title
      height 50px
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #D9D9D9
      .text
        color #333333
        padding-left 8px
        border-left 2px solid $base-color
      .btn
        margin-right 10px
    .content
      margin 16px 0 16px 0
  .generalize
    border-radius $base-border-radius
    margin-top 20px
    box-shadow $base-box-shadow
    padding-left 20px
    .top
      height 50px
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #D9D9D9
      .title
        color #333333
        padding-left 8px
        border-left 2px solid $base-color
    .content
      display flex
      flex-wrap wrap
      padding 20px 0
      .item
        width 49%
        padding 10px 0
        display flex
        justify-content space-between
        line-height 25px
        .child
          margin-left 10px
          .childText
            color #A7A7A7
  .btnWrapper
    height 100px
    display flex
    align-items center
    justify-content center
</style>
