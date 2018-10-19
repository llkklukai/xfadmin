<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <div style="display: flex;margin-top: 20px">
          <el-form-item style="margin-left: 20px" label-width="0px" prop="phoneName">
            <el-input size="medium" placeholder="输入手机号或用户名" type="text" v-model="ruleForm1.phoneName"
                      auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button class="submit_btn" size="medium" type="primary" @click="submitForm('ruleForm1')">搜索</el-button>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button style="margin-left: 50px" class="submit_btn" size="medium" @click="exportExcel()" type="primary"
                       plain>导出表格
            </el-button>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button style="margin-left: 50px" class="submit_btn" size="medium" @click="toDetail()" type="primary">
              财务统计
            </el-button>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button style="margin-left: 50px" class="submit_btn" size="medium" @click="toOrderCount()"
                       type="primary">订单统计
            </el-button>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button style="margin-left: 50px" class="submit_btn" size="medium" @click="toPayTypeCount()"
                       type="primary">支付统计
            </el-button>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button v-show="version=='new2'" style="margin-left: 50px" class="submit_btn" size="medium"
                       @click="toShareOutBonus"
                       type="primary">分红计算
            </el-button>
          </el-form-item>
        </div>

      </el-form>
      <div class="table_container">
        <table id="out-table" border="0">
          <tr class="tr_th" style="background: #3a8ee6">
            <th style="text-align: center" rowspan="2" colspan="2">汇总</th>
            <th>市场津贴总计</th>
            <th>积分总计</th>
            <th v-show="version!='new2'">帮扶津贴总计</th>
            <th>重消服务费总计</th>
            <th v-show="version!='new2'">区域消费津贴总计</th>
            <th>可提现总计</th>
          </tr>
          <tr class="tr_td" style="background: #3a8ee6">
            <td>{{finalInfo.sum.agora}}</td>
            <td>{{finalInfo.sum.integrals}}</td>
            <td v-show="version!='new2'">{{finalInfo.sum.help}}</td>
            <td>{{finalInfo.sum.consume}}</td>
            <td v-show="version!='new2'">{{finalInfo.sum.subsidy}}</td>
            <td>{{finalInfo.sum.extend}}</td>
          </tr>
          <tr style="color: rgb(51, 51, 51);">
            <th colspan="1" rowspan="1">手机号</th>
            <th colspan="1" rowspan="1">用户名</th>
            <th colspan="1" rowspan="1">
              <div class="e_th">
                <div>
                  市场津贴
                </div>
                <div class="e_wrap">
                  <el-button @click="sortByAsc('agora')" class="e_button" type="text"
                             icon="el-icon-caret-top"></el-button>
                  <el-button @click="sortByDesc('agora')" class="e_button" type="text"
                             icon="el-icon-caret-bottom"></el-button>
                </div>
              </div>
            </th>
            <th colspan="1" rowspan="1">
              <div class="e_th">
                <div>
                  积分
                </div>
                <div class="e_wrap">
                  <el-button @click="sortByAsc('integrals')" class="e_button" type="text"
                             icon="el-icon-caret-top"></el-button>
                  <el-button @click="sortByDesc('integrals')" class="e_button" type="text"
                             icon="el-icon-caret-bottom"></el-button>
                </div>
              </div>
            </th>
            <th v-show="version!='new2'" colspan="1" rowspan="1">
              <div class="e_th">
                <div>
                  帮扶津贴
                </div>
                <div class="e_wrap">
                  <el-button @click="sortByAsc('help')" class="e_button" type="text"
                             icon="el-icon-caret-top"></el-button>
                  <el-button @click="sortByDesc('help')" class="e_button" type="text"
                             icon="el-icon-caret-bottom"></el-button>
                </div>
              </div>
            </th>
            <th colspan="1" rowspan="1">
              <div class="e_th">
                <div>
                  重消服务费
                </div>
                <div class="e_wrap">
                  <el-button @click="sortByAsc('consume')" class="e_button" type="text"
                             icon="el-icon-caret-top"></el-button>
                  <el-button @click="sortByDesc('consume')" class="e_button" type="text"
                             icon="el-icon-caret-bottom"></el-button>
                </div>
              </div>
            </th>
            <th v-show="version!='new2'" colspan="1" rowspan="1">
              <div class="e_th">
                <div>
                  区域消费津贴
                </div>
                <div class="e_wrap">
                  <el-button @click="sortByAsc('subsidy')" class="e_button" type="text"
                             icon="el-icon-caret-top"></el-button>
                  <el-button @click="sortByDesc('subsidy')" class="e_button" type="text"
                             icon="el-icon-caret-bottom"></el-button>
                </div>
              </div>
            </th>
            <th style="width: 120px" colspan="1" rowspan="1">
              <div class="e_th">
                <div>
                  可提现金额/元
                </div>
                <div class="e_wrap">
                  <el-button @click="sortByAsc('extend')" class="e_button" type="text"
                             icon="el-icon-caret-top"></el-button>
                  <el-button id="e_button" @click="sortByDesc('extend')" class="e_button" type="text"
                             icon="el-icon-caret-bottom"></el-button>
                </div>
              </div>
            </th>
            <!--<th style="width:100px" colspan="1" rowspan="1">编辑代理商</th>-->
            <th style="width:100px" colspan="1" rowspan="1">奖金</th>
            <!--<th colspan="1" rowspan="1">上级奖金计算</th>-->
          </tr>
          <tr v-for="item in $store.getters.finalInfoTableData" class="tr_d">
            <td>{{item.phone}}</td>
            <td>{{item.realname}}</td>
            <td>{{item.agora}}</td>
            <td v-show="version!='new2'">{{item.integrals}}</td>
            <td>{{item.help}}</td>
            <td v-show="version!='new2'">{{item.consume}}</td>
            <td>{{item.subsidy}}</td>
            <td>{{item.extend}}</td>
            <!--<td>-->
            <!--<el-button @click="handleEdit(item.user_id)" size="small" type="primary">编辑</el-button>-->
            <!--</td>-->
            <td>
              <el-button @click="handleReardDetailClick(item.user_id)" type="text" size="small">明细</el-button>
            </td>
            <!--<td>-->
            <!--<el-button @click="handleRewardCompute({user_id:item.user_id,realname:item.realname,phone:item.phone,user_type:item.user_type})" type="text" size="small">-->
            <!--去计算-->
            <!--</el-button>-->
            <!--</td>-->
          </tr>
        </table>
        <div>
          <el-dialog
            title="请输入密码"
            :visible.sync="dialogVisible"
            width="30%"
          >
            <el-input type="password" placeholder="请输入密码"></el-input>
            <div style="margin-top: 10px">
              <el-checkbox @change="handleNoRepeat" v-model="checked">不再提示</el-checkbox>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleConfirm()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <NODataTable v-show="this.$_.isEmpty($store.getters.finalInfoTableData)"/>
        <div class="pageination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync="finalInfo.currentPage"
            :page-sizes="[10, 20 ,100, 200, 500,1000]"
            :page-size="finalInfo.limit"
            layout="sizes, prev, pager, next"
            :total="finalInfo.allTableData.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import NODataTable from "../components/NODatasTable";
  import {setStore} from "../config/mUtils";
  import {version} from "../config/env";

  export default {
    name: "Financial",
    components: {
      NODataTable,
      HeadTop,
    },
    computed: {
      ...mapState(['finalInfo', 'rewardDetailInfo', 'isSaveRewardPassword'])
    },
    data() {
      let validatePhoneName = (rule, value, callback) => {
        callback();
      }
      return {
        version: version,
        checked: false,
        currentUserInfo: {},
        dialogVisible: false,
        ruleForm1: {
          phoneName: '',
        },
        rules1: {
          phoneName: [
            {validator: validatePhoneName, trigger: 'blur'}
          ]
        },
        date_value1: '',
        date_value2: ''
      }
    },
    methods: {
      ...mapActions(['getFinalList', 'getFinalListByQuery', 'getEditAgent', 'getRewardDetail']),
      ...mapMutations(['changeFinalList', 'finalInfoSort', 'saveRewardPassword']),
      toShareOutBonus() {
        this.$router.push({
          path: '/share_out_bonus'
        })
      },
      sortByAsc(key) {
        this.finalInfoSort({key, asc: true})
      },
      sortByDesc(key) {
        this.finalInfoSort({key, desc: true})
      },
      handleNoRepeat(val) {
        this.saveRewardPassword(val)
      },
      handleConfirm() {
        this.dialogVisible = false
        this.$router.push({
          path: '/reward_compute',
          query: this.currentUserInfo
        })
      },
      handleRewardCompute(userInfo) {
        if (!this.isSaveRewardPassword) {
          this.currentUserInfo = userInfo
          this.dialogVisible = true
          return
        }
        this.$router.push({
          path: '/reward_compute',
          query: userInfo
        })
      },
      handleReardDetailClick(user_id) {
        let {page, pageSize, type} = this.rewardDetailInfo
        this.getRewardDetail({user_id, page, pageSize, type})
        this.$router.push({
          path: '/reward_detail',
        })
        setStore("rewardDetailQuery", user_id)
      },
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '财务报表.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      toDetail() {
        this.$router.push({
          path: '/final_count'
        })
      },
      toOrderCount() {
        this.$router.push({
          path: '/order_count'
        })
      },
      toPayTypeCount() {
        this.$router.push({
          path: '/pay_type_count'
        })
      },
      submitForm(formName) {   //根据手机号用户名查询
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {phoneName} = this.ruleForm1
            this.getFinalListByQuery({requirement: phoneName})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleEdit(user_id) {
        this.$router.push({
          path: '/edit_final',
          query: {
            user_id
          }
        })
        this.getEditAgent({user_id})
      },
      /**
       * 每页显示数量变化
       * @param limit 每页的数量
       */
      handleSizeChange(limit) {
        this.changeFinalList({limit})
      },
      /**
       * 当前页码变化
       * @param val 当前的页码数
       */
      handleCurrentChange(val) {
        this.changeFinalList({val})
      },
    },
    mounted() {
      this.getFinalList()
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";

  table {
    width: 1440px;
    text-align: left;
    font-size: 14px;
  }

  th, td {
    border-bottom: 1px solid #ebeef5;
    padding: 16px 10px;
    vertical-align: middle;
  }

  .th_wrapper:hover {
    background: #f7f7f7;
  }

  .e_th {
    display: flex;
    align-items: center;
  }

  .tr_th th {
    color: #fff;
    border-bottom: none;
  }

  .tr_td td {
    color: #fff;
  }
</style>

