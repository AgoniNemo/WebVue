<template>
  <div id="app">
    <animationview></animationview>
    <div class="home-wrapper">
      <div class="login-view">
        <div class="user">
          <textField></textField>
        </div>
        <div class="password">
          <textField :isPassword=true></textField>
        </div>
      </div>
      <div class="button">
        <button type="button">登录</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import animationview from 'components/animationview/animationview';
  import textField from 'components/textField/textField';

  export default {
    components: {
      animationview,
      textField
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
        background: #fff
        border-radius: 5px
        .user
          margin-top: 10px
        .password
          margin-top: 56px
        .button
          color: #fff
          background: #20a0ff
          border-color: #20a0ff
</style>
