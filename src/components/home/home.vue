<template>
  <div class="home">
    <div class="nav">
      <div class="image">
        <img :src="this.modelModel.headPath">
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
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .home
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    .nav
      height: 44px;
      width: 100%;
      background: #fff
      box-shadow: 0 10px 18px #888888;
    .content
      margin-top: 20px
      width: 100%
      height: 50%

</style>
