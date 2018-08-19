<template>
  <div class="video-content">
    <div class="video-header">
      <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="video in headerVideos" :key="video.id">
            <a @click.stop="imaegClick(video)">
              <img :src=imageUrl trigger="click">
            </a>
          </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content " v-loading.fullscreen.lock="loading"
          element-loading-text="努力加载中">
      <div class="over-flow itme-content">
          <div class="itme" v-for=" video in videos" :key="video.id">
            <a @click.stop="imaegClick(video)">
                <el-card :body-style="{ padding: '5px' }" shadow="hover">
                  <img :src=imageUrl class="image">
                  <div style="padding: 10px 0px;">
                    <span style="display: block; height: 40px; overflow: hidden; white-space:pre-wrap;">这是一个标题</span>
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
      <pagination :total="969" :change=pageClick layout="total, pager, jumper" :page-size="30"></pagination>
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
        headerVideos: [],
        videos: [],
        loading: false,
        test: false,
        span: 4,
        params: {
          count: 10,
          page: 0
        }
      };
    },
    created() {
      const condition = {
          ...this.params
      };
      this.enquiriesAction(condition).then((res) => {
          if (res.code === ERR_OK.toString(10)) {
            this.headerVideos = res.data;
          } else {
            this.warnAlert(res.message);
          }
      });
      this.params.page = this.params.page + 1;
      this.params.count = 30;
      this.requestData();
    },
    computed: {
        ...mapGetters([
            'userModel'
        ]),
        imageUrl() {
            let headPath = this.userModel.headPath ? this.userModel.headPath : url;
            return headPath;
        },
        rows() {
          let col = 24 / this.span;
          let groups = [];
          let total = [];
          for (let index = 0; index < this.videos.length; index++) {
            const element = this.videos[index];
            groups.push(element);
            if (groups.length % col === 0) {
              total.push(groups);
              groups = [];
            }
          }
          console.log(total);
          return total;
        }
    },
    methods: {
      ...mapActions([
        'enquiriesAction'
      ]),
      requestData() {
        const condition = {
          ...this.params
        };
        this.loading = true;
        this.enquiriesAction(condition).then((res) => {
            if (res.code === ERR_OK.toString(10)) {
              this.videos = res.data;
              console.log(this.videos.count);
            } else {
              this.warnAlert(res.message);
            }
            this.loading = false;
        });
      },
      pageClick(page) {
          this.params.page = page;
          this.requestData();
          console.log(this.params.page);
      },
      imaegClick(video) {
        console.log(video.playPath);
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
        margin:0px auto
      .over-flow
        overflow: auto; zoom: 1
        padding: 20px
        .itme
          float: left;
          width: 210px;
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
</style>
