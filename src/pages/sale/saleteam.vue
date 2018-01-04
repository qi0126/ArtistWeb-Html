<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
          <el-breadcrumb-item :to="{ path: '/' }">Artist后台</el-breadcrumb-item>
          <el-breadcrumb-item>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售团队管理</el-breadcrumb-item>
      </el-breadcrumb>
      <hr/>

      <el-container>
        <el-aside class="left_sale_menu">
          <div class="topnav leftmenu">
             <span class="red_line">|</span> 销售团队列表
          </div>
          <div class="left_menu_div">
            <div class="left_submenu_div">
              <el-input
                placeholder="请输入关键字搜索"
                v-model="search_name">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button icon="el-icon-circle-plus-outline" style="width:100%" @click="add_saleteam">创建新团队</el-button>
              <el-dialog
                title="创建新团队"
                :visible.sync="add_team_dialog"
                width="30%">
                <div>
                  <hr/>
                  团队名称
                  <el-input v-model="add_team_name" placeholder="请输入团队名称"></el-input>
                  团队区域备注
                  <el-input v-model="add_team_backup" placeholder="请输入团队区域"></el-input>
                </div>
                <div>
                  选择团队成员
                  <hr/>
                    <el-input
                      placeholder="请输入关键字搜索"
                      prefix-icon="el-icon-search"
                      v-model="addteam_search">
                    </el-input>
                    <el-checkbox-group v-model="checked_addteam">
                      <el-checkbox v-for="addteam in addteam_noman" :label="addteam.id" :key="addteam.id" style="margin-left:0;width:23%;">{{addteam.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="add_team_dialog = false">取 消</el-button>
                  <el-button type="primary" @click="save_addteam">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <div class="salemans_class">
                <el-tree  
                  :data="team_allsubdata"  
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
        </el-aside>
        
        <el-container>
          <div class="right_div topnav">
            <span class="red_line">|</span> 销售人员信息<br/>
            <div class="right_subdiv">
              团队区域备注-<span v-html="select_name"></span>
              <div>
                <el-input v-model="team_backupname" @blur="team_backup_replace" placeholder="请输入团队区域备注"></el-input>
              </div>
              <div class="salemans_bigdiv">
                <div class="salemans_search_leftdiv">
                  团队成员
                </div>
                <div class="salemans_search_rightdiv">
                    <el-input
                      placeholder="请输入内容"
                      prefix-icon="el-icon-search"
                      v-model="salemans_search" class="salemans_search_input">
                    </el-input>
                    <el-button @click="add_man">添加成员</el-button>
                    <el-button type="danger" @click="del_man">删除成员</el-button>
                    <el-dialog
                      title="添加团队成员"
                      :visible.sync="add_man_dialog"
                      width="30%" class="addteam_lefdev">
                      <div>
                        <el-input
                          placeholder="请输入内容"
                          prefix-icon="el-icon-search"
                          v-model="addman_search">
                        </el-input>
                        <el-checkbox-group v-model="checked_addteam">
                          <el-checkbox v-for="addteam in addteam_noman" :label="addteam.id" :key="addteam.id" style="margin-left:0;width:23%;">{{addteam.name}}</el-checkbox>
                        </el-checkbox-group>
                        
                      </div>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="add_man_dialog = false">取 消</el-button>
                        <el-button type="primary" @click="add_man_fun">确 定</el-button>
                      </span>
                    </el-dialog>
                </div>
                <div class="teamman_div">
                  <hr/>
                  <div v-if="teammans.length!=0">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checked_teamman" @change="change_teamman">
                      <el-checkbox v-for="(teamman,index) in teammans" :label="teamman.id" :key="teamman.id" :id="'checkbox_'+teamman.id" class="checkbox_class" @mouseover.native="teamman_over(teamman.id)" @mouseout.native="teamman_out(teamman.id)">
                        {{teamman.name}}
                        <span class="redfont" v-if="teamman.teamleader">(负责人)</span>
                        <span>
                          <el-button type="danger" size="mini" :id="'btn_'+teamman.id" v-show="false" @click="setPrincipal(teamman)">设为负责人</el-button>
                        </span>
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-else>
                    此团队暂没有团队成员！
                  </div>

                </div>
              </div>
            </div>
          </div>
        </el-container>
      </el-container>
    </div>
</template>


<script>
let teamman_alldata = [];
export default {
  data() {
    return {
      //团队名搜索
      search_name: "",
      //团队备注名称
      team_backupname: "",
      //团队成员搜索
      salemans_search: "",
      //全部团队信息
      team_alldata: [],
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

      //团队分子团队信息,
      team_allsubdata: [],
      //团队成员变量
      checkAll: false,
      checked_teamman: [],
      teammans: teamman_alldata,
      teamman_alldata: [],
      isIndeterminate: false,

      //添加团队成员弹出框
      add_man_dialog: false,
      //添加团队成员弹出框搜索框
      addman_search: "",
      //多选框数据
      addteam_noman: [],
      checked_addteam: []
    };
  },
  created() {
    this.create_fun();
  },
  methods: {
    create_fun() {
      var self = this;
      this.Axios
        .get("/saler/saleTeam")
        .then(data => {
          if (data.status == 200) {
            self.team_alldata = data.data.data;
            var team_alldata_new = [];
            var team_alldata_subdata = [];
            var data = self.team_alldata,
              tree = (function(data, root) {
                var r,
                  o = {};
                var temp_data = [];
                data.forEach(function(a) {
                  a.children = o[a.id] && o[a.id].children;
                  o[a.id] = a;
                  if (a.parentId === root) {
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
            self.team_allsubdata = tree;
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
            click: function() {
              //全选默认为空
              self.checkAll = false;
              //重新选择，不会保存上一次的选择成员
              self.Axios.get("/saler/saleTeam/" + pId).then(data => {
                if (data.data.code == 0) {
                  self.select_index = pId;
                  self.select_name = data.data.data.saleTeam.teamName;
                  self.team_backupname = data.data.data.saleTeam.comment;
                  self.teamman_alldata = data.data.data.salers;
                  if (data.data.data.salers != undefined) {
                    //添加团队负责人字段
                    var temp_saler_list = data.data.data.salers;
                    var temp_saler_sumlist = [];
                    for (var i = 0; i < temp_saler_list.length; i++) {
                      if (
                        temp_saler_list[i].id ==
                        data.data.data.saleTeam.principalId
                      ) {
                        temp_saler_list[i].teamleader = true;
                      } else {
                        temp_saler_list[i].teamleader = false;
                      }
                      temp_saler_sumlist.push(temp_saler_list[i]);
                      // console.log(temp_saler_list[i]);
                    }
                    self.teammans = temp_saler_sumlist;
                  } else {
                    self.teammans = [];
                  }
                  self.checked_teamman = [];
                } else {
                  this.$message({
                    message: data.data.msg,
                    type: "warning"
                  });
                }
              });
            }
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
            node.data.teamName + "(" + node.data.salerCount + ")"
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
    //全选团队成员
    handleCheckAllChange(val) {
      console.log(val);
      var temp_teamman_data = [];
      for (var i = 0; i < this.teamman_alldata.length; i++) {
        temp_teamman_data.push(this.teamman_alldata[i].id);
      }
      if (val == false) {
      }
      this.checked_teamman = val ? temp_teamman_data : [];
      this.isIndeterminate = false;
    },
    //选择团队成员多选框变化
    change_teamman(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.teammans.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.teammans.length;
    },

    //鼠标移动移入事件
    teamman_over(elem) {
      document.getElementById("checkbox_" + elem).style.backgroundColor =
        "#fde7eb";
      document.getElementById("btn_" + elem).style.display = "block";
    },
    //鼠标移动离开事件
    teamman_out(elem) {
      document.getElementById("checkbox_" + elem).style.backgroundColor = "";
      document.getElementById("btn_" + elem).style.display = "none";
    },
    //团队备注离焦保存
    team_backup_replace() {
      var self = this;
      // console.log(self.select_index);
      let params = {
        id: self.select_index,
        teamName: self.select_name,
        comment: self.team_backupname
      };
      this.Axios
        .put("/saler/saleTeam/" + self.select_index, params)
        .then(data => {
          if (data.data.code == 0) {
            this.$message({
              message: "团队备注修改成功",
              type: "success"
            });
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.extCatch(err, this.team_backup_replace);
        });
    },
    //设为负责人
    setPrincipal(elem) {
      var self = this;
      // console.log(elem);
      let params = {
        // PRS:{
        id: parseInt(self.select_index),
        principalId: elem.id
        // }
      };
      this.Axios.put("/saler/saleTeam/setPrincipal", params).then(data => {
        if (data.data.code == 0) {
          //负责人标记更换
          for (var i = 0; i < self.teammans.length; i++) {
            if (self.teammans[i].id == elem.id) {
              this.teammans[i].teamleader = true;
            } else {
              this.teammans[i].teamleader = false;
            }
          }
          this.$message({
            message: "设置'" + elem.name + "'为'" + self.select_name + "'团队负责人成功",
            type: "success"
          });

          // console.log(JSON.stringify(self.teammans));
        } else {
          this.$message({
            message: data.data.msg,
            type: "warning"
          });
        }
      });
      // .catch(err => {
      //   this.extCatch(err, this.setPrincipal(elem));
      // });
    },
    //添加团队人员弹出框
    add_man() {
      var self = this;
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
      self.checked_addteam = [];
      self.add_man_dialog = true;
    },
    //添加团队成员确定按钮
    add_man_fun() {
      var self = this;
      self.add_man_dialog = false;
      // console.log(self.checked_addteam);
      // console.log(self.select_index);
      let params = {
        id: parseInt(self.select_index),
        salers: self.checked_addteam
      };
      this.Axios.post("/saler/saleTeam/salers", params).then(data => {
        if (data.data.code == 0) {
          for (var i = 0; i < data.data.data.length; i++) {
            this.teammans.push(data.data.data[i]);
          }
          this.$message({
            message: "团队添加成员成功！",
            type: "success"
          });
          self.create_fun();
        } else {
          this.$message({
            message: data.data.msg,
            type: "warning"
          });
        }
      });
    },
    //删除人员
    del_man() {
      var self = this;
      if (self.checked_teamman.length == 0) {
        this.$message({
          message: "没有选择成员！",
          type: "warning"
        });
        return false;
      }

      let params = {
        PRS: {
          saleTeamId: parseInt(self.select_index),
          salerId: self.checked_teamman
        }
      };
      this.Axios.delete("/saler/saleTeam/salers", params).then(data => {
        if (data.data.code == 0) {
          this.$message({
            message: "删除成员成功！",
            type: "success"
          });
          // console.log(data.data.data);
          self.teammans = data.data.data;
          self.create_fun();
          // console.log(self.team_allsubdata);
        } else {
          this.$message({
            message: data.data.msg,
            type: "warning"
          });
        }
      });
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
.redfont
  color red
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
.right_subdiv
  border 1px solid #d9d9d9
  width 92%
  padding 24px 30px 24px 30px
  margin-top 20px
  .salemans_bigdiv
    padding-top 10px
    .salemans_search_leftdiv
      width 28%
      height 70px
      float left
    .salemans_search_rightdiv
      width 70%
      height 70px
      float right
      text-align right
      .addteam_lefdev
        text-align left
      .salemans_search_input
        width 30%
    .checkbox_class
      padding 10px
      width 23%
      margin-left 0
    .teamman_div
      padding-top 70px
      // border-top 1px solid #ccc
  .cust_leftdiv
    color #666
</style>

