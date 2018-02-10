<template>
  <div id="app">
    <div class="home-wrapper">
      <animationview></animationview>
      <div class="login-view">
        <input type="text" name="user">
        <input type="password" name="password">
      </div>
    </div>
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

</style>
