<template>
  <div>
    <table style="width: 1370px" id="out-table" border="0">
      <tr>
        <div class="th">
          <div>
            下单时间:{{itemData.insert_time}}
          </div>
          <div style="margin-left: 20px">
            订单号:{{itemData.identifier}}
          </div>
        </div>
      </tr>
      <tr>
        <div class="tr">
          <td class="img_box td">
            <img :src="itemData.imageUrl" alt="">
          </td>
          <td class="td detail">
            {{itemData.tradeName}}x{{itemData.goodsQuantity}}
          </td>
          <td class="td format">
            {{itemData.params}}
          </td>
          <td style="color:red" class="td price">
            ￥{{itemData.payMoney}}
          </td>
          <td class="td info">
            <div style="display: flex">
              <div>{{itemData.receive_name}}</div>
              <div style="margin-left: 10px">
                {{itemData.receive_phone}}
              </div>
            </div>
            <div style="margin-top:5px;line-height: 1.5">
              {{itemData.province}} {{itemData.city}} {{itemData.area}} {{itemData.street}}
            </div>
            <div style="display: flex;color: #ff0000;margin-top: 10px">
              <div>下单人信息：{{itemData.realName}}</div>
              <div style="margin-left: 10px">
                {{itemData.phone}}
              </div>
            </div>
            <div style="margin-top:5px;line-height: 1.5;color: #ff0000">
              {{itemData.payWay}}
            </div>
          </td>
          <td class="td news">
            折扣金额：{{itemData.discount}}
          </td>
          <td class="td status">
            <div style="display: flex;align-items: center;flex-direction: column;" v-show="status==2">
              <el-button @click="exportExcel()" type="text">导出报表</el-button>
              <el-button @click="change(itemData,3)" style="margin-left: 0" type="text">去发货</el-button>
            </div>
            <div v-show="status==1">
              未付款
            </div>
            <div v-show="status==3">
              <div style="text-align: center">
                已发货
              </div>
              <div>
                <el-button @click="showDialog3(itemData.identifier)" type="text">物流查询</el-button>
              </div>
            </div>
            <div>
              <el-popover
                placement="top"
                width="160"
                trigger="click"
                v-model="visible">
                <p>确定要删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteOrder(itemData.order_id)">确定</el-button>
                </div>
                <el-button type="text" slot="reference">删除</el-button>
              </el-popover>
              <!--<el-button @click="deleteOrder(itemData.order_id)" type="text">删除</el-button>-->
            </div>
            <div v-show="status==6" style="display: flex;flex-direction: column;align-items: center">
              <div style="display: flex;flex-direction: column;align-items: center" v-show="status==6">
                <el-button @click="change(itemData,7)" style="margin: 0" size="small" type="primary">同意
                </el-button>
                <el-button @click="change(itemData,status)" style="margin-top: 10px;margin-left: 0"
                           size="small" type="danger">拒绝
                </el-button>
              </div>
            </div>
            <div v-show="status==7">
              已同意退款
            </div>
          </td>
        </div>
      </tr>
    </table>
    <!--点击去发货弹窗-->
    <el-dialog
      title="订单确认"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label-width="0px">
          <template>
            <div class="f_item">
              <label class="item_label">订单号</label>
              <div style="height: 40px;align-self: flex-start">
                {{itemData.identifier}}
              </div>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="发件人信息">
          <el-select v-model="orderDispatchInfo.selectInfo" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.info"
              :label="item.info"
              :value="item.address_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="0px">
          <template>
            <div class="f_item">
              <label class="item_label">收件人姓名</label>
              <div style="height: 40px;align-self: flex-start">
                {{itemData.receive_name}}
              </div>
            </div>
          </template>
        </el-form-item>
        <el-form-item label-width="0px">
          <template>
            <div class="f_item">
              <label class="item_label">收件人地址</label>
              <div style="height: 40px;align-self: flex-start">
                {{itemData.address}} {{itemData.street}}
              </div>
            </div>
          </template>
        </el-form-item>
        <el-form-item label-width="0px">
          <template>
            <div class="f_item">
              <label class="item_label">商品名</label>
              <div style="height: 40px;align-self: flex-start">
                {{itemData.tradeName}}
              </div>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="物流公司" prop="Logistics">
          <el-select v-model="ruleForm.Logistics" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.companyName"
              :value="item.serialNumber">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" prop="CourierNumber">
          <el-input v-model="ruleForm.CourierNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="handleDsiapatch('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--去发货完善个人信息-->
    <el-dialog
      title="完善个人信息"
      :visible.sync="dialogVisible2"
      width="30%" center>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="发货人名" prop="receive_name">
          <el-input v-model="ruleForm2.receive_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="receive_phone">
          <el-input v-model="ruleForm2.receive_phone"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="dispatchRange">
            <v-distpicker :province.sync="range.province" :city.sync="range.city" :area.sync="range.area"  @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="street">
          <el-input v-model="ruleForm2.street"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitDispatchUserInfo('ruleForm2')">确 定</el-button>
  </span>
    </el-dialog>
    <!--物流信息弹出窗口-->
    <el-dialog
      title="物流信息"
      :visible.sync="dialogVisible3"
      width="80%"
      center
    >
      <el-steps :active="logisticsInfoList.length" finish-status="success"  align-center>
        <el-step :key="item.time" v-for="item in logisticsInfoList" :title="item.time"  :description="item.context"></el-step>
      </el-steps>
      <div v-show="logisticsInfoList.length==0" style="display: flex;justify-content: center;justify-content: center">暂无数据</div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import {mapState} from 'vuex'
  import VDistpicker from 'v-distpicker'
  import {addDispatchUserInfo,queryLogistics} from  '../api/getData'
  import {getStore} from '../config/mUtils'
  export default {
    name: "OrderTable",
    props: ['status', 'itemData', 'options', 'selectInfo','options2'],
    computed: {
      ...mapState(['orderDispatchInfo'])
    },
    data() {
      return {
        centerDialogVisible: false,
        ruleForm: {
          Logistics: '',
          CourierNumber: ''
        },
        rules: {
          Logistics: [
            {required: true, message: '请选择物流公司', trigger: 'blur'}
          ], CourierNumber: [
            {required: true, message: '请输入快递单号', trigger: 'blur'}
          ], Logistics: [
            {required: true, message: '请输入物流公司', trigger: 'blur'}
          ]
        },
        range:{
          province:'',
          city:'',
          area:''
        },
        selectedRange:{
          province:'',
          city:'',
          area:''
        },
        dialogVisible2: false,
        dialogVisible3:false,
        visible : false,
        logisticsInfoList:[],
        ruleForm2: {
          receive_name: '',
          receive_phone: '',
          street:''
        },
        rules2: {
          receive_name: [
            {required: true, message: '必填姓名', trigger: 'blur'}
          ], receive_phone: [
            {required: true, message: '必填电话', trigger: 'blur'}
          ], street: [
            {required: true, message: '必填街道信息', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      deleteOrder(orderId){
        this.visible=false
        this.$emit('delete', {orderId})
      },
      showDialog3(identifier){
        queryLogistics({identifier})
          .done(res=>{
            this.logisticsInfoList=res.data.data
            this.dialogVisible3=true
          })
      },
      submitDispatchUserInfo(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            if(!this.selectedRange.area){
              this.$message.error('请完善区域信息')
            }else {
              let params=this.ruleForm2
              let token= getStore('token')
              params={...params,...this.selectedRange,token}
              addDispatchUserInfo(params)
                .done(res=>{
                  this.centerDialogVisible=true
                  this.$emit('initData')
                })
            }
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onSelected(val){
          this.selectedRange.province=val.province.value
          this.selectedRange.city=val.city.value
          this.selectedRange.area=val.area.value
      },
      handleCancel(formName) {
        this.centerDialogVisible = false
      },
      handleDsiapatch(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.orderDispatchInfo.selectInfo == '') {
              this.$message.error('发件人信息不能为空')
              return false;
            }
            let {dispatchInfo} = this
            dispatchInfo.logistics_company = this.ruleForm.Logistics       // 物流公司
            dispatchInfo.logistics_number = this.ruleForm.CourierNumber    //快递单号
            dispatchInfo.send_address_id = this.orderDispatchInfo.selectInfo  //发件人信息
            this.$emit('changeStatus', {...dispatchInfo})
            this.centerDialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      change(item, status) {
        if (this.$_.isEmpty(this.options)) {
          this.$message.error('请先完善发货人信息')
          this.dialogVisible2=true
        } else {
          if (status == 3) { //去发货
            this.centerDialogVisible = true
            this.dispatchInfo = {status, orderId: item.order_id}
          } else {
            this.$emit('changeStatus', {orderId: item.order_id, status})
          }
        }
      },
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
      }
    }
  }
</script>

<style scoped>
  .th {
    background: #5da9fc;
    color: #fff;
    display: flex;
    padding: 10px;
    font-size: 14px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .tr {
    border: 1px solid #dedede;
    border-top: 0;
    display: flex;
    font-size: 14px;
    color: #333;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-bottom: 15px;
  }

  .td {
    padding: 10px;
    border-right: 1px solid #dedede;
  }

  .img_box {
    width: 100px;
    height: 100px;

  }

  .img_box img {
    max-width: 100%;
    max-height: 100%;
  }

  .detail {
    display: flex;
    align-items: center;
    flex: 2;
    line-height: 1.5;
  }

  .format, .price {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .info {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .news {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .status {
    display: flex;
    flex-direction: column;
    flex: 1;
    border-right: 0;
    justify-content: center;
    align-items: center;
  }

  .f_box div {
    margin: 10px 0;
  }

  .item_label {
    float: left;
    width: 100px;
    text-align: right;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
</style>
