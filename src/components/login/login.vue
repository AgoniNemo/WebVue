<template>
  <div class="login-view">
    <div class="content">
        <div class="user">
            <textField :user.sync=user></textField>
        </div>
        <div class="password">
            <textField :password.sync=password :isPassword=true></textField>
        </div>
        <div class="button-wrapper" @click="loginClick">
            <a class="button is-primary">登录</a>
        </div>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import textField from 'components/textField/textField';

  // const ERR_OK = 0;

  export default {
    data() {
      return {
        userModel: {
            type: Object
        },
        user: '',
        password: ''
      };
    },
    methods: {
      loginClick() {
        console.log(this.user + ':' + this.password);
        this.loadingAlert('登录中...');
        // this.$http.post('/user/login', {
        //   user: 'Test',
        //   password: '123456'
        // }).then((response) => {
        //   let resp = response.data;
        //   console.log(response);
        //   if (resp.code === ERR_OK) {
        //     this.userModel = resp.data;
        //     this.$nextTick(() => {
        //       /* 请求回来是异步的 所以只有在nextTick方法才能更新UI */
        //       this.$router.push({path: '/home'});
        //     });
        //   } else {
        //     this.warnAlert('开始跳转!');
        //   }
        // })
        // .catch(function (error) {
        //   console.log('error: ' + error);
        // });
      },
      showAlert(text) {
        this.$modal.open({
          autoClose: 3,
          transition: 'bounceDown',
          content: text
        });
      },
      warnAlert(text) {
        this.$notify.warning({content: text});
      },
      loadingAlert(text) {
        this.$notify.open({content: text, type: 'loading', duration: 100000});
      }
    },
    components: {
      textField
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login-view
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
      animation: contentslidein 1.5s
      @keyframes contentslidein
        0% {
          opacity: 0.4
          top: 30%
        }
        100% {
          opacity: 1
        }
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
          outline: none
          background-color: #20a0ff
          border-color: #20a0ff
          font-size: 15px
          cursor: pointer /** 当鼠标放在上面时变成手的样子 */
        .button:hover
          opacity: 0.8
</style>
