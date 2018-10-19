<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <div>
        <el-button @click="exportExcel()" type="primary">导出报表</el-button>
      </div>
      <div class="table_container">
        <table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          id="out-table">
          <tr>
            <th style="width: 120px">手机号</th>
            <th style="width: 100px">用户名</th>
            <th>提现类型</th>
            <th>银行</th>
            <th style="width: 240px">提现方式</th>
            <th style="width: 140px">提现金额（元）</th>
            <th style="width: 100px">手续费（元）</th>
            <th style="width: 140px">实得金额（元）</th>
            <th>发起时间</th>
            <th>审批</th>
            <th style="width: 60px">删除</th>
          </tr>
          <!--<NODatasTable v-show="this.$_.isEmpty(allTableData)"/>-->
          <tr v-for="(item,index) in tableData">
            <td>{{item.phone}}</td>
            <td>{{item.realname}}</td>
            <td>{{item.type}}</td>
            <td>{{item.bank_name}} {{item.bank_branch}}</td>
            <td>{{item.cardNumber}}</td>
            <td>{{item.money}}</td>
            <td>{{item.serviceCharge}}</td>
            <td>{{item.practicalMoney}}</td>
            <td>{{item.insert_time}}</td>
            <td>
              <div v-show="item.status==true">
                <el-button
                  size="mini"
                  @click="handleAgree(index,item.cash_id, item)">同意
                </el-button>
                <el-button
                  style="margin-left: 0;margin-top: 10px;"
                  size="mini"
                  type="danger"
                  @click="handleRefuse(index,item.cash_id, item)">拒绝
                </el-button>
              </div>
              <div v-show="item.status==3">
                已拒绝
              </div>
              <div v-show="item.status==2">
                已同意
              </div>
            </td>
            <td><el-button @click="handleDelete(index,item.cash_id)" type="text">删除</el-button></td>
          </tr>
        </table>
        <div>
          <el-dialog
            class="dialog"
            title="提现审批"
            :visible.sync="dialogVisible"
            width="30%"
              >
            <div>用户：{{currInfo.realname}}</div>
            <div>地址：{{currInfo.address}}</div>
            <div>{{currInfo.cardNumber}}</div>
            <div style="color: #e86312; font-size: 16px;line-height: 3">提现金额：{{currInfo.money}}</div>
            <div v-show="!agree">理由：
              <el-input type="textarea"
                        autosize
                        placeholder="输入备注信息" v-model="excuse"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitAgree">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="pageination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync="offset"
            :page-sizes="[10, 20 ,100, 200, 500,1000]"
            :page-size="pagesize"
            layout="sizes, prev, pager, next"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import HeadTop from '../components/HeadTop'
  import {getCashApply, refuseCash, agreeCash,deleteCashRecord} from "../api/getData";
  import NODatasTable from '../components/NODatasTable'
  import {confirmBox} from "../config/mUtils";
  import {Loading} from 'element-ui'
  export default {
    name: "Cash",
    components: {
      HeadTop,NODatasTable
    },
    data() {
      let validatePhoneName = (rule, value, callback) => {
        callback();
      }
      return {
        loading:false,
        ruleForm1: {
          phoneName: '',
        },
        rules1: {
          phoneName: [
            {validator: validatePhoneName, trigger: 'blur'}
          ]
        },
        date_value2: '',
        tableData: [],
        offset: 1,
        pagesize: 10,
        count: 0,
        allTableData: [],
        dialogVisible: false,
        excuse: '',
        totalCount:1,
        currInfo: {
          realname: '',
          accountType: '',
          cardNumber: ''
        },
        agree:true
      }
    },
    methods: {
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '申请提现.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      handleDelete(index,cash_id){ //删除
        let callBack=()=>{
          deleteCashRecord({cash_id})
            .done(res=>{
              if(res.success==true){
                let {tableData}=this
                tableData.splice(index,1)
                this.tableData=tableData
              }
              this.$message({
                type:'success',
                message:'删除成功！'
              })
            })
        }
        confirmBox({bindThis:this,callBack})
      },
      handleSizeChange(val) {  //每页数量变化
        this.offset=1
        this.pagesize=val
        this.initData()
      },
      handleCurrentChange(val) { //页码变化
       this.offset=val
        this.initData()
      },
      handleRefuse(index, cash_id,item) { //拒绝
        this.excuse=''
        this.currInfo=item
        this.agree=false
        this.currInfo.index=index
        this.dialogVisible=true
      },
      handleAgree(index,cash_id,item) { //同意
        this.excuse=''
        this.currInfo=item
        this.agree=true
        this.currInfo.index=index
        this.dialogVisible=true
      },
      submitAgree(){  //提交同意或拒绝
        let {cash_id,index,type}=this.currInfo
        let {excuse,agree}=this
        if(type=="商家"){
          type=2
        }if(type=="普通用户"){
          type=1
        }
        if(agree){
          agreeCash({cash_id})
            .done(res => {
              if (res.message == 'success') {
                this.tableData[index].status = 2
                this.dialogVisible=false
                this.$message({
                  type: 'success',
                  message: '您已同意提现申请'
                })
              }
            })
        }
       if(!agree){
         if(excuse==''){
           this.$message.error("请输入拒绝理由")
           return
         }
         refuseCash({cash_id, excuse,type})
           .done(res => {
             if (res.message == 'success') {
               this.dialogVisible=false
               this.$message({
                 type: 'success',
                 message: '您的理由是: ' + excuse
               });
               this.tableData[index].status = 3
               this.tableData[index].excuse = excuse
             }
           })
       }
      },
      initData(){
        let {offset,pagesize}=this
        getCashApply({offset,pagesize})
          .done(res => {
            this.loading=false
            if (res.message == 'success') {
              this.tableData = res.result
              this.totalCount=res.totalCount
            }
          })
      }
    },
    watch: {
      tableData(val, oldVal) {
        for (let item of val) {
          // item.insert_time = new Date(item.insert_time).format('yyyy-MM-dd HH:mm:ss');
          if (item.excuse == ''||item.excuse == null) {
            item.excuse = '无'
          }
          if (item.accountType == 1) {
            item.cardNumber = `支付宝：${item.alipayNumber}`
          }
          if (item.accountType == 2) {
            item.cardNumber = `银行卡：${item.cardNumber}`
          }
          if (item.type == 1) {
            item.type = "普通用户"
          }
          if (item.type == 2) {
            item.type = "商家"
          }
        }
      }
    },
    mounted() {
      this.loading=true
      this.initData()
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";
  .dialog div{
    line-height: 2;
  }
</style>

