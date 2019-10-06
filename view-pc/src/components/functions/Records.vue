<template>
  <div style="position:relative">
    <div style="margin: 26px;">
        <Row>
            <Col span="8">
              货品名称: 
              <AutoComplete
              v-model="goodName"
              :data="goodNameList"
              placeholder="全部货品"
              :readonly="formState==='detail'"
              clearable
              @on-select="search"
              @on-clear="search()"
              style="width:250px"></AutoComplete>
            </Col>
            <Col span="8">
              出入库人员:
              <AutoComplete
              v-model="userName"
              :data="userNameList"
              placeholder="全部人员"
              :readonly="formState==='detail'"
              clearable
              @on-select="search"
              @on-clear="search()"
              style="width:250px"></AutoComplete>
            </Col>
            <Col span="8">
              <!-- 选择日期: 
              <DatePicker type="daterange" v-model="date" placeholder="所有日期" @on-change="search()" style="width: 300px"></DatePicker> -->
            </Col>
        </Row>
    </div>
    <Table :data="tableData" :columns="columns" @on-sort-change="sortFun"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="page.total" :current="page.current" :page-size="page.size" @on-change="changePage" show-total></Page>
        </div>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Drawer
        title="货品信息"
        v-model="showDrawer"
        width="720"
        :mask-closable="false"
        :styles="styles"
    >
        <Form :model="formData">
            <Row :gutter="32">
                <Col span="12">
                    
                </Col>
                <Col span="12">
                    <FormItem label="出入库人员" label-position="top">
                        <Input v-model="formData.userName" type="number" :readonly="formState==='detail'" placeholder="请输入出入库人员..." />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="初始数量" label-position="top">
                        <Input v-model="formData.count" type="number" :readonly="formState==='detail'||formState==='edit'" placeholder="请输入货品数量..." />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="计量单位" label-position="top">
                        <Input v-model="formData.unit" :readonly="formState==='detail'||formState==='edit'" placeholder="例如：'千克'，'个'等" />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="操作时间" label-position="top">
                        <DatePicker type="date" v-model="formData.createdate" placeholder="" :readonly="formState==='detail'||formState==='edit'" ></DatePicker>
                    </FormItem>
                </Col>
                <Col span="12">
                </Col>
            </Row>
            <FormItem label="备注" label-position="top">
                <Input type="textarea" v-model="formData.remark" :rows="4" :readonly="formState==='detail'" placeholder="" />
            </FormItem>
        </Form>
        <!-- <div class="drawer-footer" v-if="formState!=='detail'">
            <Button style="margin-right: 8px" @click="showDrawer = false">取 消</Button>
            <Button type="primary" @click="submit()">提 交</Button>
        </div> -->
    </Drawer>  
  </div>
</template>
<script>
    export default {
        data () {
            return {
                goodName: '',
                goodList: [],
                userName: '',
                userList: [],
                //date: '',
                sort: {
                    key: '',
                    order: ''
                },
                spinShow: false, // loading
                page:{
                  total: 0,
                  current: 1,
                  size: 10
                },
                auth: 'admin',
                formState: '', // 表单状态 add:新建，edit:编辑，detail:查看
                showDrawer: false, // 抽屉显隐
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formDataInit: { // 表单初始值
                    id:0,
                    goodName: '',
                    userName: '',
                    count: 0,
                    unit: '',
                    createdate: '',
                    remark: ''
                },
                formData: {}, // 表单初始化
                tableData: [
                ],
                columns: [
                  {
                      type: 'index',
                      width: 60,
                      align: 'center'
                  },
                  {
                      title: '货品名称',
                      key: 'good_name'
                  },
                  {
                      title: '出入库人员',
                      key: 'user_name'
                  },
                  {
                    title: '数量',
                    key: 'count'
                  },
                  {
                    title: '单位',
                    key: 'unit'
                  },
                  {
                    title: '日期',
                    key: 'date',
                    sortable: 'custom'
                  },
                  {
                    title: '备注',
                    key: 'remark'
                  },
                  {
                    title: '操作',
                    key: 'operation',
                    render: (h, params) => {
                      const showButton = this.auth !== 'admin';
                      return h('div', [
                          h('Button', {
                              props: {
                                  size: 'small'
                              },
                              style: {
                                  marginRight: '5px'
                              },
                              on: {
                                  click: () => {
                                      this.detail(params.row.id)
                                  }
                              }
                          }, '查看')//,
                          // h('Button', {
                          //     props: {
                          //         type: 'primary',
                          //         size: 'small',
                          //         disabled: showButton
                          //     },
                          //     style: {
                          //         marginRight: '5px'
                          //     },
                          //     on: {
                          //         click: () => {
                          //             this.edit(params.row.id)
                          //         }
                          //     }
                          // }, '修改'),
                          // h('Button', {
                          //     props: {
                          //         type: 'error',
                          //         size: 'small',
                          //         disabled: showButton
                          //     },
                          //     on: {
                          //         click: () => {
                          //             this.remove(params.row.id)
                          //         }
                          //     }
                          // }, '删除')
                      ]);
                    }
                  }
                ]
            }
        },
        computed:{
          goodNameList(){
            let result = [];
            if (!this.goodList) return result;
            this.goodList.forEach((item) => {
              if(item.name.indexOf(this.goodName) >= 0) {
                result.push(item.name)
              }
            });
            return result;
          },
          userNameList(){
            let result = [];
            if (!this.userList) return result;
            this.userList.forEach((item) => {
              if(item.name.indexOf(this.userName) >= 0) {
                result.push(item.name)
              }
            });
            return result;
          }
        },
        mounted(){
            this.$http.getGoodNameList().then((result)=>{
                if(result.data) {
                    this.goodList = result.data;
                }
            });
            this.$http.getUserNameList().then((result)=>{
                if(result.data) {
                    this.userList = result.data;
                }
            });
            this.search();
        },
        methods:{
            // 排序参数
            sortFun(data) {
                this.sort = {
                    key: data.key,
                    order: data.order
                }
                this.search();
            },
            // 切换页码
            changePage(index) {
                this.page.current = index;
                this.search();
            },
            // 搜索
            search() {
              setTimeout(()=>{
                let goodId = 0;
                let userId = 0;
                this.goodList.forEach((item) => {
                  if(item.name === this.goodName) {
                    goodId = item.id;
                  }
                });
                this.userList.forEach((item) => {
                  if(item.name === this.userName) {
                    userId = item.id;
                  }
                });
                const params = {
                    data: {
                        goodId: goodId,
                        userId: userId,
                        sort: this.sort
                    },
                    page: this.page
                }
                this.$http.getRecordList(params).then((result)=>{
                    if(result.data) {
                        this.tableData = result.data.list;
                        this.page = result.data.page
                    }
                });
              },0);
            },
            // 查看
            detail(id) {
                this.formState = 'detail';
                this.$http.getGoodDetail(id).then((result)=>{
                    if(result.data && result.data.length) {
                        this.formData = result.data[0];
                    }
                    this.showDrawer = true;
                });
            },
            // // 新建
            // add() {
            //     this.formState = 'add';
            //     this.formData = JSON.parse(JSON.stringify(this.formDataInit));
            //     this.showDrawer = true;
            // },
            // // 编辑
            // edit(id) {
            //     this.formData.id = id;
            //     this.formState = 'edit';
            //     this.$http.getGoodDetail(id).then((result)=>{
            //         if(result.data && result.data.length) {
            //             this.formData = result.data[0];
            //         }
            //         this.showDrawer = true;
            //     });
            // },
            // // 删除
            // remove(id) {
            //     let that = this;
            //     this.$Modal.confirm({
            //         title: '提示',
            //         content: '确认删除此货品？',
            //         onOk: function(){
            //             that.$http.deleteGood(id).then((result)=>{
            //                 if(result) {
            //                     that.search();
            //                 }
            //             });
            //         }
            //     });
            // },
            // // 提交
            // submit() {
            //     let msg = '';
            //     if (!this.formData.name){ msg = '请填写货品！'}
            //     if (!this.formData.count){ msg = '请填写初始数量！'}
            //     if (!this.formData.unit){ msg = '请填写货品单位！'}
            //     if (msg){
            //         this.$Message.error(msg)
            //         return false;
            //     }
            //     if(this.formState === 'add') {
            //         this.$http.addGood(this.formData).then((result)=>{
            //             this.showDrawer = false;
            //             this.search();
            //         });
            //     } else if(this.formState === 'edit') {
            //         this.$http.editGood(this.formData).then((result)=>{
            //             this.showDrawer = false;
            //             this.search();
            //         });
            //     }
            // }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>
