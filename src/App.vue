<template>
  <div id="app">
    <div class="home-wrapper">
      <div class="content">
        <div class="user">
            <textField :user.sync=user></textField>
        </div>
        <div class="password">
            <textField :password.sync=password :isPassword=true></textField>
        </div>
        <div class="button-wrapper" @click="loginClick">
            <button class="button" type="button">
              <span class="text">登录</span>
            </button>
            <router-link to="home"></router-link>
        </div>
      </div>
    </div>
    <animationview></animationview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import animationview from 'components/animationview/animationview';
  import textField from 'components/textField/textField';

  export default {
    data() {
      return {
        user: '',
        password: ''
      };
    },
    methods: {
      loginClick() {
        console.log(this.user + ':' + this.password);
      }
    },
    components: {
      animationview,
      textField
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .home-wrapper
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 0
      .content
        position: absolute
        top: 50%
        left: 50%
        height: 200px
        width: 375px
        margin-top: -130px
        margin-left: -187px
        background: #fff
        border-radius: 5px
      .user
        margin-top: 20px
        height: 60px
      .password
        height: 56px
      .button-wrapper
        height: 38px
        width: 320px
        margin-left: 27px
        border-radius: 5px
        .button
          width: 100%
          height: 100%
          border-radius: 5px
          font-size: 15px
          outline: none
          background-color: #20a0ff
          border-color: #20a0ff
          cursor: pointer /** 当鼠标放在上面时变成手的样子 */
          .text
            color: #fff
        .button:hover
          opacity: 0.8
</style>
