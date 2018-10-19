<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <div class="search_view">
        <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="0px"
                 class="demo-ruleForm">
          <div style="display: flex;margin-top: 20px">
            <el-form-item label-width="0px" prop="phoneName">
              <el-input size="medium" placeholder="输入手机号或用户名" type="text" v-model="ruleForm1.phoneName"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label-width="0px">
              <el-button class="submit_btn" size="medium" type="primary" @click="submitForm()">搜索</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-button style="margin-left: 20px" @click="exportExcel()" type="primary">导出报表</el-button>
        <div style="margin: 0 0 0 20px">
          <el-date-picker
            v-model="date_value1"
            type="daterange"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="finalCountInfo.pickerOptions2"
          >
          </el-date-picker>
        </div>
        <el-button style="margin-right: auto" @click="submitForm()" type="primary">搜索</el-button>
        <div>
          <el-button @click="handleAddAgent()" size="small" type="primary">新增代理商</el-button>
        </div>
      </div>
      <div style="display:flex;align-items:center;height: 40px;padding: 10px;background:#409EFF; color: #fff;margin-bottom: 10px">
        当前总数：{{agentInfo.count}}
      </div>
      <el-tabs  v-model="activeTabName"  @tab-click="tabChange" type="border-card">
        <el-tab-pane v-for="(item,index) in tabData" :key="index" :name="index+1+''"  :label="item.name"></el-tab-pane>
        <div>
          <template>
            <div class="table_container">
              <Agent-Table v-on:handleRecover="handleRecover"
                           v-on:handleFreeze="handleFreeze"
                           v-on:handleEdit="handleEdit"
                           v-on:handleDelete="handleDelete"
                           v-on:handleNameClick="handleNameClick"
                           @updateHelpUpgradeFunction="updateHelpUpgradeFunction"
                           :itemData="agentInfo.tableData"/>
            </div>

          </template>
        </div>
      </el-tabs>

        <div class="pageination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync="agentInfo.page"
            :page-sizes="[10, 20 ,100, 200, 500,1000]"
            :page-size="agentInfo.pageSize"
            layout="sizes, prev, pager, next"
            :total="agentInfo.count">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import AgentTable from "../components/AgentTable";
  import FileSaver from 'file-saver'
  import {updateHelpUpgradeFunction, updateUserData} from '../api/getData'
  import XLSX from 'xlsx'
  import {confirmBox, removeStore, setStore} from "../config/mUtils";
  export default {
    name: "AgentManage",
    computed: {
      ...mapState(['agentInfo','editAgentInfo','finalCountInfo']),
    },
    components: {
      AgentTable,
      HeadTop,
    },
    data() {
      let validatePhoneName = (rule, value, callback) => {
        callback();
      }
      let validaterealName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入代理姓名'));
        } else {
          callback();
        }
      }
      let validateIDnumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入代理身份证号码'));
        } else {
          callback();
        }
      }
      return {
        date_value1:'',
        ruleForm1: {
          phoneName: '',
        },
        rules1: {
          phoneName: [
            {validator: validatePhoneName, trigger: 'blur'}
          ]
        },
        rules2: {
          realname: [
            {validator: validaterealName, trigger: 'blur'}
          ],

          IDnumber: [
            {validator: validateIDnumber, trigger: 'blur'}
          ],
        },
        dialogVisible:false,
        tabData:[
          {
            name:'全部用户'
          }
        ],
        userIdArr:[],
        activeTabName:'1'
      }
    },
    methods: {
      ...mapActions(['getEditAgent', 'getAgentList', 'upDateAgentInfo', 'getAgentListByQuery','getAgentDownInfo']),
      ...mapMutations(['changeAgentList','changeAgentAddress']),
      async updateHelpUpgradeFunction(params){
        let callBack=()=>{
          updateHelpUpgradeFunction(params)
            .done(res=>{
              if(res.code=="000"){
                this.$message({
                  message:"修改成功",
                  type:"success"
                })
               this.$set(this.agentInfo.tableData[params.index],"helpUpgrade",params.helpUpgrade)
              }
            })
        }
        confirmBox({bindThis:this,callBack,msg:'此操作将执行修改，是否继续？'})
      },
      tabChange(){
        let index=this.activeTabName
        let user_id=this.userIdArr[index-2]
        this.tabData.splice(index)
        if(index==1){
          this.userIdArr=[]
          this.getData()
          return
        }
        this.getDownData(user_id)
      },
      handleNameClick({realname,user_id}){
        this.userIdArr.push(user_id)
        this.tabData.push({name:realname})
        this.activeTabName=++this.activeTabName+""
        this.getDownData(user_id)
      },
      onSelected(data){
        this.changeAgentAddress(data)
      },
      getDownData(userId){
        this.getAgentDownInfo({page:this.agentInfo.page,pageSize:this.agentInfo.pageSize,userId})
      },
      confirmEdit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params={}
            params.address=this.editAgentInfo.formDatas.address
            params.user_id=this.editAgentInfo.formDatas.user_id
            params.IDnumber=this.editAgentInfo.formDatas.IDnumber
            params.realName=this.editAgentInfo.formDatas.realname
            updateUserData(params)
              .done(res=>{
                if(res.message=='success'){
                  this.$message({
                    type:'success',
                    message:'修改成功！'
                  })
                  this.dialogVisible=false
                  this.getAgentList()
                }
              })
          }else {
            return false;
          }
        });
      },
      submitForm() {
        let {phoneName} = this.ruleForm1
        let date_value1=this.date_value1+''
        let time1=''
        let time2=''
        if(!this.$_.isEmpty(date_value1)){
          time1=date_value1.substr(0,10)
          time2=date_value1.substr(11)
        }
        time1=time1=='null'?'':time1
        this.getAgentListByQuery({requirement: phoneName,time1,time2,page:this.agentInfo.page,pageSize:this.agentInfo.pageSize})
        this.userIdArr=[]
        this.activeTabName='1'
        this.tabData=[{name:'全部用户'}]
      },
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '代理商.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      handleRecover({index, user_id}) {
        let status = '1' //状态1正常3冻结没有2
        let callBack=()=>{
          this.upDateAgentInfo({index, user_id, status})
        }
        confirmBox({bindThis:this,callBack,msg:'此操作将执行恢复正常，是否继续？'})
      },
      handleEdit({index, user_id,realname,phone}) {
        let  query={user_id,realname,phone}
        removeStore("agentQuery")
        setStore("agentQuery",JSON.stringify(query))
        this.$router.push({
          path:'/edit_agent',
        })
      },
      handleFreeze({index, user_id}) {
        let status = '3'
        let callBack=()=>{
          this.upDateAgentInfo({index, user_id, status})
        }
        confirmBox({msg:'此操作将执行冻结，是否继续？',bindThis:this,callBack})
      },
      handleDelete({index, user_id}){
        let callBack=()=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
        confirmBox({bindThis:this,callBack})
      },
      handleSizeChange(limit) {
        this.changeAgentList({limit})
        this.submitForm()
      },
      handleCurrentChange(val) {
        this.changeAgentList({val})
        this.submitForm()
      },
      handleAddAgent() {
        this.$router.push({
          path: '/add_agent',
        })
      },
      getData(){
        this.getAgentList({page:this.agentInfo.page,pageSize:this.agentInfo.pageSize})
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table.less";

  .search_view {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 100px;
  }
</style>
