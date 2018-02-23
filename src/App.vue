<template>
  <div id="app">
    <div class="home-wrapper">
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
    .home-wrapper
      display: flex
      .login-view
        background: red
        top: 50%
        height: 260px
        width: 375px
        .text
          display: inline-block
</style>
