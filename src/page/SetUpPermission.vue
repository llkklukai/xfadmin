<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <h3 class="head_h3">
        权限设置
      </h3>
      <div class="table_container">
        <el-form label-position="right" :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1"
                 label-width="150px">
          <el-form-item label="所属部门选择" prop="depart">
            <template>
              <el-select v-model="ruleForm1.depart" placeholder="请选择">
                <el-option
                  v-for="item in optionsdepart"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="设置部门管理功能" prop="manage">
            <template>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="ruleForm1.checkedFun">
                <el-checkbox v-for="item in funData" :label="item" :key="item.function_id">{{item.functionname}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
          <el-form-item label="账号分配" prop="distribution">
            <div style="display: flex;flex-direction: column">
              <el-col style="margin-bottom: 20px" :span="5">
                <el-input type="number" placeholder="输入管理员账号" v-model="ruleForm1.distribution.phone"></el-input>
              </el-col>
              <el-col :span="5">
                <el-input type="number" placeholder="请确认手机号" v-model="ruleForm1.distribution.affirmphone"></el-input>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item>
            <el-col style="margin-top: 20px" :span="5">
              <el-button class="submit_btn" size="medium" type="primary" @click="submitForm('ruleForm1')">提交分配
              </el-button>
            </el-col>
          </el-form-item>
          <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <div class="f_box">
              <div>
                分配至：{{ruleForm1.depart}}
              </div>
              <div>
                功能包括：
                <el-tag v-for=" item in ruleForm1.checkedFun" :key="item.function_id" type="success">{{item.functionname}}</el-tag>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAll">确 定</el-button>
          </span>
          </el-dialog>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {getFunction,authority} from "../api/getData";
  import {mapState} from 'vuex'
  export default {
    name: "SetUpPermission",
    components: {
      HeadTop
    },
    computed:{
      ...mapState(['adminInfo']),
    },
    data() {
      let validatedepart = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择部门'));
        } else {
          callback();
        }
      }
      let validateManage = (rule, value, callback) => {
        if (JSON.stringify(value) == '{}') {
          callback(new Error('请选择管理功能'));
        } else {
          callback();
        }
      }
      let validateDistribution = (rule, value, callback) => {
        if (value.phone === '') {
          callback(new Error('请输入管理员账号'));
          return
        }
        if (value.affirmphone === '') {
          callback(new Error('请再次输入管理员账号'));
          return
        }
        if (value.affirmphone != value.phone) {
          callback(new Error('两次输入不一致'));
          return
        }
        callback();
      }
      return {

        ruleForm1: {
          depart: '',
          checkedFun:[],
          distribution: {
            phone: '',
            affirmphone: ''
          }
        },
        rules1: {
          depart: [
            {validator: validatedepart}
          ],
          manage: [
            {validator: validateManage}
          ],
          distribution: [
            {validator: validateDistribution}
          ]
        },
        optionsdepart: [
          {
          value: '市场部',
          label:'市场部',
          },
          {
          value: '技术部',
          label:'技术部',
          },
          {
          value: '运营部',
          label:'运营部',
          },
          {
          value: '行政部',
          label:'行政部',
          },
          {
          value: '财务部',
          label:'财务部',
          },
        ],
        centerDialogVisible: false,
        funData:[],
        checkAll:false,
        isIndeterminate:true,
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.ruleForm1.checkedFun = val ? this.funData : [];
        this.isIndeterminate = false;
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.centerDialogVisible=true
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleAll(){
        this.centerDialogVisible = false
        let {affirmphone,phone}=this.ruleForm1.distribution
        let {depart,checkedFun}=this.ruleForm1
        let chaArr=[]
        for(let item of checkedFun){
          for(let ite of this.funData){
            if(item.functionname==ite.functionname){
              chaArr.push(ite.function_id)
            }
          }
        }
        let chaStr=chaArr.join(',')
        let params={affirmphone,phone,depart,functions:chaStr}
        authority(params)
          .done(res=>{
            if(res.message=='success'){
              this.$refs['ruleForm1'].resetFields();
              if(this.adminInfo.phone==phone){
                 this.$message({
                  message:'设置成功，请重新登录！',
                  type:'success'
                })
                this.$router.replace({
                  path:'/'
                })
                return
              }
              this.$message({
                message:'设置成功',
                type:'success'
              })
            }
          })
      },
    },
    mounted(){
      getFunction()
        .done(res=>{
          this.funData=res.result
        })
    }
  }
</script>


<style scoped>
  @import "../style/table.less";
  .f_box div{
    margin-bottom: 10px;
    line-height: 1.5;
  }
  .el-checkbox{
    margin-left: 0;
    margin-right: 30px;
  }
</style>
