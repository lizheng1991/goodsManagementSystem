# goodsManageSystem
> 用于仓库货品管理的库管系统，包括前端，后端，数据库（VUE + Koa2 + MYSQL）

## 项目主要功能
* 登录
* 货品管理 ：货品的增删改查
* 出入库记录 ：出入库记录查询
* 货品出入库
* 账户管理 ：账号的增删改查
* 权限 ：管理员有所有权限；普通员工不可以进行账号管理，货品管理只可以查询查看

## 主项目结构
├── view-pc // 前端项目（VUE）  
├── service // 服务端项目（Koa2）  
└── database // 数据库（MYSQL） 

## 前端项目 
### 技术栈
> VUE + vue-router + vuex + axios + iview
### 项目详细Readme
[https://github.com/lizheng1991/goodsManagementSystem/blob/master/view-pc/README.md](https://github.com/lizheng1991/goodsManagementSystem/blob/master/view-pc/README.md)

## 后端项目
### 技术栈
> Node.js + Koa2
### 项目详细Readme
[https://github.com/lizheng1991/goodsManagementSystem/blob/master/service/README.md](https://github.com/lizheng1991/goodsManagementSystem/blob/master/service/README.md)

## 数据库
### 技术栈
> MYSQL
### 文件结构
├── goods.sql // 货品信息表  
├── records.sql // 出入库记录信息表  
└── user.sql // 人员信息表 