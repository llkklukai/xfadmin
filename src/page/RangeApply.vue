<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <div style="display: flex">
        <el-button @click="exportExcel()" type="primary">导出报表</el-button>
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
      </div>
      <div class="table_container">
        <table id="out-table">
          <tr class="trh">
            <th style="width: 210px">申请人</th>
            <th>身份证号</th>
            <th>地址</th>
            <th>申请时间</th>
            <th style="width: 80px">资金状态</th>
            <th>申请级别</th>
            <th>审核</th>
            <th>删除</th>
          </tr>
          <tr v-for="(item,index) in tableData">
            <td>{{item.realname}} {{item.phone}} {{item.nowadayUserType}}</td>
            <td>{{item.id_card}}</td>
            <td>{{item.address}}</td>
            <td>{{item.insertTime}}</td>
            <td>
              <template>
                <el-select @blur="handleIdClick(item.id)" @change="handleStateChange" size="small"
                           v-model="item.agencyMoney" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </td>
            <td>{{item.userType}}</td>
            <td>
              <div v-show="item.state==0">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleAgree(index,item.id, item)">同意
                </el-button>
                <el-button
                  style="margin-left: 0;margin-top: 10px;"
                  size="mini"
                  type="danger"
                  @click="handleRefuse(index,item.id, item)">拒绝
                </el-button>
              </div>
              <div style="color: #F56C6C" v-show="item.state==2">
                已拒绝
              </div>
              <div style="color: #409EFF" v-show="item.state==1">
                已同意
              </div>
            </td>
            <td>
              <el-button @click="handleDelete(index,item.id)" type="text">删除</el-button>
            </td>
          </tr>
        </table>
        <NoDatasTable v-show="$_.isEmpty(tableData)"></NoDatasTable>
        <div>
          <el-dialog
            class="dialog"
            title="提现审批"
            :visible.sync="dialogVisible"
            width="30%"
          >
            <div>申请人：{{currInfo.realname}}</div>
            <div>申请级别：{{currInfo.address}}</div>
            <div>身份证号：{{currInfo.id_card}}</div>
            <div>地址：{{currInfo.address}}</div>
            <div>资金状态：{{currInfo.address}}</div>
            <div v-show="!agree">拒绝具体原因：
              <el-input type="textarea"
                        autosize
                        placeholder="输入拒绝原因" v-model="excuse"></el-input>
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
            :current-page.sync="currentPage"
            :page-sizes="[10, 20 ,100, 200, 500,1000]"
            :page-size="limit"
            layout="sizes, prev, pager, next"
            :total="allTableData.length">
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
  import {
    selectAgencyApplyForList,
    updateAgencyApplyForState,
    updateAgencyApplyForAgencyMoney,
    deleteApplicationFormDate
  } from "../api/getData";
  import NoDatasTable from '../components/NODatasTable'
  import {confirmBox} from "../config/mUtils";
  import {mapState} from "vuex"

  export default {
    name: "RangeApply",
    computed: {
      ...mapState(["finalCountInfo"])
    },
    components: {
      HeadTop, NoDatasTable
    },
    data() {
      return {
        date_value1:'',
        tableData: [],
        limit: 10,
        currentPage: 1,
        allTableData: [],
        dialogVisible: false,
        excuse: '',
        currInfo: {},
        options: [{
          value: '0',
          label: '未交'
        }, {
          value: '1',
          label: '已交'
        }],
        agree: true,
        id: ''
      }
    },
    methods: {
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '区域代理申请.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      handleIdClick(id) { //当前操作行的ID
        this.id = id
      },
      handleStateChange(val) { //选择资金状态变化
        let {id} = this
        let callBack = () => {
          updateAgencyApplyForAgencyMoney({agencyMoney: val, id})
            .done(res => {
              if (res.result == true) {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
              }
            })
        }
        confirmBox({msg: "继续将执行修改资金状态，是否继续？", callBack, bindThis: this})
      },
      handleDelete(index, id) {  //根据id删除
        let callBack = () => {
          deleteApplicationFormDate({id})
            .done(res => {
              if (res.success == true) {
                let {tableData} = this
                tableData.splice(index, 1)
                this.tableData = tableData
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                })
              }
            })
        }
        confirmBox({bindThis: this, callBack})
      },
      handleSizeChange(val) { //每页数量变化回调
        this.currentPage = 1
        this.limit = val
        this.tableData = this.$_.chunk(this.allTableData, val)[0]
      },
      handleCurrentChange(val) { //页码变化回调
        this.tableData = this.$_.chunk(this.allTableData, this.limit)[val - 1]
      },
      handleRefuse(index, id, item) { //点击拒绝
        this.excuse = ''
        this.currInfo = item
        this.agree = false
        this.currInfo.index = index
        this.dialogVisible = true
      },
      handleAgree(index, id, item) { //点击同意
        this.excuse = ''
        this.currInfo = item
        this.agree = true
        this.currInfo.index = index
        this.dialogVisible = true
      },
      submitAgree() { //最终提交是否同意
        let {id, index} = this.currInfo
        let {excuse, agree} = this
        if (agree) {
          updateAgencyApplyForState({rejectExcuse: '', id, state: 1})
            .done(res => {
              if (res.result == true) {
                this.tableData[index].state = 1
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: '您已同意提现申请'
                })
              }
            })
        }
        if (!agree) {
          if (excuse == '') {
            this.$message.error("请输入拒绝理由")
            return false
          }
          updateAgencyApplyForState({id, rejectExcuse: excuse, state: 2})
            .done(res => {
              if (res.result == true) {
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: '您的理由是: ' + excuse
                });
                this.tableData[index].state = 2
                this.tableData[index].rejectExcuse = excuse
              }
            })
        }
      },
      initData() {
        let date_value1=this.date_value1+''
        let time1,time2=''
        if(!this.$_.isEmpty(date_value1)){
          time1=date_value1.substr(0,10)
          time2=date_value1.substr(11)
        }
        time1=time1=='null'?'':time1
        selectAgencyApplyForList({time1,time2})
          .done(res => {
            if (res.success == true) {
              this.allTableData = res.list
              this.tableData = this.$_.chunk(res.list, this.limit)[0]
            }
          })
      },
      submitForm(){
        this.initData()
      }
    },
    watch: {
      allTableData(val) {
        for (let item of val) {
          //要申请的区域代理等级
          if (item.userType == 1) {
            item.userType = '省级代理'
          }
          if (item.userType == 2) {
            item.userType = '市级代理'
          }
          if (item.userType == 3) {
            item.userType = '县级代理'
          }
          //当前代理等级
          if (item.nowadayUserType == 0) {
            item.nowadayUserType = '注册会员'
          }
          if (item.nowadayUserType == 1) {
            item.nowadayUserType = '省级代理'
          }
          if (item.nowadayUserType == 2) {
            item.nowadayUserType = '市级代理'
          }
          if (item.nowadayUserType == 3) {
            item.nowadayUserType = '县级代理'
          }
          if (item.nowadayUserType == 4) {
            item.nowadayUserType = 'vip代理'
          }
          if (item.nowadayUserType == 5) {
            item.nowadayUserType = '商务代理'
          }
          if (item.nowadayUserType == 6) {
            item.nowadayUserType = '体验代理'
          }
          if (item.nowadayUserType == -1) {
            item.nowadayUserType = '公司'
          }
          if (item.agencyMoney == 0) {
            item.agencyMoney = '未交'
          }
          if (item.agencyMoney == 1) {
            item.agencyMoney = '已交'
          }
        }
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";

  .dialog div {
    line-height: 2;
  }

  .trh th {
    background: #409eff;
    color: #fff;
  }

  tr td {
    border-left: none;
  }
</style>

