<template>
  <div>
    <div class="header">
      <img class="logo" :src="logoSrc" alt="">
      <div class="title">{{title}}</div>
    </div>
    <div v-show="toResetPass" class="form_con">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label-width="0px" prop="account">
          <el-input placeholder="输入管理员账号" type="text" v-model="ruleForm2.account"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="0px" prop="checkPass">
          <el-input @keyup.enter.native="submitForm('ruleForm2')" placeholder="输入管理员密码" type="password"
                    v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-checkbox class="checkBox" v-model="checked">记住密码</el-checkbox>
        <span @click="toResetPassHandle" class="resetPassword">忘记密码？</span>
        <el-form-item label-width="0px">
          <el-button :loading="loading" class="submit_btn" size="medium" type="primary"
                     @click="submitForm('ruleForm2')">登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="resetPass1" class="form_con">
      <el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" label-width="0px" class="demo-ruleForm">
        <el-form-item label-width="0px" prop="phone">
          <el-input placeholder="输入绑定手机号" type="text" v-model="ruleForm3.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="0px" prop="code">
          <div style="display: flex">
            <el-input placeholder="输入验证码" type="number" v-model="ruleForm3.code" auto-complete="off"></el-input>
            <el-button class="code_btn" :disabled="getCodeDisabled" size="small" type="primary" @click="getCode">
              {{isCode}}
            </el-button>
          </div>
        </el-form-item>
        <el-button class="submit_btn" size="medium" type="primary" @click="goNext('ruleForm3')">下一步</el-button>
      </el-form>
    </div>
    <div v-show="resetPass2" class="form_con">
      <el-form :model="ruleForm4" status-icon :rules="rules4" ref="ruleForm4" label-width="0px" class="demo-ruleForm">
        <el-form-item label-width="0px" prop="password">
          <el-input placeholder="输入新密码" type="password" v-model="ruleForm4.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="0px" prop="rePassword">
          <el-input placeholder="确认密码" type="password" v-model="ruleForm4.rePassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-button class="submit_btn" size="medium" type="primary" @click="goComplete('ruleForm4')">完成</el-button>
      </el-form>
    </div>
    <div
      style="display:flex;justify-content: center;line-height:2;margin-bottom: 20px;background: #fff;padding-top: 10px">
      <div><a style="color: #3a8ee6;" href="https://m.kuaidi100.com/" target="_blank">快递查询：</a><a style="color: #3a8ee6"
                                                                                                  href="https://m.kuaidi100.com/"
                                                                                                  target="_blank">https://m.kuaidi100.com</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {login, getPhoneCode, isCodeTrue, modifyPassword} from '../api/getData'
  import {setStore} from '../config/mUtils'
  import {mapActions} from 'vuex'
  import {version} from "../config/env";

  export default {
    name: "Login",
    data() {
      let validateccAount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      let validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          callback();
        }
      }

      let validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      }

      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      }

      let validateRePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          callback();
        }
      }
      return {
        logoSrc: version == "new" ? 'static/n_logo.png' : (version == "old" ? 'static/logo.png' : 'static/n_logo.png'),
        title: version == "new" ? "康爱后台控制中心" : (version == "old" ? '幸福苑后台控制中心' : "康爱2后台控制中心"),
        loading: false,
        toResetPass: true,
        resetPass1: false,
        resetPass2: false,
        checked: false,
        isCode: "获取验证码",
        getCodeDisabled: false,
        ruleForm2: {
          account: '',
          checkPass: '',
        },
        rules2: {
          account: [
            {validator: validateccAount, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
        },
        ruleForm3: {
          phone: '',
          code: ''
        },
        rules3: {
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          code: [
            {validator: validateCode, trigger: 'blur'}
          ],
        },
        ruleForm4: {
          password: '',
          rePassword: ''
        },
        rules4: {
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          rePassword: [
            {validator: validateRePassword, trigger: 'blur'}
          ],
        },
      };
    },
    mounted() {
      //初始化本地获取记住密码
      let rememberPass = localStorage.getItem(`rememberPass`);
      let rememberChecked = localStorage.getItem(`rememberChecked`);
      let rememberAccount = localStorage.getItem(`rememberAccount`);
      rememberAccount ? this.ruleForm2.account = rememberAccount : '';
      rememberPass ? this.ruleForm2.checkPass = rememberPass : '';
      rememberChecked ? this.checked = true : false;
    },
    methods: {
      ...mapActions(['toLogin']),
      toResetPassHandle() { //点击忘记密码进入修改密码
        this.toResetPass = false
        this.resetPass1 = true
      },
      goNext(formName) { //点击下一步进入重置密码
        let {phone, code} = this.ruleForm3
        this.$refs[formName].validate((valid) => {
          if (valid) {
            isCodeTrue({phone, code}) //验证码是否正确
              .done(res => {
                if (res.success) {
                  this.resetPass1 = false
                  this.resetPass2 = true
                } else {
                  this.$message.error('提交失败')
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goComplete(formName) { //点击修改密码完成
        this.$refs[formName].validate((valid) => {
          let {password, rePassword} = this.ruleForm4
          let {phone} = this.ruleForm3
          if (valid) {
            if (password == rePassword) {
              modifyPassword({affirmPassword: password, newpassword: rePassword, phone})
                .done(res => {
                  if (res.success) {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    });
                    this.toResetPass = true
                    this.resetPass1 = false
                    this.resetPass2 = false
                  }
                })
            } else {
              this.$message.error('两次密码不一致')
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCode() { //点击获取验证码
        getPhoneCode({phone: this.ruleForm3.phone})
          .done(res => {
            let curNum = 120;
            this.getCodeDisabled = true
            setInterval(_ => {
              if (curNum > 0) {
                curNum--
              } else {
                curNum = '重新获取'
                this.getCodeDisabled = false
              }
              this.isCode = `${curNum}S`
            }, 1000)
          })
      },
      submitForm(formName) { //点击登录按钮
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.loading = true
            login({phone: this.ruleForm2.account, password: this.ruleForm2.checkPass})
              .done(res => {
                if (res.code == '000') {
                  setStore('token', res.token)
                  setStore('ADF', JSON.stringify(res.function))

                  let curArr = []
                  let flag = ''
                  let path = ''
                  for (let item of res.function) {
                    curArr.push(item.function_id)
                  }
                  curArr.sort((a, b) => a - b)
                  flag = curArr[0]
                  switch (flag) {
                    case(1):
                      path = '/manage'
                      break;
                    case(2):
                      path = '/money'
                      break;
                    case(3):
                      path = '/fd'
                      break;
                    case(4):
                      path = '/cash'
                      break;
                    case(5):
                      path = '/goods'
                      break;
                    case(6):
                      path = '/order'
                      break;
                    case(7):
                      path = '/agent'
                      break;
                    case(8):
                      path = '/news'
                      break;
                    case(9):
                      path = '/set_up'
                      break;
                    case(10):
                      path = '/set_up_permissions'
                      break;
                    case(11):
                      path = '/range_apply'
                      break;
                    case(12):
                      path = '/store_apply'
                      break;
                    default:
                      path = '/manage'
                  }
                  this.$router.push({
                    path: path,
                  })
                  this.loading = false
                  this.$message({
                    message: '登录成功！',
                    type: 'success'
                  });
                  return
                }
                if (res.code == '105') {
                  this.$message.error(`账号或密码错误!`)
                  this.loading = false
                  return
                }
                if (res.code == '107') {
                  this.$message.error(`你没有权限!`)
                  this.loading = false
                  return
                }
              })
            if (this.checked) {
              localStorage.setItem(`rememberAccount`, this.ruleForm2.account);
              localStorage.setItem(`rememberPass`, this.ruleForm2.checkPass);
              localStorage.setItem(`rememberChecked`, this.checked);
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
  }
</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 480px;
    background: url("../assets/banner.jpg");
  }

  .logo {
    width: 20%;
    height: 112px;
    margin-bottom: 40px;
  }

  .title {
    font-size: 20px;
    color: #fff;
    letter-spacing: 10px;
  }

  .form_con {
    width: 350px;
    margin: 40px auto;
  }

  .submit_btn {
    width: 100%;
    font-size: 16px;
  }

  .checkBox {
    margin-bottom: 12px;
  }

  .resetPassword {
    float: right;
    color: #409EFF;
    font-size: 14px;
  }

  .code_btn {
    width: 100px;
  }
</style>
