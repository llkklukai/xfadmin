<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <h3 class="head_h3">
        发布商品
      </h3>
      <el-form :model="formDatas" status-icon :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm"
               label-position="right">
        <div class="form_ctrl">
          <el-form-item label-width="0px">
            <el-button class="submit_btn" size="medium" type="primary" @click="submitForm('ruleForm')">发布商品</el-button>
            <el-button class="submit_btn" size="medium" type="default" @click="submitCancel()">取消</el-button>
          </el-form-item>
        </div>
        <div class="upload_con">
          <span class="upload_title">商品图片</span>
          <el-upload
            action="123"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="errorUpload"
            :http-request="myUpload"
            :before-remove="handleBeforeRemoveM"
            multiple
            :limit="4"
          >
            <i class="el-icon-plus"></i>
            <!--<el-progress type="circle" :percentage="0"></el-progress>-->
          </el-upload>
          <!--<el-dialog style="width: 50px" :visible.sync="dialogVisible">-->
          <!--<img width="100%" :src="dialogImageUrl" alt="">-->
          <!--</el-dialog>-->
        </div>
        <el-form-item label="名称" prop="productName">
          <el-col :span="10">
            <el-input placeholder="输入商品名" v-model="formDatas.productName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品描述" prop="points">
          <el-col :span="10">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入商品描述"
              v-model="formDatas.points">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="市场价格" prop="productPrice">
          <el-col :span="10">
            <el-input placeholder="输入价格(元)"  v-model="formDatas.productPrice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="所属展示模块" prop="moduleNumber">
          <el-col :span="10">
            <template>
              <!--<el-radio v-model="formDatas.moduleNumber" label="1">代理专区</el-radio>-->
              <el-checkbox v-model="formDatas.moduleNumber">代理专区</el-checkbox>
              <div>
                <el-radio-group v-model="formDatas.moduleNumber2">
                  <el-radio style="margin-bottom: 10px" :key="item.category_id" v-for="item in editGoodsInfo.goodsSortList"
                            :label="item.category_id">{{item.categoryname}}
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-col>
        </el-form-item>

        <el-form-item label="选择商品类型" prop="moduleNumber">
          <el-col :span="10">
            <template>
              <div style="display: flex;align-items: center;height: 40px">
                <el-switch
                  style="display: block"
                  v-model="formDatas.productType"
                  active-color="#13ce66"
                  inactive-color="#409EFF"
                  active-text="实物商品"
                  inactive-text="计次商品">
                </el-switch>
              </div>
              <div v-show="!formDatas.productType">
                <el-input placeholder="输入计次商品名称" type="text" v-model="formDatas.name"></el-input>
                <el-input placeholder="输入次数"  v-model="formDatas.number"></el-input>
              </div>
            </template>
          </el-col>
        </el-form-item>
        <el-form-item label="成本价格" prop="primePrice">
          <el-col :span="10">
            <el-input placeholder="输入价格(元)"  v-model="formDatas.primePrice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-col :span="10">
            <el-input placeholder="输入商品规格"  v-model="formDatas.standard"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品颜色">
          <el-col :span="10">
            <el-input placeholder="输入商品颜色"  v-model="formDatas.color"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-show="formDatas.moduleNumber" label="代理区成本" prop="agencyCostPrice">
          <el-col :span="10">
            <el-input placeholder="输入成本价格(元)" v-model="formDatas.agencyCostPrice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品库存" prop="stockNum">
          <el-col :span="10">
            <el-input placeholder="输入库存数(件)" v-model="formDatas.stockNum"></el-input>
          </el-col>
        </el-form-item>
        <div class="upload_detail_con">
          <div class="detail_title_con">
            <div class="detail_label">
              详情图
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1"><i class="nmenu el-icon-picture-outline"></i>添加图片</el-menu-item>
            </el-menu>
          </div>
          <div style="margin-left: 100px;margin-top: 22px;">
            <div v-show="showDetail" class="upload_detail_img">
              <el-upload
                action="123"
                :on-remove="handleRemoveDetail"
                list-type="picture-card"
                :on-success="handleSuccessDetail"
                :on-error="errorUploadDetail"
                :before-remove="handleBeforeRemoveDetail"
                :http-request="myUploadDetail"
              >
                <div style="display: flex;flex-direction: column;justify-content: center">
                  <span style="height: 30px;color: #8c939d">添加图片</span>
                  <i class="el-icon-plus"></i>
                </div>
              </el-upload>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {baseImgPath} from '../config/env'
  import {uploadFile} from "../api/upload";
  import {addGoods} from "../api/getData";
  import {confirmBox} from "../config/mUtils";

  export default {
    name: "PublishGoods",
    components: {
      HeadTop
    },
    computed: {
      ...mapState(['editGoodsInfo'])
    },
    data() {
      return {
        formDatas: {
          agencyCostPrice:0,
          productName: '',
          productPrice: '',
          primePrice: '',
          stockNum: '',
          points: '',
          ProductImages: '',
          moduleNumber: '',
          moduleNumber2: '',
          productType: true,
          name: '',
          number: "",
          color:'',
          standard:''
        },
        rules1: {
          productName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'}
          ],
          productPrice: [
            {required: true, message: '请输入市场价格', trigger: 'blur'}
          ],
          primePrice: [
            {required: true, message: '请输入成本价格', trigger: 'blur'}
          ],
          agencyCostPrice: [
            {required: true, message: '请输入代理区域成本价格', trigger: 'blur'}
          ],
          stockNum: [
            {required: true, message: '请输入商品库存', trigger: 'blur'}
          ],
          points: [
            {required: false, trigger: 'blur'}
          ],
          moduleNumber: [
            {required: false, trigger: 'blur'}
          ],
        },
        uploadPath: `${baseImgPath}/product/upload`,
        activeIndex: '1',
        showDetail: true,
        inputValue: '',
        file: '',
        mainImg: '',
        detailImg: '',
        removeDeIndex: '',
        removeMainIndex:''
      }
    },
    methods: {
      handleSuccess(response) {
        this.mainImg =this.mainImg+","+ response.imagesName
        // this.$vmessage({
        //   type: 'success',
        //   message: '上传成功'
        // })
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success'
        });
        // this.$notify.success("上传成功")
      },
      errorUpload(err, file, fileList) {
        // this.$vmessage.error('上传失败，请重新上传!')
        this.$notify({
          title: '失败',
          message: '上传失败，请重新上传!',
          type: 'error'
        });
      },
      errorUploadDetail() {
        // this.$vmessage.error('上传失败，请重新上传!')
        this.$notify({
          title: '失败',
          message: '上传失败，请重新上传!',
          type: 'error'
        });
      },
      handleSuccessDetail(res) {
        this.detailImg = this.detailImg + ',' + res.imagesName
        // this.$vmessage({
        //   type: 'success',
        //   message: '上传成功'
        // })
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success'
        });
      },
      ...mapMutations(['setGoodsTabIndex']),
      ...mapActions(['goodsList', 'getGoodsSortList']),
      myUpload(content) { //上传主图
        let fd = new FormData()
        fd.append('file', content.file)
        fd.append('type', 'goods')
        uploadFile(fd).done(res => {
          if (res.success) {
            this.handleSuccess(res)
          } else {
            this.errorUpload()
          }
        })
          .fail(e => {
            this.errorUpload()
          })
      },
      myUploadDetail(content) { //上传详情图
        let fd = new FormData()
        fd.append('file', content.file)
        fd.append('type', 'goods')
        uploadFile(fd).done(res => {

          if (res.success) {
            this.handleSuccessDetail(res)
          } else {
            this.errorUpload()
          }
        })
          .fail(e => {
            this.errorUpload()
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // let ProductImages = this.mainImg + this.detailImg
            let {mainImg,detailImg}=this
            if (mainImg == '') {
              // this.$vmessage.error('主图不能为空')
              this.$notify({
                title: '失败',
                message: '主图不能为空',
                type: 'error'
              });
              return
            }
            if (detailImg == '') {
              // this.$vmessage.error('详情图不能为空')
                this.$notify({
                  title: '失败',
                  message: '详情图不能为空',
                  type: 'error'
                });
              return
            }
            let {
              moduleNumber, productName,
              stockNum, primePrice, productPrice,
              points, moduleNumber2, name, productType,
              number,agencyCostPrice,
              standard,color
            } = this.formDatas
            if (!moduleNumber) { //判断是否在代理专区1在代理专区2不在
              moduleNumber = 2
            } else {
              moduleNumber = 1
            }
            if (productType) {//商品名称类型1是实物商品2计次商品
              productType = 1
            } else {
              productType = 2
              if (!name) {                 //计次商品则需要非空判断
                // this.$vmessage.error("请输入计次商品名称");
                this.$notify({
                  title: '失败',
                  message: '请输入计次商品名称',
                  type: 'error'
                });
                return false
              }
              if (!number) {
                // this.$vmessage.error("请输入计次商品次数");
                this.$notify({
                  title: '失败',
                  message: '请输入计次商品次数',
                  type: 'error'
                });
                return false
              }
            }
            let params = {
              moduleNumber,
              productName,
              stockNum,
              primePrice,
              productPrice,
              mainImg,
              detailImg,
              points,
              categoryId: moduleNumber2,
              productType,
              name,
              number,
              agencyCostPrice,
              standard,
              color
            }
            if(productType==1){
              delete params.name
              delete params.number
            }
            if(moduleNumber==2){
              delete params.agencyCostPrice
            }

            let callBack = () => {
              addGoods(params)
                .done(res => {
                  if (res.success) {
                    this.setGoodsTabIndex('0')
                    this.goodsList({productName: ''})
                    this.$router.replace({
                      path: '/goods'
                    })
                    this.$message({
                      type: 'success',
                        message: '执行成功!'
                    });
                  }
                })
            }
            confirmBox({msg: '继续将发布商品，是否继续？',bindThis:this ,type: 'info', callBack});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitCancel() { //点击取消返回添加前的页面
        this.setGoodsTabIndex('0')
        this.$router.push({
          path: '/goods',
        })
      },
      handleRemove() { //删除主图
        let {mainImg}=this
        let detStr = mainImg.substring(1) //先删除调前面的逗号
        let arr = detStr.split(',')
        arr.splice(this.removeMainIndex, 1) //this.removeMainIndex 当前要删除的主图下标
        this.mainImg = arr.join(',')
      },
      handleBeforeRemoveDetail(file, fileList) { //删除详情图之前做下标标记
        let cIndex = ''
        fileList.map((item, index) => {
          if (item.uid == file.uid) {
            cIndex = index
          }
        })
        this.removeDeIndex = cIndex
      },
      handleBeforeRemoveM(file, fileList) { //删除主图之前做下标标记
        let cIndex = ''
        fileList.map((item, index) => {
          if (item.uid == file.uid) {
            cIndex = index
          }
        })
        this.removeMainIndex = cIndex
      },
      handleRemoveDetail() { //删除详情图
        let detailImg = this.detailImg
        let detStr = detailImg.substring(1) //先删除调前面的逗号

        let arr = detStr.split(',')
        /**
         * this.removeDeIndex 当前要删除的详情图下标
         */
        arr.splice(this.removeDeIndex, 1)

        this.detailImg = arr.join(',')
      },
      handleSelect(key, keyPath) { //选择详情图tab
        if (key == 1) {
          this.showDetail = true
        }
      },
    },
    mounted() {
      this.getGoodsSortList()
      this.$router.beforeEach((to, from, next) => {
        this.setGoodsTabIndex('0')
        next()
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .upload_con {
    display: flex;
    margin-bottom: 22px;
  }

  .upload_title {
    display: flex;
    font-size: 14px;
    color: #606266;
    width: 100px;
    justify-content: flex-end;
    align-items: flex-start;
    padding-right: 12px;
    box-sizing: border-box;
  }

  .form_ctrl {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .detail_title_con {
    display: flex;
    color: #606266;
    font-size: 14px;
  }

  .detail_label {
    width: 100px;
    padding-right: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
  }

  .tag_view {
    display: flex;
  }

  .tag_label {
    width: 100px;
    padding-right: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    color: #606266;
    font-size: 14px;
  }

  i {
    margin-right: 5px;
  }

  .el-checkbox {
    margin-left: 0px;
    margin-right: 30px;
  }
</style>
