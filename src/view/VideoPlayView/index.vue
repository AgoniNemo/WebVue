<template>
    <div class="video-player-container" v-loading.fullscreen.lock="loading"
          element-loading-text="努力加载中">
      <div class="video-title-container">{{isTestTitle(this.videoObj.title)}}</div>
      <div class="player-container">
        <div class="player-view">
           <video-player class="vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)">
          </video-player>
        </div>
        <transition name="slide-fade">
          <div class="player-promptHint" v-show="showPrompt">
              <span class="promptHint-text">{{promptText}}</span>
          </div>
        </transition>
      </div>
      <div class="comment-container">
        <div class="comment-count-container">
          <div style="display: inline-block;">{{commentCount}}</div>
          <div style="display: inline-block;" @click="collectionAction">
              <i :class="collectionIcon"></i>
          </div>
        </div>
        <div class="comment-list-container">
          <div class="comment-input-container">
            <div class="comment-image-container">
              <img class="comment-image-icon" :src="iconUrl" :onError="defaultImg">
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
import bg from '@/assets/home/back.png';
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
        videoObj: {},
        promptText: '声音:100%',
        showPrompt: false,
        seekStep: 10, /// 后退与进行时间
        volumeStep: 0.05, /// 加减音量
        loading: false,
        collectionIcon: 'el-icon-star-off',
        commitKey: '',
        defaultImg: 'this.src="' + url + '"',
        commitList: []
      };
    },
    mounted() {
      this.fetchVideoData();
      this.requestCommitList();
      this.$nextTick(function () {
        this.playerOptions.sources[0].src = this.isTest ? mp4 : this.videoObj.playPath;
        this.playerOptions.poster = this.isTest ? bg : this.videoObj.icon;
      });
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
          'videoModel',
          'isTest'
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
      this.addKeyboardEvents();
      this.refreshVideoModelAction();
      this.videoObj = {
        ...this.videoModel
      };
    },
    methods: {
      ...mapActions([
        'refreshVideoModelAction',
        'enquiriesCommentListVideo',
        'commentVideoAction',
        'collectionVideoAction',
        'queryVideoAction'
      ]),
      addKeyboardEvents() {
        let than = this;
        document.onkeydown = function(e) {
              if (e.keyCode === 32) {
                than.spaceAction();
                e.preventDefault();
              } else if (e.keyCode === 37) {
                than.controlLeft();
              } else if (e.keyCode === 38) {
                than.controlUp();
                e.preventDefault();
              } else if (e.keyCode === 39) {
                than.controlRight();
                e.preventDefault();
              } else if (e.keyCode === 40) {
                than.controlDown();
                e.preventDefault();
              }
        };
      },
      onPlayerPlay(player) {
        console.log('onPlayerPlay');
      },
      onPlayerPause(player) {
         console.log('onPlayerPause');
      },
      controlUp() {
        let currentVolume = this.$refs.videoPlayer.player.volume();
        let newVolume = ((currentVolume + this.volumeStep) > 1) ? 1 : (currentVolume + this.volumeStep);
        this.$refs.videoPlayer.player.volume(newVolume);
        this.showPrompt = true;
        this.promptText = '声音:' + Math.floor(Number(newVolume) * 100) + '%';
        setTimeout(() => {
          this.showPrompt = false;
        }, 600);
      },
      controlDown() {
        let currentVolume = this.$refs.videoPlayer.player.volume();
        let newVolume = (currentVolume - this.volumeStep) > 0 ? (currentVolume - this.volumeStep) : 0;
        this.$refs.videoPlayer.player.volume(newVolume);
        this.showPrompt = true;
        this.promptText = '声音:' + Math.floor(Number(newVolume) * 100) + '%';
        setTimeout(() => {
          this.showPrompt = false;
        }, 600);
      },
      controlLeft() {
        let currentTime = this.$refs.videoPlayer.player.currentTime();
        let newTime = (currentTime - this.seekStep) < 0 ? 0 : (currentTime - this.seekStep);
        this.$refs.videoPlayer.player.currentTime(newTime);
        newTime = newTime * 1000;
        // this.promptText = `进度:${this.timeHandle(newTime)}/${this.videoObj.duration}`;
        // setTimeout(() => {
        //   this.showPrompt = false;
        // }, 600);
      },
      controlRight() {
        let totalTime = 0;
        if (this.videoObj.duration) {
          let time = '1970/01/01';
          let arr = this.videoObj.duration.split(':');
          time += ((arr.length > 2) ? ' ' : ' 00:');
          time += this.videoObj.duration;
          let date = new Date(time);
          totalTime = date.getTime() / 1000 - (-28800);
        }
        let currentTime = this.$refs.videoPlayer.player.currentTime();
        let newTime = (currentTime + this.seekStep) < totalTime ? (currentTime + this.seekStep) : (totalTime === 0 ? (currentTime + this.seekStep) : totalTime);
        this.$refs.videoPlayer.player.currentTime(newTime);
        newTime = newTime * 1000;
        // this.promptText = `进度:${this.timeHandle(newTime)}/${this.videoObj.duration}`;
        // setTimeout(() => {
        //   this.showPrompt = false;
        // }, 600);
      },
      timeHandle(time) {
        let hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = parseInt((time % (1000 * 60)) / 1000);
        return `${hours ? (hours + ':') : ''}${minutes}:${seconds}`;
      },
      spaceAction() {
        if (this.$refs.videoPlayer.player.paused()) {
            this.$refs.videoPlayer.player.play();
        } else {
            this.$refs.videoPlayer.player.pause();
        }
      },
      isTestUrl() {
        return this.isTest ? url : this.videoModel.title;
      },
      isTestTitle(title) {
        return this.isTest ? '这是一个标题 这是一个标题 这是一个标题 这是一个标题' : title;
      },
      collectionAction() {
          let msg = (this.collectionIcon === 'el-icon-star-on') ? '取消收藏' : '收藏';
          this.$confirm(`确定要${msg}该影片,是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.collectionVideo();
          }).catch(() => {
            // console.log('取消');
          });
      },
      collectionVideo() {
       let b = (this.collectionIcon === 'el-icon-star-off');
       const parm = {
          id: this.videoObj.videoId,
          collection: b ? '1' : '0'
        };
        this.collectionVideoAction(parm).then(res => {
          if (res.code === ERR_OK.toString(10)) {
              let msg = b ? '收藏' : '取消收藏';
              this.warnAlert(`${msg}成功!`);
              this.collectionIcon = b ? 'el-icon-star-on' : 'el-icon-star-off';
            } else {
              if (res.code === '1003') {
                this.$router.push({ path: '/login' });
                return;
              }
              this.warnAlert(res.message);
          }
        });
      },
      commentClick() {
        const condition = {
          id: this.videoObj.videoId,
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
          id: this.$route.query.videoId
        };
        this.enquiriesCommentListVideo(condition).then((res) => {
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
      fetchVideoData() {
        let parm = {
          id: this.$route.query.videoId
        };
        this.loading = true;
        this.queryVideoAction(parm).then(res => {
          this.loading = false;
            if (res.code === ERR_OK.toString(10)) {
              this.videoObj = res.data.data;
              this.collectionIcon = res.data.status ? 'el-icon-star-on' : 'el-icon-star-off';
              this.playerOptions.sources[0].src = this.isTest ? mp4 : this.videoObj.playPath;
              this.playerOptions.poster = this.isTest ? bg : this.videoObj.icon;
              document.title = this.isTest ? '测试标题' : this.videoObj.title;
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
<style lang="stylus" rel="stylesheet/stylus" scoped>
.video-player-container
    margin-top: 20px;
    border-radius: 2px;
    .player-view
      position: relative;
      z-index: 10;
      .vjs-custom-skin
        border-radius: 5px;
    .slide-fade-enter-active
        transition: all .3s ease
      .slide-fade-leave-active
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      .slide-fade-enter, .slide-fade-leave-to
        opacity: 0;
      .player-promptHint
       position: absolute;
       z-index: 20;
       top: 40%;
       left: 50%;
       padding: 9px;
       font-size: 20px;
       margin-left: -50px;
       border-radius: 4px;
       background: hsla(0,0%,100%,.8);
       color: #000;
       text-align: center;
       .promptHint-text
          vertical-align: top;
          display: inline-block;
          overflow: visible;
          text-align: center;
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
        display: flex;
        justify-content:space-between
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
