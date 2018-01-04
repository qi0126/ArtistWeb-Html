<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item>推广项目</el-breadcrumb-item>
            <el-breadcrumb-item>发现内容</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="hr"/>
        <el-button type="primary" plain @click="addfind_btn">新增内容</el-button>
        <div>
            <el-table
            :data="tableData3"
            height="500"
            border
            style="width: 96%">
                <el-table-column
                prop="date"
                label="发布时间">
                </el-table-column>
                <el-table-column
                label="发布标题">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="上传类型">
                    <template slot-scope="scope">
                        <el-select v-model="uploaddata_select" placeholder="请选择">
                            <el-option
                            v-for="item in uploaddata_select_data"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                label="发布内容">
                <template slot-scope="scope">
                    <el-input
                    placeholder="请输入内容"
                    v-model="scope.row.address"
                    :readonly="true">
                    </el-input>
                </template>
                </el-table-column>
                <el-table-column
                label="封面">
                <template slot-scope="scope">
                    <div class="title_img" @click="uploadimg(scope.row)">
                        点击上传<br/>
                        图片比例16：9
                    </div>
                    
                </template>
                </el-table-column>
                <el-table-column
                label="是否显示">
                    <template slot-scope="scope">
                        <el-radio-group v-model="display_tf">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" plain @click="contentClick(scope.row)" size="small">预览</el-button>
                    <el-button type="primary" size="small">删除</el-button>
                </template>
                </el-table-column>
                
            </el-table>
            <!-- 预览弹出框开始 -->
            <el-dialog
              title="预览"
              :visible.sync="previewDialog"
              width="30%">
              <span>这是一段信息</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="previewDialog = false">取 消</el-button>
                <el-button type="primary" @click="previewDialog = false">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 图片上传input -->
            <input type="file" ref="uploadimg_input" @change="uploadimg_fun" v-show="0"/>
        </div>
    </div>
        
</template>

<script>
export default {
  data() {
    return {
      //发现内容数据
      tableData3: [
        {
          id: "1",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "2",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "3",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "4",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "5",
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "6",
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      temp_jId: "",
      display_tf: "0", //是否显示
      addfind_data: {
        date: "",
        name: "",
        address: ""
      },
      //上传内容方式
      uploaddata_select_data: [
        {
          id: "1",
          name: "视频文件"
        },
        {
          id: "2",
          name: "PPT文档"
        },
        {
          id: "3",
          name: "word文档"
        },
        {
          id: "4",
          name: "转载链接"
        }
      ],
      uploaddata_select: "3",
      previewDialog:false,//预览弹出框
    };
  },
  methods: {
    contentClick(elem) {
      console.log(elem);
      var self = this;
      self.previewDialog = true;
    },
    //新建内容
    addfind_btn() {
      var self = this;
      self.tableData3.push(self.addfind_data);
      console.log(self.tableData3);
    },
    //上传封面打开文件输入框事件
    uploadimg(elem) {
      var self = this;
      self.temp_jId = elem.id;
      this.$refs.uploadimg_input.click();
      // self.$refs.jId.click();
    },
    //上传封面文件后事件
    uploadimg_fun() {
      var self = this;
      console.log(self.$refs.uploadimg_input.value);
      console.log(self.temp_jId);
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
.title_img
    background-color #f2f2f2
    color #a6a6a6
    font-size 14px
    text-align center
    border-radius 3px
    cursor pointer
</style>


        