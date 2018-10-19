<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <h3 class="head_h3">
        编辑代理商
      </h3>

      <div class="table_container">
        <el-tabs v-model="activeTabName2" type="border-card">
          <el-tab-pane name="desc2" label="用户升级"></el-tab-pane>
          <el-tab-pane name="history2" label="信息修改"></el-tab-pane>
          <el-form v-show="activeTabName2=='desc2'" :model="formData" status-icon :rules="rules2"
                   ref="ruleForm2" label-width="120px"
                   class="demo-ruleForm"
                   label-position="right">
            <el-form-item label="真实姓名">
              <el-col :span="10">
                <el-input :disabled="true" placeholder="被编辑代理的真实姓名" type="text"
                          v-model="editAgentInfo.formDatas.realName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="手机号">
              <el-col :span="10">
                <el-input :disabled="true" placeholder="被编辑代理的手机号" type="text" v-model="agentQuery.phone"></el-input>
              </el-col>
            </el-form-item>
            <!--计算block-->
            <div style="display: flex">
              <el-form-item label="会员等级" prop="user_type">
                <el-col :span="50">
                  <el-select @change="userTypeChange" v-model="formData.user_type" placeholder="选择会员等级">
                    <el-option
                      v-for="item in user_type_arr2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="服务费率" prop="rate">
                <el-col :span="10">
                  <el-input placeholder="" type="text" v-model="formData.rate"></el-input>
                </el-col>
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item prop="agencyMoney" label="代理金额">
                <el-col :span="50">
                  <el-input :disabled="true" @input="formData.integrals=(formData.agencyMoney*0.1).toFixed(2)"
                            v-model="formData.agencyMoney"
                            placeholder="代理金额"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label-width="0px">
                <el-button @click="selectProduct" type="primary">选择商品</el-button>
              </el-form-item>
              <el-form-item label="积分" prop="integrals">
                <el-col :span="20">
                  <el-input type="text" v-model="integrals"></el-input>
                </el-col>
              </el-form-item>
            </div>
            <div class="form_ctrl">
              <el-form-item label-width="120px">
                <el-button style="margin-left: 0px;margin-right: auto" type="primary" @click="onSubmit('ruleForm2')">计算
                </el-button>
              </el-form-item>
            </div>
          </el-form>


          <!--此处把表单分成左右布局-->
          <el-form v-show="activeTabName2=='history2'" :model="editAgentInfo.formDatas" status-icon
                   ref="ruleForm" label-width="130px"
                   class="demo-ruleForm"
                   label-position="right">
            <el-form-item label="真实姓名" prop="realName">
              <el-col :span="10">
                <el-input placeholder="被编辑代理的真实姓名" type="text" v-model="editAgentInfo.formDatas.realName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="会员等级" prop="userD">
              <el-col :span="10">
                <el-select @change="userTypeChange" v-model="editAgentInfo.formDatas.user_type" placeholder="选择会员等级">
                  <el-option
                    v-for="item in user_type_arr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="身份证号码" prop="iDnumber">
              <el-col :span="10">
                <el-input placeholder="被编辑代理的居民身份证号码"
                          v-model="editAgentInfo.formDatas.IDnumber"></el-input>
              </el-col>
            </el-form-item>
            <div>
              <el-form-item label="代理商地址">
                <el-col :span="10">
                  <v-distpicker :province="editAgentInfo.range.province" :city="editAgentInfo.range.city"
                                :area="editAgentInfo.range.area" @selected="onSelected"></v-distpicker>
                </el-col>
              </el-form-item>
            </div>
            <el-form-item label="可提现" prop="extend">
              <el-col :span="10">
                <el-input type="text" v-model="editAgentInfo.formDatas.extend"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="重消服务费" prop="consume">
              <el-col :span="10">
                <el-input type="text" v-model="editAgentInfo.formDatas.consume"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="市场津贴" prop="agora">
              <el-col :span="10">
                <el-input type="text" v-model="editAgentInfo.formDatas.agora"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="帮扶津贴" prop="help">
              <el-col :span="10">
                <el-input type="text" v-model="editAgentInfo.formDatas.help"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="区域消费津贴" prop="subsidy">
              <el-col :span="10">
                <el-input type="text" v-model="editAgentInfo.formDatas.subsidy"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="服务费率" prop="rate">
              <el-col :span="10">
                <el-input placeholder="" type="text" v-model="editAgentInfo.formDatas.rate"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="积分" prop="integrals">
              <el-col :span="10">
                <el-input type="text" v-model="editAgentInfo.formDatas.integrals"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="推广区域代理比例" prop="areaRate">
              <el-col :span="10">
                <el-input type="text" v-model="editAgentInfo.formDatas.areaRate"></el-input>
              </el-col>
            </el-form-item>
            <div class="form_ctrl">
              <el-form-item style="margin-left: 240px" label-width="0px">
                <el-button class="submit_btn" size="medium" type="default" @click="cancelForm()">取消</el-button>
                <el-button class="submit_btn" size="medium" type="primary" @click="submitForm('ruleForm')">确认
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-tabs>
      </div>

      <!--弹窗内容为点击计算结果-->
      <el-dialog
        title="提示"
        :visible.sync="rewardDialogVisible"
        width="70%"
        center
      >
        <div class="table_container">
          <el-tabs @tab-click="tabChange" v-model="activeTabName" type="border-card">
            <el-tab-pane name="desc" label="计算结果"></el-tab-pane>
            <el-tab-pane name="history" label="操作记录"></el-tab-pane>
            <div v-show="activeTabName=='desc'">
              <template>
                <el-button type="text">
                  本人信息变动
                </el-button>
                <el-table
                  border
                  :data="rewardComputeInfo.tableData2"
                  style="width: 100%;"
                >
                  <el-table-column
                    prop="realName"
                    label="姓名"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="user_type"
                    label="等级"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="rate"
                    label="服务费率">
                  </el-table-column>
                  <el-table-column
                    prop="integrals"
                    label="积分增加量">
                  </el-table-column>
                  <el-table-column
                    prop="agencyMoney"
                    label="上级市场增加量">
                  </el-table-column>
                  <el-table-column
                    prop="hint"
                    label="描述">
                  </el-table-column>
                </el-table>
              </template>


              <template>
                <el-button type="text">
                  上级计算结果
                </el-button>
                <el-table
                  :data="rewardComputeInfo.tableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="realname"
                    label="姓名"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="user_type"
                    label="等级"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="rate"
                    label="服务费率">
                  </el-table-column>
                  <el-table-column
                    prop="money"
                    label="金额">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="insert_time"
                    label="时间">
                  </el-table-column>
                </el-table>
              </template>
            </div>
            <div v-show="activeTabName=='history'">
              <template>
                <el-table
                  :data="historyData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="realname"
                    label="姓名"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="电话"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="totalPrice"
                    label="代理金额">
                  </el-table-column>
                  <el-table-column
                    prop="user_type"
                    label="会员等级">
                  </el-table-column>
                  <el-table-column
                    prop="insert_time"
                    label="操作时间">
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </el-tabs>
          <div class="pageination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :current-page.sync="rewardComputeInfo.page"
              :page-sizes="[10, 20 ,100, 200, 500,1000]"
              :page-size="rewardComputeInfo.pageSize"
              layout="sizes, prev, pager, next"
              :total="rewardComputeInfo.allTableData.length">
            </el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changeRewardDialog(false)">关闭</el-button>
        </span>
      </el-dialog>


      <!--完善收货人信息-->
      <el-dialog
        title="完善收货人信息"
        :visible.sync="dialogVisible2"
        width="30%" center>
        <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
          <el-form-item label="收货人姓名" prop="receive_name">
            <el-input v-model="ruleForm3.receive_name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="receive_phone">
            <el-input v-model="ruleForm3.receive_phone"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="range">
            <v-distpicker :province.sync="range.province" :city.sync="range.city" :area.sync="range.area"
                          @selected="onSelectedA"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址" prop="street">
            <el-input v-model="ruleForm3.street"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handleJump">跳 过</el-button>
    <el-button type="primary" @click="submitDispatchUserInfo('ruleForm3')">确 定</el-button>
  </span>
      </el-dialog>

      <el-dialog
        title="商品列表"
        :visible.sync="productDialogVisible"
        width="30%"
        center
      >
        <div v-show="!$_.isEmpty(editAgentInfo.addressList)">
          选择收货信息：
          <el-select v-model="editAgentInfo.address_id" placeholder="请选择">
            <el-option
              v-for="item in editAgentInfo.addressList"
              :key="item.info"
              :label="item.info"
              :value="item.address_id">
            </el-option>
          </el-select>
        </div>
        <div style="overflow: scroll;height: 560px">

          <el-col style="margin-bottom: 10px" v-for="o in productListInfo" :key="o.productId" class="text item">
            <el-card class="box-card">
              <div style="display: flex;justify-content: space-between">
                <img style="width:100px;height:100px" :src="o.image" alt="">
                <div
                  style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;margin-left: 15px">
                  <span>{{o.productName}}</span>
                  <span style="color: red">￥{{o.productPrice}}</span>
                  <span style="color: red">T值:{{o.tValue}}</span>
                </div>
                <div style="display: flex;flex-direction: column;justify-content: space-between">
                  <el-checkbox v-model="o.checked" style="margin-left: auto"></el-checkbox>
                  <el-input-number size="small" v-model="o.currentNum"
                                   :min="1"></el-input-number>
                </div>
              </div>
            </el-card>
          </el-col>
          <div style="position: fixed;color:red;
          bottom:50px;font-size: 18px;background: #fff;
          border-radius: 5px;box-shadow:1px 1px 1px #ccc;border: 1px solid #f5f5f5;
          padding: 5px;margin-bottom:40px">
            总价：{{totalPrice}}
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeProductDialog(false)">取 消</el-button>
          <el-button type="primary" @click="confirmCheck">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {adminAddAddress, updateUserFinanceData} from "../api/getData";
  import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'
  import {computeUserType, computeUserType2, confirmBox, getStore} from "../config/mUtils";
  import initData from '../store/initData'
  import {version} from "../config/env";

  export default {
    name: "EditAgent",
    components: {
      HeadTop
    },
    data() {
      let validateRate = (rule, value, callback) => {
        if (value > 0.5) {
          callback(new Error('最大值不能超过0.5'));
        } else {
          callback();
        }
      };
      return {
        jumped: false,
        selectedRange: {
          province: '',
          city: '',
          area: ''
        },
        dialogVisible2: false,  //完善个人信息弹窗
        ruleForm3: {
          receive_name: '',
          receive_phone: '',
          street: '',
          range: {
            province: '',
            city: '',
            area: ''
          },
        },
        rules3: {
          receive_name: [
            {required: true, message: '必填姓名', trigger: 'blur'}
          ], receive_phone: [
            {required: true, message: '必填电话', trigger: 'blur'}
          ], street: [
            {required: true, message: '必填街道信息', trigger: 'blur'}
          ], range: [
            {required: true, message: '必填区域信息', trigger: 'change'}
          ]
        },
        integrals: '',
        productDialogVisible: false,
        num1: 1,
        agentQuery: JSON.parse(getStore("agentQuery")),
        activeTabName2: "desc2", //默认tab选中计算
        historyData: [],
        activeTabName: 'desc',  //默认弹窗中tab选中为description计算结果描述
        formData: {        //此处是计算的数据
          agencyMoney: '',
          user_type: '',
          integrals: '',
          rate: '',
        },
        user_type_arr: version != "new2" ? initData.user_type_arr : initData.user_type_arr2,
        user_type_arr2: version != "new2" ? initData.user_type_arr.slice(3) : initData.user_type_arr2.slice(0, 2),
        range: {
          province: '',
          city: '',
          area: ''
        },
        rules2: {
          user_type: [
            {required: true, message: '请选择会员等级', trigger: 'change'}
          ], agencyMoney: [
            {required: true, message: '请选择商品', trigger: 'blur'}
          ],
          // integrals: [
          //   {required: true, message: '请输入积分', trigger: 'blur'}
          // ],
          rate: [
            {required: true, message: '请输入服务费率', trigger: 'blur'},
            {validator: validateRate, trigger: 'blur'}
          ],
        },
      }
    },
    computed: {
      ...mapState(['editAgentInfo', 'agentInfo', 'rewardComputeInfo', 'rewardDialogVisible', 'productListInfo']),
      totalPrice() {
        let checkList = this.productListInfo.filter(item => item.checked == true)
        return this.$_.reduce(checkList, (result, item) => result + item.currentNum * item.productPrice, 0)
      }
    },
    methods: {
      ...mapActions(['getAgentList', 'getEditAgent', 'getComputeReward', 'computeRewardPageChange', 'initComputeRewardData', 'getProductList']),
      ...mapMutations(['changeAgentAddress', 'changeRewardDialog']),
      handleJump() {
        this.dialogVisible2 = false
        this.jumped = true
      },
      submitDispatchUserInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.selectedRange.area) {
              this.$message.error('请完善区域信息')
            } else {
              let params = this.ruleForm3
              let {user_id} = this.agentQuery
              params = {...params, ...this.selectedRange, user_id}
              adminAddAddress(params)
                .done(res => {
                  if (res.result) {
                    this.dialogVisible2 = false
                    this.getEditAgent({user_id})
                    console.log("address_id" + this.editAgentInfo.addressList)
                  } else {
                    this.$message.error("添加失败")
                  }

                })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onSelectedA(val) {
        this.selectedRange.province = val.province.value
        this.selectedRange.city = val.city.value
        this.selectedRange.area = val.area.value
      },
      confirmCheck() {
        this.formData.agencyMoney = this.totalPrice
        this.productDialogVisible = false
        this.integrals = (this.formData.agencyMoney * 0.1).toFixed(2)
        if (this.$_.isEmpty(this.editAgentInfo.addressList)) {
          this.dialogVisible2 = true
        }
        if (!this.jumped && !this.editAgentInfo.address_id) {
          this.$message.error("请选择收货人信息")
          return
        }
      },
      changeProductDialog(isShow) {
        this.productDialogVisible = isShow
      },
      selectProduct() {
        this.productDialogVisible = true
      },
      userTypeChange(val) { //会员等级变化

        if (version != "new2") {

          if (val == 1) {
            this.formData.rate = 0.5
          }
          if (val == 2) {
            this.formData.rate = 0.45
          }
          if (val == 3) {
            this.formData.rate = 0.4
          }
          if (val == 4) {
            this.formData.rate = 0.3
          }
          if (val == 5) {
            this.formData.rate = 0.2
          }
          if (val == 6) {
            this.formData.rate = 0.1
          }
        } else {
          if (val == 1) {
            this.formData.rate = 0.15
          }
          if (val == 2) {
            this.formData.rate = 0.25
          }
        }


      },
      handleSizeChange(pageSize) {
        this.computeRewardPageChange({pageSize})
      },
      handleCurrentChange(page) {
        this.computeRewardPageChange({page})
      },
      getHistoryData() { //获取历史操作记录
        let curArr = JSON.parse(window.localStorage.getItem("historyReward"))
        if (!curArr) return
        curArr.map(item => {
          item.user_type = computeUserType({user_type: item.user_type, num: false})
        })
        curArr = this.$_.reverse(curArr)
        this.historyData = curArr
      },
      tabChange() {
        let index = this.activeTabName
        if (index == "history") { //当tab切换到查看历史从localstorage获取历史数据
          this.getHistoryData()
        }
      },
      onSubmit(formName) {         //计算按钮
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let agentQuery = this.agentQuery
            let userId = agentQuery.user_id
            let {agencyMoney, user_type, rate} = this.formData
            let {integrals, jumped} = this
            let {address_id} = this.editAgentInfo
            if (!integrals) {
              this.$message.error("请输入积分")
            }

            if (version != "new2") {
              user_type = computeUserType({user_type}) //转化user_type为数字
            } else {
              user_type = computeUserType2({user_type}) //转化user_type为数字
            }
            let {realname, phone} = agentQuery
            agencyMoney = this.productListInfo.filter(item => item.checked == true)
            let currentArr = []
            agencyMoney.map(item => {
              currentArr.push({
                productId: item.productId,
                currentNum: item.currentNum
              })
            })
            agencyMoney = JSON.stringify({agencyMoney: currentArr})
            if (jumped) {
              address_id = 0
            }
            let callBack = () => {
              this.getComputeReward({
                userId,
                agencyMoney,
                user_type,
                realname,
                phone,
                integrals,
                rate,
                totalPrice: this.totalPrice,
                address_id
              })
            }
            confirmBox({msg: '继续将计算该代理商上级的奖金，是否继续？', callBack, bindThis: this})
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      onSelected(data) { //代理商地址变化
        this.changeAgentAddress(data)
      },
      submitForm(formName) { //提交总表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {...this.editAgentInfo.formDatas}
            // if (!params.user_type) {
            //   this.$message.error("请选择会员等级")
            //   return false
            // }
            let user_type = params.user_type
            params.user_type = version != "new2" ? computeUserType({user_type}) : computeUserType2({user_type})
            let callBack = () => {
              updateUserFinanceData(params)
                .done(res => {
                  if (res.message == 'success') {
                    this.$message({
                      type: 'success',
                      message: '修改成功！'
                    })
                    this.$router.replace({
                      path: '/agent'
                    })
                    this.getAgentList({page: this.agentInfo.page, pageSize: this.agentInfo.pageSize})
                  }
                })
            }
            confirmBox({msg: "继续将执行修改，是否继续？", callBack, bindThis: this})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancelForm() {
        let callBack = () => {
          this.$router.go(-1);
        }
        confirmBox({bindThis: this, callBack, msg: '继续将返回上一页，是否继续？'})
      }
    }
    ,
    mounted() { //初始化代理商信息
      let {user_id} = this.agentQuery
      this.getEditAgent({user_id})
      this.getProductList()
      if (!this.$_.isEmpty(this.editAgentInfo.addressList)) {
        this.address_id = this.editAgentInfo.addressList[0].address_id
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";
</style>
