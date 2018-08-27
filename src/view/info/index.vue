<template>
    <el-card class="card-box" style="margin-top:10px;">
        <div class="info-content">
            <div class="info-header">
                <img  class="info-icon" :src=imageUrl>
            </div>
            <div>
                <div class="info-image">
                    <img :src="iconUrl">
                </div>
                <div class="info-name">
                    {{this.userModel.name}}
                </div>
            </div>
        </div>
    </el-card>
</template>

<script type="text/ecmascript-6">
import url from '@/assets/image/nav.jpg';
import icon from '@/assets/image/header.jpg';
import { mapGetters } from 'vuex';

export default {

    computed: {
        ...mapGetters([
            'userModel',
            'videoModel'
        ]),
        imageUrl() {
            return url;
        },
        iconUrl() {
            return icon;
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
    .info-image
        display: inline-block
        position: relative
        width: 160px
        height: 160px
        border: 5px solid #fff
        background: #fff
        margin: -20px 0 0 20px;
        border-radius: 5px;
    .info-name
        display: inline-block
        height: 40px;
        width: 100px;
        font-weight: 20px;
</style>
