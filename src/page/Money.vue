<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <div style="display: flex;margin-top: 20px">
          <el-form-item style="margin-left: 20px" label-width="0px" prop="phoneName">
            <el-input size="medium" placeholder="输入手机号或用户名" type="text" v-model="ruleForm1.phoneName"
                      auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button class="submit_btn" size="medium" type="primary" @click="submitForm('ruleForm1')">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="table_container">
        <el-table
          :data="tableData"
          :header-row-style="headerRowStyle"
          highlight-current-row
          style="width: 100%">
          <el-table-column
            property="phone"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            property="realname"
            label="用户名"
          >
          </el-table-column>
          <el-table-column
            property="consume"
            label="重消服务费">
          </el-table-column>
          <el-table-column
            property="subsidy"
            label="区域消费服务津贴">
          </el-table-column>
          <el-table-column
            property="help"
            label="帮扶津贴">
          </el-table-column>
          <el-table-column
            property="income"
            label="市场津贴">
          </el-table-column>
          <el-table-column
            property="extend"
            label="可提现">
          </el-table-column>
          <el-table-column
            label="奖金">
            <template slot-scope="scope">
              <el-button @click="handleRardDetailClick(scope.row.user_id)" type="text" size="small">明细</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="currentPage"
            :page-size="limit"
            layout=" prev, pager, next, jumper"
            :total="allTableData.length">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {getAllCountMoney,getCountMoneyByParams} from "../api/getData";
  import {mapActions,mapState,mapMutations} from 'vuex'
  export default {
    name: "Money",
    components: {
      HeadTop,
    },
    computed:{
      ...mapState(['rewardDetailInfo'])
    },
    data() {
      let validatePhoneName = (rule, value, callback) => {
        callback();
      }
      return {
        ruleForm1: {
          phoneName: '',
        },
        rules1: {
          phoneName: [
            {validator: validatePhoneName, trigger: 'blur'}
          ]
        },
        tableData: [],
        allTableData:[],
        offset: 0,
        limit: 10,
        count: 0,
        currentPage: 1,
      }
    },
    methods: {
      ...mapActions(['getRewardDetail']),
      handleRardDetailClick(user_id){
        let {page,pageSize,type}=this.rewardDetailInfo
        this.getRewardDetail({user_id,page,pageSize,type})
          this.$router.push({
            path:'/reward_detail',
            query:{
              user_id
            }
          })
      },
      headerRowStyle(){
        return {'color':'#333'}
      },
      submitForm(formName) { //根据手机号用户名查询
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {phoneName}=this.ruleForm1
            getCountMoneyByParams({requirement:phoneName}) //调查询接口
              .done(res=>{
                  if(res.message='success'){
                    this.allTableData=res.result
                    this.tableData=this.$_.chunk(this.allTableData,this.limit)[0]
                  }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) { //分页页码变动触发 val 变动的页码
        this.tableData=this.$_.chunk(this.allTableData,this.limit)[val-1]
        // this.currentPage = val;
        // this.offset = (val - 1) * this.limit;
      },
    },
    mounted(){
      getAllCountMoney()      //初始化页面table数据
        .done(res=>{
          if(res.message=='success'){
            this.allTableData=res.result
            this.tableData=this.$_.chunk(res.result,this.limit)[0]
          }
        })
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";
</style>
