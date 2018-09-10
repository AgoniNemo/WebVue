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
                            <a @click="tapAction(0)">
                                <span>{{userModel.sex | filterSex}}</span>
                            </a>
                        </el-form-item>
                        <el-form-item label="年龄:" style="height:40px;">
                            <a @click="tapAction(1)">
                                <span>{{userModel.age | filterAge}}</span>
                            </a>
                        </el-form-item>
                        <el-form-item label="手机号:" style="height:40px;">
                            <a @click="tapAction(2)">
                                <span>{{userModel.phoneNumber | filterPhoneNumber}}</span>
                            </a>
                        </el-form-item>
                        <el-form-item label="权限:">
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
            showType: null,
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
        iconUrl() {
            let headPath = this.userModel.headPath ? this.userModel.headPath : icon;
            return headPath;
        }
    },
    created() {
        this.params = {
            sex: this.userModel.sex,
            name: this.userModel.name,
            age: this.userModel.age,
            phoneNumber: this.userModel.phoneNumber
        };
    },
    methods: {
        ...mapActions([
            'modifyUserInfoAction'
        ]),
        tapAction(type) {
            this.showType = type;
            this.centerDialogVisible = true;
        },
        onSubmit() {
            this.centerDialogVisible = false;
            this.modifyInfo();
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
