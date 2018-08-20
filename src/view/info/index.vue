<template>
    <div class="info-content">
        <div class="info-header">
            <img  class="info-icon" :src=imageUrl>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import url from '@/assets/image/nav.jpg';
    export default {

    computed: {
        imageUrl() {
            return url;
        }
    }

    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.info-content
    height: 100%
    width: 100%
    background: #f6f6f6
    .info-header
        position: relative
        top: 10px
        padding: 0px 20px
        .info-icon
            width: 100%
            height: 132px
            border-radius: 2px
</style>
