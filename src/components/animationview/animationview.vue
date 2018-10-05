<template>
    <div class="animation-view">
        <transition name="fade-thumb">
          <img class="first-img-thumb" src="../../assets/home/backThumbnails.png" v-show="(show == false)">
        </transition>
        <transition name="fade">
          <img class="first-img" src="../../assets/home/back.png" v-show="show" @load="imageOnload">
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        show: false
      };
    },
    methods: {
      imageOnload() {
        this.show = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .animation-view
    width: 100%;
    height: 100%;
    .fade-thumb-enter-active, .fade-thumb-leave-active
      transition: opacity 1s;
    .fade-thumb-enter, .fade-thumb-leave-to
      opacity: 0;
    .fade-enter-active, .fade-leave-active
      transition: opacity 1s;
    .fade-enter, .fade-leave-to
      opacity: 0;
    .first-img , .first-img-thumb
      position: fixed;
      width: 100%;
      height: 100%;
</style>
