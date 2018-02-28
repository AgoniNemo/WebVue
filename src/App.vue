<template>
  <div id="app">
    <animationview></animationview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import animationview from 'components/animationview/animationview';

  export default {
    components: {
      animationview
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    position: absolute
    width: 100%
    height: 100%
</style>
