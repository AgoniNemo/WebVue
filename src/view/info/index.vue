<template>
    <el-card class="card-box" style="margin-top:10px;">
        <div class="info-content">
            <div class="info-header">
                <img  class="info-icon" :src=imageUrl>
            </div>
        </div>
    </el-card>
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
    background: red;
    .info-header
        .info-icon
            width: 100%
            border-radius: 2px
</style>
