<template>
  <div style="position:relative">
    <div style="margin: 26px;">
        <Row>
            <Col span="8">
              选择货品: 
              <Select v-model="good" style="width:200px" placeholder="全部货品" @on-change="search()" clearable>
                  <Option v-for="item in goodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="8">
              选择日期: 
              <DatePicker type="daterange" v-model="date" placeholder="所有日期" @on-change="search()" style="width: 300px"></DatePicker>
            </Col>
            <Col span="8" style="text-align:right">
              <Button type="primary" @click="add()">添 加</Button>
            </Col>
        </Row>
    </div>
    <Table :data="tableData" :columns="columns" @on-sort-change="sort"></Table>
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
                goodList: [{ // 货品列表
                  label: 'lz',
                  value: 1
                },{
                  label: 'lajimo',
                  value: 2
                }],
                date: [],
                spinShow: false, // loading
                page:{
                  total: 100,
                  current: 1,
                  size: 20
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
                    name: '',
                    count: 0,
                    unit: '',
                    remark: ''
                },
                formData: {}, // 表单初始化
                tableData: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                columns: [
                  {
                      type: 'index',
                      width: 60,
                      align: 'center'
                  },
                  {
                      title: 'Name',
                      key: 'name'
                  },
                  {
                    title: 'Age',
                    key: 'age',
                    sortable: true
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
                                      this.detail(params.row)
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
                                      this.edit(params.row)
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
                                      this.remove(params.row)
                                  }
                              }
                          }, '删除')
                      ]);
                    }
                  }
                ]
            }
        },
        computed: {
        },
        methods:{
          sort(data) {
            console.log(data)
          },
          changePage(index) {
            this.page.current = index;
            this.search();
          },
          search() {
            console.log(this.good,this.date,this.page)
          },
          detail(row) {
            this.formState = 'detail';
            console.log(row)
            this.$http.getGoodDetail(1).then((result)=>{
                this.showDrawer = true;
                console.log(result);
            });
          },
          add() {
            this.formState = 'add';
            this.formData = JSON.parse(JSON.stringify(this.formDataInit));
            this.showDrawer = true;
          },
          edit(row) {
            this.formState = 'edit';
            console.log(row)
            this.showDrawer = true;
          },
          remove(row) {
            console.log(row)
          },
          submit() {
            if(this.formState === 'add') {
              this.$http.addGood(this.formData).then((result)=>{
                this.showDrawer = false;
                console.log(result);
              });
            } else if(this.formState === 'edit') {
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
