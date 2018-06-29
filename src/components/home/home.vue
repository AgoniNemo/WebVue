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
                <img :src=imageUrl trigger="click">
              </a>
            </el-carousel-item>
        </el-carousel>
      </div>
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="4" v-for="video in videos" :key="video.id">
            <el-card :body-style="{ padding: '5px' }" shadow="hover">
              <img :src=imageUrl class="image">
              <div style="padding: 10px 0px;">
                <span style="display: block; height: 30px">好吃的汉堡</span>
                <div class="bottom">
                  <span class="time">时间:{{ video.duration }}</span>
                  <span class="views">观看{{ video.views }}次</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="foot">
        <pagination :total="333" ></pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {loadFromLocal} from '@/common/js/store.js';
  import url from '../../assets/image/header.jpg';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        userModel: loadFromLocal(this.$route.query.user, 'logining', false),
        headerVideos: [],
        videos: []
      };
    },
    created() {
      console.log(this.requestObj);
      console.log(this.userModel.user);
      // 请求头部影片
      this.$http.post('/video/latestVideo', {
          user: this.userModel.user,
          token: this.userModel.token,
          count: 10,
          page: 0
        }).then((response) => {
          let resp = response.data;
          console.log(resp);
          if (resp.code === ERR_OK.toString(10)) {
            this.headerVideos = resp.data;
          } else {
            this.warnAlert(resp.message);
          }
        })
        .catch(function (error) {
          console.log('error: ' + error);
        });

        this.requestData();
    },
    computed: {
        imageUrl() {
            let headPath = this.userModel.headPath ? this.userModel.headPath : url;
            return headPath;
        },
        requestObj() {
            var obj = {
                user: this.userModel.user,
                token: this.userModel.token,
                count: 10,
                page: 0
              };
            return obj;
        }
    },
    methods: {
      requestData() {
          // 请求内容影片
          this.$http.post('/video/latestVideo', {
            user: this.userModel.user,
            token: this.userModel.token,
            count: 30,
            page: 1
          }).then((response) => {
            let resp = response.data;
            console.log(resp);
            if (resp.code === ERR_OK.toString(10)) {
              this.videos = resp.data;
            } else {
              this.warnAlert(resp.message);
            }
          })
          .catch(function (error) {
            console.log('error: ' + error);
          });
      },
      imaegClick(video) {
        console.log(video);
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
