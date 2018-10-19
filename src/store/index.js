import Vue from 'vue'
import Vuex from 'vuex'
import initData from './initData'
import {
  getAdminData,
  getGoodsList,
  login,
  getGoodsDetail,
  getAgentById,
  getAgent,
  updateUserStatus,
  getFinacial,
  getAgentByParams,
  getFinalByParams,
  byTimeSelectCashData,
  byTimeSelectOrderData,
  payCount,
  getNoticeList,
  deleteNoticeData,
  selectCategory,
  getUserAccount,
  countUpperBonus,
  getSubordinateListAndMarket, getBroadcast, productList
} from "../api/getData";
import {baseImgPath, version} from "../config/env";
import {computeUserType, computeUserType2, setStore} from "../config/mUtils";

Vue.use(Vuex)

let vm = new Vue()
const state = {
  adminInfo: initData.adminInfo,
  //商品列表
  goodsInfo: initData.goodsInfo,
  loginInfo: initData.loginInfo,
  //编辑中的商品信息
  editGoodsInfo: initData.editGoodsInfo,
  //代理商信息
  agentInfo: initData.agentInfo,
  //编辑中的代理商信息
  editAgentInfo: initData.editAgentInfo,
  //财务报表
  finalInfo: initData.finalInfo,
  //财务统计
  finalCountInfo: initData.finalCountInfo,
  //订单统计信息
  orderCountInfo: initData.orderCountInfo,
  //支付统计
  payTypeCountInfo: initData.payTypeCountInfo,
  //消息列表信息
  newsListInfo: initData.newsListInfo,
  //订单发货信息
  orderDispatchInfo: initData.orderDispatchInfo,
  rewardDetailInfo: initData.rewardDetailInfo,
  rewardComputeInfo: initData.rewardComputeInfo,
  isSaveRewardPassword: false,
  rewardDialogVisible: false,
  productDialogVisible: false,
  bannerInfo: [{
    title: '',
    url: '',
    type: '1',
    image: '',
    order: ''
  }],
  productListInfo: [
    {}
  ]
}

const mutations = {
  changeRewardDialog(state, isShow) {
    state.rewardDialogVisible = isShow
  },
  /**
   * 是否保存二级密码
   * @param state
   * @param isSave
   */
  saveRewardPassword(state, isSave) {
    state.isSaveRewardPassword = isSave
  },
  saveAdminInfo(state, adminInfo) {
    state.adminInfo = adminInfo;
  },

  setGoodsTabIndex(state, index) { //商品更换tab时的状态
    state.goodsInfo.activeIndex = index;
  },
  saveGoodsTable(state, tableInfo) { //保存 商品列表信息
    state.goodsInfo.allTableData = tableInfo;
    // state.goodsInfo.currentPage = 1
    state.goodsInfo.tableData = vm.$_.chunk(tableInfo, state.goodsInfo.limit)[state.goodsInfo.currentPage - 1]
  },
  changeGoodsList(state, val) { //商品分页、每页的数量改变数据
    state.goodsInfo.tableData = vm.$_.chunk(state.goodsInfo.allTableData, state.goodsInfo.limit)[val - 1]
  },
  saveLoginInfo(state, val) { //登录信息
    state.loginInfo = val;
  },
  //商品管理
  saveEditGoods(state, val) { //保存编辑商品的信息
    // return false
    let curArr1 = [] //主图数组
    let curArr2 = []  //详情图数组
    // curArr1.push({name: '1', url: `${baseImgPath}CommodityImages/${val.primary}`}) //拼接主图路径
    val.primary.forEach((item, index) => {
      curArr1.push({name: `${index + 1}`, url: `${baseImgPath}CommodityImages/${item}`}) //拼接主图路径
    })
    state.editGoodsInfo.mainImgArr = curArr1
    state.editGoodsInfo.mainImg = val.primary + ','

    let deArr = val.ImageUrl //后台返回的详情图数组
    for (let item of deArr) { //拼接详情图路径
      curArr2.push({
        name: '1', url: `${baseImgPath}CommodityImages/${item}`
      })
    }
    let {productDetails} = val
    if (productDetails.moduleNumber == 1) { //设置是否是代理商品1是代理商品2不是代理商品
      productDetails.moduleNumber = true
    } else {
      productDetails.moduleNumber = false
    }

    if (productDetails.productType == 2) { //判断商品名称类型1实物商品2计次商品
      productDetails.productType = false
    } else {
      productDetails.productType = true
    }
    state.editGoodsInfo.formDatas = productDetails
    state.editGoodsInfo.detailImgArr = curArr2
    state.editGoodsInfo.productId = val.productId
    state.editGoodsInfo.detailImg = deArr.join(',') //预设详情图字符串后面提交使用
    state.editGoodsInfo.formDatas.moduleNumber = productDetails.moduleNumber
  },
  /**
   *
   * @param state
   * @param res上传主图成功返回的数据
   */
  goodImgSuccess(state, res) { //商品编辑主图上传成功回调
    state.editGoodsInfo.mainImg = state.editGoodsInfo.detailImg + ',' + res.imagesName
  },
  /**
   *
   * @param state
   * @param res上传详情图成功返回的数据
   */
  goodDetailSuccess(state, res) { //详情图上传成功回调
    if (state.editGoodsInfo.detailImg != '') {
      state.editGoodsInfo.detailImg = state.editGoodsInfo.detailImg + ',' + res.imagesName
    } else {
      state.editGoodsInfo.detailImg = res.imagesName
    }
  },
  removeEGoodsM(state, index) {//删除主图的回调
    let mainImg = state.editGoodsInfo.mainImg
    let arr = mainImg.split(',')
    arr.splice(index, 1)
    state.editGoodsInfo.mainImg = arr.join(',')
  },
  /**
   *删除详情图回调
   * @param state
   * @param index要删除的下标
   */
  removeEGoodsD(state, index) {
    let detailImg = state.editGoodsInfo.detailImg
    let arr = detailImg.split(',')
    arr.splice(index, 1)
    state.editGoodsInfo.detailImg = arr.join(',')
  },
  //代理商
  saveAgentInfo(state, res) { //保存代理商信息
    state.agentInfo.count = res.count
    state.agentInfo.tableData = res.result
  },
  changeAgentList(state, params) {//代理商分页及每页显示数变化
    if (params.val) {
      state.agentInfo.page = params.val
    }
    if (params.limit) {
      state.agentInfo.pageSize = params.limit
    }

  },
  saveUpdateAgentInfo(state, params) {
    vm.$set(state.agentInfo.tableData[params.index], 'status', params.status)
  }, //更新保存代理商状态
  /**
   *  编辑中的代理商信息保存
   * @param state
   * @param val ->{user_id,res}
   */
  saveEditAgent(state, val) {
    let result = val.result[0]
    if (vm.$_.isEmpty(result)) {
      state.editAgentInfo.formDatas = initData.editAgentInfo
      return false
    }
    state.editAgentInfo.formDatas = result
    let options = val.addressList
    for (let item of options) {
      item.info = `姓名：${item.receive_name} 电话：${item.receive_phone} 地址：${item.province} ${item.city} ${item.area} ${item.street}`
    }
    state.editAgentInfo.addressList = options
    if (!vm.$_.isEmpty(options)) {
      state.editAgentInfo.address_id = options[0].address_id
    }
    state.editAgentInfo.formDatas.type = state.editAgentInfo.formDatas.user_type
    state.editAgentInfo.formDatas.user_id = val.user_id
    state.editAgentInfo.formDatas.moneySpent = 0
    let {user_type} = state.editAgentInfo.formDatas
    user_type = version != "new2" ? computeUserType({user_type, num: false}) : computeUserType2({user_type, num: false}) //转化user_type
    state.editAgentInfo.formDatas.user_type = user_type
    if (result.address) {
      state.editAgentInfo.range.province = result.address.split(',')[0]
      state.editAgentInfo.range.city = result.address.split(',')[1]
      state.editAgentInfo.range.area = result.address.split(',')[2]
    }

  },
  /**
   * 代理商编辑地址改变回调
   * @param state
   * @param val 地址对象
   */
  changeAgentAddress(state, val) {
    state.editAgentInfo.formDatas.address = `${val.province.value},${val.city.value},${val.area.value}`
  },
  //财务报表
  saveFinal(state, res) {//保存财务报表信息
    state.finalInfo.allTableData = res.result
    state.finalInfo.tableData = vm.$_.chunk(res.result, state.finalInfo.limit)[state.finalInfo.currentPage - 1]
    if (res.sum) {
      state.finalInfo.sum = {...res.sum[0], ...res.sum[1]}
    }
  },
  /**
   * 财务报表信息排序
   * @param state
   * @param params ->asc正序 desc倒叙
   */
  finalInfoSort(state, params) {
    let {key} = params
    if (params.asc) {
      // state.finalInfo.tableData = vm.$_.sortBy(state.finalInfo.tableData, [o => o[key]])
      state.finalInfo.allTableData = vm.$_.sortBy(state.finalInfo.allTableData, [o => o[key]])
    }
    if (params.desc) {
      // state.finalInfo.tableData = vm.$_.reverse(vm.$_.sortBy(state.finalInfo.tableData, [o => o[key]]))
      state.finalInfo.allTableData = vm.$_.reverse(vm.$_.sortBy(state.finalInfo.allTableData, [o => o[key]]))
    }
  },
  /**
   * 财务统计排序
   * @param state
   * @param params
   */
  finalCountInfoSort(state, params) {
    let {key} = params
    if (params.asc) {
      state.finalCountInfo.tableData = vm.$_.sortBy(state.finalCountInfo.tableData, [o => o[key]])
    }
    if (params.desc) {
      state.finalCountInfo.tableData = vm.$_.reverse(vm.$_.sortBy(state.finalCountInfo.tableData, [o => o[key]]))
    }
  },
  /**
   * 订单统计排序
   * @param state
   * @param params
   */
  orderCountInfoSort(state, params) {
    let {key} = params
    if (params.asc) {
      state.orderCountInfo.tableData = vm.$_.sortBy(state.orderCountInfo.tableData, [o => o[key]])
    }
    if (params.desc) {
      state.orderCountInfo.tableData = vm.$_.reverse(vm.$_.sortBy(state.orderCountInfo.tableData, [o => o[key]]))
    }
  },
  /**
   *  财务报表每页显示数和页码变化回调
   * @param state
   * @param params -> val当前页面 limit每页显示条数
   */
  changeFinalList(state, params) {
    if (params.val) {
      state.finalInfo.tableData = vm.$_.chunk(state.finalInfo.allTableData, state.finalInfo.limit)[params.val - 1]
    }
    if (params.limit) {
      state.finalInfo.limit = params.limit
      state.finalInfo.tableData = vm.$_.chunk(state.finalInfo.allTableData, params.limit)[0]
      state.finalInfo.currentPage = 1
    }
  },
  //财务统计
  /**
   * 财务统计列表数据
   * @param state
   * @param val 请求返回的数据res
   */
  saveFinalCountInfo(state, val) {
    for (let item of val.userData) {
      item.time = new Date(item.time).format('yyyy-MM-dd')
    }
    // state.finalCountInfo.allTableData = val.userData
    state.finalCountInfo.tableData = val.userData
    // state.finalCountInfo.tableData = vm.$_.chunk(val.userData, state.finalCountInfo.limit)[state.finalCountInfo.currentPage - 1]
    state.finalCountInfo.thData = val
  },
  /**
   * 财务统计每页数和页码变化
   * @param state
   * @param params
   */
  finalCountCurPageChange(state, params) {
    if (params.val) {
      // state.finalCountInfo.tableData = vm.$_.chunk(state.finalCountInfo.allTableData, state.finalCountInfo.limit)[params.val - 1]
      state.finalCountInfo.page = params.val
    }
    if (params.limit) {
      state.finalCountInfo.pageSize = params.limit
      // state.finalCountInfo.tableData = vm.$_.chunk(state.finalCountInfo.allTableData, params.limit)[0]
      state.finalCountInfo.page = 1
    }
  },
  //订单统计
  saveOrderCountInfo(state, val) { // 订单统计列表
    state.orderCountInfo.allTableData = val.productList
    state.orderCountInfo.tableData = vm.$_.chunk(val.productList, state.orderCountInfo.limit)[state.orderCountInfo.currentPage - 1]
    state.orderCountInfo.orderSum = val.orderSum
    state.orderCountInfo.sumPayMoney = val.sumPayMoney
    state.orderCountInfo.sumMarketPrice = val.sumMarketPrice
    state.orderCountInfo.sumPrimePrice = val.sumPrimePrice
    state.orderCountInfo.status2OrderSum = val.status2OrderSum
    state.orderCountInfo.status3OrderSum = val.status3OrderSum
  },
  orderCountCurPageChange(state, params) { //订单每页数和页码数变化
    if (params.val) { //当前页码
      state.orderCountInfo.tableData = vm.$_.chunk(state.orderCountInfo.allTableData, state.orderCountInfo.limit)[params.val - 1]
    }
    if (params.limit) {
      state.orderCountInfo.limit = params.limit
      state.orderCountInfo.tableData = vm.$_.chunk(state.orderCountInfo.allTableData, params.limit)[0]
      state.orderCountInfo.currentPage = 1
    }
  },
  savePayTypeCountInfo(state, val) {
    state.payTypeCountInfo.resData = val
    state.payTypeCountInfo.allTableData = val.list
    for (let item of val.list) {
      if (item.payWay == 1) {
        item.payWay = '支付宝'
      }
      if (item.payWay == 2) {
        item.payWay = '账户支付'
      }
      if (item.payWay == 3) {
        item.payWay = '微信'
      }
    }
    state.payTypeCountInfo.tableData = vm.$_.chunk(val.list, state.payTypeCountInfo.limit)[0]
    state.payTypeCountInfo.currentPage = 1
  },
  payTypeCountCurPageChange(state, params) {
    if (params.val) {
      state.payTypeCountInfo.tableData = vm.$_.chunk(state.payTypeCountInfo.allTableData, state.payTypeCountInfo.limit)[params.val - 1]
    }
    if (params.limit) {
      state.payTypeCountInfo.limit = params.limit
      state.payTypeCountInfo.tableData = vm.$_.chunk(state.payTypeCountInfo.allTableData, params.limit)[0]
      state.payTypeCountInfo.currentPage = 1
    }
  },
  /**
   * 消息列表
   * @param state
   * @param res list 消息列表
   */
  saveNewsListInfo(state, res) {
    for (let item of res) {
      item.create_time = new Date(item.create_time).format('yyyy-MM-dd h:mm:ss')
    }
    state.newsListInfo.allTableData = res
    state.newsListInfo.tableData = vm.$_.chunk(res, state.newsListInfo.limit)[state.newsListInfo.currentPage - 1]
  },
  newsListPageChange(state, params) {
    if (params.currentPage) { //当前页码
      state.newsListInfo.tableData = vm.$_.chunk(state.newsListInfo.allTableData, state.newsListInfo.limit)[params.currentPage - 1]
    }
    if (params.limit) {
      state.newsListInfo.limit = params.limit
      state.newsListInfo.tableData = vm.$_.chunk(state.newsListInfo.allTableData, params.limit)[0]
      state.newsListInfo.currentPage = 1
    }
  },
  deleteNewsListInfo(state, params) {
    state.newsListInfo.tableData = state.newsListInfo.tableData.filter(item => item.notice_id != params)
  },
  saveGoodsSortList(state, res) {
    for (let item of res.result) {
      item.imgArr = []
      item.imgArr.push({name: item.img_url, url: `${baseImgPath}CommodityImages/${item.img_url}`})
    }
    state.editGoodsInfo.goodsSortList = res.result
  },
  addGoodsSortList(state) {
    let info = state.editGoodsInfo.goodsSortList
    info.push({
      categoryname: '',
      order: '',
      img_url: '',
      desc: '',
    })
    state.editGoodsInfo.goodsSortList = info
  },
  removeGoodsSortList(state, index) {
    state.editGoodsInfo.goodsSortList.splice(index, 1)
  },
  goodsSortImgSuccess(state, {index, img_url}) {
    let list = state.editGoodsInfo.goodsSortList
    list[index * 1].img_url = img_url
    for (let item of list) {
      item.imgArr = []
      item.imgArr.push({name: item.img_url, url: `${baseImgPath}CommodityImages/${item.img_url}`})
    }
    state.editGoodsInfo.goodsSortList = list
  },
  removeGoodsSortImg(state, index) {
    state.editGoodsInfo.goodsSortList[index * 1].imgArr = []
  },
  addBannerList(state) {
    let info = state.bannerInfo
    info.push({
      title: '',
      url: '',
      type: '',
      image: '',
      order: '',
    })
    state.bannerInfo = info
  },
  saveBannerManageList(state, res) {
    for (let item of res.result) {
      item.imgArr = []
      item.imgArr.push({name: item.image, url: `${baseImgPath}CommodityImages/${item.image}`})
    }
    state.bannerInfo = res.result
  },
  removeBannerList(state, index) {
    state.bannerInfo.splice(index, 1)
  },
  bannerImgSuccess(state, {index, img_url}) {
    state.bannerInfo[index * 1].image = img_url
    let list = state.bannerInfo
    for (let item of list) {
      item.imgArr = []
      item.imgArr.push({name: item.image, url: `${baseImgPath}CommodityImages/${item.image}`})
    }
    state.bannerInfo = list
  },
  removeBannerListImg(state, index) {
    state.bannerInfo[index * 1].imgArr = []
  },
  saveRewardInfo(state, res) {
    state.rewardDetailInfo.tableData = res.list
    state.rewardDetailInfo.countSum = res.countSum
  },
  rewardTabChange(state) {
    state.rewardDetailInfo.page = 1
  },
  rewardDetailPageChange(state, params) {
    if (params.page) {
      state.rewardDetailInfo.page = params.page
    }
    if (params.pageSize) {
      state.rewardDetailInfo.pageSize = params.pageSize
    }
  },
  /**
   *
   * @param state
   * @param res 计算上级奖金返回的结果
   */
  saveComputeRewardInfo(state, res) {
    if (vm.$_.isEmpty(res.li) && vm.$_.isEmpty(res.list)) {
      return false
    }
    state.rewardComputeInfo.allTableData = version != "new2" ? [...res.li, ...res.list] : res.list
    state.rewardComputeInfo.tableData2 = [{
      ...res.user,
      integrals: res.integrals,
      agencyMoney: res.agencyMoney,
      hint: res.hint || ""
    }]
    state.rewardComputeInfo.tableData2[0].user_type = version != "new2" ? computeUserType({
      num: false,
      user_type: state.rewardComputeInfo.tableData2[0].user_type
    }) : computeUserType2({
      num: false,
      user_type: state.rewardComputeInfo.tableData2[0].user_type
    })
    state.rewardComputeInfo.allTableData = version != "new2" ? state.rewardComputeInfo.allTableData.map(item => {
      item.user_type = computeUserType({user_type: item.user_type, num: false})
      return item
    }) : state.rewardComputeInfo.allTableData.map(item => {
      item.user_type = computeUserType2({user_type: item.user_type, num: false})
      return item
    })
    state.rewardComputeInfo.tableData = vm.$_.chunk(state.rewardComputeInfo.allTableData, state.rewardComputeInfo.pageSize)[state.rewardComputeInfo.page - 1]
  },
  /**
   * 计算奖金列表分页变化
   * @param state
   * @param params page 当前页码 pageSize每页的显示数量
   */
  computeRewardPageChange(state, params) {
    if (params.page) {
      state.rewardComputeInfo.tableData = vm.$_.chunk(state.rewardComputeInfo.allTableData, state.rewardComputeInfo.pageSize)[params.page - 1]
    }
    if (params.pageSize) {
      state.rewardComputeInfo.pageSize = params.pageSize
      state.rewardComputeInfo.tableData = vm.$_.chunk(state.rewardComputeInfo.allTableData, params.pageSize)[0]
      state.rewardComputeInfo.page = 1
    }
  },
  /*
  初始化计算奖金列表
   */
  initComputeRewardData(state) {
    state.rewardComputeInfo.page = 1
    state.rewardComputeInfo.pageSize = 10
    state.rewardComputeInfo.allTableData = []
    state.rewardComputeInfo.tableData = []
  },
  saveProductList(state, res) {
    state.productDialogVisible = true
    let list = res.AgencyList
    for (let item of list) {
      item.checked = false
      item.image = `${baseImgPath}CommodityImages/${item.image}`
      item.currentNum = 1
    }
    state.productListInfo = list
  }
}
/**
 * getter
 * @type {{finalInfo: (function(*): *)}}
 */
const getters = {
  finalInfoTableData: state => {
    return vm.$_.chunk(state.finalInfo.allTableData, state.finalInfo.limit)[state.finalInfo.currentPage - 1]
  }
}
const actions = {

  async getAdminInfo({commit}, params) {
    let res = await getAdminData(params)
    try {
      commit('saveAdminInfo', res);
    } catch (e) {
      throw new Error(e)
    }
  },
  async toLogin({commit}, data) {

    await login(data)
      .done(res => {
        if (res.success) {
          setStore('token', res.token)
          vm.$message({
            message: '登录成功！',
            type: 'success'
          });
          commit('saveLoginInfo', res);
        } else {
          vm.$message.error(`登录失败!`)
        }
      })
  },
  //商品管理
  async goodsList({commit}, data) {
    await getGoodsList(data)
      .done(res => {
        let val = res.productList
        for (let item of val) {
          item.image = `${baseImgPath}CommodityImages/${item.image}`
          if (item.points) {
            item.points = `${item.points.substr(0, 15)}...`
          }
        }
        val = val.filter(item => item.status != 3)
        commit('saveGoodsTable', val);
      })
  },
  //编辑商品
  async getEditGood({commit}, data) {
    await getGoodsDetail(data)
      .done(res => {
        commit('saveEditGoods', {...res, ...data});
      })
  },
  //查询商品分类列表
  async getGoodsSortList({commit}) {
    await selectCategory()
      .done(res => {
        commit('saveGoodsSortList', res)
      })
  },
  async getBannerManageList({commit}) {
    await getBroadcast()
      .done(res => {
        commit('saveBannerManageList', res)
      })
  },
  //代理商
  async getAgentList({commit}, params) {
    await getAgent(params)
      .done(res => {
        if (res.message == 'success') {
          commit('saveAgentInfo', res);
        }
      })
  },  //获取代理商列表
  async getAgentListByQuery({commit}, data) {

    await getAgentByParams(data)
      .done(res => {
        if (res.message == 'success') {
          commit('saveAgentInfo', res);
        }
      })
  }, //根据条件查询代理商
  async upDateAgentInfo({commit}, params) {
    await updateUserStatus({user_id: params.user_id, status: params.status})
      .done(res => {
        if (res.message == 'success') {
          commit('saveUpdateAgentInfo', params);
          vm.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
  }, //修改代理商状态
  async getEditAgent({commit}, {user_id}) {
    await getAgentById({user_id})
      .done(res => {
        commit('saveEditAgent', {...res, user_id});
      })
  }, //获取编辑代理商的信息
  //财务报表
  async getFinalList({commit}) {
    await getFinacial()
      .done(res => {
        commit('saveFinal', res);
      })
  }, //获取财务报表列表
  async getFinalListByQuery({commit}, data) {
    await getFinalByParams(data)
      .done(res => {
        if (res.message == 'success') {
          commit('saveFinal', res);
        }
      })
  }, //根据条件查询财务报表
  //财务统计
  async getFinalCountList({commit}, data) {
    await byTimeSelectCashData(data)
      .done(res => {
        commit('saveFinalCountInfo', res);
      })
  },
  //订单统计
  async getOrderCountList({commit}, data) {
    await byTimeSelectOrderData(data)
      .done(res => {
        commit('saveOrderCountInfo', res);
      })
  },
  //支付方式统计
  async getPayTypeCountList({commit}, data) {
    await payCount(data)
      .done(res => {
        commit('savePayTypeCountInfo', res);
      })
  },
  //获取消息列表
  async getNewsList({commit}, data) {
    await getNoticeList()
      .done(res => {
        commit('saveNewsListInfo', res.list);
      })
  },
//删除消息列表
  async deleteNoticeData({commit}, data) {
    let res = await deleteNoticeData(data)
    if (res.success == true) {
      vm.$message({
        type: 'success',
        message: '删除成功'
      })
      commit('deleteNewsListInfo', data.notice_id);
    }
  },
  async getRewardDetail({commit}, params) {
    let res = await getUserAccount(params)
    if (res.code == '000') {
      commit('saveRewardInfo', res);
    }
  },
  /**
   *
   * @param commit
   * @param params userId
   * @returns {Promise<void>}
   */
  async getComputeReward({commit}, params) {
    let res = await countUpperBonus(params)
    if (res.code == "104") {
      vm.$message.error("该用户上级不存在或等级为0")
      return
    }
    commit('saveComputeRewardInfo', res);
    commit('changeRewardDialog', true);
    params.insert_time = new Date().format("yyyy-MM-dd HH:mm:ss")
    let curArr = localStorage.getItem("historyReward") || []
    if (typeof curArr == "string") {
      curArr = JSON.parse(curArr)
    }
    curArr.push(params)
    window.localStorage.setItem("historyReward", JSON.stringify(curArr))
  },
  /**
   * 保存下级代理商信息
   * @param commit
   * @param params -> page pageSize userID 当前页码 每页数量 用户ID
   * @returns {Promise<void>}
   */
  async getAgentDownInfo({commit}, params) {
    let res = await getSubordinateListAndMarket(params)
    commit('saveAgentInfo', res);
  },

  async getProductList({commit}) {
    let res = await productList()
    commit('saveProductList', res);
  },

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
