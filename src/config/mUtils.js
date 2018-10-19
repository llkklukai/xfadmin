export const computeUserType = ({num = true, user_type}) => {
  if (num) {
    if (user_type == '省级代理') {
      user_type = 1
    }
    if (user_type == '市级代理') {
      user_type = 2
    }
    if (user_type == '县级代理') {
      user_type = 3
    }
    if (user_type == 'VIP代理') {
      user_type = 4
    }
    if (user_type == '商务代理') {
      user_type = 5
    }
    if (user_type == '体验代理') {
      user_type = 6
    }
  }else {
    if (user_type == 1) {
      user_type= '省级代理'
    }
    if (user_type == 2) {
      user_type= '市级代理'
    }
    if (user_type == 3) {
      user_type= '县级代理'
    }
    if (user_type == 4) {
      user_type = 'VIP代理'
    }
    if (user_type == 5) {
      user_type = '商务代理'
    }
    if (user_type == 6) {
      user_type = '体验代理'
    }
  }
  return user_type
}

export const computeUserType2 = ({num = true, user_type}) => {
  if (num) {
    if (user_type == '体验代理') {
      user_type = 1
    }
    if (user_type == '商务代理') {
      user_type = 2
    }
    if (user_type == '县级代理') {
      user_type = 3
    }
    if (user_type == '市级代理') {
      user_type = 4
    }
    if (user_type == '省级代理') {
      user_type = 5
    }
    if (user_type == '大区经理') {
      user_type = 6
    }
    if (user_type == '合伙人') {
      user_type = 7
    }
  }else {
    if (user_type == 1) {
      user_type= '体验代理'
    }
    if (user_type == 2) {
      user_type= '商务代理'
    }
    if (user_type == 3) {
      user_type= '县级代理'
    }
    if (user_type == 4) {
      user_type = '市级代理'
    }
    if (user_type == 5) {
      user_type = '省级代理'
    }
    if (user_type == 6) {
      user_type = '大区经理'
    }
    if (user_type == 7) {
      user_type = '合伙人'
    }
  }
  return user_type
}









/**
 * 操作提示窗
 * @param msg提示内容
 * @param title 提示标题
 * @param type 提示图标类型
 */
export const confirmBox = ({msg = '继续将执行删除, 是否继续?', title = '提示', type = 'warning', bindThis, callBack}) => {
  bindThis.$confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  }).then(() => {
    callBack();
  }).catch((e) => {
    console.log("error" + e)
    bindThis.$message({
      type: 'info',
      message: '已取消'
    });
  });
}





/*
函数：格式化日期
参数：formatStr-格式化字符串
d：将日显示为不带前导零的数字，如1
dd：将日显示为带前导零的数字，如01
ddd：将日显示为缩写形式，如Sun
dddd：将日显示为全名，如Sunday
M：将月份显示为不带前导零的数字，如一月显示为1
MM：将月份显示为带前导零的数字，如01
MMM：将月份显示为缩写形式，如Jan
MMMM：将月份显示为完整月份名，如January
yy：以两位数字格式显示年份
yyyy：以四位数字格式显示年份
h：使用12小时制将小时显示为不带前导零的数字，注意||的用法
hh：使用12小时制将小时显示为带前导零的数字
H：使用24小时制将小时显示为不带前导零的数字
HH：使用24小时制将小时显示为带前导零的数字
m：将分钟显示为不带前导零的数字
mm：将分钟显示为带前导零的数字
s：将秒显示为不带前导零的数字
ss：将秒显示为带前导零的数字
l：将毫秒显示为不带前导零的数字
ll：将毫秒显示为带前导零的数字
tt：显示am/pm
TT：显示AM/PM
返回：格式化后的日期
*/
Date.prototype.format = function (formatStr) {
  var date = this;
  /*
  函数：填充0字符
  参数：value-需要填充的字符串, length-总长度
  返回：填充后的字符串
  */
  var zeroize = function (value, length) {
    if (!length) {
      length = 2;
    }
    value = new String(value);
    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0';
    }
    return zeros + value;
  };
  return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function($0) {
    switch ($0) {
      case 'd': return date.getDate();
      case 'dd': return zeroize(date.getDate());
      case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
      case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
      case 'M': return date.getMonth() + 1;
      case 'MM': return zeroize(date.getMonth() + 1);
      case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
      case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
      case 'yy': return new String(date.getFullYear()).substr(2);
      case 'yyyy': return date.getFullYear();
      case 'h': return date.getHours() % 12 || 12;
      case 'hh': return zeroize(date.getHours() % 12 || 12);
      case 'H': return date.getHours();
      case 'HH': return zeroize(date.getHours());
      case 'm': return date.getMinutes();
      case 'mm': return zeroize(date.getMinutes());
      case 's': return date.getSeconds();
      case 'ss': return zeroize(date.getSeconds());
      case 'l': return date.getMilliseconds();
      case 'll': return zeroize(date.getMilliseconds());
      case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
      case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
    }
  });
}





/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}


/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height;
  let height;
  let setTop;
  let paddingBottom;
  let marginBottom;
  let requestFram;
  let oldScrollTop;

  document.body.addEventListener('scroll', () => {
    loadMore();
  }, false)
  //运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener('touchstart', () => {
    height = element.offsetHeight;
    setTop = element.offsetTop;
    paddingBottom = getStyle(element, 'paddingBottom');
    marginBottom = getStyle(element, 'marginBottom');
  }, {passive: true})

  //运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove', () => {
    loadMore();
  }, {passive: true})

  //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  }, {passive: true})

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        loadMore();
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
        //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight;
        loadMore();
      }
    })
  }

  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback();
    }
  }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
  let requestFram;
  let oldScrollTop;

  document.addEventListener('scroll', () => {
    showBackFun();
  }, false)
  document.addEventListener('touchstart', () => {
    showBackFun();
  }, {passive: true})

  document.addEventListener('touchmove', () => {
    showBackFun();
  }, {passive: true})

  document.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  }, {passive: true})

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
      }
      showBackFun();
    })
  }

  //判断是否达到目标点
  const showBackFun = () => {
    if (document.body.scrollTop > 500) {
      callback(true);
    } else {
      callback(false);
    }
  }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
  clearInterval(element.timer);

  //判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration;
    duration = 400;
  } else if (duration instanceof String) {
    mode = duration;
    duration = 400;
  }

  //判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode;
    mode = 'ease-out';
  }

  //获取dom样式
  const attrStyle = attr => {
    if (attr === "opacity") {
      return Math.round(getStyle(element, attr, 'float') * 100);
    } else {
      return getStyle(element, attr);
    }
  }
  //根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize);

  const unit = {};
  const initState = {};

  //获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
    } else {
      unit[attr] = 'px';
    }
    initState[attr] = attrStyle(attr);
  });

  //去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] == 'rem') {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
    } else {
      target[attr] = parseInt(target[attr]);
    }
  });


  let flag = true; //假设所有运动到达终点
  const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0;  //步长
      let status = false; //是否仍需运动
      let iCurrent = attrStyle(attr) || 0; //当前元素属性址
      let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
      let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch (mode) {
        case 'ease-out':
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
          break;
        case 'linear':
          speedBase = initState[attr];
          intervalTime = duration * 20 / 400;
          break;
        case 'ease-in':
          let oldspeed = remberSpeed[attr] || 0;
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
          remberSpeed[attr] = iSpeed
          break;
        default:
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
      }
      if (mode !== 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      }
      //判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case 'ease-out':
          status = iCurrent != target[attr];
          break;
        case 'linear':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        case 'ease-in':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        default:
          status = iCurrent != target[attr];
      }

      if (status) {
        flag = false;
        //opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
          element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
          element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + iSpeed;
        } else {
          element.style[attr] = iCurrent + iSpeed + 'px';
        }
      } else {
        flag = true;
      }

      if (flag) {
        clearInterval(element.timer);
        if (callback) {
          callback();
        }
      }
    })
  }, 20);
}
