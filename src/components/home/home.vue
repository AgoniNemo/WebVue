<template>
  <div class="home">

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

</style>
