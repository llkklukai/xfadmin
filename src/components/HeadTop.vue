<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="item.path" v-for="(item, index) in $route.meta.routeList" :key="index">{{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-left: auto;letter-spacing: 2px;font-size: 14px">欢迎您！管理员{{adminInfo.realname}}</div>
    <el-button type="text" style="color: #fff;margin-right: 20px;margin-left: 5px" @click="handleSinOut()">注销
    </el-button>
    <img :src="imgUrl" class="avator">
    <!--<el-dropdown @command="handleCommand" menu-align='start'>-->
    <!--<img :src="imgUrl" class="avator">-->
    <!--<el-dropdown-menu slot="dropdown">-->
    <!--<el-dropdown-item command="home">首页</el-dropdown-item>-->
    <!--<el-dropdown-item command="singout">退出</el-dropdown-item>-->
    <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->
  </div>
</template>

<script>
  import {baseImgPath} from '../config/env'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {confirmBox, getStore, removeStore} from "../config/mUtils";
  import {getIsLogin, logOut} from '../api/getData'

  export default {
    data() {
      return {
        baseImgPath,
      }
    },
    computed: {
      ...mapState(['adminInfo']),
      imgUrl() {
        return this.adminInfo.avatar ? `${this.baseImgPath}HeadPortrait/${this.adminInfo.avatar}` : 'static/5656.png'
      }
    },
    created() {
      let token = getStore('token')
      getIsLogin({token}) //判断用户是否登录
        .done(res => {
          if (res.success == true) {

          } else {
            this.$router.push({
              path: '/'
            })
            this.$message.error('你还未登录或登录失效！')
          }
        })
        .fail(e => {
          this.$router.push({
            path: '/'
          })
          this.$message.error('你还未登录或登录失效！')
        })
    },
    methods: {
      ...mapMutations(['saveAdminInfo']),
      ...mapActions(['getAdminInfo']),

      handleSinOut() {
        let token = getStore('token')
        let callBack = () => {
          logOut({token})
            .done(res => {
              if (res.success == true) {
                removeStore('ADF')
                removeStore('token')
                this.$message({
                  type: 'success',
                  message: '退出成功'
                });
                this.$router.push('/');
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            })
        }
        confirmBox({msg: '继续将退出，是否继续？', callBack, bindThis: this})
      },

      // async handleCommand(command) {
      //   let token=getStore('token')
      //   if (command == 'home') {
      //     this.$router.push('/manage');
      //   } else if (command == 'singout') {
      //
      //   }
      // },
    },
    mounted() {
      let token = getStore('token')
      this.getAdminInfo({token})
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .header_container {
    background: linear-gradient(to right, #2ad5a7, #4b8ce0); /* 标准的语法 */
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    color: #fff;
  }

  .avator {
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
