import Vue from 'vue'
import Router from 'vue-router'
import {getStore} from "../config/mUtils";


Vue.use(Router)

const vm = new Vue();

const Login = r => require.ensure([], () => r(require('../page/Login')), 'Login');
const Manage = r => require.ensure([], () => r(require('../page/Manage')), 'Manage');
const Home = r => require.ensure([], () => r(require('../page/Home')), 'Home');
const Money = r => require.ensure([], () => r(require('../page/Money')), 'Money');
const Financial = r => require.ensure([], () => r(require('../page/Financial')), 'Financial');
const Cash = r => require.ensure([], () => r(require('../page/Cash')), 'Cash');
const Goods = r => require.ensure([], () => r(require('../page/Goods')), 'Goods');
const EditGoods = r => require.ensure([], () => r(require('../page/EditGoods')), 'EditGoods');
const PublishGoods = r => require.ensure([], () => r(require('../page/PublishGoods')), 'PublishGoods');
const OrderManage = r => require.ensure([], () => r(require('../page/OrderManage')), 'OrderManage');
const AgentManage = r => require.ensure([], () => r(require('../page/AgentManage')), 'AgentManage');
const AddAgent = r => require.ensure([], () => r(require('../page/AddAgent')), 'AddAgent');
const EditAgent = r => require.ensure([], () => r(require('../page/EditAgent')), 'EditAgent');
const PublishNews = r => require.ensure([], () => r(require('../page/PublishNews')), 'PublishNews');
const SetUp = r => require.ensure([], () => r(require('../page/SetUp')), 'SetUp');
const SetUpPermission = r => require.ensure([], () => r(require('../page/SetUpPermission')), 'SetUpPermission');
const FinalCount = r => require.ensure([], () => r(require('../page/FinalCount')), 'FinalCount');
const OrderCount = r => require.ensure([], () => r(require('../page/OrderCount')), 'OrderCount');
const PayTypeCount = r => require.ensure([], () => r(require('../page/PayTypeCount')), 'PayTypeCount');
const RangeApply = r => require.ensure([], () => r(require('../page/RangeApply')), 'RangeApply');
const StoreApply = r => require.ensure([], () => r(require('../page/StoreApply')), 'StoreApply');
const NewsList = r => require.ensure([], () => r(require('../page/NewsList')), 'NewsList');
const GoodsSort = r => require.ensure([], () => r(require('../page/GoodsSort')), 'GoodsSort');
const RewardDetail = r => require.ensure([], () => r(require('../page/RewardDetail')), 'RewardDetail');
const UnderLineOrder = r => require.ensure([], () => r(require('../page/UnderLineOrder')), 'UnderLineOrder');
const BannerManage = r => require.ensure([], () => r(require('../page/BannerManage')), 'BannerManage');
const ShareOutBonus = r => require.ensure([], () => r(require('../page/ShareOutBonus')), 'ShareOutBonus');
const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/manage',
      component: Manage,
      children: [{
        path: '',
        component: Home,
        meta: {
          routeList: []
        },
      },
        {
          path: '/money',
          name: 'Money',
          component: Money,
          meta: {
            routeList: [
              {
                path: '/money',
                name: '账户资金'
              }
            ]
          }
        },
        {
          path: '/reward_detail',
          name: 'RewardDetail',
          component: RewardDetail,
          meta: {
            routeList: [
              {
                path: '/fd',
                name: '财务报表'
              },{
                path: '/reward_detail',
                name: '奖金明细'
              }
            ]
          },
        },{
          path: '/share_out_bonus',
          name: 'ShareOutBonus',
          component: ShareOutBonus,
          meta: {
            routeList: [
              {
                path: '/fd',
                name: '财务报表'
              },{
                path: '/share_out_bonus',
                name: '分红计算'
              }
            ]
          },
        },
        {
          path: '/fd',
          name: 'Financial',
          component: Financial,
          meta: {
            routeList: [
              {
                path: '/fd',
                name: '财务报表'
              }
            ]
          },
        },
        {
          path: '/final_count',
          name: 'FinalCount',
          component: FinalCount,
          meta: {
            routeList: [
              {
                path: '/fd',
                name: '财务报表'
              }, {
                path: '/final_count',
                name: '财务统计'
              },
            ]
          }
        },
        {
          path: '/order_count',
          name: 'OrderCount',
          component: OrderCount,
          meta: {
            routeList: [
              {
                path: '/fd',
                name: '财务报表'
              }, {
                path: '/order_count',
                name: '订单统计'
              },
            ]
          }
        },
        {
          path: '/pay_type_count',
          name: 'PayTypeCount',
          component: PayTypeCount,
          meta: {
            routeList: [
              {
                path: '/fd',
                name: '财务报表'
              }, {
                path: '/pay_type_count',
                name: '支付统计'
              },
            ]
          }
        },
        {
          path: '/cash',
          name: 'Cash',
          component: Cash,
          meta: {
            routeList: [
              {
                path: '/cash',
                name: '申请提现'
              }
            ]
          }
        },
        {
          path: '/goods',
          name: 'Goods',
          component: Goods,
          meta: {
            routeList: [
              {
                path: '/goods',
                name: '商品管理'
              }
            ]
          }
        },
        {
          path: '/edit_goods',
          name: 'EditGoods',
          component: EditGoods,
          meta: {
            routeList: [
              {
                path: '/goods',
                name: '商品管理'
              },{
                path: '/edit_goods',
                name: '编辑商品'
              },
            ]
          }
        },
        {
          path: '/publish_goods',
          name: 'PublishGoods',
          component: PublishGoods,
          meta: {
            routeList: [
              {
                path: '/goods',
                name: '商品管理'
              },{
                path: '/publish_goods',
                name: '发布商品'
              },
            ]
          }
        },
        {
          path: '/goods_sort',
          name: 'GoodsSort',
          component: GoodsSort,
          meta: {
            routeList: [
              {
                path: '/goods',
                name: '商品管理'
              },{
                path: '/goods_sort',
                name: '分类管理'
              },
            ]
          }
        },
        {
          path: '/banner_manage',
          name: 'BannerManage',
          component: BannerManage,
          meta: {
            routeList: [
              {
                path: '/goods',
                name: '商品管理'
              },{
                path: '/banner_manage',
                name: '轮播图编辑'
              },
            ]
          }
        },
        {
          path: '/order',
          name: 'OrderManage',
          component: OrderManage,
          meta: {
            routeList: [
              {
                path: '/order',
                name: '订单管理'
              }
            ]
          }
        },
        {
          path: '/under_line_order',
          name: 'UnderLineOrder',
          component: UnderLineOrder,
          meta: {
            routeList: [
              {
                path: '/under_line_order',
                name: '线下订单管理'
              }
            ]
          }
        },
        {
          path: '/agent',
          name: 'AgentManage',
          component: AgentManage,
          meta: {
            routeList: [
              {
                path: '/agent',
                name: '代理商管理'
              }
            ]
          }
        },
        {
          path: '/add_agent',
          name: 'AddAgent',
          component: AddAgent,
          meta: {
            routeList: [
              {
                path: '/agent',
                name: '代理商管理'
              }, {
                path: '/add_agent',
                name: '添加代理商'
              },
            ]
          }
        },
        {
          path: '/edit_agent',
          name: 'EditAgent',
          component: EditAgent,
          meta: {
            routeList: [
              {
                path: '/agent',
                name: '代理商管理'
              }, {
                path: '/edit_agent',
                name: '编辑代理商'
              },
            ]
          }
        },
        {
          path: '/range_apply',
          name: 'RangeApply',
          component: RangeApply,
          meta: {
            routeList: [
              {
                path: '/range_apply',
                name: '区域代理申请'
              }
            ]
          }
        },
        {
          path: '/store_apply',
          name: 'StoreApply',
          component: StoreApply,
          meta: {
            routeList: [
              {
                path: '/store_apply',
                name: '门店申请管理'
              }
            ]
          }
        },
        {
          path: '/news',
          name: 'PublishNews',
          component: PublishNews,
          meta: {
            routeList: [
              {
                path: '/news',
                name: '消息发布'
              }
            ]
          }
        },
        {
          path: '/news_list',
          name: 'NewsList',
          component: NewsList,
          meta: {
            routeList: [
              {
                path: '/news',
                name: '消息发布'
              },{
                path: '/news_list',
                name: '消息列表'
              }
            ]
          }
        },
        {
          path: '/set_up',
          name: 'SetUp',
          component: SetUp,
          meta: {
            routeList: [
              {
                path: '/set_up',
                name: '设置'
              }
            ]
          }
        },
        {
          path: '/set_up_permissions',
          name: 'SetUpPermission',
          component: SetUpPermission,
          meta: {
            routeList: [
              {
                path: '/set_up_permissions',
                name: '权限设置'
              }
            ]
          }
        },
      ]
    },
  ]
})

const routeData = [
  ['/manage'],
  ['/money'],
  ['/fd', '/final_count', '/order_count', '/pay_type_count', '/edit_final', '/reward_detail','/share_out_bonus'],
  ['/cash'],
  ['/goods', '/edit_goods', '/publish_goods', '/goods_sort','/banner_manage'],
  ['/order', '/under_line_order'],
  ['/agent', '/edit_agent', '/add_agent'],
  ['/news', '/news_list'],
  ['/set_up'],
  ['/set_up_permissions'],
  ['/range_apply'],
  ['/store_apply'],
]
/**
 *当前用户的权限路由表
 * @param f_id 用户的function_id
 * @returns {Array} 用户的所有路由权限路径数组
 */
const userCtrl = (f_id) => {
  let curArr = []          //新建一个数组用来放，f_id的路由权限
  routeData.map((item, index) => {
    if (f_id - 1 == index) {
      curArr.push(...item)
    }
  })
  return curArr
}
/**
 *是否有某个路由的权限
 * @param path 要去的路由
 * @returns {boolean} 是否有权限去
 */
const isHaveRoute = (path) => {
  let routeArr = []
  let ADF = JSON.parse(getStore('ADF'))  //用户的控制权限信息
  if (!ADF) {
    window.location.href = window.location.href.replace(/#\/.*/, '')
    return
  }
  for (let item of ADF) {
    routeArr.push(...userCtrl(item.function_id))
  }
  let isHave = routeArr.includes(path)
  return isHave
}
/**
 * 在路由跳转之前做权限控制
 */
router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next()
    return false
  }
  let volid = isHaveRoute(to.path)   //是否有要去(to.path)的路由权限
  if (!volid) {
    vm.$message({
      type: 'error',
      message: '你还没有没有权限！'
    });
  } else {
    next();
  }
})
/**
 * 当用户注销之后重新刷新页面，
 * 再次进入页面会重新走vue的生命周期
 */
router.afterEach((to, from) => {
  if (to.path == '/' && from.path != '/') {
    return false
    window.location.reload();
  }
})
export default router
