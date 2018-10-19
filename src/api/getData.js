import ajax from '../config/ajax'

/**
 * 获取用户是否登录
 * @param _token
 * @returns {*|void}
 */

export const getIsLogin = data => ajax('/user/judgeLogin', data, 'POST');

/**
 * 退出
 * @param data->token
 * @returns {*|void}
 */

export const logOut = data => ajax('/user/logOut', data, 'POST');

/**
 * 获取用户信息
 * @param data ->token
 * @returns {*|void}
 */

export const getAdminData = data => ajax('/user/adminData', data, 'POST');


/**
 * 登录
 * @param data ->phone  password
 * @returns {*|void}
 */

export const login = data => ajax('/user/api/login', data, 'POST'); //登录

/**
 * 忘记密码->获取手机验证码
 * @param data -> phone
 * @returns {*|void}
 */

export const getPhoneCode = data => ajax('/user/inputPhoneSend.do', data,'POST');

/**
 *  忘记密码->判断验证码是否正确
 * @param data-> phone code
 * @returns {*|void}
 */

export const isCodeTrue = data => ajax('/user/judgeerificationCode.do', data, 'POST');

/**
 * 忘记密码->修改登录密码
 * @param data-> affirmPassword newpassword phone
 * @returns {*|void}
 */

export const modifyPassword = data => ajax('/user/retrievePassword', data, 'POST');

/**
 * 设置->修改密码->获取手机验证码
 * @param data ->phone token
 * @returns {*|void}
 */

export const getSetUpPhoneCode = data => ajax('/user/selectPhoneSend.do', data,'POST');

/**
 * 设置->修改密码->修改登录密码
 * @param data ->newpassword affirmPassword token code phone
 * @returns {*|void}
 */

export const setUpModifyPassword = data => ajax('/user/updatePassword.do', data,'POST');

/**
 *
 * @param data 获取所有账户资金
 * @returns {*|void}
 */

export const getAllCountMoney = _ => ajax('/funds/api/fund');

/**
 *获取财务报表
 * @param _
 * @returns {*|void}
 */

export const getFinacial = _ => ajax('/funds/api/finance');

/**
 * 提现申请
 * @param _
 * @returns {*|void}
 */

export const getCashApply = data => ajax('/funds/api/withdrawDeposit',data,'POST');

/**
 * 拒绝提现申请
 * @param data-> excuse
 * @returns {*|void}
 */

export const refuseCash = data => ajax('/funds/api/refuse',data,'POST');

/**
 * 同意提现申请
 * @param data cash_id
 * @returns {*|void}
 */

export const agreeCash = data => ajax('/funds/api/adoptStatus',data,'POST');

/**
 * 获取代理商管理
 * @param _
 * @returns {*|void}
 */

export const getAgent = data => ajax('/user/api/agent',data,'POST');

/**
 * 账户资金查询
 * @param data ->requirement
 * @returns {*|void}
 */

export const getCountMoneyByParams = data => ajax('/funds/api/fund',data,'POST');

/**
 * 财务报表查询
 * @param data-> requirement
 * @returns {*|void}
 */

export const getFinalByParams = data => ajax('/funds/api/finance',data,'POST');

/**
 * 代理商查询
 * @param data ->requirement
 * @returns {*|void}
 */

export const getAgentByParams = data => ajax('/user/api/agent',data,'POST');

/**
 * 更改代理商状态
 * @param data
 * @returns {*|void}
 */

export const updateUserStatus = data => ajax('/user/api/upddateUserStatus',data,'POST');

/**
 * 获取首页数据
 * @param _
 * @returns {*|void}
 */

export const getHomeData = _ => ajax('/homePage/diagram');

/**
 *发布消息
 * @param data ->notice_title notice_content token
 * @returns {*|void}
 */

export const publicNews = data => ajax('/notice/addNotice',data,'POST');

/**
 * 根据user_id查找代理商信息
 * @param data->user_id
 * @returns {*|void}
 */

export const getAgentById = data => ajax('/user/api/selectUserById',data,'POST');


/**
 * 编辑代理商信息
 * @param data->realName
 rate iDnumber address user_type extend consume agora help subsidy
 * @returns {*|void}
 */

export const editAgent = data => ajax('/user/api/updateUserAndAcc',data,'POST');

/**
 * 新增代理商
 * @param data->address upperPhone user_type realName sex phone password
 * @returns {*|void}
 */

export const addAgent = data => ajax('/user/api/insertUser',data,'POST');

/**
 * 获取商品列表
 * @param _
 * @returns {*|void}
 */

export const getGoodsList = data => ajax('/product/selectAllProduct',data,'POST');

/**
 *商品下架
 * @param data->productId
 * @returns {*|void}
 */

export const soldOutProduct = data => ajax('/product/soldOutProduct',data,'POST');

/**
 * 商品删除
 * @param data->productId
 * @returns {*|void}
 */

export const deleteProduct = data => ajax('/product/deleteProduct',data,'POST');

/**
 * 添加商品
 * @param data->moduleNumber,productName,stockNum,primePrice,productPrice,ProductImages,points
 * @returns {*|void}
 */

export const addGoods = data => ajax('/product/addProductdata',data,'POST');

/**
 * 获取商品详情
 * @param data->productId
 * @returns {*|void}
 */


export const getGoodsDetail = data => ajax('/product/productDetails',data,'POST');

/**
 * 编辑商品
 * @param data->moduleNumber,productName,stockNum,primePrice,productPrice,ProductImages,points
 * @returns {*|void}
 */

export const editGoods = data => ajax('/product/updateProductData',data,'POST');

/**
 * 获取权限列表
 * @param _
 * @returns {*|void}
 */

export const getFunction = _ => ajax('/user/api/getFunction');

/**
 * 设置权限
 * @param data
 * @returns {*|void}
 */

export const authority = data=> ajax('/user/api/authority',data,'POST');

/**
 * 查询订单信息
 * @param data->startDatetime endDatetime status
 * @returns {*|void}
 */

export const getOrderListByStatus = data=> ajax('/order/getOrderListByStatus',data,'POST');

/**
 * 改变订单状态
 * @param data->orderId status
 * @returns {*|void}
 */

export const updateOrderById = data=> ajax('/order/updateOrderById',data,'POST');

/**
 * 修改代理商的基本信息
 * @param data->user_id realName address IDnumber
 * @returns {*|void}
 */

export const updateUserData = data=> ajax('/user/api/updateUserData',data,'POST');

/**
 * 改变代理商状态(财务)
 * @param data
 * @returns {*|void}
 */

export const updateUserFinanceData = data=> ajax('/user/api/updateUserFinanceData',data,'POST');

/**
 * 财务统计列表
 * @param data -> time1 tiem2
 * @returns {*|void}
 */

export const byTimeSelectCashData = data=> ajax('/funds/api/byTimeSelectCashData',data,'POST');

/**
 * 支付统计
 * @param data->statime endtime type
 * @returns {*|void}
 */

export const payCount = data=> ajax('/funds/api/payCount',data,'POST');

/**
 * 订单统计
 * @param data ->time1 tiem2
 * @returns {*|void}
 */

export const byTimeSelectOrderData = data=> ajax('/funds/api/byTimeSelectOrderData',data,'POST');

/**
 * 查询区域代理申请
 * @param data time1 time2
 * @returns {*|void}
 */

export const selectAgencyApplyForList = data=> ajax('/ApplicationForm/selectAgencyApplyForList',data,'POST');

/**
 *是否同意申请区域代理
 * @param data ->id state
 * @returns {*|void}
 */

export const updateAgencyApplyForState = data=> ajax('/ApplicationForm/updateAgencyApplyForState',data,'POST');

/**
 * 修改代理费是否交
 * @param data->id  state
 * @returns {*|void}
 */

export const updateAgencyApplyForAgencyMoney = data=> ajax('/ApplicationForm/updateAgencyApplyForAgencyMoney',data,'POST');

/**
 *门店状态修改
 * @param data->store_id status
 * @returns {*|void}
 */

export const updateStoreStatus = data=> ajax('/store/api/updateStoreStatus',data,'POST');

/**
 * 门店申请列表
 * @param data time1 time2
 * @returns {*|void}
 */

export const selectStoreList = data=> ajax('/store/api/selectStoreList',data,'POST');

/**
 * 删除提现申请
 * @param data ->cash_id
 * @returns {*|void}
 */

export const deleteCashRecord = data=> ajax('/funds/api/deleteCashRecord',data,'POST');

/**
 * 区域申请删除
 * @param data->id
 * @returns {*|void}
 */

export const deleteApplicationFormDate = data=> ajax('/ApplicationForm/deleteApplicationFormDate',data,'POST');

/**
 * 删除门店申请
 * @param data->store_id
 * @returns {*|void}
 */

export const deleteStoreData = data=> ajax('/store/api/deleteStoreData',data,'POST');

/**
 * 已发布消息列表
 * @param _
 * @returns {*|void}
 */

export const getNoticeList = _=> ajax('/notice/getNoticeList',{},'POST');

/**
 * 删除消息列表by  notice_id
 * @param data ->notice_id
 * @returns {*|void}
 */

export const deleteNoticeData = data=> ajax('/notice/deleteNoticeData',data,'POST');

/**
 * 添加发货人信息
 * @param data->token province city area street receive_name receive_phone
 * @returns {*|void}
 */

export const addDispatchUserInfo = data=> ajax('/address/addAddress',data,'POST');

/**
 * 物流查询
 * @param data->identifier
 * @returns {*|void}
 */

export const queryLogistics = data=> ajax('/order/queryLogistics',data,'POST');

/**
 * 删除订单
 * @param data->orderId
 * @returns {*|void}
 */

export const adminDeleteOrder = data=> ajax('/order/adminDeleteOrder',data,'POST');

/**
 * 查询商品分类列表
 * @param data
 * @returns {*|void}
 */

export const selectCategory = data=> ajax('/product/selectCategory',{},'POST');

/**
 * 修改商品分类
 * @param data->category_id
 * @returns {*|void}
 */

export const updateCategory = data=> ajax('/product/updateCategory',data,'POST');

/**
 * 删除商品类
 * @param data->category_id
 * @returns {*|void}
 */

export const deleteCategory = data=> ajax('/product/deleteCategory',data,'POST');

/**
 * 查询个人奖金明细
 * @param data->pageSize page user_id
 * @returns {*|void}
 */

export const getUserAccount = data=> ajax('/user/api/getUserAccount',data,'POST');

/**
 * 计算上级奖金
 * @param data->userId
 * @returns {*|void}
 */

export const countUpperBonus = data=> ajax('/funds/api/countUpperBonus',data,'POST');

/**
 *获取代理商下级信息
 * @param data ->userId,pageSize,page,
 * @returns {*|void}
 */

export const getSubordinateListAndMarket = data=> ajax('/user/api/getSubordinateListAndMarket',data,'POST');

/**
 * 线下订单
 * @param data->time1,time2,pageSize,page,
 * @returns {*|void}
 */

export const selectTurnoverList = data=> ajax('/user/api/selectTurnoverList',data,'POST');


/**
 *获取轮播图列表
 * @param _
 * @returns {*|void}
 */

export const getBroadcast = _=> ajax('/broadcast/api/getBroadcast',{},'POST');

/**
 * 删除获取轮播
 * @param data
 * @returns {*|void}
 */

export const delBroadcast =data=> ajax('/broadcast/api/delBroadcast',data,'POST');

/**
 * 更新轮播
 * @param data
 * @returns {*|void}
 */

export const updateOrInsertBroadcast =data=> ajax('/broadcast/api/updateOrInsertBroadcast',data,'POST');

/**
 * 获取代理上级的商品列表
 * @param _
 * @returns {*|void}
 */

export const productList = _=> ajax('/product/productList',{},'POST');

/**
 * 完善代理商收货地址信息
 * @param data
 * @returns {*|void}
 */

export const adminAddAddress = data=> ajax('/address/adminAddAddress',data,'POST');

/**
 * 控制代人升级显示
 * @param data
 * @returns {*|void}
 */

export const updateHelpUpgradeFunction = data=> ajax('/user/api/updateHelpUpgradeFunction',data,'POST');

/**
 * 添加门店申请
 * @param data
 * @returns {*|void}
 */

export const adminAddStore = data=> ajax('/store/api/adminAddStore',data,'POST');

/**
 * 获取分红列表
 * @param data
 * @returns {*|void}
 */

export const statisticsShareBonus = data=> ajax('/funds/api/statisticsShareBonus',data,'POST');

/**
 * 计算分红
 * @param data
 * @returns {*|void}
 */

export const countShareBonus = data=> ajax('/funds/api/countShareBonus',data,'POST');




