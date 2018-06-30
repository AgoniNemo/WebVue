<template>
  <div class="home">
    <div class="nav">
      <dropdown trigger="hover">
            <div class="image">
              <img :src=imageUrl>
            </div>
            <div slot="content">
              <menus>
                <menu-item icon="user" :click=personalInformationClick>个人信息</menu-item>
                <menu-item icon="ticket" :click=informationManger>资料管理</menu-item>
                <menu-item icon="heart-o" :click=collectionVideo>收藏影片</menu-item>
                <div class="divider"></div>
                <menu-item icon="power-off" :click=logout>退出</menu-item>
              </menus>
            </div>
      </dropdown>
    </div>
    <div class="home-content">
      <div class="header">
        <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="video in headerVideos" :key="video.id">
              <a @click.stop="imaegClick(video)">
                <img :src=video.icon trigger="click">
              </a>
            </el-carousel-item>
        </el-carousel>
      </div>
      <div class="content">
        <el-row :gutter="20" v-loading="loading"
            element-loading-text="努力加载中">
          <el-col :span="4" v-for="video in videos" :key="video.id">
            <a @click.stop="imaegClick(video)">
              <el-card :body-style="{ padding: '5px' }" shadow="hover">
                <img :src=video.icon class="image">
                <div style="padding: 10px 0px;">
                  <span style="display: block; height: 40px; overflow: hidden; white-space:pre-wrap;">{{video.title}}</span>
                  <div class="bottom">
                    <span class="time">时间:{{ video.duration }}</span>
                    <span class="views">观看{{ video.views }}次</span>
                  </div>
                </div>
              </el-card>
             </a>
          </el-col>
        </el-row>
      </div>
      <div class="foot">
        <pagination :total="999" :change=pageClick layout="total, pager, jumper" :page-size="30"></pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {loadFromLocal} from '@/common/js/store.js';
  import url from '../../assets/image/header.jpg';
  import { requestLatestVideo } from '@/api';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        userModel: loadFromLocal(this.$route.query.user, 'logining', false),
        headerVideos: [],
        videos: [],
        loading: false,
        test: false,
        page: 0
      };
    },
    created() {
      console.log(this.requestObj);
      const params = {
          user: this.userModel.user,
          token: this.userModel.token,
          count: 10,
          page: this.page
      };
      requestLatestVideo(params).then((res) => {
          console.log(res);
          if (res.code === ERR_OK.toString(10)) {
            this.headerVideos = res.data;
          } else {
            this.warnAlert(res.message);
          }
      });
      this.page = this.page + 1;
      this.requestData();
    },
    computed: {
        imageUrl() {
            let headPath = this.userModel.headPath ? this.userModel.headPath : url;
            return headPath;
        }
    },
    methods: {
      requestData() {
        const params = {
            user: this.userModel.user,
            token: this.userModel.token,
            count: 30,
            page: this.page
        };
        this.loading = true;
        requestLatestVideo(params).then((res) => {
            console.log(res);
            if (res.code === ERR_OK.toString(10)) {
              this.videos = res.data;
            } else {
              this.warnAlert(res.message);
            }
            this.loading = false;
        });
      },
      pageClick(page) {
          this.page = page;
          this.requestData();
          console.log(this.page);
      },
      imaegClick(video) {
        console.log(video.playPath);
      },
      informationManger() {
        console.log('资料管理');
      },
      collectionVideo() {
        console.log('收藏影片');
      },
      personalInformationClick() {
        console.log('个人信息');
      },
      logout() {
        console.log('退出登录');
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

  .home
    height: 100%
    width: 100%
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: #fff
    .nav
      height: 44px
      width: 100%
      box-shadow: 0 10px 18px #888888
      themeColor()
      .image
        display: inline-block
        position: absolute
        top: 4px
        right: 10px
        height: 40px
        width: 40px
        img
          border-radius: 50%
    .home-content
      width: 100%
      height: 100%
      .header
        width: 800px
        height: 430px
        margin-left: auto
        margin-right: auto
        .el-carousel__item
          color: #475669
          font-size: 14px
          line-height: 200px
          margin: 0
          img
            width: 100%
            height: 100%
        .el-carousel__item:nth-child(2n)
          background-color: #99a9bf
        .el-carousel__item:nth-child(2n+1)
          background-color: #d3dce6
      .content
          position: relative
          .time
            display: inline-block
            width: 84px
            font-size: 13px
            color: #999
          .bottom
            margin-top: 13px
            line-height: 12px
            .views
              font-size: 15px
              float: right
          .image
            width: 100%
            display: block
          .clearfix:before,
          .clearfix:after
              display: table
              content: ""
          .clearfix:after
              clear: both
      .foot
        height: 50px
</style>
