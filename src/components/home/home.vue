<template>
  <div class="home">
    <div class="nav">
      <div class="image">
        <img :src=imageUrl>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {loadFromLocal} from '@/common/js/store.js';

  export default {
    data() {
      return {
        modelModel: loadFromLocal(this.$route.query.user, 'logining', false)
      };
    },
    created() {
      console.log(this.modelModel);
    },
    computed: {
        imageUrl() {
            let headPath = this.modelModel.headPath ? this.modelModel.headPath : 'https://pic4.zhimg.com/51e518b2017021625f22ad0f5e09dd1d_is.jpg';
            return headPath;
        }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .home
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff
    .nav
      height: 44px
      width: 100%
      box-shadow: 0 10px 18px #888888
      themeColor()
      .image
        display: inline-block
        position: absolute
        top: 4px
        right: 10px
        height: 40px
        width: 40px
        img
          border-radius: 50%
    .content
      margin-top: 20px
      width: 100%
      height: 50%

</style>
