<template>
  <div>
    <Head-Top></Head-Top>
    <div v-show="!showEdit" class="all_con">
      <div class="title">
        <el-menu style="float: left" :default-active="this.$store.state.goodsInfo.activeIndex" class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect">
          <el-menu-item index="0">全部</el-menu-item>
          <el-menu-item index="1">发布商品</el-menu-item>
        </el-menu>
        <div style="margin-left: 30px; float: left">
          <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px"
                   class="demo-ruleForm">
            <div style="display: flex;margin-top: 20px">
              <el-form-item style="margin-left: 20px" label-width="0px" prop="phoneName">
                <el-input size="medium" placeholder="输入商品名称" type="text" v-model="ruleForm1.phoneName"
                          auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label-width="0px">
                <el-button class="submit_btn" size="medium" type="primary" @click="submitForm('ruleForm1')">搜索
                </el-button>
              </el-form-item>
              <el-form-item label-width="0px">
                <el-button style="margin-left: 30px" class="submit_btn" size="medium" type="primary" @click="goSort()">
                  分类管理
                </el-button>
              </el-form-item>
              <el-form-item v-if="version=='new'" label-width="0px">
                <el-button style="margin-left: 30px" class="submit_btn" size="medium" type="primary"
                           @click="goBanner()">
                  轮播图编辑
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="table_container">
        <el-table
          :data="goodsInfo.tableData"
          highlight-current-row
          style="width: 100%"
          :header-row-style="{color:'#333'}"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column
            property="image"
            label="商品图"
          >
            <template slot-scope="scope">
              <img style="max-height: 100px;max-width: 100px" :src="goodsInfo.tableData[scope.$index*1].image">
            </template>
          </el-table-column>
          <el-table-column
            property="points"
            label="商品描述"
          >
          </el-table-column>
          <el-table-column
            property="productPrice"
            label="价格(元)">
          </el-table-column>
          <el-table-column
            property="haveSole"
            label="销量">
          </el-table-column>
          <el-table-column
            property="stockNum"
            label="库存">
          </el-table-column>
          <el-table-column
            property="productName"
            label="商品名称">
          </el-table-column>
          <el-table-column
            property="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-show="scope.row.status==1" @click="handleEdit(scope.row)" type="text" size="small">编辑
              </el-button>
              <el-button v-show="scope.row.status==1" @click="handleDown(scope.$index*1,scope.row)" type="text"
                         size="small">下架
              </el-button>
              <el-button v-show="scope.row.status==1||scope.row.status==2"
                         @click="handleDelete(scope.$index*1,scope.row)" type="text" size="small">删除
              </el-button>
              <el-button v-show="scope.row.status==2" type="text" size="small">已下架</el-button>
              <el-button v-show="scope.row.status==3" type="text" size="small">已删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--<div>-->
        <!--{{goodsInfo.allTableData.length}}-->
        <!--</div>-->
        <div class="pageination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page.sync="goodsInfo.currentPage"
            :page-size="goodsInfo.limit"
            layout=" prev, pager, next, jumper"
            :total="goodsInfo.allTableData.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'
  import {soldOutProduct, deleteProduct} from "../api/getData";
  import {confirmBox, removeStore, setStore} from "../config/mUtils";
  import {version} from "../config/env";
  import {Loading} from 'element-ui'

  export default {
    name: "Goods",
    components: {
      HeadTop
    },
    data() {
      let validatePhoneName = (rule, value, callback) => {
        callback();
      }
      return {
        loading: false,
        version: version,
        tableData: [],
        ruleForm1: {
          phoneName: '',
        },
        rules1: {
          phoneName: [
            {validator: validatePhoneName, trigger: 'blur'}
          ]
        },
        showEdit: false,
      }
    },
    computed: {
      ...mapState(['goodsInfo']),
      ...mapGetters(['filterGoods']),
    },
    methods: {
      ...mapMutations(['setGoodsTabIndex', 'changeGoodsList']),
      ...mapActions(['goodsList', 'getEditGood', 'getGoodsSortList']),
      goSort() {
        this.$router.push({
          path: '/goods_sort'
        })
      },
      goBanner() {
        this.$router.push({
          path: '/banner_manage'
        })
      },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = this.ruleForm1.phoneName
           this.goodsList({productName: params})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.changeGoodsList(val)
      },
      handleSelect(key, keyPath) {
        if (key == 0) {
          this.setGoodsTabIndex('0')
          this.$router.push({
            path: '/goods',
          })
        }
        if (key == 1) {
          this.setGoodsTabIndex('1')
          this.$router.push({
            path: '/publish_goods',
          })
        }
      },
      handleEdit(row) {
        let productId = row.productId
        this.getEditGood({productId})
        removeStore("productId")
        setStore("productId", productId)
        this.$router.push({
          path: '/edit_goods',
        })

      },
      handleDelete(index, row) {
        let callBack = () => {
          deleteProduct({productId: row.productId})
            .done(res => {
              if (res.success) {
                this.goodsInfo.tableData.splice(index, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
              }

            })
        }
        confirmBox({
          bindThis: this,
          callBack
        })
      },
      handleDown(index, row) {
        let callBack = () => {
          soldOutProduct({productId: row.productId})
            .done(res => {
              if (res.success) {
                this.goodsInfo.tableData[index].status = 2
              }
              this.$message({
                type: 'success',
                message: '下架成功！'
              })
            })
        }
        confirmBox({
          msg: '继续将执行下架, 是否继续?',
          bindThis: this,
          callBack
        })
      },
    },
    async mounted() {
      this.loading = true
      this.setGoodsTabIndex('0')
      await this.goodsList({productName: ''})
      await this.getGoodsSortList()
      this.loading = false
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";

  .tab_nav {
    display: flex;
    .tab {
      width: 120px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
