<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <h3 class="head_h3">
        设置
      </h3>
      <div class="table_container">
        <div style="display: flex">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action="123"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
            :on-error="errorUpload"
            :http-request="myUpload"
            multiple
            :limit="1"
          >
            <div style="border-radius: 50%;overflow: hidden;width: 100px;height: 100px;">
              <img style="max-height: 100%;width: 100%" :src="imgUrl">
            </div>
            <el-button type="text">修改头像</el-button>
          </el-upload>

          <div style="display: flex;flex-direction: column;
        justify-content:flex-start;
        line-height: 2.5;
        color: #808080;font-size: 14px;
        margin-left: 30px;
        ">
            <span>{{adminInfo.realname}}</span>
            <span>ID:{{adminInfo.phone}}</span>
            <span>地址:{{adminInfo.address}}</span>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <h4 style="color: #555;line-height: 2.5">修改密码：</h4>
          <el-form v-show="resetPass1" :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="0px">
            <el-form-item prop="phone">
              <el-col :span="5">
                <el-input type="number" placeholder="验证手机号" size="medium" v-model="ruleForm1.phone"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="code">
              <el-col :span="5">
                <div>
                  <div style="float: left">
                  <el-input style="float: left" type="number" placeholder="输入验证码" size="medium" v-model="ruleForm1.code"></el-input>
                  </div>
                  <div  style="float: left">
                    <el-button class="code_btn" :disabled="getCodeDisabled" size="medium" type="primary" @click="getCode">
                      {{isCode}}
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="5">
                <el-button class="submit_btn" size="medium" type="primary" @click="goNext('ruleForm1')">下一步</el-button>
              </el-col>
            </el-form-item>
          </el-form>
          <!--点击下一步-->
          <el-form v-show="resetPass2" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px">
            <el-form-item prop="password">
              <el-col :span="5">
                <el-input type="password" placeholder="输入密码" size="medium" v-model="ruleForm2.password"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="rePassword">
              <el-col :span="5">
                <el-input type="password" placeholder="确认密码" size="medium" v-model="ruleForm2.rePassword"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="5">
                <el-button class="submit_btn" size="medium" type="primary" @click="goComplete('ruleForm2')">确定
                </el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {getSetUpPhoneCode,setUpModifyPassword,logOut} from "../api/getData";
  import {getStore} from '../config/mUtils'
  import {baseImgPath} from '../config/env'
  import {mapState,mapActions} from 'vuex'
  import {uploadFile} from '../api/upload'
  export default {
    name: "SetUp",
    components: {
      HeadTop
    },
    computed:{
      ...mapState(['adminInfo']),
      imgUrl(){
       return this.adminInfo.avatar?`${this.baseImgPath}HeadPortrait/${this.adminInfo.avatar}`:'static/5656.png'
      }
    },
    data() {
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
        ruleForm1: {
          phone: '',
          code: ''
        },
        rules1: {
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          code: [
            {validator: validateCode, trigger: 'blur'}
          ],
        },
        ruleForm2: {
          password: '',
          rePassword: ''
        },
        rules2: {
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          rePassword: [
            {validator: validateRePassword, trigger: 'blur'}
          ],
        },
        resetPass1: true,
        resetPass2: false,
        getCodeDisabled: false,
        isCode: "获取验证码",
        baseImgPath:baseImgPath
      }
    },
    methods: {
      ...mapActions(['getAdminInfo']),
      myUpload(content){
        let token=getStore('token')
        let fd = new FormData()
        fd.append('file', content.file)
        fd.append('type', 'avatar')
        fd.append('token', token)
        uploadFile(fd).done(res => {
          if (res.success) {
            this.handleAvatarSuccess(res)
          } else {
            // this.$message.error('上传失败!')
            this.errorUpload()
          }
        })
          .fail(e=>{
            this.errorUpload()
          })
      },
      handleRemove() {

      },
      errorUpload(err, file, fileList) {
        this.$message.error('上传失败，请重新上传!')
      },
      handleAvatarSuccess(res, file) {
        let token=getStore('token')
        this.getAdminInfo({token})
        this.imageUrl = `${baseImgPath}HeadPortrait/${this.adminInfo.avatar}`
      },
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      goNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.resetPass1 = false
            this.resetPass2 = true
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goComplete(formName) {
        this.$refs[formName].validate((valid) => {
          let {password,rePassword}=this.ruleForm2
          let {phone,code}=this.ruleForm1
          if (valid) {
            if(password==rePassword){
              setUpModifyPassword({newpassword:rePassword,affirmPassword:password,phone,code,token:getStore('token')})
                .done(res=>{
                  if(res.success){
                    let token=getStore('token')
                    logOut({token})
                      .done(res=>{
                        if(res.success==true){
                          this.$message({
                            message:'修改成功，重新登录',
                            type:'success'
                          })
                          this.$router.push({
                            path:'/',
                          })
                        }
                      })
                  }
                })
            }else {
              this.$message.error('两次密码不一致')
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCode() {
        //获取验证码
        let curNum = 120;
        let {phone} = this.ruleForm1
        if (phone == '') {
          this.$message.error('手机号不能为空')
          return
        }
        getSetUpPhoneCode({phone,token:getStore('token')})
          .done(res=>{
            if(res.success){
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
            }
          })
      },
    }
  }
</script>

<style scoped>
  @import "../style/table.less";
</style>
