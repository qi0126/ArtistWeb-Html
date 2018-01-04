<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item>推广项目</el-breadcrumb-item>
            <el-breadcrumb-item>发现内容</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="hr"/>
        <div class="text">
            提示：建议使用JPG格式，2M以下图片，尺寸像素1440×604。点击顺序拖动图片可变换轮播图片顺序
        </div>
        <el-button type="primary" plain>增加轮播</el-button>
        <div>
            <el-row>
                <el-col :span="24">
                    <div class="add_carousel_div">
                        <el-col :span="2">
                            <div class="title_name">
                                标      题：
                            </div>
                        </el-col>
                        <el-col :span="22">
                            <el-input v-model="input" placeholder="请输入内容" class="input_350"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <div class="title_name">
                                轮播时间：
                            </div>
                        </el-col>
                        <el-col :span="22">
                            <div class="block">
                                <el-date-picker
                                v-model="value7"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions2">
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="22">
                            <div class="hr"/>
                        </el-col>
                        <el-col :span="2">
                            <div class="title_name">
                                轮播图片：
                            </div>
                        </el-col>
                        <el-col :span="22">
                            <div class="img_upload_btn" @click="fileupload">+选择从电脑上传</div>
                            <div class="img_upload_btn" @click="uploaded_file">+选择已上传图片</div>
                        </el-col>
                    </div>
                    <div class="edit_carousel_div">
                        <el-col :span="2">
                            <div class="title_name">
                                标      题：
                            </div>
                        </el-col>
                        <el-col :span="22">
                            <el-input v-model="input" placeholder="请输入内容" class="input_350"></el-input>
                            <span class="carou_delbtn" @click="delcarou">X</span>
                        </el-col>
                        <el-col :span="2">
                            <div class="title_name">
                                轮播时间：
                            </div>
                        </el-col>
                        <el-col :span="22">
                            <div class="block">
                                <el-date-picker
                                v-model="value7"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions2">
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="22">
                            <div class="hr"/>
                        </el-col>
                        <el-col :span="2">
                            <div class="title_name">
                                轮播图片：
                            </div>
                        </el-col>
                        <el-col :span="22">
                            <div class="carousel_img_div">
                                <el-row>
                                    <el-col :span="6" v-for='item in 1' :key='item'>
                                        <div class="carousel_subdiv">
                                            <div class="carou_sub_top">
                                                <div class="carou_sub_num">{{item}}</div>
                                                <span class="carou_sub_delbtn">X</span>
                                            </div>
                                            <div class="carou_sub_center">
                                                <img src="/static/imgs/test.png" class="carou_subcenter_img"/>
                                            </div>
                                            <div class="carou_sub_bottom">
                                                <div>
                                                    <el-select v-model="value1" placeholder="请选择">
                                                        <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                    <span v-show="value1 == '1'">
                                                        <el-button type="primary" plain class="carou_sub_selectbtn" @click="selectcarou_btn">选择类别</el-button>
                                                        <div class="carou_subbottom_txt">
                                                            <span class="carou_subbottom_span">已选择类别 : </span>珠宝花开系列
                                                        </div>
                                                    </span>
                                                    <span v-show="value1 == '2'">
                                                        <el-button type="primary" plain class="carou_sub_selectbtn" @click="selectonepro">选择单品</el-button>
                                                        <div class="carou_subbottom_txt">
                                                            <img src="/static/imgs/test2.png" class="carou_subbottom_img"/>
                                                            在水一方<br/>
                                                            <span class="carou_subbottom_span">100010-1 </span>
                                                        </div>
                                                    </span>
                                                    <div  v-show="value1 == '3'" class="carou_subbottom_txt">
                                                        <el-input v-model="url_input" placeholder="请输入要跳转的网址"></el-input>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="6" v-for='item in 1' :key='item'>
                                        <div class="carousel_subdiv">
                                            <div class="carou_sub_top">
                                                <div class="carou_sub_num">{{item}}</div>
                                                <span class="carou_sub_delbtn">X</span>
                                            </div>
                                            <div class="carou_sub_center">
                                                <img src="/static/imgs/test.png" class="carou_subcenter_img"/>
                                            </div>
                                            <div class="carou_sub_bottom">
                                                <div >
                                                    <el-select v-model="value2" placeholder="请选择">
                                                        <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                     <span v-show="value2 == '1'">
                                                        <el-button type="primary" plain class="carou_sub_selectbtn" @click="selectcarou_btn">选择类别</el-button>
                                                        <div class="carou_subbottom_txt">
                                                            <span class="carou_subbottom_span">已选择类别 : </span>珠宝花开系列
                                                        </div>
                                                    </span>
                                                    <span v-show="value2 == '2'">
                                                        <el-button type="primary" plain class="carou_sub_selectbtn" @click="selectonepro">选择单品</el-button>
                                                        <div class="carou_subbottom_txt">
                                                            <img src="/static/imgs/test2.png" class="carou_subbottom_img"/>
                                                            在水一方<br/>
                                                            <span class="carou_subbottom_span">100010-1 </span>
                                                        </div>
                                                    </span>
                                                    <div  v-show="value2 == '3'" class="carou_subbottom_txt">
                                                        <el-input v-model="url_input" placeholder="请输入要跳转的网址"></el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="6" v-for='item in 1' :key='item'>
                                        <div class="carousel_subdiv">
                                            <div class="carou_sub_top">
                                                <div class="carou_sub_num">{{item}}</div>
                                                <span class="carou_sub_delbtn">X</span>
                                            </div>
                                            <div class="carou_sub_center">
                                                <img src="/static/imgs/test.png" class="carou_subcenter_img"/>
                                            </div>
                                            <div class="carou_sub_bottom">
                                                <div>
                                                    <el-select v-model="value3" placeholder="请选择">
                                                        <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                    <span v-show="value3 == '1'">
                                                        <el-button type="primary" plain class="carou_sub_selectbtn" @click="selectcarou_btn">选择类别</el-button>
                                                        <div class="carou_subbottom_txt">
                                                            <span class="carou_subbottom_span">已选择类别 : </span>珠宝花开系列
                                                        </div>
                                                    </span>
                                                    <span v-show="value3 == '2'">
                                                        <el-button type="primary" plain class="carou_sub_selectbtn" @click="selectonepro">选择单品</el-button>
                                                        <div class="carou_subbottom_txt">
                                                            <img src="/static/imgs/test2.png" class="carou_subbottom_img"/>
                                                            在水一方<br/>
                                                            <span class="carou_subbottom_span">100010-1 </span>
                                                        </div>
                                                    </span>
                                                    <div  v-show="value3 == '3'" class="carou_subbottom_txt">
                                                        <el-input v-model="url_input" placeholder="请输入要跳转的网址"></el-input>
                                                    </div>
                                                </div>
                                                      
                                            </div>
                                        </div>
                                    </el-col>

                                </el-row>
                            </div>
                            <div class="img_upload_class">
                                <div class="img_upload_btn" @click="fileupload">+选择从电脑上传</div>
                                <div class="img_upload_btn" @click="uploaded_file">+选择已上传图片</div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <div class="pagination_div">
                <el-pagination
                background
                :current-page.sync="currentPage2"
                :page-sizes="[3, 6, 9]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="15">
                </el-pagination>
            </div>
        </div>
        <!-- 从电脑上传文件 -->
        <input type="file" ref="imgupload_input" v-show="0" @change="imgload_file"/>
        <!-- 选择已上传图片 -->
        <el-dialog
        title="选择已上传的图片"
        :visible.sync="uploaded_file_dislog"
        width="1040px">
            <el-row :gutter="20">
                <el-col :span="8">
                  <div class="img_bigdiv">
                    <div class="img_div">
                      <el-checkbox v-model="img_checked"></el-checkbox>
                      <el-button size="mini" type="primary" icon="el-icon-close" class="img_del_but"></el-button>
                    </div>
                    <img src="/static/imgs/test.png" class="image">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="img_bigdiv">
                    <div class="img_div">
                      <el-checkbox v-model="img_checked"></el-checkbox>
                      <el-button size="mini" type="primary" icon="el-icon-close" class="img_del_but"></el-button>
                    </div>
                    <img src="/static/imgs/test.png" class="image">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="img_bigdiv">
                    <div class="img_div">
                      <el-checkbox v-model="img_checked"></el-checkbox>
                      <el-button size="mini" type="primary" icon="el-icon-close" class="img_del_but"></el-button>
                    </div>
                    <img src="/static/imgs/test.png" class="image">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="img_bigdiv">
                    <div class="img_div">
                      <el-checkbox v-model="img_checked"></el-checkbox>
                      <el-button size="mini" type="primary" icon="el-icon-close" class="img_del_but"></el-button>
                    </div>
                    <img src="/static/imgs/test.png" class="image">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="img_bigdiv">
                    <div class="img_div">
                      <el-checkbox v-model="img_checked"></el-checkbox>
                      <el-button size="mini" type="primary" icon="el-icon-close" class="img_del_but"></el-button>
                    </div>
                    <img src="/static/imgs/test.png" class="image">
                  </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploaded_file_dislog = false">取 消</el-button>
                <el-button type="primary" @click="uploaded_file_dislog = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 选择类别弹出框 -->
        <el-dialog
        title="选择推广类别"
        :visible.sync="selectpromo_dialog"
        width="950px">
            <div class="item" v-for="kind in allKinds" :key="kind.parent">
                <div class="parent">
                <el-radio v-model="kind_checked" :label="kind.parent">{{kind.parent}}</el-radio>
                </div>
                <div class="child" v-show="kind.childs.length > 0">
                【 <el-radio v-model="kind_checked" class="childText" :label="child" v-for="child in kind.childs" :key="child">{{ child }}</el-radio> 】
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selectpromo_dialog = false">取 消</el-button>
                <el-button type="primary" @click="selectpromo_dialog = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 选择单品弹出框 -->
        <el-dialog
        title="选择单品"
        :visible.sync="selectone_dialog"
        width="950px">
            <div>
                <el-input
                    placeholder="请输入内容"
                    v-model="selecone_search">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-row :gutter="20">
                    <el-col :span="8" v-for="item in 8" :key="item">
                        <div class="selectone_img_div">
                            <img src="/static/imgs/test2.png" class="carou_subbottom_img"/>
                            在水一方<br/>
                            <span class="carou_subbottom_span">100010-1</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selectone_dialog = false">取 消</el-button>
                <el-button type="primary" @click="selectone_dialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除轮播div -->
        <el-dialog
        title="提示"
        :visible.sync="delcarousel_dialog"
        width="30%">
            <span>确认要删除当前轮播？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delcarousel_dialog = false">取 消</el-button>
                <el-button type="primary" @click="delcarousel_dialog = false">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value6: "",
      value7: "",
      uploaded_file_dislog: false, //选择已上传图片
      img_checked: true, //选择已上传图片打勾
      currentPage2: 4, //分页中当前第几页
      options: [
        //选择轮播属性
        {
          value: "1",
          label: "推广类别"
        },
        {
          value: "2",
          label: "单个产品"
        },
        {
          value: "3",
          label: "网址"
        }
      ],
      value1: "1",
      value2: "2",
      value3: "3",

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
      selectpromo_dialog: false, //选择类别的弹出框
      selectone_dialog: false, //选择单品的弹出框
      selecone_search: "", //选择单品的文字搜索框
      delcarousel_dialog: false, //删除轮播确认弹出框
      //选择轮播属性

      url_input: "" //url跳转网址
    };
  },
  methods: {
    //调用电脑图片文件上传组件事件
    fileupload() {
      var self = this;
      self.$refs.imgupload_input.click();
    },
    //图片上传后文件
    imgload_file() {
      var self = this;
      console.log(self.$refs.imgupload_input.value);
    },
    //选择已上传图片文件弹出框
    uploaded_file() {
      var self = this;
      self.uploaded_file_dislog = true;
    },
    //选择类别弹出框
    selectcarou_btn() {
      var self = this;
      self.selectpromo_dialog = true;
    },
    //选择单品弹出框
    selectonepro() {
      var self = this;
      self.selectone_dialog = true;
    },
    //删除轮播确认弹出框
    delcarou() {
      var self = this;
      self.delcarousel_dialog = true;
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
.text
    margin 8px 0 8px 0
.topnav
    font-size 1rem
    height 30px
    line-height 2
    padding-left 0
    width 100%
.input_350
    width 350px
.carou_delbtn
    float right
    color $font-color
    font-size 20px
    margin-right 8px
.selectone_img_div
    font-size 16px
    .carou_subbottom_span
        color $font-color
    .carou_subbottom_img
        width 100px
        height 75px
        float left
        margin-right 5px
        border 1px solid red
.add_carousel_div
    margin-top 10px
    width 100%
    border 1px solid #eee
    box-shadow 2px 2px 8px #f2f2f2
    border-radius 5px
    height 240px
    .title_name
        color $font-color
        text-align right
        padding-top 14px
    .el-col
        margin-top 15px
    .carousel_img_div
        margin 8px 0 8px 0
.edit_carousel_div
    margin-top 10px
    width 100%
    border 1px solid #eee
    box-shadow 2px 2px 8px #f2f2f2
    border-radius 5px
    float left
    .carousel_subdiv
        width 96%
        height 300px
        border 1px solid #eee
        box-shadow 2px 2px 8px #f2f2f2
        border-radius 3px
        .carou_sub_top
            height 30px
            .carou_sub_num
                width 11px
                height 11px
                background-color #b6b6b6
                border-bottom-right-radius 10px
                padding 7px
                color #ffffff
                float left
            .carou_sub_delbtn
                float right
                color $font-color
                padding 5px
                font-size 16px
                margin-right 6px
        .carou_sub_center
            padding 10px
            height 120px
            .carou_subcenter_img
                width 100%
                height 130px
        .carou_sub_bottom
            padding 10px
            height 110px
            font-size 16px
            .carou_sub_selectbtn
                float right
            .carou_subbottom_txt
                padding-top 10px
                line-height 22px
                .carou_subbottom_span
                    color $font-color
            .carou_subbottom_img
                width 78px
                height 60px
                float left
                margin-right 5px
.title_name
    color $font-color
    text-align right
    padding-top 14px
.el-col
    margin-top 15px
.carousel_img_div
    margin 8px 0 8px 0
.img_upload_class
    text-align center
    width 400px
    margin 20px auto
    height 60px
.img_upload_btn
    margin-right 16px
    width 170px
    border 1px dashed $base-color
    color $base-color
    font-size 14px
    text-align center
    height 26px
    float left
    border-radius 3px
    padding-top 10px
    cursor pointer

.img_bigdiv
    width 320px
    height 160px
    margin 8px 0 8px 0
    border-radius 5px
    .image
        width 320px
        height 160px
    .img_div
        border 1px solid #ddd
        border-radius 5px
        position absolute
        width 320px
        height 160px
        .img_del_but
            float right
.pagination_div
    text-align center
    margin 8px 0 8px 0
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


