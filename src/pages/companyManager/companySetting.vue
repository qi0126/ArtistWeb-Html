<template>
  <div class="companySetting">
    <div class="headerWrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>Artist</el-breadcrumb-item>
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
        <el-breadcrumb-item>公司设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="btnsWrapper">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addCompanyDialog = true">新增公司</el-button>
    </div>

    <div class="contentWrapper">
      <el-table
        :data="companys"
        border
        style="width:100%">
        <el-table-column
          width="350"
          align="center"
          label="公司名称">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.companyName" @change="changeSetting(scope.row,'companyName')"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="350"
          align="center"
          label="服务地址">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.url" @change="changeSetting(scope.row,'url')"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="300"
          align="center"
          label="公司logo">
          <template slot-scope="scope">
            <img class="logoImg" :src="scope.row.logoUrl" alt="暂无Logo">
          </template>
        </el-table-column>
        <el-table-column
          width="350"
          align="center"
          label="公司状态">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.state" :label="1" @change="changeSetting(scope.row,'state')">有效</el-radio>
            <el-radio v-model="scope.row.state" :label="0" @change="changeSetting(scope.row,'state')">无效</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          width="335"
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="delCompany(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="dialogWrapper">
      <el-dialog
        title="添加新公司"
        :visible.sync="addCompanyDialog"
        width="30%">
        <div class="addCompanyDialog">
          <div class="item">
            <span class="text">公司名称：</span>
            <el-input size="small" v-model.trim="addCompanyData.companyName" placeholder="请填写公司名称"></el-input>
          </div>
          <div class="item">
            <span class="text">服务地址：</span>
            <el-input size="small" v-model.trim="addCompanyData.url" placeholder="请填写公司服务地址"></el-input>
          </div>
          <div class="item">
            <span class="text">公司logo：</span>
            <img :src="uploadImg" class="bgImg bt-hover" alt="暂无默认背景图" onClick="logoFile.click()">
            <input type="file" id="logoFile" @change="logoFileEvent" hidden>
          </div>
          <div class="item">
            <span class="text">公司状态：</span>
            <el-radio v-model="addCompanyData.state" :label="1">有效</el-radio>
            <el-radio v-model="addCompanyData.state" :label="0">无效</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCompanyDialog = false">取 消</el-button>
          <el-button type="primary" @click="addCompanyEvent">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import utils from '@/commons/Batar/utils'
export default {
  data() {
    return {
      companys: [],
      addCompanyDialog: false,
      uploadImg: '/static/imgs/syBg.png',
      addCompanyData: {
        companyName: '',
        url: '',
        state: 1,
        logoUrl: ''
      }
    }
  },
  methods: {
    delCompany(id) {
      this.$confirm('确认永久删除此公司?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.Axios
            .delete(`company/company/${id}`)
            .then(res => {
              let result = res.data
              if (result.code == 0) {
                this.$message.success('删除成功')
                this.getCompanysEvent()
              } else {
                this.$message.error('删除成功')
              }
            })
            .catch(err => {
              this.extCatch(err, this.delCompany)
            })
        })
        .catch(err => {})
    },
    logoFileEvent(e) {
      utils.encodeBase64(e).then(data => {
        this.uploadImg = data
        // this.addCompanyData.logoUrl = data
      })
    },
    getCompanysEvent() {
      this.Axios
        .get('company/company')
        .then(res => {
          let result = res.data
          if (result.code == 0) {
            this.companys = result.data.list
          } else {
            this.$message.error(result.msg)
          }
        })
        .catch(err => {
          this.extCatch(err, this.getCompanysEvent)
        })
    },
    changeSetting(row, prsName) {
      let params = {
        id: row.id,
        [prsName]: row[prsName]
      }
      this.Axios
        .put('company/company', params)
        .then(res => {
          let result = res.data
          if (result.code == 0) {
            this.$message.success('修改成功')
          } else {
            this.$message.error(result.msg)
          }
        })
        .catch(err => {
          this.extCatch(err, this.changeSetting)
        })
    },
    addCompanyEvent() {
      if (this.addCompanyData.companyName == '') {
        this.$message.error('公司名称不能为空')
        return false
      }
      if (this.addCompanyData.url == '') {
        this.$message.error('公司服务地址不能为空')
        return false
      }
      // if (this.addCompanyData.logoUrl == '') {
      //   this.$message.error('请上传logo')
      //   return false
      // }
      this.Axios
        .post('company/company', this.addCompanyData)
        .then(res => {
          let result = res.data
          if (result.code == 0) {
            this.$message.success('添加公司成功')
            this.getCompanysEvent()
            this.addCompanyDialog = false
            this.addCompanyData = {
              companyName: '',
              url: '',
              state: 1,
              logoUrl: ''
            }
          } else {
            this.$message.error(result.msg)
          }
        })
        .catch(err => {
          this.extCatch(err, this.addCompanyEvent)
        })
    }
  },
  created() {
    this.getCompanysEvent()
  },
  watch: {
    addCompanyDialog(val) {
      if (!val) {
        this.addCompanyData = {
          companyName: '',
          url: '',
          state: 1,
          logoUrl: ''
        }
        this.uploadImg = '/static/imgs/syBg.png'
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.companySetting
  .btnsWrapper
    margin 10px 0
  .headerWrapper
    border-bottom 1px solid #D9D9D9
    padding-bottom 10px
  .contentWrapper
    .logoImg
      height 40px
  .dialogWrapper
    .addCompanyDialog
      width 80%
      .item
        display flex
        align-items center
        margin-bottom 20px
        .text
          white-space nowrap
      .bgImg
        height 100px
        border-radius 5px
</style>
