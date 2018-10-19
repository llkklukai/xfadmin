<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <h3 class="head_h3">
        编辑代理商
      </h3>
      <div class="table_container">
        <el-form :model="editAgentInfo.formDatas" status-icon :rules="rules1" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm"
                 label-position="right">
          <el-form-item label="会员等级" prop="userD">
            <el-col :span="7">
              <el-select v-model="editAgentInfo.formDatas.user_type" placeholder="选择会员等级">
                <el-option
                  v-for="item in user_type_arr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!--<el-input size="samll" placeholder="请输入代理费" type="text"-->
                        <!--v-model="editAgentInfo.formDatas.spentMoney"></el-input>-->
            </el-col>
          </el-form-item>
          <el-form-item label="服务费" prop="rate">
            <el-col :span="10">
              <el-input placeholder="" type="text" v-model="editAgentInfo.formDatas.rate"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="推广服务费" prop="extend">
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
          <el-form-item label="积分" prop="integrals">
            <el-col :span="10">
              <el-input type="text" v-model="editAgentInfo.formDatas.integrals"></el-input>
            </el-col>
          </el-form-item>
          <div class="form_ctrl">
            <el-form-item style="margin-left: 240px" label-width="0px">
              <el-button class="submit_btn" size="medium" type="default" @click="cancelForm()">取消</el-button>
              <el-button class="submit_btn" size="medium" type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapActions, mapState} from 'vuex'
  import {updateUserFinanceData} from "../api/getData";
  import {confirmBox} from "../config/mUtils";

  export default {
    name: "EditFinal",
    data() {
      let validateExtend = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入推广服务费'));
        } else {
          callback();
        }
      }
      let validateConsume = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入重消服务费'));
        } else {
          callback();
        }
      }

      let validateAgora = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入市场津贴'));
        } else {
          callback();
        }
      }
      let validateHelp = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入帮扶津贴'));
        } else {
          callback();
        }
      }
      let validateSubsidy = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入区域消费津贴'));
        } else {
          callback();
        }
      }
      let validaterate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入费率'));
        } else {
          callback();
        }
      }
      return {
        user_type_arr: [
          {
            value: '1',
            label: '省级代理'
          }, {
            value: '2',
            label: '市级代理'
          }, {
            value: '3',
            label: '县级代理'
          }, {
            value: '4',
            label: 'VIP代理'
          }, {
            value: '5',
            label: '商务代理'
          }, {
            value: '6',
            label: '体验代理'
          },
        ],
        rules1: {
          extend: [
            {validator: validateExtend, trigger: 'blur'}
          ],
          consume: [
            {validator: validateConsume, trigger: 'blur'}
          ],
          agora: [
            {validator: validateAgora}
          ],
          rate: [
            {validator: validaterate, trigger: 'blur'}
          ],
          help: [
            {validator: validateHelp, trigger: 'blur'}
          ],
          subsidy: [
            {validator: validateSubsidy, trigger: 'blur'}
          ],
          integrals:[
            {required:true,message:'请输入积分',trigger:'blur'}
          ]
        }
      }
    },
    components: {
      HeadTop
    },
    computed: {
      ...mapState(['editAgentInfo'])
    },
    methods: {
      ...mapActions(['getFinalList','getEditAgent']),
      cancelForm(){
        this.$router.replace({
          path:'/fd'
        })
      },
      submitForm() {
        let {user_id}=this.$route.query
        let params = {...this.editAgentInfo.formDatas,user_id}
        delete params.realname
        delete params.address
        delete params.realname
        if(params.user_type=='省级代理'){
          params.user_type=1
        }
        if(params.user_type=='市级代理'){
          params.user_type=2
        }
        if(params.user_type=='县级代理'){
          params.user_type=3
        }
        if(params.user_type=='VIP代理'){
          params.user_type=4
        }
        if(params.user_type=='商务代理'){
          params.user_type=5
        }
        if(params.user_type=='体验代理'){
          params.user_type=6
        }
        let callBack=()=>{
          updateUserFinanceData(params)
            .done(res => {
              if (res.message == 'success') {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.$router.replace({
                  path: '/fd'
                })
                this.getFinalList()
              }
            })
        }
          confirmBox({msg:"继续将执行修改，是否继续？",callBack,bindThis:this})
      }
    },
    mounted(){
      let user_id=this.$route.query.user_id
      this.getEditAgent({user_id})
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";
</style>
