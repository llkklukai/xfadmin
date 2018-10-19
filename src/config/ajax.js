import {baseUrl} from './env'

import {Loading,Message} from 'element-ui';
export default (url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase();
  url = baseUrl + url;
  // const loading = Loading.service({
  //   lock: true,
  //   text: '加载中...',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0)'
  // });
  $.ajaxSetup({
    beforeSend: function (HttpRequest) {
      jQuery.support.cors = true
    },
    success: function () {
      // Message.success("nihao")
    },
    complete: function () {
      // vm.$loading().close()
    },
    error: function () {
      // vm.$loading().close()
    }
  })
  try {
    const response = $.ajax({
      type: type,
      url: url,
      async: true,
      dataType: 'json',
      data: data,
      // timeout: 20000,
      header: {
        withCredentials: true,
        type: 'admin'
      },
      xhrFields: {
        withCredentials: true
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (textStatus == 'timeout') {
          Message.error('请求超时，请检查网络刷新')
          return
        }
        switch (jqXHR.status) {
          case(500):
            Message.error('服务器内部错误')
            break;
          case(0):
            Message.error('服务器请求失败！检查网络刷新重试')
            break;
          default:
            Message.error('未知错误')
        }
      }
    });
    return response
  } catch (error) {
    throw new Error(error)
  }

}
