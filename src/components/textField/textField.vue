<template>
    <transition>
        <div class="text-field">
            <input @keyup.enter="loginClick" @blur="blur()" @onchange="inputEvents()" @change="updateData" v-model="newText" class="input-text" :type=type :placeholder=placeholder autocomplete="new-password" required>
            <span v-show="showText" class="text">{{promptString}}</span>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            isPassword: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                newText: '',
                showText: false
            };
        },
        methods: {
            updateData() {
                let dataName = this.isPassword ? 'password' : 'user';
                this.$emit(`update:${dataName}`, this.newText);
                console.log(dataName);
            },
            inputEvents() {
                console.log('ssss');
            },
            focus() {
                console.log(this.isPassword);
            },
            blur() {
                if (this.newText.length === 0) {
                    this.showText = true;
                } else {
                    this.showText = false;
                }
            },
            loginClick() {
                console.log('loginClick');
                this.$emit('loginClick', 'loginClick');
            }
        },
        computed: {
            placeholder() {
                let pl = this.isPassword ? '密码' : '用户名';
                return pl;
            },
            type() {
                let t = this.isPassword ? 'password' : 'text';
                return t;
            },
            promptString() {
                let pr = this.isPassword ? '密码不能为空!' : '用户名不能为空!';
                return pr;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

    .text-field
      display: inline-block;
      position: absolute;
      left: 27px;
      height: 36px;
      width: 320px;
      font-size: 0px;
      background: #fff;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      .input-text
        position: absolute;
        background-image: none;
        font-size: 12px;
        height: 26px;
        width: 305px;
        line-height: 26px;
        left: 10px;
        top: 5px;
        border: 0;
        outline: none;
        background: #eee;
        background-color: #fff;
    .red
        border: 1px solid #DC143C;
      .text
        position: relative;
        top: 40px
        color: #DC143C
        font-size: 13px;
      .text.v-enter
        opacity: 0
        color: #fff
      .text.v-enter-to
        opacity: 1
</style>
