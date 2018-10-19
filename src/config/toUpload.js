import {baseUrl} from './env'
import {getStore} from "./mUtils";

export default (url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase();
  url = baseUrl + url;
  $.ajaxSetup({
    beforeSend: function (HttpRequest) {

    }
  })
  try {
    const response =  $.ajax({
      type: 'POST',
      url: url,
      async: true,
      dataType: 'json',
      data: data,
      timeout: 20000,
      cache: false,
      processData: false,
      contentType: false,
      xhrFields: {
        withCredentials: true
      },
    });
    // console.log('response'+JSON.stringify(response))
    return response
  } catch (error) {
    throw new Error(error)
  }

}
