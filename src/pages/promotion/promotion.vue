<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
          <el-breadcrumb-item :to="{ path: '/' }">Artist后台</el-breadcrumb-item>
          <el-breadcrumb-item>推广管理</el-breadcrumb-item>
      </el-breadcrumb>
      <hr/>
      <div class="top_text">
        提示：类别编辑可对选中类别进行新建子类别、重命名、删除操作。类别名称，双击类别名称即可。<br/>
        点击链接设定可自定义设置点击该图片所指向的链接。
      </div>

      <hr/>

      <el-container>
        <el-aside class="left_sale_menu" style="width:340px;">
          <div class="topnav leftmenu">
             <span class="redfont">|</span> 销售人员列表
          </div>
          <div class="left_menu_div">
            <div class="left_submenu_div">
              <el-input
                placeholder="请输入关键字搜索"
                v-model="search_name">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button icon="el-icon-circle-plus-outline" style="width:100%" @click="add_saleteam">新增推广类别</el-button>
              <el-dialog
                title="新增推广类别"
                :visible.sync="add_team_dialog"
                width="30%">
                <div>
                  <el-input v-model="add_team_name" placeholder="请输入推广类别名称"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button size="mini" @click="add_team_dialog = false">取 消</el-button>
                  <el-button size="mini" type="primary" @click="save_addteam">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <div class="salemans_class">
                <el-tree  
                  :data="category_allsubdata"  
                  node-key="id"  
                  default-expand-all  
                  accordion
                  :expand-on-click-node="false"  
                  highlight-current
                  :render-content="renderContent">  
                </el-tree> 
                <el-dialog
                  title="添加子团队"
                  :visible.sync="add_twoteam_dialog"
                  width="30%">
                <div>
                  <hr/>
                  <div>在(<span class="redfont" v-html="select_name"></span>)添加子团队名称</div>
                  <el-input v-model="add_twoteam_name" placeholder="请输入团队名称"></el-input>
                  子团队区域备注
                  <el-input v-model="add_twoteam_backup" placeholder="请输入团队区域"></el-input>
                </div>
                <div>
                  选择团队成员
                  <hr/>
                    <el-input
                      placeholder="请输入关键字搜索"
                      prefix-icon="el-icon-search"
                      v-model="add_twoteam_search">
                    </el-input>
                    <el-checkbox-group v-model="checked_addtwoteam">
                      <el-checkbox v-for="addteam in addteam_noman" :label="addteam.id" :key="addteam.id" style="margin-left:0;width:23%;">{{addteam.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="add_twoteam_dialog = false">取 消</el-button>
                    <el-button type="primary" @click="add_twoteam_fun">添加子团队</el-button>
                  </span>
                </el-dialog>
                <el-dialog
                  title="删除团队"
                  :visible.sync="del_team_dialog"
                  width="30%">
                  <span>确认删除此(<span class="redfont" v-html="del_team_name"></span>)团队?</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="del_team_dialog = false">取 消</el-button>
                    <el-button type="primary" @click="del_team(del_team_id)">删除团队</el-button>
                  </span>
                </el-dialog>
            </div>
          </div>
          <div>
            <draggable :list="list2" :move="getdata" @update="datadragEnd" :options="{animation: 300,handle:'.dargDiv'}">
              <transition-group name="list-complete" >
                <div v-for="element in list2" :key="element.it.name"  class="list-complete-item">
                  <div class="styleclass dargDiv">{{element.id}}</div>
                  <div class="styleclass">{{element.it.name}}</div>
                </div>
              </transition-group>
            </draggable>
            <draggable :list="list3" :move="getdata" @update="datadragEnd" :options="{animation: 300,handle:'.dargDiv'}">
              <transition-group name="list-complete" >
                <div v-for="element in list3" :key="element.it.name"  class="list-complete-item-heng">
                  <div class="styleclass dargDiv long">{{element.id}}</div>
                  <div class="styleclass">{{element.it.name}}</div>
                </div>
              </transition-group>
            </draggable>
            <br/><br/><br/>
            <el-button type="success" @click="outdata">导出结果</el-button>
        </div>
        </el-aside>
        
        <el-container>
          <div class="right_div topnav">
            <span class="redfont">|</span> 销售人员信息
            <div class="span_right">

              <el-button size="mini" @click="add_pro_dialog = true">添加产品</el-button>
              <el-dialog
                title="添加产品到推广类别"
                :visible.sync="add_pro_dialog"
                width="950px">
                <span>产品类别：
                  <el-select v-model="value" placeholder="全部类别">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input
                    placeholder="请输入内容"
                    v-model="pro_search">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </span>
                <div>
                  <el-row>
                    <el-col :span="8" v-for="(index) in 6 " :key="index" >
                      <img src="/static/imgs/test.png" style="width:100px;" />
                      平面实心-手镯
                    </el-col>
                  </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="add_pro_dialog = false">取 消</el-button>
                  <el-button type="primary" @click="add_pro_dialog = false">确 定</el-button>
                </span>
              </el-dialog>

              <el-button size="mini" @click="modify_promo_dialog = true">调整产品类别</el-button>
              <el-dialog
                title="调整产品类别"
                :visible.sync="modify_promo_dialog"
                width="30%">
                <div class="content">
                  <div class="item" v-for="kind in allKinds" :key="kind.parent">
                    <div class="parent">
                      <el-checkbox v-model="kind.parent" :label="kind.parent">{{kind.parent}}</el-checkbox>
                    </div>
                    <div class="child" v-show="kind.childs.length > 0">
                      【 <el-checkbox :v-model="child" class="childText" :label="child" v-for="child in kind.childs" :key="child">{{ child }}</el-checkbox> 】
                    </div>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="modify_promo_dialog = false">取 消</el-button>
                  <el-button type="primary" @click="modify_promo_dialog = false">确 定</el-button>
                </span>
              </el-dialog>

              <el-button size="mini" type="primary" @click="batch_del_dialog = true">批量移除</el-button>
              <el-dialog
                title="提示"
                :visible.sync="batch_del_dialog"
                width="30%">
                <span>确认要批量移除所选中产品？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="batch_del_dialog = false">取 消</el-button>
                  <el-button type="primary" @click="batch_del_dialog = false">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <br/>
            <div class="right_subdiv">
              <el-table
                :data="tableData"
                border
                class="el-table">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="匹配图">
                  <template slot-scope="scope">
                    <img src="/static/imgs/test.png" width="120px" @click="img_dialog = true"/><br/>
                    共3张
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="产品名称">
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="产品分类">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="产品编号">
                </el-table-column>

                <el-table-column
                  prop="zip"
                  label="所属类别">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="editrow(scope.row)" size="small">编辑</el-button>
                    <el-button size="small" type="primary">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 点击图片弹出框 -->
              <el-dialog
                title="产品图片"
                :visible.sync="img_dialog"
                width="950px">
                <div>
                  <el-button size="small">上传图片</el-button>
                  <el-button size="small" type="primary">批量删除</el-button>
                </div>
                <div>
                  <el-row>
                    <el-col :span="6" v-for="(o, index) in 16" :key="o" style="padding:10px">
                      <div class="img_bigdiv">
                        <div class="img_div">
                          <el-checkbox v-model="img_checked">备选项</el-checkbox>
                          <el-button size="mini" type="primary" icon="el-icon-close" class="img_del_but"></el-button>
                        </div>
                        <img src="/static/imgs/test.png" class="image" @mouseover="img_over" @mouseout="img_out">
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-dialog>
              <div>
                  <div class="block">
                    <span class="demonstration">调整每页显示条数</span>
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage2"
                      :page-sizes="[100, 200, 300, 400]"
                      :page-size="100"
                      layout="sizes, prev, pager, next"
                      :total="1000">
                    </el-pagination>
                  </div>
              </div>
            </div>
          </div>
        </el-container>
      </el-container>
    </div>
</template>


<script>
import draggable from "vuedraggable";

let teamman_alldata = [];
export default {
  components: {
    draggable
  },
  data() {
    return {
      //团队名搜索
      search_name: "",
      //团队备注名称
      team_backupname: "",
      //团队成员搜索
      salemans_search: "",
      //全部团队信息
      category_alldata: [],
      //子团队信息
      category_allsubdata: [],
      //选中团队的ID
      select_index: 0,
      //选中团队的name
      select_name: "",
      //创建新团队弹出框
      add_team_dialog: false,
      //创建新团队名称
      add_team_name: "",
      //团队区域名称
      add_team_backup: "",
      //团队未加入团队销售人员
      addteam_noman: [],
      //创建新团队弹出框未加入团队销售人员搜索
      addteam_search: "",
      //添加二级团队弹出框
      add_twoteam_dialog: false,
      //创建新子团队名称
      add_twoteam_name: "",
      //子团队区域名称
      add_twoteam_backup: "",
      //创建新子团队弹出框未加入团队销售人员搜索
      add_twoteam_search: "",
      //子团队选择成员数组
      checked_addtwoteam: [],
      //删除团队弹出框
      del_team_dialog: false,
      //删除团队弹出框显示团队名称
      del_team_name: "",
      //删除团队的团队ID
      del_team_id: -1,
      //推广产品table
      tableData: [
        {
          date: "2016-05-03",
          name: "平口实心手镯",
          province: "手镯—实心—平面密口",
          city: "65465468548-125",
          address: "新品",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "平口实心手镯",
          province: "手镯—实心—平面密口",
          city: "65465468548-125",
          address: "新品",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "平口实心手镯",
          province: "手镯—实心—平面密口",
          city: "65465468548-125",
          address: "新品",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "平口实心手镯",
          province: "手镯—实心—平面密口",
          city: "65465468548-125",
          address: "新品",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "平口实心手镯",
          province: "手镯—实心—平面密口",
          city: "65465468548-125",
          address: "新品",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "平口实心手镯",
          province: "手镯—实心—平面密口",
          city: "65465468548-125",
          address: "新品",
          zip: 200333
        }
      ],
      //图片弹出框
      img_dialog: false,
      //第几页默认5
      currentPage2: 5,
      //产品里多张图片显示
      currentDate: new Date(),
      //选择图片
      img_checked: false,
      //添加产品弹出层
      add_pro_dialog: false,
      //调整推广类别弹出层
      modify_promo_dialog: false,
      //确认推广类别弹出层
      confirm_promo_dialog: false,
      //批量移除
      batch_del_dialog: false,
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
      //添加产品到推广类别全部类别
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      //添加产品到推广类别输入搜索框
      pro_search: "",

      //鼠标拖动
      list2: [
        { id: "id1", it: { name: "bbbb" } },
        { id: "id2", it: { name: "2222" } },
        { id: "id3", it: { name: "3333" } },
        { id: "id4", it: { name: "4444" } }
      ],
      list3: [
        { id: "id1", it: { name: "bbbb" } },
        { id: "id2", it: { name: "2222" } },
        { id: "id3", it: { name: "3333" } },
        { id: "id4", it: { name: "4444" } }
      ],
      out_menu_data: [] //鼠标拖动后输出结果
    };
  },
  created() {
    this.create_fun();
  },
  methods: {
    create_fun() {
      var self = this;
      this.Axios
        .get("/promotion/category")
        .then(data => {
          if (data.status == 200) {
            self.category_alldata = data.data.data;
            var category_alldata_new = [];
            var category_alldata_subdata = [];
            var data = self.category_alldata,
              tree = (function(data, root) {
                var r,
                  o = {};
                var temp_data = [];
                data.forEach(function(a) {
                  a.children = o[a.id] && o[a.id].children;
                  o[a.id] = a;
                  if (a.parentId == 0) {
                    r = a;
                    temp_data.push(a);
                  } else {
                    o[a.parentId] = o[a.parentId] || {};
                    o[a.parentId].children = o[a.parentId].children || [];
                    o[a.parentId].children.push(a);
                  }
                });
                return temp_data;
              })(data, null);
            //无限级菜单拼接数据组tree
            self.category_allsubdata = tree;
          }
        })
        .catch(err => {
          this.extCatch(err, this.create_fun);
        });
    },

    //树状图渲染
    renderContent: function(createElement, { node, data, store }) {
      var pId = node.data.id;
      // console.log(node.data);
      var self = this;
      return createElement(
        "div",
        {
          attrs: {
            class: "tree-div",
            id: "div_" + pId
          },
          on: {
            //鼠标移到这个div
            mouseover: function() {
              document.getElementById("span_" + node.data.id).style.display =
                "block";
            },
            //鼠标移开
            mouseout: function() {
              document.getElementById("span_" + node.data.id).style.display =
                "none";
            },
            //点击事件
            click: function() {}
          }
        },
        [
          createElement(
            "span",
            {
              attrs: {
                style: "padding-top:16px;",
                id: "text_" + data.id
              }
            },
            node.data.categoryName + "(暂没有)"
          ),
          createElement(
            "span",
            {
              attrs: {
                id: "span_" + node.data.id,
                class: "menu_modify"
              }
            },
            [
              createElement(
                "span",
                {
                  attrs: {},
                  on: {
                    click: function() {
                      self.add_twoteam_dialog = true;
                    }
                  }
                },
                "+"
              ),
              createElement(
                "span",
                {
                  attrs: {},
                  on: {
                    click: function() {
                      self.del_team_name = data.teamName;
                      self.del_team_id = data.id;
                      self.del_team_dialog = true;
                    }
                  }
                },
                "x"
              )
            ]
          )
        ]
      );
    },
    //创建新团队弹出框
    add_saleteam() {
      var self = this;
      self.checked_addteam = [];
      this.Axios.get("/saler/saleTeam/salers").then(data => {
        if (data.data.code == 0) {
          this.addteam_noman = data.data.data;
        } else {
          this.$message({
            message: data.data.msg,
            type: "warning"
          });
        }
      });
      self.add_team_dialog = true;
    },
    //创建新团队保存
    save_addteam() {
      var self = this;
      // console.log(self.checked_addteam);
      let params = {
        teamName: self.add_team_name,
        comment: self.add_team_backup,
        salers: self.checked_addteam
      };
      this.Axios
        .post("/saler/saleTeam", params)
        .then(data => {
          if (data.data.code == 0) {
            self.add_team_name = "";
            self.add_team_backup = "";
            self.addteam_search = "";
            self.checked_addteam = [];
            this.$message({
              message: "团队创建成功！",
              type: "success"
            });
            self.create_fun();
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
          self.add_team_dialog = false;
        })
        .catch(err => {
          this.extCatch(err, this.select_oneteam(events));
        });
    },
    //创建子团队事件
    add_twoteam_fun() {
      var self = this;
      // console.log(self.select_index);
      // console.log(self.add_twoteam_name);
      let params = {
        teamName: self.add_twoteam_name,
        comment: self.add_twoteam_backup,
        salers: self.checked_addtwoteam,
        parentId: self.select_index
      };
      this.Axios
        .post("/saler/saleTeam/", params)
        .then(data => {
          if (data.data.code == 0) {
            self.add_twoteam_name = "";
            self.add_twoteam_backup = "";
            self.add_twoteam_search = "";
            self.checked_addtwoteam = [];
            self.add_twoteam_dialog = false;
            this.$message({
              message: "团队创建成功！",
              type: "success"
            });
            self.create_fun();
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.extCatch(err, this.select_oneteam(events));
        });
    },
    //删除团队事件
    del_team(elem) {
      var self = this;
      self.del_team_dialog = false;
      this.Axios.delete("/saler/saleTeam/" + elem).then(data => {
        if (data.data.code == 0) {
          this.$message({
            message: data.data.msg,
            type: "success"
          });
          this.create_fun();
        } else {
          this.$message({
            message: data.data.msg,
            type: "warning"
          });
        }
      });
    },
    //产品图片编辑与鼠标移进
    img_over() {
      console.log("aaaa");
    },
    //产品图片鼠标移出
    img_out() {
      console.log("aaaa");
    },

    //编辑分类产品
    editrow(row) {
      console.log(row);
    },

    //分页属性
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    //推广类别拖动JS

    getdata: function(evt) {
      // console.log(evt.draggedContext.element.id);
    },
    datadragEnd: function(evt) {
      // console.log(evt)
      // console.log("拖动前的索引：" + evt.oldIndex);
      // console.log("拖动后的索引：" + evt.newIndex);
      var self = this;
      self.out_menu_data = [];
      for (var i = 0; i < evt.target.children.length; i++) {
        self.out_menu_data.push(evt.target.children[i].children[0].innerText);
      }
    },
    //推广类别结果输出
    outdata: function() {
      var self = this;
      alert(self.out_menu_data);
    }
  }
};
</script>

<style>
.menu_modify {
  float: right;
  font-size: 1.2rem;
  color: #e60e32;
  display: none;
}
.menu_modify span {
  font-size: 21px;
  font-weight: normal;
  margin-right: 9px;
}
.tree-div {
  width: 100%;
  height: 2rem;
  padding-top: 16px;
  font-size: 14px;
}
.el-tree-node.is-current > .el-tree-node__content {
  color: #e60e32;
}
.el-tree-node__content {
  height: 50px;
  border-bottom: 1px solid #f1f1f1;
}
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
$font-color = #999
.hr
  border-top 1px solid #ddd
  height 3px
  margin 8px 0 8px 0
.topnav
  font-size 1rem
  height 30px
  line-height 2
  padding-left 20px
  width 100%
.el-table
  text-align center
  width 100%
.redfont
  color red
.top_text
  color #ababab
  line-height 25px
.leftmenu
  width 90%
.left_menu_div
  padding 20px
  .left_sale_menu
    width 360px
      .menu_modify
        float right
        margin-right 20px
  .salemans_class
    border 1px solid #d9d9d9
    border-top 0
  .left_submenu_div
    padding 10px 16px 10px 16px
    line-height 3.5
    border 1px solid #d9d9d9
.span_right
  float right
  text-algin right
  width 350px
.right_subdiv
  border 1px solid #d9d9d9
  width 92%
  padding 24px 30px 24px 30px
  margin-top 20px
  .cust_leftdiv
    color #666
// 产品编辑拖动
.img_bigdiv
  width 220px
  height 166px
  .img_div
    border 1px solid red
    position absolute
    width 220px
    height 166px
    .img_del_but
      float right
// 添加产品到推广类别
.pro_bigdiv
  width 220px
  height 166px
  .pro_div
    border 1px solid red
    position absolute
    width 220px
    height 166px
    .pro_del_but
      float right
.item
  width 100%
  margin-bottom 30px
  display flex
  align-items top
  .text
    white-space nowrap
// 图片卡片样式
.time
  font-size 13px
  color #999
.bottom
  margin-top 13px
  line-height 12px
.button
  padding 0
  float right
.image
  width 100%
  display block
.clearfix:before, .clearfix:after
  display table
  content ''
.clearfix:after
  clear both
// 鼠标拖动js
body
  font-family '微软雅黑'
[v-cloak]
  display none
#example
  width 1000px
  margin 0 auto
.list-complete-item
  transition all 1s
  height 50px
  line-height 50px
  background #000
  color #fff
  text-align center
  font-size 24px
  margin-top 10px
.list-complete-item-heng
  transition all 1s
  height 50px
  line-height 50px
  background #000
  color #fff
  text-align center
  font-size 24px
  margin-top 10px
  float left
  width 240px
  margin-right 10px
.styleclass
  width 100px
  float left
.list-complete-enter, .list-complete-leave-active
  opacity 0
  height 0px
  margin-top 0px
  padding 0px
  border solid 0px
.list-complete-sortable-chosen, .list-complete-sortable-ghost
  opacity 0
  height 0px
  margin-top 0px
  padding 0px
  border solid 0px
.dargDiv
  cursor move
  background red
.wrods
  margin-top 50px
p
  line-height 24px
  text-align center
</style>

