<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
          <el-breadcrumb-item :to="{ path: '/' }">Artist后台</el-breadcrumb-item>
          <el-breadcrumb-item>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售人员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <hr/>

      <el-container>
        <el-aside class="left_sale_menu">
          <div class="topnav leftmenu">
             <span class="red_line">|</span> 销售人员列表
          </div>
          <div class="left_menu_div">
            <div class="left_submenu_div">
              <el-input
                placeholder="请输入关键字搜索"
                v-model="search_name">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button icon="el-icon-circle-plus-outline" style="width:100%" @click="add_customer">添加新员工</el-button>
              <el-button class="add_cust_btn" @click="add_toteam_fun">添加到团队</el-button>
              <el-dialog
                title="添加到团队"
                :visible.sync="add_toteam_dialog"
                center>
                <div>
                  <el-row>
                    <el-radio-group v-model="add_toteam_data" @change="add_toteam_change">
                      <el-radio v-for="team in allteam_data" :label="team.id" :key="team.id" style="width:32%;">{{team.teamName}}</el-radio>
                    </el-radio-group>
                  </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="add_toteam_dialog = false">取 消</el-button>
                  <el-button type="primary" @click="toteam_save(add_toteam_data)">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="delsaleman(multipleSelection)" type="danger" class="del_cust_btn">删除员工</el-button>
            </div>
            <div class="salemans_class">
              <el-table
                ref="multipleTable"
                :data="salemans"
                tooltip-effect="dark"
                :show-header = 'false'
                @row-click = "rowclick"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                  type="selection" class="salemans_table">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-aside>
        
        <el-container>
          <div class="right_div topnav">
            <span class="red_line">|</span> 销售人员信息<br/>
            <div class="right_subdiv">
              <el-row>
                <el-col :span="12">
                  <div class="cust_leftdiv">
                    <div>
                      <div class="cust_lefttxt">名称</div>
                      <div class="input_name">
                        <el-input placeholder="请填写员工名称" v-model="salemans_data.saler.name" @blur="save_saleman_fun"></el-input>
                        <span class="red_star">*</span>
                      </div>
                    </div>
                    <div>
                      <div class="cust_lefttxt">昵称</div>
                      <div class="input_name">
                        <el-input placeholder="请输入呢称" v-model="salemans_data.saler.nickName" @blur="save_saleman_fun"></el-input>
                        <span class="red_star">*</span>
                      </div>
                    </div>
                    <div>
                      <div class="cust_lefttxt">工号</div>
                      <div class="input_name">
                        <el-input placeholder="请输入工号" v-model="salemans_data.saler.jobNumber" @blur="save_saleman_fun"></el-input>
                      <span class="red_star">*</span>
                    </div>
                    </div>
                    <div>
                      <div class="cust_lefttxt">性别选择</div>
                      <div class="input_name">
                        <el-select placeholder="男" v-model="salemans_data.saler.gender"  @blur="save_saleman_fun">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="cust_leftdiv">
                    <div>
                      <div class="cust_lefttxt">联系电话</div>
                      <div class="input_name">
                        <el-input placeholder="请输入联系电话" v-model="salemans_data.saler.phone" @blur="save_saleman_fun"></el-input>
                      </div>
                      <span class="red_star">*</span>
                    </div>
                    <div>
                      <div class="cust_lefttxt">所属团队</div>
                      <div class="input_name">
                        <el-select placeholder="请选择所属团队" v-model="salemans_data.saler.teamId" @blur="save_saleman_fun">
                          <el-option
                            v-for="item in allteam_data"
                            :key="item.id"
                            :label="item.teamName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div>
                      <div class="cust_lefttxt">密码设置</div>
                      <div class="input_name">
                        <el-input class="input_name" placeholder="请输入密码" v-model="salemans_data.saler.password" @blur="save_saleman_fun"></el-input>
                      </div>
                      <span class="red_star">*</span>
                    </div>
                    <div>
                      <div class="cust_lefttxt">职位设置</div>
                      <div class="input_name">
                        <el-select v-model="value5"  multiple placeholder="请选择职位" @blur="save_saleman_fun">
                          <el-option
                            v-for="item in job_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <br/>
              <div class="cust_add_div">
                跟进客户列表
                <!-- <div> -->
                <span class="cust_top_rightspan">
                  <el-input
                    placeholder="请输入关键字搜索"
                    prefix-icon="el-icon-search"
                   class="search_cust_input">
                  </el-input>

                  <el-button icon="el-icon-circle-plus" @click="add_newcust_fun" class="cust_add_btn">添加跟进客户</el-button>
                    <el-dialog
                    title="添加跟进客户"
                    :visible.sync="add_cust_dialog"
                    width="30%"
                    center>
                    <el-input
                      placeholder="请输入关键字搜索"
                      v-model="search_name" id="">
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <div>
                      <el-row>
                        <el-checkbox-group v-model="checked_newcust" @change="checked_newcust_Change">
                          <el-checkbox v-for="newcust in add_newcust_data" :label="newcust.id" :name="newcust.customerName" :key="newcust.customerName" style="width:18%;">{{newcust.customerName}}</el-checkbox>
                        </el-checkbox-group>
                      </el-row>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="add_cust_dialog = false">取 消</el-button>
                      <el-button type="primary" @click="add_newcust_save">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-button type="danger" @click="customer_data(checked_cust)">删除客户</el-button>
                </span>
              </div>
              <hr/>
              <div>
                <div v-html="customersdata_display"></div>
                <el-row>
                  <el-checkbox-group v-model="checked_cust" @change="checked_cust_Change">
                    <el-checkbox v-for="cust in customers_data" :label="cust.id" :key="cust.id" style="width:18%;">{{cust.customerName}}</el-checkbox>
                  </el-checkbox-group>
                </el-row>
              </div>
              <div class="add_save_div" v-show="custsave_btn_div"><el-button type="primary" @click="add_save">保存</el-button></div>
            </div>
          </div>
        </el-container>
      </el-container>
    </div>
</template>


<script>
const salemans_list = {
  saler: {
    id: -1,
    name: "",
    nickName: "",
    jobNumber: "",
    password: "",
    gender: "",
    phone: "",
    departmentId: "",
    jobtitleId: "",
    status: "",
    teamId: "",
    accountId: "",
    companyId: "",
    createAccountId: "",
    createTime: ""
  },
  customers: ""
};
export default {
  data() {
    return {
      //员工列表
      salemans: [],
      //员工信息
      salemans_data: salemans_list,

      custsave_btn_div: false,
      //添加新员工弹出框
      add_customer_dialog: false,
      //选中员工信息
      checked_saleman_Id: -1,
      checked_saleman_data: [],
      //添加到团队弹出框
      add_toteam_dialog: false,
      //添加到团队动态数据
      add_toteam_data: [],
      //全部团队信息
      allteam_data: [],
      //跟进客户信息列表
      customers_data: [],
      customersdata_display: "",

      //添加客户信息弹窗
      add_cust_dialog: false,
      //获取客户(销售未添加的客户)
      add_newcust_data: [],
      //选中添加跟进客户
      checked_newcust: [],
      //性别
      options: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      value5: [],
      //跟进客户列表开始
      checkAll: false,
      //选中的客户
      checked_cust: [],
      isIndeterminate: true,
      //跟进客户列表结束
      job_options: [
        {
          value: "1",
          label: "客服专员"
        },
        {
          value: "2",
          label: "区域经理"
        },
        {
          value: "3",
          label: "客服经理"
        },
        {
          value: "4",
          label: "大区域经理"
        }
      ],
      value: "",
      search_name: "",

      multipleSelection: []
    };
  },
  created() {
    this.create_fun();
  },
  methods: {
    create_fun() {
      var self = this;
      this.Axios
        .get("/saler/saler")
        .then(data => {
          if (data.status == 200) {
            self.salemans = data.data.data;
            //读取第一个员工的信息
            if (self.salemans.length != 0) {
              this.customer_load(self.salemans[0].id);
            }
          }
        })
        .catch(err => {
          this.extCatch(err, this.create_fun);
        });
      this.Axios
        .get("/saler/saleTeam")
        .then(data => {
          if (data.status == 200) {
            self.allteam_data = data.data.data;
            console.log(self.allteam_data);
          }
        })
        .catch(err => {
          this.extCatch(err, this.create_fun);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除员工
    delsaleman(data) {
      // alert(JSON.stringify(data));
      var delsaleman_list = [];
      for (var i = 0; i < data.length; i++) {
        delsaleman_list.push(data[i].id);
      }
      // console.log(delsaleman_list);
      this.Axios
        .delete("/saler/saler/batch", { params: { ids: delsaleman_list } })
        .then(data => {
          console.log(data);
          if (data.data.code == 0) {
            this.$notify({
              title: "成功",
              message: data.data.msg,
              type: "success"
            });
            this.create_fun();
          } else {
            this.$notify.error({
              title: "错误",
              message: data.data.msg
            });
          }
        });
      // .catch(err => {
      //   this.extCatch(err, this.delsaleman(data));
      // });
    },
    //点击跟进员工选择事件
    rowclick(row, event, column) {
      this.customer_load(row.id);
    },
    //用接口读取员工资料信息
    customer_load(elem) {
      var self = this;
      self.checked_saleman_Id = elem;
      self.custsave_btn_div = false;
      this.Axios
        .get("/saler/saler/" + elem)
        .then(data => {
          if (data.status == 200) {
            self.salemans_data = [];
            self.salemans_data = data.data.data;
            if (self.salemans_data.customers != null) {
              self.customers_data = self.salemans_data.customers;
              self.customersdata_display = "";
            } else {
              self.customers_data = [];
              self.customersdata_display = "此销售人员没有跟进客户！";
            }
          }
        })
        .catch(err => {
          this.extCatch(err, this.customer_load(elem));
        });
    },
    //修改员工信息
    save_saleman_fun() {
      var self = this;
      self.salemans_data.customersids = self.checked_newcust;
      // console.log(self.salemans_data);

      var modi_saleman_data = {};
      //id
      modi_saleman_data.id = this.salemans_data.saler.id;
      //姓名
      modi_saleman_data.name = this.salemans_data.saler.name;
      //昵称
      modi_saleman_data.nickName = this.salemans_data.saler.nickName;
      //电话
      modi_saleman_data.phone = this.salemans_data.saler.phone;
      //工号
      modi_saleman_data.jobNumber = this.salemans_data.saler.jobNumber;
      //性别
      modi_saleman_data.gender = this.salemans_data.saler.gender;
      //组织架构
      modi_saleman_data.departmentId = this.salemans_data.saler.departmentId;
      //职位
      modi_saleman_data.jobtitleId = this.salemans_data.saler.jobtitleId;
      //创建人id
      modi_saleman_data.create_account_id = this.salemans_data.saler.createAccountId;
      //密码
      modi_saleman_data.password = this.salemans_data.saler.password;
      //跟进客户id数组
      modi_saleman_data.customersids = self.salemans_data.customersids;
      // console.log(modi_saleman_data);
      let params = {
        modi_saleman_data
      };
      this.Axios
        .put("/saler/saler", modi_saleman_data)
        .then(data => {
          if (data.status == 200) {
            //修改后销售人员列表更新
            self.salemans = data.data.data;
          }
        })
        .catch(err => {
          this.extCatch(err, this.save_saleman_fun);
        });
    },
    //添加新员工按钮
    add_customer() {
      var self = this;
      self.salemans_data = salemans_list;
      self.custsave_btn_div = true;
      //跟进客户列表
      self.customers_data = [];
      self.customersdata_display = "此销售人员没有跟进客户！";
    },
    //添加到团队按钮
    add_toteam_fun() {
      var self = this;
      if (self.multipleSelection.length != 0) {
        self.add_toteam_dialog = true;
        this.Axios
          .get("/saler/saleTeam")
          .then(data => {
            if (data.status == 200) {
              self.allteam_data = data.data.data;
            }
          })
          .catch(err => {
            this.extCatch(err, this.add_toteam_fun);
          });
      } else {
        this.$notify({
          title: "警告",
          message: "没有选中的员工！",
          type: "warning"
        });
      }
    },
    //添加团队确认按钮
    toteam_save(value) {
      var self = this;
      self.add_toteam_dialog = false;
      self.checked_saleman_data = [];
      for (var i = 0; i < self.multipleSelection.length; i++) {
        self.checked_saleman_data.push(self.multipleSelection[i].id);
      }
      let params = {
        id: value,
        salers: self.checked_saleman_data
      };
      this.Axios
        .post("/saler/saleTeam/salers", params)
        .then(data => {
          if (data.data.code == 0) {
            this.$notify({
              title: "成功",
              message: data.data.msg,
              type: "success"
            });
            this.create_fun();
          } else {
            this.$notify.error({
              title: "错误",
              message: data.data.msg
            });
          }
        })
        .catch(err => {
          this.extCatch(err, this.toteam_save(value));
        });
    },

    //跟进客户js开始
    checked_cust_Change(value) {
      console.log(value);
    },
    customer_data(value) {
      alert(value);
    },
    //添加新客户弹窗事件
    add_newcust_fun() {
      var self = this;
      self.add_cust_dialog = true;
      this.Axios
        .get("/saler/saler/customers")
        .then(data => {
          self.add_newcust_data = data.data.data;
        })
        .catch(err => {
          this.extCatch(err, this.add_cust_fun);
        });
    },
    //添加跟进客户的方法
    checked_newcust_Change(value) {},
    //保存跟进客户
    add_newcust_save() {
      var self = this;
      // console.log(self.checked_saleman_Id);
      let params = {
        salerId: self.checked_saleman_Id,
        customersids: self.checked_newcust
      };
      this.Axios
        .post("/saler/saler/customers", params)
        .then(data => {
          if (data.data.code == 0) {
            self.customers_data = data.data.data;
            if (self.customers_data.length == 0) {
              self.customersdata_display = "此销售人员没有跟进客户！";
            } else {
              self.customersdata_display = "";
            }
          } else {
            this.$notify.error({
              title: "错误",
              message: data.data.msg
            });
          }
        })
        .catch(err => {
          this.extCatch(err, this.add_cust_fun);
        });
      this.add_cust_dialog = false;
    },
    //添加到团队数据
    add_toteam_change(value) {
      console.log(value);
    },

    //跟进客户js结束
    //添加新用户按钮
    add_save() {
      var add_saleman_data = {};
      //姓名
      add_saleman_data.name = this.salemans_data.saler.name;
      //昵称
      add_saleman_data.nickName = this.salemans_data.saler.nickName;
      //电话
      add_saleman_data.phone = this.salemans_data.saler.phone;
      //工号
      add_saleman_data.jobNumber = this.salemans_data.saler.jobNumber;
      //性别
      add_saleman_data.gender = this.salemans_data.saler.gender;
      //组织架构
      add_saleman_data.departmentId = this.salemans_data.saler.departmentId;
      //职位
      add_saleman_data.jobtitleId = this.salemans_data.saler.jobtitleId;
      //创建人id
      add_saleman_data.create_account_id = this.salemans_data.saler.createAccountId;
      //密码
      add_saleman_data.password = this.salemans_data.saler.password;

      var customersids = [];
      for (var i = 0; i < this.customers_data.length; i++) {
        customersids.push(this.customers_data[i].id);
      }
      add_saleman_data.customersids = customersids;
      this.Axios
        .post("/saler/saler", add_saleman_data)
        .then(data => {
          if (data.data.code == 0) {
            this.$notify({
              title: "成功",
              message: data.data.msg,
              type: "success"
            });
            this.create_fun();
          } else {
            this.$notify.error({
              title: "错误",
              message: data.data.msg
            });
          }
        })
        .catch(err => {
          this.extCatch(err, this.add_cust_fun);
        });
    }
  }
};
</script>

<style>
.salemans_class table {
  min-width: 100%;
}
.salemans_class tr {
  cursor: pointer;
}
.cust_leftdiv div {
  height: 50px;
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
  // font-size 1.2rem
  height 30px
  line-height 2
  padding-left 20px
  width 100%
  .red_line
    color #e60e32
    font-weight bolder
.leftmenu
  width 90%
.left_menu_div
  padding 20px
  .left_submenu_div
    padding 10px 16px 10px 16px
    line-height 3.5
    border 1px solid #d9d9d9
    .add_cust_btn
      margin-left 0
    .del_cust_btn
      margin-left 11px
  .salemans_class
    border-left 1px solid #d9d9d9
    border-right 1px solid #d9d9d9
.right_subdiv
  border 1px solid #d9d9d9
  width 92%
  padding 24px 30px 24px 30px
  margin-top 20px
  .cust_add_div
    width 100%
    height 50px
    .cust_top_rightspan
      float right
      width 575px
    .cust_add_btn
      margin-left 110px
  .search_cust_input
    width 210px
  .cust_leftdiv
    color #666
    .cust_lefttxt
      float left
      text-align right
      width 20%
    .input_name
      float right
      width 75%
    .red_star
      font-size 16px
      color #e60e32
      float left
  .add_save_div
    text-align center
</style>

