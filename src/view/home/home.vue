<template>
<div class="home-container">
   <!-- 头部 -->
    <div class="header">
        <router-link :to="{path: '/home'}"><img :src="webUrl" style="width:48px;height:48px;margin-left: 10px;"></router-link>
        <dropdown trigger="hover" ref="dropdownView">
          <div class="image">
            <img  class="icon" :src="headPath" :onError="imgError()">
          </div>
          <div slot="content">
            <menus>
              <menu-item icon="user" :click=personalInformationClick>个人信息</menu-item>
              <!-- <menu-item icon="ticket" :click=informationManger>资料管理</menu-item> -->
              <menu-item icon="heart-o" :click=collectionVideo>收藏影片</menu-item>
              <div class="divider"></div>
              <menu-item icon="power-off" :click=logout>退出</menu-item>
            </menus>
          </div>
        </dropdown>
   </div>
   <el-row class="container">
    <el-col :span="24" class="main-container">
        <section class="content-container">
          <!-- <keep-alive> 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM -->
          <div class="router-wrapper">
            <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </section>
    </el-col>
   </el-row>
</div>
</template>

<script type="text/ecmascript-6">
  import url from '@/assets/image/header.jpg';
  import webIcon from '@/assets/image/icon.png';
  import { mapGetters } from 'vuex';
  import { clearLocal } from '@/common/js/store.js';

  export default {
    data() {
      return {
        test: false,
        headPath: null,
        menus: []
      };
    },
    computed: {
        ...mapGetters([
            'userModel'
        ]),
        webUrl() {
          return webIcon;
        }
    },
    created() {
      this.headPath = this.userModel.headPath ? this.userModel.headPath : url;
    },
    methods: {
      informationManger() {
        let dropdown = this.$refs.dropdownView;
        dropdown.isShow = false;
        this.$router.push({ path: '/home' });
      },
      collectionVideo() {
        let dropdown = this.$refs.dropdownView;
        dropdown.isShow = false;
        this.$router.push({ path: '/home/collectionVideo' });
      },
      personalInformationClick() {
        let dropdown = this.$refs.dropdownView;
        dropdown.isShow = false;
        this.$router.push({ path: '/home/info' });
      },
      logout() {
        let dropdown = this.$refs.dropdownView;
        dropdown.isShow = false;
        clearLocal();
        this.$router.push({ path: '/' });
      },
      imgError() {
        this.headPath = url;
      },
      showAlert(text) {
        this.$modal.open({
          autoClose: 3,
          transition: 'bounceDown',
          content: text
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

.header
    height: 48px
    box-shadow: 0 10px 18px #888888
    background: #3c81df
    .image
      display: inline-block
      position: absolute
      top: 4px
      right: 10px
      height: 40px
      width: 40px
      .icon
        border-radius: 50%
</style>
