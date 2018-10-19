<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <div style="display: flex">
        <div class="block">
          <el-date-picker
            v-model="dateVal"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <el-button @click="getData()" type="primary">查找</el-button>
        <el-button style="margin-left: 100px" @click="toComputed" type="primary">计算</el-button>
      </div>
      <div v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading" class="table_container">
        <div class="list_">
          <div class="list_title">
            {{collectionData.hint1}}
          </div>
          <div class="list">
            <el-tag :key="item.user_id" v-for="item in collectionData.market2">{{item.realName}}
            </el-tag>
            <el-tag v-show="$_.isEmpty(collectionData.market2)" type="info">暂无数据</el-tag>
          </div>
        </div>
        <div class="list_">
          <div class="list_title">
            {{collectionData.hint2}}
          </div>
          <div class="list">
            <el-tag :key="item.user_id" v-for="item in collectionData.market10">{{item.realName}}
            </el-tag>
            <el-tag v-show="$_.isEmpty(collectionData.market10)" type="info">暂无数据</el-tag>
          </div>
        </div>
        <div class="list_">
          <div class="list_title">
            {{collectionData.hint3}}
          </div>
          <div class="list">
            <el-tag :key="item.user_id" v-for="item in collectionData.market50">{{item.realName}}
            </el-tag>
            <el-tag v-show="$_.isEmpty(collectionData.market50)" type="info">暂无数据</el-tag>
          </div>
        </div>
        <div class="list_">
          <div class="list_title">
            {{collectionData.hint4}}
          </div>
          <div class="list">
            <el-tag :key="item.user_id" v-for="item in collectionData.market300">{{item.realName}}
            </el-tag>
            <el-tag v-show="$_.isEmpty(collectionData.market300)" type="info">暂无数据</el-tag>
          </div>
        </div>
        <div class="list_">
          <div class="list_title">
            {{collectionData.hint5}}
          </div>
          <div class="list">
            <el-tag :key="item.user_id" v-for="item in collectionData.market800">{{item.realName}}
            </el-tag>
            <el-tag v-show="$_.isEmpty(collectionData.market800)" type="info">暂无数据</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {countShareBonus, statisticsShareBonus} from "../api/getData";
  import {confirmBox} from "../config/mUtils";

  export default {
    name: "ShareUotBonus",
    data() {
      return {
        loading: false,
        dateVal: '',
        collectionData: {
          hint1: '',
          hint2: '',
          hint3: '',
          hint4: '',
          hint5: '',
          maxId: ''
        }
      }
    },
    methods: {
      getData() {

        let time =this.dateVal
        if (!time) {
          this.$message.error("请选择月份")
          return
        }
        time=new Date(time).format("yyyy-MM")
        this.loading = true
        statisticsShareBonus({time})
          .done(res => {
            this.loading = false
            this.collectionData = res
          })
      },
      toComputed() {
        let {maxId} = this.collectionData
        if (!maxId) {
          this.$message.error("请先按日期查询列表")
          return
        }
        let callBack = () => {
          countShareBonus({maxId})
            .done(res => {
              this.$message.success("分红结算成功")
            })
        }
        confirmBox({msg: "继续将执行计算，是否继续？", bindThis: this, callBack})

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table.less";

  .list_ {
    border: 1px solid #cacaca;
    padding: 10px;
    margin-bottom: 20px;
    .list_title {
      padding: 15px;
      border-bottom: 1px solid #cacaca;
    }
    .list {
      padding: 10px 0px;
    }
  }
</style>
