<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <h3 class="head_h3">
        订单管理
      </h3>
      <div class="tab_con">
        <el-menu style="border-bottom: 0" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect">
          <el-menu-item index="1">待发货</el-menu-item>
          <el-menu-item index="2">待付款</el-menu-item>
          <el-menu-item index="3">已发货</el-menu-item>
          <el-menu-item index="4">申请退款</el-menu-item>
          <el-menu-item index="5">已退款</el-menu-item>
          <el-menu-item index="6">已完成</el-menu-item>
        </el-menu>
      </div>
      <div style="justify-content: flex-start;margin-top: 10px;font-size: 14px" class="date_con">
        <div style="color: #555;">
          成交时间：
        </div>
        <div class="block2">
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
          <el-button @click="handleSearch" type="primary">
            查找
          </el-button>
          <el-button style="margin-left: 20px" @click="exportExcel()" type="primary" plain>导出报表</el-button>
        </div>
      </div>
      <div class="table_container">
        <table id="out-table">
          <Order-Table v-on:initData="initData" v-on:delete="deleteOrder" :selectInfo="selectInfo" :options2="options2" :options="options" v-on:changeStatus="statusChange" :key="index" :itemData="item" :status="item.status"
                       v-for="(item,index) in listTable"></Order-Table>
        </table>
        <div class="pageination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync="currentPage"
            :page-sizes="[10, 20 ,100, 200, 500,1000]"
            :page-size="limit"
            layout="sizes, prev, pager, next"
            :total="this.allTableData.length">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import OrderTable from '../components/OrderTable'
  import {getOrderListByStatus, updateOrderById,adminDeleteOrder} from '../api/getData'
  import {baseImgPath} from "../config/env";
  import {mapState} from 'vuex'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import {getStore} from "../config/mUtils";

  export default {
    name: "OrderManage",
    components: {
      HeadTop, OrderTable
    },
    computed: {
      ...mapState(['finalCountInfo','orderDispatchInfo'])
    },
    data() {
      return {
        tableData: {
          status: 2,
        },
        date_value1: '',
        activeIndex: '1',
        offset: 0,
        limit: 10,
        count: 0,
        currentPage: 1,
        status: '',
        allTableData: [],
        listTable: [],
        options:[],
        options2:[],
        selectInfo:''
      }
    },
    methods: {
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '订单.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      deleteOrder(orderId){
        console.log('orderId'+JSON.stringify(orderId))
        adminDeleteOrder(orderId)
          .done(res=>{
            let {listTable}=this
            let order_id=orderId.orderId
            listTable=listTable.filter(item=>item.order_id!=order_id)
            this.listTable=listTable
            if(res.message=='success'){
              this.$message({
                type:'success',
                message:'删除成功！'
              })
            }
          })
      },
      async initData() {
        let {status} = this.tableData
        let {date_value1} = this
        date_value1 = date_value1 + ''
        let startDatetime = ''
        let endDatetime = ''
        if (date_value1) {
          startDatetime = date_value1.substr(0, 10)
          endDatetime = date_value1.substr(11)
        }
        let token=getStore('token')
        await getOrderListByStatus({status, startDatetime, endDatetime,token})
          .done(res => {
            let result=res.result
            let options=res.addressList
            for(let item of options){
              item.info=`姓名：${item.receive_name} 电话：${item.receive_phone} 地址：${item.province} ${item.city} ${item.area} ${item.street}`
            }
           this.options=options
            this.options2=res.expressage
            result.map(item=>{
              if(item.payWay==1){
                item.payWay="支付宝"
              }
              if(item.payWay==2){
                item.payWay="账户支付"
              }
              if(item.payWay==3){
                item.payWay="微信支付"
              }
              if(item.payWay==4){
                item.payWay="后台添加"
              }
            })
            this.allTableData = result
            this.listTable = this.$_.chunk(res.result, this.limit)[0]
          })
      },
      statusChange({orderId, status,send_address_id,logistics_company,logistics_number}) {
        updateOrderById({orderId,status,send_address_id,logistics_company,logistics_number})
          .done(res=>{
            if(res.code=='000'){
              this.$message({
                message:'操作成功',
                type:'success'
              })
              if(status!=6){//申请退款
                this.listTable=this.listTable.filter(item=>item.order_id!=orderId)   //筛选掉已经改变状态的item
              }
            }else {
              this.$message.error('操作失败')
            }
          })
      },
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        if (key == 1) {  //待发货
          this.tableData.status = 2
        }
        if (key == 2) { //待付款
          this.tableData.status = 1
        }
        if (key == 3) {  //已发货
          this.tableData.status = 3
        }
        if (key == 4) { //申请退款
          this.tableData.status = 6
        }
        if (key == 5) {  //已退款
          this.tableData.status = 7
        }
        if (key == 6) { //已完成
          this.tableData.status = 4
        }
        this.initData()
        this.currentPage=1
      },
      handleSearch() {
        this.currentPage=1
        this.initData()
      },
      handleSizeChange(val) {
        this.limit = val
        this.currentPage = 1
        this.listTable = this.$_.chunk(this.allTableData, val)[0]
      },
      handleCurrentChange(val) {
        this.listTable = this.$_.chunk(this.allTableData, this.limit)[val - 1]
      },
    },
    mounted() {
      this.initData()
    },
    watch: {
      allTableData(val) {
        for (let item of val) {
          if (item.description) {
            item.description = item.description.substr(0, 60) + '...'
          }
          item.imageUrl = `${baseImgPath}/CommodityImages/${item.imageUrl}`
          item.address = `${item.province} ${item.city} ${item.area}`
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";

</style>
