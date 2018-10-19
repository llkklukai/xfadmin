<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <h3 class="head_h3">
        添加代理商
      </h3>
      <div class="table_container">
        <el-form :model="formDatas" status-icon :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                 label-position="right">
          <el-form-item label="地址选择" prop="range">
            <el-col :span="20">
              <v-distpicker @selected="onSelected"></v-distpicker>
            </el-col>
          </el-form-item>
          <!--<el-form-item label="详细地址" prop="addressDetail">-->
          <!--<el-col :span="10">-->
          <!--<el-input  placeholder="填写详细地址" v-model="formDatas.addressDetail"></el-input>-->
          <!--</el-col>-->
          <!--</el-form-item>-->
          <el-form-item label="推荐人" prop="upperPhone">
            <el-col :span="10">
              <el-input placeholder="填写推荐人手机号" v-model="formDatas.upperPhone"></el-input>
            </el-col>
          </el-form-item>
          <!--<el-form-item label="代理级别" prop="user_type">-->
          <!--<el-col :span="10">-->
          <!--<template>-->
          <!--<el-select v-model="formDatas.user_type" placeholder="请选择">-->
          <!--<el-option-->
          <!--v-for="item in optionsuser_type"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--<el-input placeholder="请输入代理费" type="text" v-model="formDatas.spentMoney"></el-input>-->
          <!--</template>-->
          <!--</el-col>-->
          <!--</el-form-item>-->
          <el-form-item label="姓名" prop="realName">
            <el-col :span="10">
              <el-input placeholder="被添加代理的姓名" type="text" v-model="formDatas.realName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-col :span="10">
              <template>
                <el-radio v-model="formDatas.sex" label="男">男</el-radio>
                <el-radio v-model="formDatas.sex" label="女">女</el-radio>
              </template>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-col :span="10">
              <el-input placeholder="被添加代理的手机号" v-model="formDatas.phone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-col :span="10">
              <el-input placeholder="设置被添加代理的密码" type="text" v-model="formDatas.password"></el-input>
            </el-col>
          </el-form-item>
          <div class="form_ctrl">
            <el-form-item label-width="0px">
              <el-button style="margin-left: 300px" class="submit_btn" size="medium" type="primary"
                         @click="submitForm('ruleForm')">确认
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import VDistpicker from 'v-distpicker'
  import {addAgent} from "../api/getData";
  import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    name: "AddAgent",
    components: {
      HeadTop, VDistpicker
    },
    computed: {
      ...mapState(["agentInfo"])
    },
    data() {
      let validateUserId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入注册ID'));
        } else {
          callback();
        }
      }
      let validateupperPhone = (rule, value, callback) => {
        if (!/^1\d{10}$/.test(value)) {
          callback(new Error('推荐人ID格式不正确'));
        } else {
          callback();
        }
      }
      let validaterealName = (rule, value, callback) => {
        let testR = /^[\u4e00-\u9fa5]{2,10}|[a-zA-Z]{2,20}$/

        if (value === '') {
          callback(new Error('请输入代理姓名'));
          return
        }
        if (!testR.test(value)) {
          callback(new Error('姓名格式为纯汉字或纯字母'));
          return
        }

        callback();

      }
      let validateSex = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择性别'));
        } else {
          callback();
        }
      }

      let validatephone = (rule, value, callback) => {
        if (!/^1\d{10}$/.test(value)) {
          callback(new Error('请输入正确手机号'));
          return
        }
        callback();

      }
      let validatepassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入被添加代理商的密码'));
        }
        if (value.length < 6) {
          callback(new Error('密码长度不能小于6位'));
          return
        }
        callback();
      }
      let validateuser_type = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择代理级别'));
        } else {
          callback();
        }
      }

      return {
        formDatas: {
          spentMoney: '',
          upperPhone: '',
          user_type: '',
          realName: '',
          sex: '',
          phone: '',
          password: '',
          range: {
            province: '',
            city: '',
            area: ''
          },
          address: ''
        },
        rules1: {
          upperPhone: [
            {validator: validateupperPhone, trigger: 'blur'}
          ],
          user_type: [
            {validator: validateuser_type}
          ],
          realName: [
            {validator: validaterealName, trigger: 'blur'}
          ],
          sex: [
            {validator: validateSex, trigger: 'blur'}
          ],
          phone: [
            {validator: validatephone, trigger: 'blur'}
          ],
          password: [
            {validator: validatepassword, trigger: 'blur'}
          ],
          // addressDetail:[
          //   {required:true,message:'请输入详细地址',trigger:'blur'}
          // ]
        },
        optionsuser_type: [{
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
        },],

      }
    },
    methods: {
      ...mapActions(['getAgentList']),
      onSelected(data) {
        this.formDatas.address = `${data.province.value},${data.city.value},${data.area.value}`
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {address, upperPhone, realName, sex, phone, password} = this.formDatas
            let params = {address, upperPhone, realName, sex, phone, password}
            addAgent(params)
              .done(res => {
                if (res.code == 109) {

                  this.$message.error("添加失败,推荐人不存在")
                  return
                }
                if (res.code == 106) {
                  this.$message.error("添加失败,该手机号已注册")
                  return
                }
                this.getAgentList({page: this.agentInfo.page, pageSize: this.agentInfo.pageSize})
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.$router.replace({
                  path: '/agent'
                })
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";
</style>
