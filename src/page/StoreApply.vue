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
        <el-button style="margin-right: auto" @click="addStoreApply" type="primary">添加门店申请</el-button>
      </div>
      <div class="table_container">
        <table id="out-table">
          <tr>
            <th>申请人</th>
            <th>身份证号</th>
            <th>电话</th>
            <th>地址</th>
            <th>申请时间</th>
            <th>审核</th>
            <th>删除</th>
          </tr>
          <tr v-for="(item,index) in tableData">
            <td>{{item.realname}} {{item.sex}}</td>
            <td>{{item.id_card}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.address}}</td>
            <td>{{item.insert_time}}</td>
            <td>
              <div v-show="item.status==1">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleAgree(index,item.store_id, item)">同意
                </el-button>
                <el-button
                  style="margin-left: 0;margin-top: 10px;"
                  size="mini"
                  type="danger"
                  @click="handleRefuse(index,item.store_id, item)">拒绝
                </el-button>
              </div>
              <div style="color: #F56C6C" v-show="item.status==3">
                已拒绝
              </div>
              <div style="color: #409EFF" v-show="item.status==2">
                已同意
              </div>
            </td>
            <td>
              <el-button @click="handleDelete(index,item.store_id)" type="text">删除</el-button>
            </td>
          </tr>
        </table>
        <NoDatasTable v-show="$_.isEmpty(tableData)"></NoDatasTable>
        <div>
          <el-dialog
            class="dialog"
            title="门店申请审批"
            :visible.sync="dialogVisible"
            width="30%"
          >
            <div>申请人：{{currInfo.realname}}</div>
            <div>身份证号：{{currInfo.id_card}}</div>
            <div>地址：{{currInfo.address}}</div>
            <div v-show="!agree">拒绝具体原因：
              <el-input type="textarea"
                        autosize
                        placeholder="输入原因" v-model="rejectExcuse"></el-input>
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
      <el-dialog
        title="添加门店申请"
        :visible.sync="dialogVisible2"
        width="30%"
        center=""
      >
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="ruleForm2.realname"></el-input>
          </el-form-item>
          <el-form-item label="注册账号" prop="number">
            <el-input placeholder="请输入注册的手机号" v-model="ruleForm2.number"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="ruleForm2.id_card"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="ruleForm2.sex" label="男">男</el-radio>
            <el-radio v-model="ruleForm2.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm2.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <v-distpicker :province.sync="ruleForm2.range.province" :city.sync="ruleForm2.range.city"
                          :area.sync="ruleForm2.range.area"   @selected="onSelectedAddress"></v-distpicker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitForm2('ruleForm2')">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import HeadTop from '../components/HeadTop'
  import {updateStoreStatus, selectStoreList, deleteStoreData, adminAddStore} from "../api/getData";
  import NoDatasTable from '../components/NODatasTable'
  import {confirmBox} from "../config/mUtils";
  import {mapState} from "vuex"

  export default {
    name: "StoreApply",
    components: {
      HeadTop, NoDatasTable
    },
    computed: {
      ...mapState(["finalCountInfo"])
    },
    data() {
      return {
        ruleForm2: {
          realname: '',
          id_card: '',
          number: '',
          sex: '',
          phone: '',
          address: '',
          range: {
            province: '',
            city: '',
            area: ''
          }
        },
        rules2: {
          realname: [
            {required: true, message: '请输入真实姓名', triger: blur}
          ], number: [
            {required: true, message: '请输入已注册账户', triger: blur}
          ], phone: [
            {required: true, message: '请输入手机号', triger: blur}
          ],
        },
        dialogVisible2: false,
        date_value1: '',
        tableData: [],
        limit: 10,
        currentPage: 1,
        allTableData: [],
        dialogVisible: false,
        rejectExcuse: '',
        currInfo: {
          realname: '',
          accountType: '',
          cardNumber: ''
        },
        options: [{
          value: '1',
          label: '未交'
        }, {
          value: '2',
          label: '已交'
        }],
        agree: true
      }
    },
    methods: {
      onSelectedAddress(val){
        this.ruleForm2.range.province=val.province.value
        this.ruleForm2.range.city=val.city.value
        this.ruleForm2.range.area=val.area.value
      },
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {ruleForm2} = this
            let {province, city, area} = this.ruleForm2.range
            if (!area) {
              this.$message.error("请选择地址信息")
              return false
            }
            ruleForm2.address = `${province}${city}${area}`
            adminAddStore(ruleForm2)
              .done(res => {
                if(res.code==="107"){
                  this.$message.error("输入的会员账号不存在")
                  return
                }
                if(res.code==="000"){
                  this.$message.success("添加成功")
                  this.initData()
                  this.dialogVisible2=false
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addStoreApply() {
        this.dialogVisible2 = true
      },
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '门店申请.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      handleDelete(index, store_id) {  //根据id删除
        let callBack = () => {
          deleteStoreData({store_id})
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
      handleSizeChange(val) {
        this.currentPage = 1
        this.limit = val
        this.tableData = this.$_.chunk(this.allTableData, val)[0]
      },
      handleCurrentChange(val) {
        this.tableData = this.$_.chunk(this.allTableData, this.limit)[val - 1]
      },
      handleRefuse(index, store_id, item) {
        this.rejectExcuse = ''
        this.currInfo = item
        this.agree = false
        this.currInfo.index = index
        this.dialogVisible = true
      },
      handleAgree(index, store_id, item) {
        this.rejectExcuse = ''
        this.currInfo = item
        this.agree = true
        this.currInfo.index = index
        this.dialogVisible = true
      },
      submitAgree() {
        let {store_id, index} = this.currInfo
        let {rejectExcuse, agree} = this
        if (agree) {
          updateStoreStatus({store_id, status: 2, rejectExcuse: ''})
            .done(res => {
              if (res.result == true) {
                this.tableData[index].status = 2
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: '你已同意申请'
                })
              }
            })
        }
        if (!agree) {
          if (rejectExcuse == '') {
            this.$message.error("请输入拒绝理由")
            return false
          }
          updateStoreStatus({store_id, rejectExcuse, status: 3})
            .done(res => {
              if (res.result == true) {
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: '您的理由是: ' + rejectExcuse
                });
                this.tableData[index].status = 3
                this.tableData[index].rejectExcuse = rejectExcuse
              }
            })
        }
      },
      initData() {
        let date_value1 = this.date_value1 + ''
        let time1, time2 = ''
        if (!this.$_.isEmpty(date_value1)) {
          time1 = date_value1.substr(0, 10)
          time2 = date_value1.substr(11)
        }
        time1 = time1 == 'null' ? '' : time1
        selectStoreList({time1, time2})
          .done(res => {
            if (res.success == true) {
              this.allTableData = res.list
              this.tableData = this.$_.chunk(res.list, this.limit)[0]
            }
          })
      },
      submitForm() {
        this.initData()
      }
    },
    watch: {
      allTableData(val) {
        for (let item of val) {
          if (item.userType == 1) {
            item.userType = '省级代理'
          }
          if (item.userType == 2) {
            item.userType = '市级代理'
          }
          if (item.userType == 3) {
            item.userType = '县级代理'
          }
          item.insert_time = new Date(item.insert_time).format("yyyy-MM-dd HH:mm:ss")
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
</style>

