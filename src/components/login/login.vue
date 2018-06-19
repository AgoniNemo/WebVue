<template>
  <div class="login-view">
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
  import {saveToLocal} from '@/common/js/store.js';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        userModel: {
            type: Object
        },
        user: '',
        password: '',
        btnClass: 'button is-primary',
        isDisabled: false
      };
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
      loginClick() {
        this.isLoading();
        this.isDisabled = true;
        if (this.isEmpty === false) {
          this.warnAlert('用户名或密码不能为空!');
          this.isLoading();
          return;
        }
        this.$http.post('/user/login', {
          user: this.user,
          password: this.password
        }).then((response) => {
          let resp = response.data;
          if (resp.code === ERR_OK.toString(10)) {
            this.userModel = resp.data;
            saveToLocal(this.userModel.user, 'logining', this.userModel);
            this.$nextTick(() => {
              /* 请求回来是异步的 所以只有在nextTick方法才能更新UI */
              this.$router.replace({path: 'home', query: { user: this.userModel.user }});
            });
          } else {
            this.warnAlert(resp.message);
          }
          this.isDisabled = false;
          this.isLoading();
        })
        .catch(function (error) {
          console.log('error: ' + error);
        });
      },
      isLoading() {
        let r = this.btnClass === 'button is-primary';
        this.btnClass = r ? 'button is-primary is-loading' : 'button is-primary';
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
