<template>
  <div class="video-content">
    <div class="video-header">
      <el-carousel :interval="4000" type="card" height="400px" trigger="click">
          <el-carousel-item v-for="video in headerVideos" :key="video.id">
            <a @click.stop="imaegClick(video)" :onError="defaultImg">
              <img :src="isTestUrl(video.icon)" trigger="click">
            </a>
          </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content" v-loading.fullscreen.lock="loading"
          element-loading-text="努力加载中">
      <div class="over-flow itme-content">
          <div class="itme" v-for=" video in videos" :key="video.id">
            <a @click.stop="imaegClick(video)">
                 <el-card :body-style="{ padding: '5px' }" shadow="hover">
                  <img :src="isTestUrl(video.icon)" class="image" :onError="defaultImg">
                  <div style="padding: 10px 0px; text-align: start;">
                    <el-tooltip :content="isTestTitle(video.title)" placement="top" effect="light">
                      <div class="title">{{isTestTitle(video.title)}}</div>
                    </el-tooltip>
                    <div class="bottom">
                      <span class="time">时间:{{ video.duration }}</span>
                      <span class="views">观看{{ video.views }}次</span>
                    </div>
                  </div>
                </el-card>
            </a>
        </div>
      </div>
    </div>
    <div class="foot">
      <pagination :total="total" :change=pageClick layout="total, pager, jumper" :page-size="30"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import url from '@/assets/image/header.jpg';
  import { mapActions, mapGetters } from 'vuex';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        defaultImg: 'this.src="' + url + '"',
        headerVideos: [],
        videos: [],
        loading: false,
        span: 4,
        total: 1,
        params: {
          count: 20,
          page: 0
        }
      };
    },
    created() {
      const condition = {
          ...this.params
      };
      this.enquiriesVideoListAction(condition).then((res) => {
          if (res.code === ERR_OK.toString(10)) {
            this.headerVideos = res.data.list;
          } else {
            if (res.code === '1003') {
              this.$router.push({ path: '/login' });
              return;
            }
            this.warnAlert(res.message);
          }
      });
      this.params.page = this.params.page + 1;
      this.requestData();
      document.title = 'Porn';
    },
    computed: {
        ...mapGetters([
            'userModel',
            'isTest'
        ]),
        iconUrl() {
          let headPath = this.userModel.headPath ? this.userModel.headPath : url;
          return headPath;
        }
    },
    methods: {
      ...mapActions([
        'enquiriesVideoListAction',
        'commitVideoModelAction'
      ]),
      requestData() {
        const condition = {
          ...this.params
        };
        this.loading = true;
        this.enquiriesVideoListAction(condition).then((res) => {
            if (res.code === ERR_OK.toString(10)) {
              this.videos = res.data.list;
              this.total = res.data.total;
              if (this.total > 1) {
                 this.total = this.total - 1;
              }
            } else {
              if (res.code === '1003') {
                this.$router.push({ path: '/login' });
                return;
              }
              this.warnAlert(res.message);
            }
            this.loading = false;
        });
      },
      pageClick(page) {
          this.params.page = page;
          this.requestData();
          this.jump();
      },
      isTestUrl(icon) {
        return this.isTest ? url : icon;
      },
      isTestTitle(title) {
        return this.isTest ? '这是一个标题 这是一个标题 这是一个标题 这是一个标题' : title;
      },
      jump() {
        let jumpDiv = document.querySelectorAll('.itme-content');
          // 获取需要滚动的距离
          let total = jumpDiv[0].offsetTop;
          // 平滑滚动，时长500ms，每10ms一跳，共50跳
          // 获取当前滚动条与窗体顶部的距离
          let distance = document.documentElement.scrollTop || document.body.scrollTop;
          // 计算每一小段的距离
          let step = total / 50;
          (function smoothDown () {
            if (distance < total) {
                distance += step;
                // 移动一小段
                document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                // 设定每一次跳动的时间间隔为10ms
                setTimeout(smoothDown, 50);
            } else {
              // 限制滚动停止时的距离
              document.body.scrollTop = total;
              document.documentElement.scrollTop = total;
            }
          })();
      },
      imaegClick(video) {
        this.commitVideoModelAction(video).then((res) => {
          // this.$router.push({path: '/home/videoPlayView', query: { videoId: video.videoId }});
          this.skipRouter(video.videoId);
        });
      },
      skipRouter(id) {
        const {href} = this.$router.resolve({
           path: '/home/videoPlayView',
           query: { videoId: id }
        });
        window.open(href, '_blank');
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

  .video-content
    width: 100%
    height: 100%
    .video-header
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
        background-color: #d3dce6s
    .content
      padding: 10px
      .itme-content
        padding: 20px
        text-align: center
        .itme
          display: inline-block
          width: 210px;
          padding: 0 5px 10px;
          .title
            font-size: 15px
            overflow: hidden
            white-space:pre-wrap
            text-overflow:ellipsis
            height: 44px
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
      padding-top: 10px
      height: 50px
      margin-bottom: 30px;
</style>
