<template>
    <div class="animation-view">
        <img class="first-img" src="../../assets/home/back.png">
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
      showInterface() {
        this.show = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .animation-view
    width: 100%;
    height: 100%;
    .first-img
      position: fixed;
      width: 100%;
      height: 100%;
      animation: firstslidein 4s linear;
      animation-direction: alternate;
      @keyframes firstslidein
        0% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }

</style>
