<template>
  <div style="position:relative">
    <div style="margin: 20px;">
        <Row>
            <Col span="8">
              选择货品: 
              <Select v-model="good" style="width:200px" placeholder="全部货品" clearable>
                  <Option v-for="item in goodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="8">
              选择日期: 
              <DatePicker type="daterange" v-model="date" placeholder="所有日期" style="width: 300px"></DatePicker>
            </Col>
            <Col span="8" style="text-align:right">
              <Button type="primary" @click="search()">搜 索</Button>
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
  </div>
</template>
<script>
    export default {
        data () {
            return {
                good: '',
                goodList: [{
                  label: 'lz',
                  value: 1
                },{
                  label: 'lajimo',
                  value: 2
                }],
                date: [],
                spinShow: false,
                page:{
                  total: 100,
                  current: 1,
                  size: 20
                },
                tableData: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                        auth: 1
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
                      const showButton = params.row.auth === 1;
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
              // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
              //this.tableData1 = this.mockTableData1();
          },
          search() {
            console.log(this.good,this.date,this.page)
          },
          detail(row) {
            console.log(row)
          },
          edit(row) {
            console.log(row)
          },
          remove(row) {
            console.log(row)
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
