<template>
  <div style="position:relative">
    <div style="margin: 26px;">
        <Row>
            <Col span="10">
              货品名称: 
              <Input v-model="good" placeholder="全部商品" style="width: 300px" @on-blur="search()" clearable @on-clear="search()"/>
            </Col>
            <Col span="10">&nbsp;
              <!-- 选择日期: 
              <DatePicker type="daterange" v-model="date" placeholder="所有日期" @on-change="search()" style="width: 300px"></DatePicker> -->
            </Col>
            <Col span="4" style="text-align:right">
              <Button type="primary" @click="add()">添 加</Button>
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
                    <FormItem label="货品名称" label-position="top">
                        <Input v-model="formData.name" :readonly="formState==='detail'" placeholder="请输入货品名称..." />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="初始数量" label-position="top">
                        <Input v-model="formData.count" type="number" :readonly="formState==='detail'||formState==='edit'" placeholder="请输入货品数量..." />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="计量单位" label-position="top">
                        <Input v-model="formData.unit" :readonly="formState==='detail'||formState==='edit'" placeholder="例如：'千克'，'个'等" />
                    </FormItem>
                </Col>
                <Col span="12">
                </Col>
            </Row>
            <FormItem label="备注" label-position="top">
                <Input type="textarea" v-model="formData.remark" :rows="4" :readonly="formState==='detail'" placeholder="" />
            </FormItem>
        </Form>
        <div class="drawer-footer" v-if="formState!=='detail'">
            <Button style="margin-right: 8px" @click="showDrawer = false">取 消</Button>
            <Button type="primary" @click="submit()">提 交</Button>
        </div>
    </Drawer>  
  </div>
</template>
<script>
    export default {
        data () {
            return {
                good: '',
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
                    name: '',
                    count: 0,
                    unit: '',
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
                      title: '名称',
                      key: 'name'
                  },
                  {
                    title: '数量',
                    key: 'count',
                    sortable: true
                  },
                  {
                    title: '单位',
                    key: 'unit'
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
                          }, '查看'),
                          h('Button', {
                              props: {
                                  type: 'primary',
                                  size: 'small',
                                  disabled: showButton
                              },
                              style: {
                                  marginRight: '5px'
                              },
                              on: {
                                  click: () => {
                                      this.edit(params.row.id)
                                  }
                              }
                          }, '修改'),
                          h('Button', {
                              props: {
                                  type: 'error',
                                  size: 'small',
                                  disabled: showButton
                              },
                              on: {
                                  click: () => {
                                      this.remove(params.row.id)
                                  }
                              }
                          }, '删除')
                      ]);
                    }
                  }
                ]
            }
        },
        mounted(){
            this.search();
        },
        computed: {
        },
        methods:{
          sortFun(data) {
            this.sort = {
                key: data.key,
                order: data.desc
            }
          },
          changePage(index) {
            this.page.current = index;
            this.search();
          },
          search() {
            const params = {
                data: {
                    name: this.good,
                    date: this.date,
                    sort: this.sort
                },
                page: this.page
            }
            this.$http.getGoodList(params).then((result)=>{
                if(result.data) {
                    this.tableData = result.data.list;
                    this.page = result.data.page
                }
            });
          },
          detail(id) {
            this.formState = 'detail';
            this.$http.getGoodDetail(id).then((result)=>{
                if(result.data && result.data.length) {
                    this.formData = result.data[0];
                }
                this.showDrawer = true;
            });
          },
          add() {
            this.formState = 'add';
            this.formData = JSON.parse(JSON.stringify(this.formDataInit));
            this.showDrawer = true;
          },
          edit(id) {
            this.formData.id = id;
            this.formState = 'edit';
            this.$http.getGoodDetail(id).then((result)=>{
                if(result.data && result.data.length) {
                    this.formData = result.data[0];
                }
                this.showDrawer = true;
            });
          },
          remove(id) {
            this.$http.deleteGood(id).then((result)=>{
                if(result) {
                    this.search();
                }
            });
          },
          submit() {
            if(this.formState === 'add') {
                this.$http.addGood(this.formData).then((result)=>{
                    this.showDrawer = false;
                    this.search();
                });
            } else if(this.formState === 'edit') {
                this.$http.editGood(this.formData).then((result)=>{
                    this.showDrawer = false;
                    this.search();
                });
            }
          }
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
