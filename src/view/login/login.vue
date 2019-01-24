<template>
  <div class="login-view">
  <animationview></animationview>
    <form>
        <div class="content">
            <div class="user">
                <textField :user.sync=user @loginClick="loginClick" :isDisabled=isDisabled></textField>
            </div>
            <div class="password">
                <textField :password.sync=password :isPassword=true @loginClick="loginClick()" :isDisabled=isDisabled></textField>
            </div>
            <div class="button-wrapper" @click="loginClick">
                <a :class=btnClass>登录</a>
            </div>
        </div>
     </form>
  </div>
</template>

<script type="text/ecmascript-6">
  import textField from 'components/textField/textField';
  import animationview from 'components/animationview/animationview';
  import { mapActions } from 'vuex';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        user: '',
        password: '',
        btnClass: 'button is-primary',
        isDisabled: false,
        browser: ''
      };
    },
    created() {
        const userAgent = navigator.userAgent;
        this.browser = this.browserType(userAgent);
    },
    computed: {
      isEmpty() {
        if (this.password.length === 0 || this.user.length === 0) {
          return false;
        }
        return true;
      }
    },
    methods: {
      ...mapActions([
        'loginAction'
      ]),
      loginClick() {
        if (this.browser === 'ie' || this.browser === 'other') {
          this.warnAlert('本网站不支持IE或非主流浏览器!');
          return;
        }
        this.isLoading();
        this.isDisabled = true;
        if (this.isEmpty === false) {
          this.warnAlert('用户名或密码不能为空!');
          this.isLoading();
          return;
        }
        const loginParams = { user: this.user, password: this.password };
        this.loginAction(loginParams).then((res) => {
            if (res.code === ERR_OK.toString(10)) {
                this.$router.replace({path: 'home'});
            } else {
              this.warnAlert(res.message);
            }
            this.isDisabled = false;
            this.isLoading();
          }).catch(e => {
            this.isDisabled = false;
          });
      },
      isLoading() {
        let r = this.btnClass === 'button is-primary';
        this.btnClass = r ? 'button is-primary is-loading' : 'button is-primary';
      },
      browserType(explorer) {
        if (explorer.indexOf('MSIE') >= 0) {
            return 'ie';
        } else if (explorer.indexOf('Firefox') >= 0) {
            return 'Firefox';
        } else if (explorer.indexOf('Chrome') >= 0) {
            return 'Chrome';
        } else if (explorer.indexOf('Opera') >= 0) {
            return 'Opera';
        } else if (explorer.indexOf('Safari') >= 0) {
            return 'Safari';
        } else {
            return 'other';
        }
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
      textField,
      animationview
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login-view
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .content
      position: absolute;
      top: 50%;
      left: 50%;
      height: 200px;
      width: 375px;
      margin-top: -130px;
      margin-left: -187px;
      background: #fff;
      border-radius: 5px;
      animation: contentslidein 1.5s;
      @keyframes contentslidein
        0% {
          opacity: 0.4;
          top: 30%;
        }
        100% {
          opacity: 1;
        }
      .user
        margin-top: 20px;
        height: 66px;
      .password
        height: 65px;
      .button-wrapper
        height: 38px;
        width: 320px;
        margin-left: 27px;
        border-radius: 5px;
        .button
          width: 100%;
          outline: none;
          background-color: #20a0ff;
          border-color: #20a0ff;
          font-size: 15px;
          cursor: pointer; /** 当鼠标放在上面时变成手的样子 */
        .button:hover
          opacity: 0.8;

</style>
