<template>
  <div>
    <HeadTop></HeadTop>
    <div class="all_con">
      <H3 class="head_h3">奖金明细</H3>

      <div class="table_container">
        <el-tabs type="border-card">
          <el-tabs v-model="rewardDetailInfo.type" type="card" @tab-click="tabChange">
            <el-tab-pane label="推广服务费" name="1"></el-tab-pane>
            <el-tab-pane label="重消服务费" name="2"></el-tab-pane>
            <el-tab-pane label="区域消费津贴" name="3"></el-tab-pane>
            <el-tab-pane label="帮扶津贴" name="4"></el-tab-pane>
            <el-tab-pane label="市场津贴" name="5"></el-tab-pane>
          </el-tabs>
          <div style="margin-top: 20px;">
            <template>
              <el-table
                :data="rewardDetailInfo.tableData"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="insert_time"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="奖金">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-tabs>
      </div>
    </div>
    <div class="pageination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page.sync="rewardDetailInfo.page"
        :page-sizes="[10, 20 ,100, 200, 500,1000]"
        :page-size="rewardDetailInfo.pageSize"
        layout="sizes, prev, pager, next"
        :total="rewardDetailInfo.countSum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapState, mapActions,mapMutations} from 'vuex'
  import {getStore} from "../config/mUtils";

  export default {
    name: "RewardDetail",
    components: {
      HeadTop
    },
    computed: {
      ...mapState(['rewardDetailInfo'])
    },
    data() {
      return {}
    },
    methods: {
      ...mapActions(['getRewardDetail']),
      ...mapMutations(['rewardDetailPageChange','rewardTabChange']),
      tabChange(){
        this.rewardTabChange()
        this.getData()
      },
      getData(tab, event) {
        let params=this.rewardDetailInfo
        params.user_id=getStore("rewardDetailQuery")
        this.getRewardDetail(params)
      },
      handleSizeChange(pageSize) {
        this.rewardDetailPageChange({pageSize})
          this.getData()
      },
      handleCurrentChange(page) {
        this.rewardDetailPageChange({page})
        this.getData()
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table.less";
</style>
