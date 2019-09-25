import { base } from './base'; // 导入接口域名列表
import axios from './http'; // 导入http中创建的axios实例

const http = {
  // 登录
  login (params) {
    return axios.post(`${base.api}/login`, params);
  },
  // 获取货品列表
  getGoodList (params) {
    return axios.post(`${base.api}/goods/list`, params);
  },
  // 获取货品名称列表
  getGoodNameList () {
    return axios.get(`${base.api}/goods/namelist`);
  },
  // 获取货品详情
  getGoodDetail (id) {
    return axios.get(`${base.api}/goods/detail/${id}`);
  },
  // 增加货品
  addGood (params) {
    return axios.post(`${base.api}/goods/add`, params);
  },
  // 编辑货品
  editGood (params) {
    return axios.put(`${base.api}/goods/update`, params);
  },
  // 删除货品
  deleteGood (id) {
    return axios.delete(`${base.api}/goods/delete/${id}`);
  },

  // 入库
  import (params) {
    return axios.post(`${base.api}/records/import`, params);
  }
}

export { http }
