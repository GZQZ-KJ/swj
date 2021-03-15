import axios from 'axios'
import { BASE_URI } from './pathMap'
import Toast from './Toast'
import rootStore from '../mobx'
import { logger} from "react-native-logs";
const instance = axios.create({
  baseURL: BASE_URI,
  timeout: 10000,
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let reg = "/index/index"
  let re = '/index/getBroadcast'
  if (config.url.match(reg) || config.url.match(re)) {
    return config
  }
  Toast.showLoading('正在请求中...')
  return config
  // 对请求错误做些什么
}, function (error) {
  log.error(error);
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.hideLoading()
  if (response.status === 401) {
    rootStore.setUserInfo('', '')
    Toast.message('登录过期,请重新登录', 4000, 'center')
  } else if (response.status === 404) {
    return Toast.message('网络出错，请稍后再试', 3000, 'center')
  }
  return response;

}, function (error) {
  // 对响应错误做点什么
  if (error && error.response) {
    Toast.hideLoading()
    switch (error.response.status) {
      case 400:
        Toast.message('请求错误(400)');
        error.message = "请求错误(400)";
        break;
      case 401:
        Toast.message('请重新登录!!');
        return response.config.url = '/login/index';
        break;
      case 403:
        Toast.message('拒绝访问(403)');
        error.message = "拒绝访问(403)";
        break;
      case 404:
        Toast.message('请求出错(404)');
        error.message = "请求出错(404)";
        break;
      case 408:
        Toast.message('请求超时(408)');
        error.message = "请求超时(408)";
        break;
      case 500:
        Toast.message('服务器错误(500)');
        error.message = "服务器错误(500)";
        break;
      case 501:
        Toast.message('服务未实现(501)');
        error.message = "服务未实现(501)";
        break;
      case 502:
        Toast.message('网络错误(502)');
        error.message = "网络错误(502)";
        break;
      case 503:
        Toast.message('服务不可用(503)');
        error.message = "服务不可用(503)";
        break;
      case 504:
        Toast.message('网络超时(504)');
        error.message = "网络超时(504)";
        break;
      case 505:
        Toast.message('HTTP版本不受支持(505)');
        error.message = "HTTP版本不受支持(505)";
        break;
      default:
        Toast.message(`连接出错(${error.response.status})!`);
        error.message = `连接出错(${error.response.status})!`;
    }
  }
  Toast.hideLoading()
  var log = logger.createLogger(defaultConfig);
  log.debug(error);
  log.error(error);
  Toast.message('请检查网络',1000,'center')
  return Promise.reject(error);
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put
}