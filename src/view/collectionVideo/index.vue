<template>
    <div class="collection-container" v-loading.fullscreen.lock="loading"
          element-loading-text="努力加载中">
      <div class="over-flow itme-content">
          <div class="collection-title">收藏影片列表</div>
          <div class="itme" v-for=" video in dataList" :key="video.id">
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
        <div v-show="(dataList.length == 0)" style="height: 100%;text-align: center;margin-top: 20px;">暂时没有数据</div>
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
       loading: false,
       dataList: []
    };
  },
  computed: {
      ...mapGetters([
          'isTest'
      ])
  },
  methods: {
      ...mapActions([
        'collectionVideoListAction',
        'commitVideoModelAction'
      ]),
      isTestUrl(icon) {
        return this.isTest ? url : icon;
      },
      isTestTitle(title) {
        return this.isTest ? '这是一个标题 这是一个标题 这是一个标题 这是一个标题' : title;
      },
      imaegClick(video) {
        this.commitVideoModelAction(video).then((res) => {
          this.$router.push({path: '/home/videoPlayView', query: { videoId: video.videoId }});
        });
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
  },
  created() {
    const pram = {};
    this.loading = true;
    this.collectionVideoListAction(pram).then(res => {
       if (res.code === ERR_OK.toString(10)) {
              this.dataList = res.data;
            } else {
              if (res.code === '1003') {
                this.$router.push({ path: '/login' });
                return;
              }
              this.warnAlert(res.message);
        }
        this.loading = false;
    });
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.collection-container
    padding: 10px
    height: 100%
    .collection-title
      text-align: start
      font-size: 20px;
      font-weight: bold;
      border-bottom: 1px solid lightgray
      padding-bottom: 10px
    .itme-content
      padding: 20px
      .itme
        display: inline-block
        margin-top: 20px
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
</style>
