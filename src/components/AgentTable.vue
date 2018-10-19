<template>
  <div>
    <table style="width:100%" id="out-table" border="0">
      <tr class="thr">
        <th>手机号</th>
        <th>用户名</th>
        <th>行政区域</th>
        <th>推荐人</th>
        <th>添加时间</th>
        <th v-if="version=='new'" style="width: 50px">代人升级</th>
        <th>状态</th>
      </tr>
      <tr v-for="(item,index) in itemData" class="tdr">
        <td>{{item.phone}}</td>
        <td>
          <el-button type="text" @click="handleNameClick(item.realName,item.user_id)">{{item.realName}}</el-button>
        </td>
        <td>{{item.address}}</td>
        <td>{{item.upper_name}}</td>
        <td>{{item.insert_time}}</td>
        <td v-if="version=='new'">
          <div style="display: flex">
            <el-button @click="handleIsOpen('1',item.user_id,index)" v-show="item.helpUpgrade==0" size="mini" type="text">开启</el-button>
            <el-button @click="handleIsOpen('0',item.user_id,index)" style="margin-left: 0" v-show="item.helpUpgrade==1" size="mini" type="text">关闭</el-button>
          </div>
        </td>
        <td>
          <div style="display: flex;justify-content: flex-start;align-items: center">
            <div style="display:flex;align-items: center;width: 50px">
                  <span style="color:#3a8ee6"
                        v-show="item.status==1||item.status==0">正常</span>
              <el-button type="text" v-show="item.status==3">已冻结</el-button>
            </div>
            <el-button
              size="mini"
              type="success"
              style="margin-left: 10px"
              v-show="item.status==3"
              @click="handleRecover(index, item.user_id)">恢复
            </el-button>
            <el-button
              size="mini"
              type="danger"
              v-show="item.status==1||item.status==0"
              @click="handleFreeze(index, item.user_id)">冻结
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(index, item.user_id,item.realName,item.phone,)">编辑
            </el-button>
            <!--<template>-->
            <!--<el-button size="small" type="warning" @click="handleDelete(index, item.user_id)">删除</el-button>-->
            <!--</template>-->
          </div>
        </td>
      </tr>
    </table>
    <NODatasTable v-show="this.$_.isEmpty(itemData)"></NODatasTable>
  </div>
</template>

<script>
  import NODatasTable from '../components/NODatasTable'
  import {version} from "../config/env";

  export default {
    name: "AgentTable",
    props: ['status', 'itemData'],
    data() {
      return {
        version:version,
        visible: false,
      }
    },
    components: {
      NODatasTable
    },
    methods: {
      handleIsOpen(helpUpgrade,user_id,index){
        this.$emit('updateHelpUpgradeFunction', {helpUpgrade,user_id,index})
      },
      handleNameClick(realname, user_id) {
        this.$emit('handleNameClick', {realname, user_id})
      },
      handleRecover(index, user_id) {
        this.$emit('handleRecover', {index, user_id})
      },
      handleFreeze(index, user_id) {
        this.$emit('handleFreeze', {index, user_id})
      },
      handleEdit(index, user_id, realname, phone) {
        this.$emit('handleEdit', {index, user_id, realname, phone})
      },
      handleDelete(index, user_id) {
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('handleDelete', {index, user_id})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>

<style scoped>


  th {
    text-align: left;
    width: 180px;
    color: #555555;
  }

  td {
    color: #888;
  }

  th, td {
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #dedede;
    vertical-align: middle;
  }
</style>
