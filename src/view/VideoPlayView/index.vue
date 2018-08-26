<template>
    <div class="video-player-container">
      <div class="video-title-container">{{this.videoModel.title}}</div>
      <div class="player-container">
        <video-player class="vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)">
        </video-player>
      </div>
      <div class="comment-container" v-loading.lock="loading"
          element-loading-text="努力加载中">
        <div class="comment-count-container">{{commentCount}}</div>
        <div class="comment-list-container">
          <div class="comment-input-container">
            <div class="comment-image-container">
              <img class="comment-image-icon" :src="iconUrl">
            </div>
            <el-input
                class="comment-input"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入评论内容"
                v-model="commitKey">
            </el-input>
            <el-button type="primary" @click="commentClick()">发表评论</el-button>
          </div>
          <div class="comment-list" v-for="(comment, index) in commitList" :key="comment.id">
            <div class="comment-list-content">
              <img :src="iconUrl" class="comment-icon">
              <div class="comment-text">{{comment.content}}</div>
            </div>
            <div class="comment-list-foot">
              <span>#{{index}}</span>
              <span>时间：{{comment.time | formatDate}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { parseTime } from '@/utils/DateUtils.js';
import { videoPlayer } from 'vue-video-player';
import mp4 from '@/assets/video/test.mp4';
import bg from '@/assets/image/nav.jpg';
import url from '@/assets/image/header.jpg';
import { mapActions, mapGetters } from 'vuex';

const ERR_OK = 0;
export default {
    data() {
      return {
        playerOptions: {
          // videojs options
          muted: false,
          language: 'zh-CN',
          preload: 'atou',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          aspectRatio: '16:9',
          fluid: true,
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          sources: [{
            type: 'video/mp4',
            src: mp4
          }],
          poster: bg
        },
        loading: false,
        commitKey: '',
        commitList: []
      };
    },
    mounted() {
      console.log('this is current player instance object');
      this.refreshVideoModelAction();
      this.requestCommitList();
    },
    filters: {
      formatDate(t) {
        if (t === undefined) {
          return '0';
        }
        return parseTime(t);
      }
    },
    computed: {
      ...mapGetters([
          'userModel',
          'videoModel'
      ]),
      iconUrl() {
        let headPath = this.userModel.headPath ? this.userModel.headPath : url;
        return headPath;
      },
      player() {
        return this.$refs.videoPlayer.player;
      },
      commentCount() {
        let comment = this.commitList.length;
        if (comment === undefined ||
            comment === 0) {
          comment = '0';
        }
        return comment + ' 评论';
      }
    },
    created() {
      this.$nextTick(function () {
        console.log('this.$el.textContent', this.videoModel);
        this.playerOptions.sources[0].src = this.videoModel.playPath;
        this.playerOptions.poster = this.videoModel.icon;
      });
    },
    methods: {
      ...mapActions([
        'refreshVideoModelAction',
        'enquiriesCommentListVideo',
        'commentVideoAction'
      ]),
      onPlayerPlay(player) {
        console.log('player', this.videoModel.playPath);
      },
      onPlayerPause(player) {
         console.log('player', this.videoModel.playPath);
      },
      commentClick() {
        const condition = {
          id: this.videoModel.videoId,
          content: this.commitKey
        };
        this.commentVideoAction(condition).then((res) => {
            this.requestCommitList();
            if (res.code === ERR_OK.toString(10)) {
              if (res.data.status) {
                this.commitKey = '';
                this.warnAlert('评论成功');
              }
            } else {
              if (res.code === '1003') {
                this.$router.push({ path: '/login' });
                return;
              }
              this.warnAlert(res.message);
            }
        });
      },
      requestCommitList() {
        const condition = {
          id: this.videoModel.videoId
        };
        this.loading = true;
        this.enquiriesCommentListVideo(condition).then((res) => {
            this.loading = false;
            if (res.code === ERR_OK.toString(10)) {
              this.commitList = res.data.reverse();
            } else {
              if (res.code === '1003') {
                this.$router.push({ path: '/login' });
                return;
              }
              this.warnAlert(res.message);
            }
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
    components: {
        videoPlayer
    }
   };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.video-player-container
    margin-top: 20px;
    border-radius: 2px;
    .vjs-custom-skin
      border-radius: 5px;
    .video-title-container
      font-size: 25px;
      margin-bottom: 10px;
    .comment-container
      width: 100%;
      margin: 15px auto;
      text-align: center;
      .comment-count-container
        margin-bottom: 10px
        font-size: 20px;
        text-align: start;
      .comment-list-container
        display: inline-block;
        width: 700px
        .comment-input-container
          margin: 10px auto 20px;
          .comment-image-container
            display: inline-block;
            position: relative;
            top: 8px;
            width: 48px;
            height: 48px;
            .comment-image-icon
              border-radius: 24px;
          .comment-input
            display: inline-block;
            height: 58px;
            width: 500px;
            margin: 0 10px;
          .el-button
            position: relative;
            top: -12px;
        .comment-list
          flex-direction: row;
          width: 100%;
          margin: 0 10px 10px;
          text-align: start;
          .comment-list-content
            display: flex;
            justify-content: flex-start;
            border-top: 1px solid lightgray;
            padding-top: 10px;
            .comment-icon
              width: 48px;
              height:48px;
              border-radius: 24px;
              background: red;
            .comment-text
              margin: 0 10px;
          .comment-list-foot
             margin: 5px 15px;
             display: flex;
             justify-content: space-between;
        .comment-list:last-child
          border-bottom: 1px solid lightgray;
</style>
