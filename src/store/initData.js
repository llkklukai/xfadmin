
export default {

  user_type_arr: [
    {
      value: '1',
      label: '省级代理'
    }, {
      value: '2',
      label: '市级代理'
    }, {
      value: '3',
      label: '县级代理'
    }, {
      value: '4',
      label: 'VIP代理'
    }, {
      value: '5',
      label: '商务代理'
    }, {
      value: '6',
      label: '体验代理'
    },
  ],
  user_type_arr2: [
    {
      value: '1',
      label: '体验代理'
    }, {
      value: '2',
      label: '商务代理'
    },
    {
      value: '3',
      label: '县级代理'
    }, {
      value: '4',
      label: '市级代理'
    }, {
      value: '5',
      label: '省级代理'
    }, {
      value: '6',
      label: '大区经理'
    }, {
      value: '7',
      label: '合伙人'
    }
  ],
  adminInfo: {},
  //商品列表
  goodsInfo: {
    activeIndex: '0',
    tableData: [],
    allTableData: [],
    limit: 10,
    currentPage: 1
  },
  loginInfo: {},
  //编辑中的商品信息
  editGoodsInfo: {
    formDatas: {
      productName: '',
      productPrice:0,
      primePrice: '',
      stockNum: '',
      points: '',
      ProductImages: '',
      moduleNumber: '',
      productType: true,
      num: '',
      name: '',
      agencyCostPrice:'',
      standard:'',
      color:''
    },
    mainImgArr: [],
    mainImg: '',
    detailImgArr: [],
    productId: '',
    detailImg: '',
    goodsSortList: []
  },
  //代理商信息
  agentInfo: {
    tableData: [],
    pageSize: 10,
    page: 1,
    count:0,
    allTableData: []
  },
  //编辑中的代理商信息
  editAgentInfo: {
    address_id:'',
    formDatas: {
      moneySpent:0,
      realname: '',
      IDnumber: '',
      address: '',
      user_id: '',
      user_type: '',
      rate: '',
      areaRate: '',
      agora: '',
      extend: '',
      help: '',
      subsidy: '',
      consume: '',
      integrals: '',
      userType:''
    },
    range: {
      province: '',
      city: '',
      area: ''
    },
    addressList:[]
  },
  //财务报表
  finalInfo: {
    tableData: [],
    allTableData: [],
    limit: 10,
    currentPage: 1,
    date_value1: '',
    date_value2: '',
    sum: {
      agora: '',
      integrals: '',
      help: '',
      consume: '',
      subsidy: '',
      extend: '',
    }
  },
  //财务统计
  finalCountInfo: {
    pickerOptions2: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
    date_value2: '',
    tableData: [],
    allTableData: [],
    page: 1,
    pageSize: 10,
    thData: {
      ExtendSum: '',
      SumConsumeMoney: '',
      money: '',
      awaitJudge: '',
      judgeOver: '',
      serviceCharge: '',
      sumMarket: ''
    }
  },
  //订单统计信息
  orderCountInfo: {
    date_value2: '',
    tableData: [],
    allTableData: [],
    currentPage: 1,
    limit: 10,
    orderSum: '',
    sumPayMoney: '',
    sumMarketPrice: '',
    sumPrimePrice: '',
    status2OrderSum: '',
    status3OrderSum: '',
  },
  //支付方式统计信息
  payTypeCountInfo: {
    date_value2: '',
    tableData: [],
    allTableData: [],
    currentPage: 1,
    limit: 10,
    resData: {}
  },
  //消息列表信息
  newsListInfo: {
    currentPage: 1,
    limit: 10,
    allTableData: [],
    tableData: [],
  },
  //订单发货信息
  orderDispatchInfo: {
    selectInfo: ''
  },
  rewardDetailInfo: {
    type: '1',
    page: 1,
    pageSize: 10,
    tableData: [],
    countSum: 1
  },
  rewardComputeInfo:{
    page:1,
    pageSize:10,
    allTableData:[],
    tableData: [],
  }
}
