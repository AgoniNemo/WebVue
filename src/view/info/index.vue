<template>
    <el-card class="card-box" style="margin-top:10px;">
        <div class="info-container">
            <div class="info-header">
                <img  class="info-icon" :src=imageUrl>
            </div>
            <div class="info-content clearfix">
                <div class="header-image">
                    <img class="image-icon" :src="iconUrl">
                </div>
                <div class="user-info">
                    <h1 class="user-info-name">{{userModel.name}}</h1>
                    <router-link :to="{path: '/home'}">
                        <a style="float:right;height:30px;line-height:30px;">返回首页></a>
                    </router-link>
                </div>
                <div class="user-info-content">
                    <el-form label-position="left" :label-width="labelWidth" :model="userModel">
                        <el-form-item label="性别:" style="height:40px;">
                            <span>{{userModel.sex | filterSex}}</span>
                        </el-form-item>
                        <el-form-item label="年龄:" style="height:40px;">
                            <span>{{userModel.age | filterAge}}</span>
                        </el-form-item>
                        <el-form-item label="权限:">
                            <span>{{userModel.authority | filterAuthor}}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script type="text/ecmascript-6">
import url from '@/assets/image/nav.jpg';
import icon from '@/assets/image/header.jpg';
import { loadFromLocal } from '@/common/js/store.js';

export default {
    data() {
        return {
            userModel: loadFromLocal(null, 'logining', false),
            labelWidth: '80px'
        };
    },
    filters: {
        filterAge(age) {
            if (age === '') return '未知';
            return age;
        },
        filterSex(sex) {
            if (sex === '') return '未知';
            return (sex === '1') ? '男' : '女';
        },
        filterAuthor(auth) {
            if (auth === '') return '未知';
            switch (auth) {
                case '1000':
                    return '高级';
                default:
                    return '特级';
            }
        }
    },
    computed: {
        imageUrl() {
            return url;
        },
        iconUrl() {
            return icon;
        }
    }

};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.info-container
    height: 100%
    width: 100%
    .info-content
        margin: 10px 20px;
        height: 100%
        .header-image
            float:left;
            .image-icon
                height: 150px;
                width: 150px;
                border-radius: 8px;
                position: relative;
                top: -40px;
                border: 6px solid #fff;
        .user-info
            margin-left: 170px;
            .user-info-name
                font-size: 26px;
                font-weight: 600
                height: 30px
                line-height: 30px
                display: inline-block;
        .user-info-content
            margin-top: 10px;
            margin-left: 170px;
    .clearfix:after
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;

</style>
