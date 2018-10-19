<template>
  <div>
    <HeadTop></HeadTop>
    <div class="all_con">
      <h3 class="head_h3">
        分类管理
      </h3>
      <div class="table_container">
        <el-button @click="add()" type="primary" style="margin-bottom: 20px">新增一行</el-button>
        <el-table
          :data="editGoodsInfo.goodsSortList"
          border
          style="width: 100%">
          <el-table-column
            label="图标"
            width="180"
          >
            <template slot-scope="scope">
              <div @click="rowClick(scope.$index)">
                <el-upload
                  action="123"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-error="errorUpload"
                  :http-request="myUpload"
                  :file-list="scope.row.imgArr"
                  multiple
                  :limit="1"
                >
                  <i v-if="$_.isEmpty(scope.row.imgArr)" class="el-icon-plus avatar-uploader-icon"></i>
                  <img v-else class="cardImg" style="max-width:146px;height: 146px"
                       :src="scope.row.imgArr[0].url">
                  <span v-if="!$_.isEmpty(scope.row.imgArr)" @click.stop="handleRemove(scope.$index)" class="item-delete">
                    <i style="color: #fff" class="el-icon-delete"></i>
                  </span>
                </el-upload>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="名字"
          >
            <template slot-scope="scope">
              <div @click="rowClick(scope.$index)">
                <el-input v-model.lazy="scope.row.categoryname" placeholder="请输入分类名称"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
          >
            <template slot-scope="scope">
              <div @click="rowClick(scope.$index)">
                <el-input v-model.lazy="scope.row.desc" placeholder="请输入分类描述"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="序号"
            width="180">
            <template slot-scope="scope">
              <div @click="rowClick(scope.$index)">
                <el-input v-model.lazy="scope.row.order" type="number" placeholder="请输入序号"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <div @click="rowClick(scope.$index)">
                <el-button @click="editConfirm(scope.row)" type="text" size="small">编辑完成</el-button>
                <el-popover
                  placement="top"
                  width="160"
                  v-model="scope.row.visible">
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="remove(scope.$index,scope.row.category_id)">确定
                    </el-button>
                  </div>
                  <el-button slot="reference" @click="scope.row.visible = true" type="text" size="small">删除</el-button>
                </el-popover>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {uploadFile} from "../api/upload";
  import {updateCategory, deleteCategory} from '../api/getData'

  export default {
    name: "GoodsSort",
    components: {
      HeadTop
    },
    computed: {
      ...mapState(['editGoodsInfo']),
    },
    data() {
      return {
        visible: false,
        cIndex: 0
      }
    },
    methods: {
      ...mapActions(['getGoodsSortList',]),
      ...mapMutations(['addGoodsSortList', 'removeGoodsSortList', 'goodsSortImgSuccess', 'removeGoodsSortImg']),
      rowClick(index) {
        this.cIndex = index
      },
      add() {
        this.addGoodsSortList()
      },
      remove(index, category_id) {
        deleteCategory({category_id})
          .done(res => {
            this.removeGoodsSortList(index)
          })
      },
      editConfirm(row) {
        let params = {...this.editGoodsInfo.goodsSortList[this.cIndex]}
        updateCategory(params)
          .done(res => {
            if (res.code == '000') {
              this.$message({
                type: 'success',
                message: '操作成功！'
              })
            }
          })

      },
      handleSuccess(response) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      },
      errorUpload(err, file, fileList) {
        this.$message.error('上传失败，请重新上传!')
      },
      myUpload(content) {
        let fd = new FormData()
        fd.append('file', content.file)
        fd.append('type', 'goods')
        uploadFile(fd).done(res => {
          if (res.success) {
            this.goodsSortImgSuccess({index: this.cIndex, img_url: res.imagesName})
            this.handleSuccess(res)
          } else {
            // this.$message.error('上传失败!')
            this.errorUpload()
          }
        })
          .fail(e => {
            this.errorUpload()
          })
      },
      handleRemove(index) {
        this.removeGoodsSortImg(index)
      },
    },
    mounted() {
      this.getGoodsSortList()
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/table";

  .item-delete {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    top: 13px;
    width: 148px;
    left: 11px;
    display: none;
    transition: all 3s;
  }

  .el-upload--picture-card:hover .item-delete {
    display: block;
  }
</style>
