<template>
  <div id="app">
    <div class="home-wrapper">
      <div class="login-view">
        <div class="text">
          <input type="text" placeholder="用户名">
        </div>
        <div class="password">
          <input type="password" placeholder="密码">
        </div>
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
        position: absolute
        top: 50%
        left: 50%
        height: 260px
        width: 375px
        margin-top: -130px
        margin-left: -187px
        background: #eee
        .text
          display: inline-block
          margin-top: 10px
          height: 36px
          width: 320px
        .password
          display: inline-block
          height: 36px
          width: 320px
</style>
