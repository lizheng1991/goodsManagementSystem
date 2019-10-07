<template>
  <div style="position:relative">
    <div style="margin: 26px;">
        <Row>
            <Col span="10">
            &nbsp;
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
    <Table :data="tableData" :columns="columns"></Table>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Drawer
        title="人员信息"
        v-model="showDrawer"
        width="720"
        :mask-closable="false"
        :styles="styles"
    >
        <Form :model="formData">
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="人员名称" label-position="top">
                        <Input v-model="formData.name" :disabled="formState==='detail'" placeholder="请输入人员名称..." />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="角色" label-position="top">
                        <Select v-model="formData.role" style="" :disabled="formState==='detail'">
                            <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="密码" label-position="top">
                        <Input v-model="formData.password" :disabled="formState==='detail'" placeholder="请输入密码..." />
                    </FormItem>
                </Col>
                <Col span="12">
                </Col>
            </Row>
            <FormItem label="备注" label-position="top">
                <Input type="textarea" v-model="formData.remark" :rows="4" :disabled="formState==='detail'" placeholder="" />
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
                name: '',
                spinShow: false, // loading
                auth: 'admin',
                formState: '', // 表单状态 add:新建，edit:编辑，detail:查看
                showDrawer: false, // 抽屉显隐
                roleList: [
                  {
                    value: 1,
                    label: '管理员'
                  },
                  {
                    value: 2,
                    label: '员工'
                  }
                ],
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formDataInit: { // 表单初始值
                    id:0,
                    name: '',
                    role: 0,
                    password: '',
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
                      title: '人员姓名',
                      key: 'name'
                  },
                  {
                    title: '角色',
                    key: 'role',
                    render: (h, params) => {
                      let value = params.row.role;
                      let result = '';
                      this.roleList.forEach((item)=>{
                        if(item.value === value) {
                          result = item.label;
                        }
                      });
                      return h('div',{},result);
                    }
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
            // 搜索
            search() {
                const params = {
                }
                this.$http.getUserList(params).then((result)=>{
                    if(result.data) {
                        this.tableData = result.data;
                    }
                });
            },
            // 查看
            detail(id) {
                this.formState = 'detail';
                this.$http.getUserDetail(id).then((result)=>{
                    if(result.data && result.data.length) {
                        this.formData = result.data[0];
                    }
                    this.showDrawer = true;
                });
            },
            // 新建
            add() {
                this.formState = 'add';
                this.formData = JSON.parse(JSON.stringify(this.formDataInit));
                this.showDrawer = true;
            },
            // 编辑
            edit(id) {
                this.formData.id = id;
                this.formState = 'edit';
                this.$http.getUserDetail(id).then((result)=>{
                    if(result.data && result.data.length) {
                        this.formData = result.data[0];
                    }
                    this.showDrawer = true;
                });
            },
            // 删除
            remove(id) {
                let that = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除此员工？',
                    onOk: function(){
                        that.$http.deleteUser(id).then((result)=>{
                            if(result) {
                                that.search();
                            }
                        });
                    }
                });
            },
            // 提交
            submit() {
                let msg = '';
                if (!this.formData.name){ msg = '请填写员工名称！'}
                if (!this.formData.role){ msg = '请选择角色！'}
                if (msg){
                    this.$Message.error(msg)
                    return false;
                }
                if(this.formState === 'add') {
                    this.$http.addUser(this.formData).then((result)=>{
                        this.showDrawer = false;
                        this.search();
                    });
                } else if(this.formState === 'edit') {
                    this.$http.editUser(this.formData).then((result)=>{
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
