<template>
    <el-card class="card-box" style="margin-top:10px;">
        <div class="info-container" v-loading="loading" element-loading-text="拼命加载中...">
            <div class="info-header">
                <img  class="info-icon" :src=imageUrl>
            </div>
            <div class="info-content clearfix">
                <div class="header-image">
                    <div class="image-icon">
                        <img  :src="headPath">
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="updateImageAction">
                            <div class="float-image-view">
                            <div style="position: relative;top:30px;">
                                <img :src="cameraUrl" style="width:30px;height:30px;color:red;">
                            </div>
                            <div style="position: relative;top:40px;">修改我的头像</div>
                        </div>
                        </el-upload>
                    </div>
                </div>
                <div class="user-info">
                    <h1 class="user-info-name">{{userModel.name}}</h1>
                    <router-link :to="{path: '/home'}">
                        <a style="float:right;height:30px;line-height:30px;">返回首页></a>
                    </router-link>
                </div>
                <div class="user-info-content">
                    <el-form label-position="left" :label-width="labelWidth" :model="userModel">
                        <el-form-item label="性别:" style="height:60px; border-bottom: 1px solid #ebebeb;">
                            <a @click="tapAction(0)">
                                <span>{{userModel.sex | filterSex}}</span>
                            </a>
                        </el-form-item>
                        <el-form-item label="年龄:" style="height:60px; border-bottom: 1px solid #ebebeb;">
                            <a @click="tapAction(1)">
                                <span>{{userModel.age | filterAge}}</span>
                            </a>
                        </el-form-item>
                        <el-form-item label="手机号:" style="height:60px; border-bottom: 1px solid #ebebeb;">
                            <a @click="tapAction(2)">
                                <span>{{userModel.phoneNumber | filterPhoneNumber}}</span>
                            </a>
                        </el-form-item>
                        <el-form-item label="权限:" style="height:60px; border-bottom: 1px solid #ebebeb;">
                            <span>{{userModel.authority | filterAuthor}}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <div v-show="(showType === 0)">
                <el-radio v-model="params.sex" label="男">男</el-radio>
                <el-radio v-model="params.sex" label="女">女</el-radio>
            </div>
            <div v-show="(showType === 1)">
                <el-input v-model="params.age" placeholder="请输入年龄"></el-input>
            </div>
            <div v-show="(showType === 2)">
                <el-input v-model="params.phoneNumber" placeholder="请输入手机号"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script type="text/ecmascript-6">
import { regExpValidation } from '@/utils/NumberUtils.js';
import url from '@/assets/image/nav.jpg';
import icon from '@/assets/image/header.jpg';
import camera from '@/assets/image/camera.png';
import { loadFromLocal } from '@/common/js/store.js';
import { mapActions } from 'vuex';

const ShowAlertType = {
    SEX: 0,
    AGE: 1,
    NUMBER: 2
};
Object.freeze(ShowAlertType);

const ERR_OK = 0;
export default {
    data() {
        return {
            userModel: loadFromLocal(null, 'logining', false),
            labelWidth: '80px',
            centerDialogVisible: false,
            headPath: null,
            showType: null,
            loading: false,
            params: {
                name: null,
                age: null,
                phoneNumber: null,
                sex: null
            }
        };
    },
    filters: {
        filterPhoneNumber(phoneNumber) {
            if (phoneNumber === '') return '未知';
            return phoneNumber;
        },
        filterAge(age) {
            if (age === '') return '未知';
            return age;
        },
        filterSex(sex) {
            if (sex === '') return '未知';
            return sex;
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
        cameraUrl() {
            return camera;
        }
    },
    created() {
        this.params = {
            sex: this.userModel.sex,
            name: this.userModel.name,
            age: this.userModel.age,
            phoneNumber: this.userModel.phoneNumber
        };
        this.headPath = this.userModel.headPath ? this.userModel.headPath : icon;
    },
    methods: {
        ...mapActions([
            'modifyUserInfoAction',
            'updateUserHeaderAction'
        ]),
        tapAction(type) {
            this.showType = type;
            this.centerDialogVisible = true;
        },
        onSubmit() {
            this.centerDialogVisible = false;
            this.modifyInfo();
        },
        updateImageAction(file) {
            if (file.name.indexOf('png') === -1) {
                this.warnAlert('图片格式必须为png');
                return;
            }
            this.loading = true;
            let imgdata = new FormData();
            imgdata.append('file', file.raw);
            this.updateUserHeaderAction(imgdata).then(res => {
                if (res.code === ERR_OK.toString(10)) {
                    this.headPath = res.data.url;
                } else {
                    if (res.code === '1003') {
                        this.$router.push({ path: '/login' });
                        return;
                    }
                    this.warnAlert('图片上传失败');
                }
                this.loading = false;
            });
        },
        modifyInfo() {
            if (this.judgeData()) {
                return;
            }
            const condition = {
                ...this.params
            };
            this.modifyUserInfoAction(condition).then(res => {
                    if (res.code === ERR_OK.toString(10)) {
                        this.showSuccess('信息修改成功！');
                    } else {
                    if (res.code === '1003') {
                        this.$router.push({ path: '/login' });
                    return;
                    }
                    this.warnAlert(res.message);
                }
            });
        },
        judgeData() {
            if (!regExpValidation(this.params.age)) {
                this.showNotify('请输入正确的年龄!');
                return true;
            }

            if (!regExpValidation(this.params.phoneNumber)) {
                this.showNotify('请输入正确的手机号码!');
                return true;
            }

            return false;
        },
        showAlert(text) {
            this.$modal.open({
            autoClose: 3,
            transition: 'bounceDown',
            content: text
            });
        },
        showSuccess(text) {
            this.$message({
                message: text,
                type: 'success'
            });
        },
        warnAlert(text) {
         this.$notify.warning({content: text});
        },
        loadingAlert(text) {
            this.$notify.open({content: text, type: 'loading', duration: 100000});
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
            position: absolute;
            float:left;
            height: 300px;
            .image-icon
                height: 150px;
                width: 150px;
                border-radius: 8px;
                position: relative;
                top: -60px;
                border: 6px solid #fff;
                .float-image-view
                    position: absolute;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    cursor: default;
                    opacity: 0;
                    background-color: rgba(0, 0, 0, .5);
                    transition: opacity .3s;
                    cursor: pointer;
                    color: #ffffff;
                    text-align: center;
                .float-image-view:hover
                    opacity: 1;
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
