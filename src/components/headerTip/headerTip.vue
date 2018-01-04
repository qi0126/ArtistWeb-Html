<template>
  <div class="headerTip">
    <span>{{ text }}</span>
    <i class="iconfont closeIcon bt-hover" @click="closeMask"></i>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    text: {
      type: String
    }
  },
  methods: {
    closeMask() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
.headerTip
  display flex
  justify-content space-between
  align-items center
  border-bottom 1px solid #E6E6E6
  padding 1rem 1rem
  span
    border-left 3px solid $base-color
    padding-left 10px
    font-size 1.1rem
  .closeIcon:after
    content '\e656'
    color #A9A9A9
    font-size 0.7rem
</style>
