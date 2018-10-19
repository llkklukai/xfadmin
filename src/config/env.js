/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;
// let version = "new"
let  version="old"
// let version="new2"

if (process.env.NODE_ENV == 'development') {
  // baseUrl = 'http://47.104.233.215:80/ajeasy';
  // baseImgPath = 'http://47.106.196.202:80/img/'
  //
  // baseUrl = 'http://192.168.1.10:8080/ajeasy';
  baseUrl = 'http://192.168.1.2:8080/kangai';
  baseImgPath = 'http://47.104.233.215:80/img/';

} else {
  if (version == "new") {
    baseUrl = 'http://47.106.196.202:80/ajeasy';     //新服务器
    baseImgPath = 'http://47.106.196.202:80/img/';
  } else {
    baseUrl = 'http://47.104.233.215:80/ajeasy';
    baseImgPath = 'http://47.104.233.215:80/img/';
  }
}
export {
  baseUrl,
  routerMode,
  baseImgPath,
  version
}
