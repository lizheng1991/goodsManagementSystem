import { base } from './base'; // 导入接口域名列表
import axios from './http'; // 导入http中创建的axios实例

const http = {
  // 登录
  login (params) {
    return axios.post(`${base.api}/login`, params);
  },
  // 获取货品详情
  getGoodDetail (id) {
    return axios.get(`${base.api}/goods/detail/${id}`);
  },
  // 增加货品
  addGood (params) {
    return axios.post(`${base.api}/goods/add`, params);
  }
}

export { http }
