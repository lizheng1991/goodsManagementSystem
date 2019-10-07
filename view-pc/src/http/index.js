import { base } from './base'; // 导入接口域名列表
import axios from './http'; // 导入http中创建的axios实例

const http = {
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

  // 出入库
  import (params) {
    return axios.post(`${base.api}/records/import`, params);
  },
  // 出入库记录
  getRecordList (params) {
    return axios.post(`${base.api}/records/list`, params);
  },
  // 获取货品详情
  getRecordDetail (id) {
    return axios.get(`${base.api}/records/detail/${id}`);
  },

  // 登录
  login (params) {
    return axios.post(`${base.api}/users/login`,params);
  },
  // 获取人员列表
  getUserList () {
    return axios.post(`${base.api}/users/list`);
  },
  // 获取人员名称列表
  getUserNameList () {
    return axios.get(`${base.api}/users/namelist`);
  },
  // 获取货品详情
  getUserDetail (id) {
    return axios.get(`${base.api}/users/detail/${id}`);
  },
  // 增加货品
  addUser (params) {
    return axios.post(`${base.api}/users/add`, params);
  },
  // 编辑货品
  editUser (params) {
    return axios.put(`${base.api}/users/update`, params);
  },
  // 删除货品
  deleteUser (id) {
    return axios.delete(`${base.api}/users/delete/${id}`);
  },
}

export { http }
