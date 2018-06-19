<template>
  <div class="home">
    <div class="nav">
      <div class="image">
        <img :src=imageUrl>
      </div>
    </div>
    <div class="content">
      <div class="header">
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(video) in videos" :key="video">
                <!-- <img :src="item.icon"> -->
                <h3>{{video.title}}</h3>
            </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {loadFromLocal} from '@/common/js/store.js';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        modelModel: loadFromLocal(this.$route.query.user, 'logining', false),
        videos: []
      };
    },
    created() {
      console.log(this.modelModel);
      this.$http.post('/video/latestVideo', {
          user: this.modelModel.user,
          token: this.modelModel.token,
          count: 10,
          page: 0
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
    computed: {
        imageUrl() {
            let headPath = this.modelModel.headPath ? this.modelModel.headPath : 'https://pic4.zhimg.com/51e518b2017021625f22ad0f5e09dd1d_is.jpg';
            return headPath;
        }
    },
    methods: {
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
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
    .content
      margin-top: 10px
      width: 100%
      height: 50%
      .header
        width: 100%
        height: 200px
        .el-carousel__item h3
          color: #475669
          font-size: 14px
          opacity: 0.75
          line-height: 200px
          margin: 0
          img
            width: 100%
            height: 100%
        .el-carousel__item:nth-child(2n)
          background-color: #99a9bf
        .el-carousel__item:nth-child(2n+1)
          background-color: #d3dce6

</style>
