<template>
  <div>
    <Head-Top></Head-Top>
    <div class="all_con">
      <h3 class="head_h3">
        消息发布
      </h3>
      <div class="table_container">
        <el-button @click="handleToDetail()" type="primary" style="margin: 20px 0">发布记录</el-button>
        <el-form label-position="right" label-width="100px" :model="formDatas">
          <el-form-item label="消息标题">
            <el-col :span="15">
              <el-input size="small" v-model="formDatas.title"></el-input>
            </el-col>
          </el-form-item>
          <div>
          <el-form-item label="消息内容">
            <el-col :span="25">
              <div class="edit_container">
                <UEditor :config=config ref="ueditor"></UEditor>
              </div>
            </el-col>
          </el-form-item>
            <div class="submit_btn">
              <el-button type="primary" @click="submit">确认发布</el-button>
            </div>
          </div>
        </el-form>
      </div>

    </div>

  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import UEditor from '../components/UEditor'
  import {publicNews,getNewsList} from "../api/getData";
 import {getStore} from "../config/mUtils";
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    name: "PublishNews",
    components: {
      HeadTop,UEditor
    },
    data() {
      return {
        formDatas: {
          title: ''
        },
        content: '<h3>文本编辑</h3>',
        config: {
          //可以在此处定义工具栏的内容
          // toolbars: [
          //   ['fullscreen', 'source','|', 'undo', 'redo','|','bold', 'italic', 'underline', 'fontborder', 'strikethrough',
          //     '|','superscript','subscript','|', 'forecolor', 'backcolor','|', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist',
          //     '|','selectall', 'cleardoc','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify','|',
          //     'link','unlink']
          // ],
          autoHeightEnabled: false,
          autoFloatEnabled: true,　　//是否工具栏可浮动
          initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: 1024,
          initialFrameHeight: 450,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },
      }
    },
    methods: {
      ...mapActions(['getNewsList']),
      handleToDetail(){
        this.$router.push({
          path:'/news_list'
        })
      },
      xieru(){
        UE.getEditor('editor').setContent('');
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      submit(){
        let  notice_content=UE.getEditor('editor').getContent();
        if(this.formDatas.title==''){
          this.$message.error('请输入标题')
          return
        }
        if(notice_content==''){
          this.$message.error('请输入内容')
          return
        }
        publicNews({notice_title:this.formDatas.title,notice_content,token:getStore('token')})
          .done(res=>{
            if(res.result){
              this.$message.success('发布成功！');
              this.getNewsList()
              this.$router.push({
                path:'/news_list'
              })
            }else {
              this.$message.error('发布失败！');
            }
          })
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../style/table";
  @import '../style/mixin';
  .edit_container{
    padding:0px;
    margin-bottom: 40px;
  }
  .editer{
    height: 350px;
  }
  .submit_btn{
    text-align: center;
    padding-right: 180px;
  }
</style>
