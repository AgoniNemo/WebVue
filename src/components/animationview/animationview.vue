<template>
  <div class="animation-view">
    <div class="fsrit">
      <img class="fsrit-img" src="../../assets/home/back.png" width="100%" height="100%">
    </div>
    <div class="second">
      <img class="second-img" src="../../assets/home/back.png" width="100%" height="100%">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .animation-view
    display: flex
    position: absolute
    background: no-repeat
    background-size: contain
    background-color: #464646
    .fsrit
      .fsrit-img
        z-index: 10
    .second
      .second-img
        position: absolute
        z-index: 10
        left: 80%

</style>
