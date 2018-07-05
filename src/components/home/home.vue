<template>
 <div>
    <el-row>
    <el-col :span="24" class="header">
      <dropdown trigger="hover" ref="dropdownView">
        <div class="image">
          <img  class="icon" :src=imageUrl>
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
    </el-col>
  </el-row>
  <router-view></router-view>
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
      console.log(this.userModel);
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
      informationManger() {
         console.log('资料管理');
        let dropdown = this.$refs.dropdownView;
        dropdown.isShow = false;
        this.$router.push({ path: '/home' });
      },
      collectionVideo() {
        console.log('收藏影片');
        let dropdown = this.$refs.dropdownView;
        dropdown.isShow = false;
        this.$router.push({ path: '/home/collectionVideo' });
      },
      personalInformationClick() {
        console.log('个人信息');
        let dropdown = this.$refs.dropdownView;
        dropdown.isShow = false;
        this.$router.push({ path: '/home/info' });
      },
      logout() {
        console.log('退出登录');
        let dropdown = this.$refs.dropdownView;
        dropdown.isShow = false;
        this.$router.push({ path: '/' });
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
