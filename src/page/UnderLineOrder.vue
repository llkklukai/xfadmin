<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
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
          <!--<el-button style="margin-left: 20px" @click="exportExcel()" type="primary" plain>导出报表</el-button>-->
        </div>
      </div>
      <div class="table_container">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              fixed
              prop="customerName"
              label="用户名"
            >
            </el-table-column>
            <el-table-column
              prop="productName"
              label="商品名称"
            >
            </el-table-column>
            <el-table-column
              prop="productPrice"
              label="价格"
            >
            </el-table-column>
            <el-table-column
              prop="number"
              label="使用次数"
            >
            </el-table-column>
            <el-table-column
              prop="merchantName"
              label="商家名称"
            >
            </el-table-column>
            <el-table-column
              prop="money"
              label="商家收取金额"
            >
            </el-table-column>
            <el-table-column
              prop="insert_time"
              label="时间"
            >
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="pageination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="page"
          :page-sizes="[10, 20 ,100, 200, 500,1000]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapState} from 'vuex'
  import {selectTurnoverList} from '../api/getData'
  export default {
    name: "UnderLineOrder",
    computed: {
      ...mapState(['finalCountInfo'])
    },
    components: {
      HeadTop,
    },
    data() {
      return {
        pageSize:10,
        page:1,
        count:0,
        date_value1: '',
        tableData: [
          {}
        ]
      }
    },
    methods: {
      async getData(){
        let {date_value1,page,pageSize}=this
        date_value1=date_value1+''
        let time1=date_value1.substring(0,10)
        let time2=date_value1.substring(11)
        let res = await selectTurnoverList({page,pageSize,time1,time2})
        this.count=res.count
        this.tableData=res.list
      },
      handleSearch() {
        this.getData()
      },
      handleSizeChange(pageSize){
        this.pageSize=pageSize
        this.getData()
      },
      handleCurrentChange(page){
        this.page=page
        this.getData()
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style scoped>
  @import "../style/table.less";
</style>
