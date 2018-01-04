<template>
    <div>
      <el-tree  
        :data="data4"  
        :props="defaultProps"  
        node-key="id"  
        default-expand-all  
        accordion
        :expand-on-click-node="false"  
        :render-content="renderContent">  
      </el-tree>  
    </div>
</template>

<script>
  // import $ from "jquery";
  let id = 1000;

  export default {
    data() {
      return {
        data4: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created() {
      this.create_fun();
    },
    methods: {
      create_fun(){
        // alert('aaa');
        setTimeout(function(){
          for(var i=0;i<document.getElementsByClassName('el-tree-node__content').length;i++){
            var tree_div = document.getElementsByClassName('el-tree-node__content')[i]; 
            tree_div.addEventListener("click",function(){
              this.children[1].childNodes[1].style.display = 'block';
            }); 
            tree_div.addEventListener("mouseover",function(){
              this.children[1].childNodes[1].style.display = 'block';
            }); 
            tree_div.addEventListener("mouseout",function(){
              this.children[1].childNodes[1].style.display = 'none';
            }); 
            tree_div.style.height = '32px';
          }

        },0);
      },
      append:function(store, data) {  
          store.append({ id: id++, label: 'testtest', children: [] }, data);  
      },  
      remove:function(store, data) {  
          store.remove(data);  
      },  
      renderContent:function(createElement, { node, data, store }) { 
        // console.log(store); 
          var self = this;  
          return createElement('div',{attrs:{  
                  style:"width:100%;height:2rem;" 
              }}, [  
              createElement('span', node.label),  
              createElement('span', {attrs:{  
                  style:"float: right; margin-right: 20px;display:none;",
                  onmouseover:'alert("aaa")'
              }},[  
                  createElement('el-button',{attrs:{  
                      size:"mini"  
                  },on:{
                      click:function() {  
                          console.info("点击了节点" + data.id + "的修改按钮");  
                          // store.append({ id: self.baseId++, label: 'testtest', children: [] }, data);  
                      }
                  }},"修改ID:"+data.id),  
                  createElement('el-button',{attrs:{  
                      size:"mini"  
                  },on:{  
                      click:function() {  
                          console.info("点击了节点" + data.id + "的删除按钮");  
                          store.remove(data);  
                      }  
                  }},"删除"),  
              ]),  
          ]);  
      }  
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    #pro_rightdiv
        width 70%
        float right 
        height 500px
</style>