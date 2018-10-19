<template>
  <div>
    <Head-Top/>
    <div class="all_con">
      <h3 class="head_h3">
        消息列表
      </h3>
      <div class="table_container">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :key="item.notice_id" v-for="(item,index) in newsListInfo.tableData" :name="item.notice_id">
            <template slot="title">
              <div style="display: flex">
                <div>{{item.notice_title}}</div>
                <div style="margin: 0 20px">{{item.create_time}}</div>
                <div style="margin-right: 20px">{{item.realname}}</div>
                <div style="margin-left: auto;margin-right: 20px">
                  <el-button @click="handleDelete(index,item.notice_id)" type="text">删除</el-button>
                </div>
              </div>
            </template>
            <div v-html="item.notice_content">
            </div>
          </el-collapse-item>
        </el-collapse>
        <NoDatasTable v-show="$_.isEmpty(newsListInfo.tableData)"></NoDatasTable>
        <div class="pageination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync="newsListInfo.currentPage"
            :page-sizes="[10, 20 ,100, 200, 500,1000]"
            :page-size="newsListInfo.limit"
            layout="sizes, prev, pager, next"
            :total="newsListInfo.allTableData.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import NoDatasTable from '../components/NODatasTable'
  import {deleteNoticeData} from '../api/getData'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {confirmBox} from "../config/mUtils";

  export default {
    name: "NewsList",
    components: {
      HeadTop,NoDatasTable
    },
    computed: {
      ...mapState(['newsListInfo'])
    },
    data() {
      return {
        activeName: 1
      }
    },
    methods: {
      ...mapMutations(['newsListPageChange']),
      ...mapActions(['deleteNoticeData', 'getNewsList']),
      handleDelete(index, notice_id) {
        let callBack=()=>{
          this.deleteNoticeData({notice_id})
        }
        confirmBox({bindThis:this,callBack})
      },
      handleSizeChange(limit) {
        this.newsListPageChange({limit})
      },
      handleCurrentChange(currentPage) {
        this.newsListPageChange({currentPage})
      },
    },
    mounted() {
      this.getNewsList()
    },
  }
</script>

<style lang="less" scoped>
  @import "../style/table";
</style>
