<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <div class="date_con">
        <div class="block2">
          <el-date-picker
            v-model="finalCountInfo.date_value2"
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
              <th>可提现总额</th>
              <th>市场总额（元）</th>
              <th>重消账户总额</th>
              <th>提现手续费总额（元）</th>
              <th>待审批总额（元）</th>
              <th>审批完成总额（元）</th>
              <th>提现驳回总额</th>
            </tr>
            <tr class="tra">
              <el-tooltip class="item" effect="dark" content="所有用户的可提现金额的总和（包含手续费）" placement="top-start">
                <th>{{thData.ExtendSum}}</th>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="公司账户下的所有用户在本平台消费总金额" placement="top-start">
                <th>{{thData.sumMarket}}</th>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="所有用户的重消账户的总金额" placement="top-start">
                <th>{{thData.SumConsumeMoney}}</th>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="所有用户的提现手续费总和" placement="top-start">
                <th>{{thData.serviceCharge}}</th>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="等待财务批准的提现总金额（包含手续费）" placement="top-start">
                <th>{{thData.awaitJudge}}</th>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="财务审批完成的提现金额（不包含手续费）" placement="top-start">
                <th>{{thData.judgeOver}}</th>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="被驳回的提现总金额" placement="top-start">
                <th>{{thData.rejectSum}}</th>
              </el-tooltip>
            </tr>
          </div>
          <div class="td_wrap">
            <div class="th_wrap">
              <tr class="tra">
                <th>
                  用户信息
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      市场业绩
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('Market')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('Market')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      重消账户（元）
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('consumeMoney')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('consumeMoney')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      手续费（元）5%
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('serviceCharge')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('serviceCharge')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      待审批（元）
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('await')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('await')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="e_th">
                    <div>
                      审批通过（元）
                    </div>
                    <div class="e_wrap">
                      <el-button @click="sortByAsc('over')" class="e_button" type="text"
                                 icon="el-icon-caret-top"></el-button>
                      <el-button @click="sortByDesc('over')" class="e_button" type="text"
                                 icon="el-icon-caret-bottom"></el-button>
                    </div>
                  </div>
                </th>
                <th>时间</th>
              </tr>
            </div>
            <div v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 style="min-height: 400px">
              <No-Data-Table v-show="$_.isEmpty(finalCountInfo.tableData)"/>
              <tr v-for="item in finalCountInfo.tableData">
                <td>{{item.realname}} {{item.phone}}</td>
                <td>{{item.Market}}</td>
                <td>{{item.consumeMoney}}</td>
                <td>{{item.serviceCharge}}</td>
                <td>{{item.await}}</td>
                <td>{{item.over}}</td>
                <td>{{item.time}}</td>
              </tr>

              <div class="pageination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  background
                  :current-page.sync="finalCountInfo.page"
                  :page-sizes="[10, 20 ,100, 200, 500,1000]"
                  :page-size="finalCountInfo.pageSize"
                  layout="sizes, prev, pager, next"
                  :total="finalCountInfo.thData.sum">
                </el-pagination>
              </div>

            </div>
          </div>
        </table>
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
  import {Loading} from 'element-ui'

  export default {
    name: "FinalCount",
    components: {
      HeadTop, NoDataTable
    },
    computed: {
      ...mapState(['finalCountInfo']),
      thData() {
        return this.finalCountInfo.thData
      }
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      ...mapActions(['getFinalCountList']),
      ...mapMutations(['finalCountCurPageChange', 'finalCountInfoSort']),
      sortByAsc(key) {
        this.finalCountInfoSort({key, asc: true})
      },
      sortByDesc(key) {
        this.finalCountInfoSort({key, desc: true})
      },
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '财务统计表.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      handleSizeChange(limit) {
        this.finalCountCurPageChange({limit})
        this.initData()
      },
      handleCurrentChange(val) {
        this.finalCountCurPageChange({val})
        this.initData()
      },
      async initData() {
        this.loading = true
        let {date_value2, page, pageSize} = this.finalCountInfo
        date_value2 = date_value2 + ''
        let time1 = ''
        let time2 = ''
        if (!this.$_.isEmpty(date_value2)) {
          time1 = date_value2.substr(0, 10)
          time2 = date_value2.substr(11)
        }
        await this.getFinalCountList({time1, time2, page, pageSize})
        this.loading = false
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

  table {
    font-size: 14px;
  }

  th, td {
    width: 170px;
    vertical-align: middle;
    padding: 12px;
    border-left: 1px solid #f0f0f0;
    border-right: none;
    box-sizing: border-box;
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
    border-left: 1px solid #fff;
    margin: 0;
  }

  .th_wrap th:nth-child(1) {
    border: none;
  }

  .th_wrap tr td {
    border: none;
    text-align: left;
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
