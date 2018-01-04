<template>
  <div class="positionSetting">
    <div class="headerWrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>Artist</el-breadcrumb-item>
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
        <el-breadcrumb-item>职位设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="contentWrapper">
      <div class="leftWrapper">
        <div class="title">团队职位设置</div>
        <div class="main">
          <el-input prefix-icon="el-icon-search" size="small" placeholder="输入关键词搜索" class="searchInp"></el-input>
          <el-button size="small" icon="el-icon-circle-plus-outline" class="createGroupBtn" plain>创建新架构</el-button>
          <el-tree
          :data="companies"
          :props="defaultProps"
          :highlight-current="false"
          @node-click="handleNodeClick"
          :render-content="optionsRender"
          node-key="id">
          </el-tree>
        </div>
      </div>

      <div class="rightWrapper">
        <div class="title">职位权限设置</div>
        <div class="main">
          <div class="left">
            <div class="leftItem bt-hover" :class="{'active':selIndex == index}" v-for="(item,index) in allJurisdiction" @click="selNav(index)">
              <span class="desc">{{item.title}}</span>
            </div>
          </div>
          <div class="right" ref="jurisdictions">
            <div class="rightItem" v-for="(item,index) in allJurisdiction" id="myItem">
              <div class="rightItemTitle">{{item.title}}</div>
              <div class="rightItemContent">
                <div class="rightItemJurisdiction" v-for="jurisdictionItem in item.childs">
                  <div class="jurisdictionTitle">{{jurisdictionItem.title}}</div>
                  <el-checkbox-group v-model="test" class="checkboxs">
                    <el-checkbox
                      class="cb"
                      v-for="jurusdictions in jurisdictionItem.jurusdictions"
                      :key="jurusdictions.id"
                      :label="jurusdictions.title">
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      selIndex: 0,
      test: [],
      positions: [
        {
          id: 520,
          name: '尚金缘',
          children: [
            {
              id: 11,
              name: '开发部',
              children: [
                { id: 111, name: '前端工程师' },
                { id: 112, name: '后端工程师' }
              ]
            },
            {
              id: 22,
              name: '设计部',
              children: [{ id: 222, name: 'UI' }, { id: 221, name: 'UE' }]
            }
          ]
        }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      selId: null,
      allJurisdiction: [
        {
          id: 1,
          title: '产品管理',
          childs: [
            {
              id: 11,
              title: '产品库',
              status: false,
              jurusdictions: [
                { id: 111, title: '刷新产品库', status: true },
                { id: 112, title: '搜索产品', status: false }
              ]
            },
            {
              id: 12,
              title: '产品添加',
              status: false,
              jurusdictions: [
                { id: 121, title: '范德萨', status: true },
                { id: 122, title: '法规的发生', status: false }
              ]
            }
          ]
        },
        {
          id: 2,
          title: '推广类别',
          childs: [
            {
              id: 21,
              title: '推广类别',
              status: false,
              jurusdictions: [
                { id: 211, title: '发的撒谎', status: true },
                { id: 212, title: '好好干发货单', status: false }
              ]
            }
          ]
        },
        {
          id: 3,
          title: '推广栏目',
          childs: [
            {
              id: 31,
              title: '产品库',
              status: false,
              jurusdictions: [
                { id: 311, title: '刷新产品库', status: true },
                { id: 312, title: '搜索产品', status: false }
              ]
            },
            {
              id: 32,
              title: '产品添加',
              status: false,
              jurusdictions: [
                { id: 321, title: '范德萨', status: true },
                { id: 322, title: '法规的发生', status: false }
              ]
            }
          ]
        },
        {
          id: 4,
          title: '首页定制',
          childs: [
            {
              id: 41,
              title: '产品库',
              status: false,
              jurusdictions: [
                { id: 411, title: '刷新产品库', status: true },
                { id: 412, title: '搜索产品', status: false }
              ]
            },
            {
              id: 42,
              title: '产品添加',
              status: false,
              jurusdictions: [
                { id: 421, title: '范德萨', status: true },
                { id: 422, title: '法规的发生', status: false }
              ]
            }
          ]
        },
        {
          id: 5,
          title: '销售管理',
          childs: [
            {
              id: 51,
              title: '产品库',
              status: false,
              jurusdictions: [
                { id: 511, title: '刷新产品库', status: true },
                { id: 512, title: '搜索产品', status: false }
              ]
            },
            {
              id: 52,
              title: '产品添加',
              status: false,
              jurusdictions: [
                { id: 521, title: '范德萨', status: true },
                { id: 522, title: '法规的发生', status: false }
              ]
            }
          ]
        },
        {
          id: 6,
          title: '客户管理',
          childs: [
            {
              id: 61,
              title: '产品库',
              status: false,
              jurusdictions: [
                { id: 611, title: '刷新产品库', status: true },
                { id: 612, title: '搜索产品', status: false }
              ]
            },
            {
              id: 62,
              title: '产品添加',
              status: false,
              jurusdictions: [
                { id: 621, title: '范德萨', status: true },
                { id: 622, title: '法规的发生', status: false }
              ]
            }
          ]
        },
        {
          id: 7,
          title: '公司管理',
          childs: [
            {
              id: 71,
              title: '产品库',
              status: false,
              jurusdictions: [
                { id: 711, title: '刷新产品库', status: true },
                { id: 712, title: '搜索产品', status: false }
              ]
            },
            {
              id: 72,
              title: '产品添加',
              status: false,
              jurusdictions: [
                { id: 721, title: '范德萨', status: true },
                { id: 722, title: '法规的发生', status: false }
              ]
            }
          ]
        }
      ],
      heightLists: [],
      companies: []
    }
  },
  methods: {
    postionSet() {
      // 公司部门列表
      this.Axios.get('/company/postionSet')
        .then(res => {
          let result = res.data
          if (result.code == 0) {
            this.companies = result.data.companies // 所有一级公司
            let depts = result.data.depts
            if (depts && depts.length > 0) {
              depts.forEach(dept => {
                this.companies.push(dept)
              })
            }
          } else {
            this.$message.error(result.msg)
          }
        })
        .catch(err => {
          this.extCatch(err, this.postionSet)
        })
    },
    handleNodeClick(data, node) {
      let type = data.type // 0：公司 1：部门 2：职位
      let level = node.level // 当前点击的层级
      switch (type) {
        case 0:
          this.getChildCompanyOrDep(data)
          break
        case 1:
          console.log('部门')
          break
        case 2:
          console.log('职位')
          break
        default:
          this.$message.error('该职位类型无法确定，请联系后台开发人员')
      }
    },
    getChildCompanyOrDep(data) { // 二级菜单渲染还没做
      let params ={
        PRS: {
          companyId: data.id 
        }
      }
      this.Axios.get('/company/postionSet/list',params)
        .then(res => {
          let result = res.data
          if(result.code == 0){
            
          }else{
            this.$message.error(result.msg)
          }
        })
        .catch(err => {
          this.extCatch(err, this.getChildCompanyOrDep)
        })
    },
    selNav(index) {
      this.selIndex = index

      let myItems = document.querySelectorAll('#myItem')
      let total = myItems[index].offsetTop - 150
      this.$refs.jurisdictions.scrollTop = total
    },
    append(data) {
      console.log(data)
    },
    remove(node, data) {
      console.log(node)
      console.log(data)
    },
    positionMouseover(node) {
      this.selId = node.data.id
    },
    positionMouseout() {
      this.selId = null
    },
    optionsRender(h, { node, data, store }) {
      return (
        <span
          on-mouseover={() => this.positionMouseover(node)}
          on-mouseout={() => this.positionMouseout()}
          style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;"
        >
          <span>
            <span>{node.label}</span>
          </span>
          <span v-show={this.selId == node.data.id}>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.append(data)}
            >
              <i class="el-icon-plus" />
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              <i class="el-icon-delete" />
            </el-button>
          </span>
        </span>
      )
    },
    _handleScroll() {
      let scrollTop = this.$refs.jurisdictions.scrollTop
      for (let i = 0; i < this.heightLists.length; i++) {
        let height1 = this.heightLists[i]
        let height2 = this.heightLists[i + 1]
        if (scrollTop >= height1 && scrollTop < height2) {
          this.selIndex = i
        }
      }
    },
    _initGetHeights() {
      // 获取所有权限模块高度
      let height = 0
      this.heightLists.push(height)
      let myItems = document.querySelectorAll('#myItem')
      for (let i = 0; i < myItems.length; i++) {
        height += myItems[i].clientHeight + 16
        this.heightLists.push(height)
      }
    },
    _monitorScroll() {
      // 滚动监听
      let jurisdictions = this.$refs.jurisdictions
      jurisdictions.addEventListener('scroll', this._handleScroll)
    }
  },
  mounted() {
    this.postionSet()

    this._monitorScroll()
    this._initGetHeights()
  },
  watch: {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
.positionSetting
  .headerWrapper
    border-bottom 1px solid #D9D9D9
    padding-bottom 10px
  .contentWrapper
    display flex
    .title
      font-size 15px
      padding-left 10px
      margin 15px 0
      border-left 3px solid $base-color
    .leftWrapper
      width 300px
      flex 0 300px
      margin-right 20px
      .main
        box-sizing border-box
        border 1px solid #D9D9D9
        border-radius 5px
        height 750px
        overflow auto
        padding 10px
        .createGroupBtn
          margin 10px 0
          width 100%
    .rightWrapper
      flex 1
      .main
        border 1px solid #D9D9D9
        box-sizing border-box
        border-radius 5px
        height 750px
        overflow auto
        display flex
        .left
          width 150px
          flex 0 150px
          overflow auto
          border-right 1px solid #D9D9D9
          .leftItem
            box-sizing border-box
            border-left 3px solid #fff
            height 45px
            border-bottom 1px solid #F2F2F2
            color #333333
            display flex
            justify-content center
            align-items center
            transition background 0.5s
            &.active
              border-left 3px solid $base-color
              background-color #F2F2F2
            &:hover
              background-color #F2F2F2
            .desc
              border-left none
        .right
          flex 1
          padding 0 16px 16px 16px
          color #333333
          overflow auto
          .rightItem
            margin-top 16px
            .rightItemTitle
              color #B5B5B5
              margin-bottom 15px
            .rightItemContent
              box-shadow 0 0 5px #B5B5B5
              padding 15px
              border-radius 5px
              .rightItemJurisdiction
                .jurisdictionTitle
                  padding-bottom 10px
                  border-bottom 1px solid #F2F2F2
                .checkboxs
                  margin 0 0 20px 15px
                  .cb
                    margin 15px 15px 0 0
</style>
