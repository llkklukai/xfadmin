<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <div class="date_con">
        <div style="font-size: 14px;color: #666">
          查看支付方式：
        </div>
        <template>
          <el-select v-model="type_val" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <div class="block2">
          <el-date-picker
            v-model="payTypeCountInfo.date_value2"
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
              <th>总计支付金额（元）</th>
              <th>支付宝统计（元）</th>
              <th>账户支付（元）</th>
              <th>微信支付（元）</th>
            </tr>
            <tr class="tra">
              <th>{{payTypeCountInfo.resData.count}}</th>
              <th>{{payTypeCountInfo.resData.alipayCount }}</th>
              <th>{{payTypeCountInfo.resData.accountpayCount}}</th>
              <th>{{payTypeCountInfo.resData.wxpayCount}}</th>
            </tr>
          </div>
          <div class="td_wrap">
            <div class="th_wrap">
              <tr class="tra">
                <th>账户信息</th>
                <th>支付方式</th>
                <th>支付金额</th>
                <th>交易时间</th>
              </tr>
            </div>
            <tr v-for="item in payTypeCountInfo.tableData">
              <td>{{item.realname}} {{item.phone}}</td>
              <td>{{item.payWay}}{{item.note}}</td>
              <td>{{item.payMoney}}</td>
              <td>{{item.insert_time}}</td>
            </tr>
          </div>
        </table>
      </div>
      <No-Data-Table v-show="$_.isEmpty(payTypeCountInfo.tableData)"/>
      <div class="pageination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="payTypeCountInfo.currentPage"
          :page-sizes="[10, 20 ,100, 200, 500,1000]"
          :page-size="payTypeCountInfo.limit"
          layout="sizes, prev, pager, next"
          :total="payTypeCountInfo.allTableData.length">
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
    name: "PayTypeCount",
    components: {
      HeadTop, NoDataTable
    },
    computed: {
      ...mapState(['payTypeCountInfo','finalCountInfo'])
    },
    data() {
      return {
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '支付宝'
        }, {
          value: '2',
          label: '账户支付'
        }, {
          value: '3',
          label: '微信'
        },],
        type_val: '',
      }
    },
    methods: {
      ...mapActions(['getPayTypeCountList']),
      ...mapMutations(['payTypeCountCurPageChange']),
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
        this.payTypeCountCurPageChange({limit})
      },
      handleCurrentChange(val) {
        this.payTypeCountCurPageChange({val})
      },
      initData() {
        let {date_value2} = this.payTypeCountInfo
        let {type_val} = this
        date_value2 = date_value2 + ''
        let statime = ''
        let endtime = ''

        if (!this.$_.isEmpty(date_value2)) {
          statime = date_value2.substr(0, 10)
          endtime = date_value2.substr(11)
        }
        this.getPayTypeCountList({statime, endtime, type: type_val})
      },
      searchByDate() {
        this.initData()
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";

  #out-table {
    margin: 0 auto;
  }

  table {
    font-size: 14px;
  }

  th, td {
    width: 380px;
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
    text-align: left;
  }

  .td_wrap {
    margin-top: 20px;
  }

  .block2 {
    margin-right: 0px;
  }
</style>
