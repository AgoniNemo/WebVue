<template>
  <div class="home">

  </div>
</template>

<script type="text/ecmascript-6">
import {loadFromLocal} from '@/common/js/store.js';

  export default {
    props: {
      userModel: {
          type: Object
      }
    },
    created() {
      console.log(this.$route.params);
      let model = loadFromLocal('Test', 'logining', false);
      console.log(model);
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
