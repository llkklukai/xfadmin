<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <div class="date_con">
        <div class="block2">
          <el-date-picker
            v-model="orderCountInfo.date_value2"
            type="daterange"
            align="right"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="finalCountInfo.pickerOptions2"
          >
          </el-date-picker>
        </div>
        <div>
          <el-button @click="searchByDate()" type="primary">查询</el-button>
        </div>
        <div style="margin-left: 50px">
          <el-button @click="exportExcel()" type="primary">导出报表</el-button>
        </div>
      </div>
      <div class="table_container">
        <table id="out-table">
          <div class="th_wrap">
            <tr class="tra">
              <th>订单总数量（件）</th>
              <th>总金额（元）</th>
              <th>市场价（元）</th>
              <th>成本价（元）</th>
              <th>待发订单数量</th>
              <th>已发订单数量</th>
            </tr>
            <tr class="tra">
              <th>{{orderCountInfo.orderSum}}</th>
              <th>{{orderCountInfo.sumPayMoney}}</th>
              <th>{{orderCountInfo.sumMarketPrice}}</th>
              <th>{{orderCountInfo.sumPrimePrice}}</th>
              <th>{{orderCountInfo.status2OrderSum}}</th>
              <th>{{orderCountInfo.status3OrderSum}}</th>
            </tr>
          </div>
          <div class="td_wrap">
            <div class="th_wrap">
              <tr class="tra">
                <th>
                  商品名称
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      销售总额
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('productSellSumMoney')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('productSellSumMoney')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      待发商品数
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('productAwaitOrderNum')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('productAwaitOrderNum')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      已发货
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('productOverOrderNum')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('productOverOrderNum')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      市场价
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('productPrice')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('productPrice')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      原价
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('primePrice')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('primePrice')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
              </tr>
            </div>
            <tr v-for="item in orderCountInfo.tableData">
              <td>{{item.productName}}</td>
              <td>{{item.productSellSumMoney}}</td>
              <td>{{item.productAwaitOrderNum}}</td>
              <td>{{item.productOverOrderNum}}</td>
              <td>{{item.productPrice}}</td>
              <td>{{item.primePrice}}</td>
            </tr>
          </div>
        </table>
      </div>
      <No-Data-Table v-show="$_.isEmpty(orderCountInfo.tableData)"/>
      <div class="pageination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="orderCountInfo.currentPage"
          :page-sizes="[10, 20 ,100, 200, 500,1000]"
          :page-size="orderCountInfo.limit"
          layout="sizes, prev, pager, next"
          :total="orderCountInfo.allTableData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import NoDataTable from '../components/NODatasTable'
  export default {
    name: "OrderCount",
    components: {
      HeadTop,NoDataTable
    },
    computed: {
      ...mapState(['orderCountInfo','finalCountInfo'])
    },
    methods: {
      ...mapActions(['getOrderCountList']),
      ...mapMutations(['orderCountCurPageChange','orderCountInfoSort']),
      sortByAsc(key) {
        this.orderCountInfoSort({key, asc:true})
      },
      sortByDesc(key) {
        this.orderCountInfoSort({key, desc:true})
      },
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '支付统计表.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      handleSizeChange(limit) {
        this.orderCountCurPageChange({limit})
      },
      handleCurrentChange(val) {
        this.orderCountCurPageChange({val})
      },
      initData(){
        let {date_value2}=this.orderCountInfo
        date_value2=date_value2+''
        let time1=''
        let time2=''
        if(!this.$_.isEmpty(date_value2)){
          time1=date_value2.substr(0,10)
          time2=date_value2.substr(11)
        }
        this.getOrderCountList({time1,time2})
      },
      searchByDate(){
        this.initData()
      }
    },
    mounted(){
      this.initData()
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";

  table {
    font-size: 14px;
  }

  th, td {
    width: 180px;
    vertical-align: middle;
    padding: 12px;
    border-left: 1px solid #f0f0f0;
    border-right: none;
    /*text-align: center;*/
  }

  th {
    border-bottom: none;
  }

  th:nth-child(1) {
    border-left: none;
  }

  td:nth-child(1) {
    border-left: none;
  }

  .th_wrap {
    background: #3a8ee6;
  }

  .th_wrap .tra th {
    color: #fff;
  }

  .th_wrap th {
    border: none;
  }

  .th_wrap td {
    border: none;
  }

  .td_wrap {
    margin-top: 20px;
  }

  .block2 {
    margin-right: 0px;
  }
  .e_button {
    color: #fff;
  }
</style>
