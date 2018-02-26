<template>
    <div class="text-field">
        <input class="text" :type=type :placeholder=placeholder>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            isPassword: {
                type: Boolean,
                default: false
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
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .text-field
      display: inline-block
      position: absolute
      left: 27px
      height: 36px
      width: 320px
      font-size: 0px
      background: #fff
      border-radius: 4px
      border: 1px solid #bfcbd9
      .text
        position: absolute
        font-size: 12px
        height: 26px
        width: 310px
        line-height: 26px
        left: 10px
        top: 5px
        border: 0
        outline: none
        background: #eee
</style>
