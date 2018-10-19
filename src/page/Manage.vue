<template>
  <div class="manage_page fillcontain">

    <el-row style="height: 100%;">

      <el-col class="menu_list_con" :span="4"  style="min-height: 100%; background: linear-gradient(to  bottom, #2ad5a7 , #468adb);">
        <img style="width:260px;margin-top: 25px;margin-left: 20px;margin-bottom: 15px"  :src="TLogoImgUrl" alt="">
        <el-menu :style="{border: 'none'}"  @select="handleSelect" text-color="#fff" active-text-color="#555" class="menu_list" :default-active="defaultActive" style="min-height: 100%;" theme="dark">
          <el-menu-item :key="item.route" v-for="item in navData" class="menu_item" :index="item.route"><div style="width:160px"><i :class="'icon iconfont '+item.style"></i>{{item.items}}</div></el-menu-item>
        </el-menu>
      </el-col>
      <el-col id="mainView" :span="20" style="height: 100%;overflow: auto;">
        <keep-alive  exclude="RewardCompute,EditAgent,PublishGoods,AddAgent,setUpPermission">
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {getStore} from "../config/mUtils";
  import {version} from "../config/env";
  export default {
    data(){
        return{
          TLogoImgUrl:version=='new'?'static/n_t_logo.png':'static/t_logo.png',
          defaultNav:[
            {
              items:'首页',
              function_id:1,
              route:'manage',
              style:'icon-home'
            },
            // {
            //   items:'账户资金',
            //   function_id:2,
            //   route:'money',
            //   style:'icon-qianbao'
            // },
            {
              items:'财务报表',
              function_id:3,
              route:'fd',
              style:'icon-baobiao'
            },
            {
              items:'申请提现',
              function_id:4,
              route:'cash',
              style:'icon-tixian'
            },
            {
              items:'商品管理',
              function_id:5,
              route:'goods',
              style:'icon-shangpin'
            },
            {
              items:'订单管理',
              function_id:6,
              route:'order',
              style:'icon-dingdan'
            },
            {
              items:'线下订单管理',
              function_id:6,
              route:'under_line_order',
              style:'icon-dingdan'
            },
            {
              items:'代理商管理',
              function_id:7,
              route:'agent',
              style:'icon-dailishang'
            },
            {
              items:'区域申请管理',
              function_id:11,
              route:'range_apply',
              style:'icon-application-for-membership'
            },
            {
              items:'门店申请管理',
              function_id:12,
              route:'store_apply',
              style:'icon-kaidianshenqing'
            },
            {
              items:'消息发布',
              function_id:8,
              route:'news',
              style:'icon-xiazai41'
            },
            {
              items:'设置',
              function_id:9,
              route:'set_up',
              style:'icon-shezhi'
            },
            {
              items:'权限设置',
              function_id:10,
              route:'set_up_permissions',
              style:'icon-shezhi1'
            },

          ],
          navData:[]
        }
      },
    mounted(){
      let fData=JSON.parse(getStore('ADF'))
      let navd=this.defaultNav
      let curArr=[]
      for(let item of navd){
        for(let  itm of fData){
          if(item.function_id==itm.function_id){
            curArr.push(item)
          }
        }
      }
      this.navData=curArr
    },
    computed: {
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
    methods:{
      ...mapMutations(['setGoodsTabIndex']),
      handleSelect(index,indexPath){
        this.setGoodsTabIndex('0')
        this.$router.replace({
          path:`/${indexPath}`
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  .menu_list{
    min-height: 100%;
    background: transparent;
    position: relative;
    bottom: 0;
  }
  .menu_item{
    display: flex;
    justify-content: center;
  }
  .menu_item:hover{
    color: #555;
  }
  .manage_page{
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  i{
    margin-right: 10px;
    font-size: 20px;
    color: #fff;
  }
</style>
