<template>
  <div>
    <div id="editor" type="text/plain" style="width:1024px;height:500px;"></div>
  </div>
</template>

<script>
  import '../../static/ueditor/ueditor.config'
  import '../../static/ueditor/ueditor.all';
  import '../../static/ueditor/lang/zh-cn/zh-cn';
  import '../../static/ueditor/ueditor.parse.min.js'
    export default {
        name: "UEditor",
      props: {
        id: {
          type: String
        },
        config: {
          type: Object
        }
      },
      data() {
        return {
          editor: null
        }
      },
      mounted() {
        //初始化UE
        UE.delEditor('editor');
        this.editor = window.UE.getEditor('editor',this.config);
      },
      destoryed() {
        this.editor.destory();
      },
      methods:{
        // getUEContent: function(){
        //   return this.editor.getContent();
        // }
      }
    }
</script>

<style scoped>

</style>
