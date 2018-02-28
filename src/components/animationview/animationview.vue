<template>
  <transition>
    <div class="animation-view">
        <div class="first">
          <img class="first-img" src="../../assets/home/back.png">
        </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        show: false
      };
    },
    methods: {
      showInterface() {
        this.show = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .animation-view
    display: flex
    .first
      z-index: -1
      .first-img
        position: fixed
        width: 100%
        height: 100%
        animation: firstslidein 6s
        animation-direction: alternate
        @keyframes firstslidein
          0% {
            opacity: 0.4
          }
          100% {
            opacity: 1
          }

</style>
