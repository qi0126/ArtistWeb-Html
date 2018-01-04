<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">Artist后台</el-breadcrumb-item>
            <el-breadcrumb-item>推广栏目</el-breadcrumb-item>
            <el-breadcrumb-item>文字推广</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <hr/>
            <el-button type="primary" size="small" @click="add_textpromo">新增文字推广</el-button>
            <el-checkbox v-model="open_tf">开启</el-checkbox>
        </div>
        <div>
            <el-table
            :data="tableData"
            border
            class="el-table">
                <el-table-column
                type="index"
                label="序号">
                </el-table-column>
                <el-table-column
                prop="date"
                label="显示文字">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" placeholder="请输入内容" size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                prop="date"
                label="推广类别">
                  <template slot-scope="scope">
                    <el-button class="bai_btn" plain  size="small" @click="modify_promo_dialog = true">已选择类别：未选择</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="是否显示">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.radio">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column
                label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" plain size="small">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="设置推广类别"
                :visible.sync="modify_promo_dialog"
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
                  <el-button @click="modify_promo_dialog = false">取 消</el-button>
                  <el-button type="primary" @click="modify_promo_dialog = false">确 定</el-button>
                </span>
              </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      open_tf: true, //开启变量
      //文字推广属性
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          radio: "1"
        },
        {
          date: "2016-05-04",
          name: "李小胖",
          address: "上海市普陀区金沙江路 1518 弄",
          radio: "0"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          radio: "0"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          radio: "1"
        }
      ],
      modify_promo_dialog: false, //设置推广类别弹出框
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
      kind_checked: "子类13"
    };
  },
  methods: {
    //新增文字推广事件
    add_textpromo() {
      var self = this;
      var new_tableData = {
        date: "",
        name: "",
        address: "0",
        radio: "0"
      };
      self.tableData.push(new_tableData);
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
  margin 8px 0 8px 0
.bai_btn
  width 100%
.el-table
  text-align center
  width 100%
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