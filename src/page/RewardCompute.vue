<template>
  <div>
    <HeadTop/>
    <div class="all_con">
      <!--<h3 class="head_h3">-->
      <!--奖金计算-->
      <!--</h3>-->
      <div>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item :label="`${$route.query.realname} ${$route.query.phone}`">
            <el-input v-model="formData.agencyMoney" placeholder="代理金额"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formData.user_type" placeholder="选择会员等级">
              <el-option
                v-for="item in user_type_arr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">计算</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_container">
        <el-tabs  @tab-click="tabChange"  v-model="activeTabName"  type="border-card">
          <el-tab-pane name="desc" label="计算结果"></el-tab-pane>
          <el-tab-pane name="history" label="操作历史"></el-tab-pane>
          <div v-show="activeTabName=='desc'">
            <template>
              <el-table
                :data="rewardComputeInfo.tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="realname"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="user_type"
                  label="用户等级"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="rate"
                  label="推广比例">
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="金额">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="类型">
                </el-table-column>
                <el-table-column
                  prop="insert_time"
                  label="时间">
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div v-show="activeTabName=='history'">
            <template>
              <el-table
                :data="historyData"
                border
                style="width: 100%">
                <el-table-column
                  prop="realname"
                  label="姓名"
                  >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="电话"
                  >
                </el-table-column>
                <el-table-column
                  prop="agencyMoney"
                  label="代理金额">
                </el-table-column>
                <el-table-column
                  prop="user_type"
                  label="会员等级">
                </el-table-column>
                <el-table-column
                  prop="insert_time"
                  label="操作时间">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-tabs>
        <!--<el-card class="box-card">-->
          <!---->
        <!--</el-card>-->
      </div>
      </div>
    <div class="pageination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page.sync="rewardComputeInfo.page"
        :page-sizes="[10, 20 ,100, 200, 500,1000]"
        :page-size="rewardComputeInfo.pageSize"
        layout="sizes, prev, pager, next"
        :total="rewardComputeInfo.allTableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {computeUserType, confirmBox} from "../config/mUtils";
  import initData from '../store/initData'
  export default {
    name: "RewardCompute",
    components: {
      HeadTop
    },
    computed: {
      ...mapState(['rewardComputeInfo'])
    },
    data() {
      return {
        historyData:[],
        activeTabName:'desc',
        user_type_arr:initData.user_type_arr,
        formData: {
          agencyMoney: '',
          user_type:'',
        },
        tableData: [
          {
            realname: '',
            user_type: '',
            rate: '',
            money: '',
            insert_time: '',
            remark: ''
          }
        ]
      }
    },
    methods: {
      ...mapActions(['getComputeReward']),
      ...mapMutations(['computeRewardPageChange','initComputeRewardData']),
      onSubmit() {
        let userId = this.$route.query.user_id
        let {agencyMoney,user_type} = this.formData
        // let oldUserType=this.$route.query.user_type
        // oldUserType=computeUserType({user_type:oldUserType}) //转化user_type为数字
        if (!agencyMoney) {
          this.$message.error("请输入代理金额")
          return false
        }
        if(!user_type){
          this.$message.error("请选择会员等级")
          return false
        }
        user_type=computeUserType({user_type}) //转化user_type为数字
        let {realname,phone}=this.$route.query
        let callBack=()=>{
          this.getComputeReward({userId, agencyMoney,user_type,realname,phone,})
        }
        confirmBox({msg:'继续将计算该代理商上级的奖金，是否继续？',callBack,bindThis:this})
      },
      handleSizeChange(pageSize) {
        this.computeRewardPageChange({pageSize})
      },
      handleCurrentChange(page) {
        this.computeRewardPageChange({page})
      },
      tabChange(){
        let index=this.activeTabName
        if(index=="history"){
          this.getHistoryData()
        }
      },
      getHistoryData(){
        let curArr=JSON.parse(window.localStorage.getItem("historyReward"))
        if(!curArr) return
        curArr.map(item=>{
          item.user_type=computeUserType({user_type:item.user_type,num:false})
        })
        this.historyData=curArr
      }
    },
    mounted() {
      this.initComputeRewardData()
      this.getHistoryData()
      console.log("typeof"+typeof [])
    }
  }
</script>

<style scoped>
  @import "../style/table.less";
</style>
