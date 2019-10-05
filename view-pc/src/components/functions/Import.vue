<template>
  <div style="margin:20px;">
    <div class="row">
        <div class="row-l">货 品:</div>
        <div class="row-r"><AutoComplete
        v-model="name"
        :data="nameList"
        placeholder=""
        style="width:300px"></AutoComplete></div>
    </div>
    <div class="row">
        <div class="row-l">数 量:</div>
        <div class="row-r"><Input v-model="count" type="number" placeholder="" style="width:300px" /></div>
    </div>
    <div class="row">
        <div class="row-l">日 期:</div>
        <div class="row-r"><DatePicker type="date" v-model="createdate" placeholder="" style="width: 300px"></DatePicker></div>
    </div>
    <div class="row">
        <div class="row-l">备 注:</div>
        <div class="row-r">
          <Input v-model="remark" type="textarea" :rows="3" placeholder="" style="width:300px" />
        </div>
    </div>
    <div class="row">
        <div class="row-l"></div>
        <div class="row-r">
          <Button type="primary" @click="submit()">提 交</Button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Import',
  data () {
    return {
      name: '',
      count: 0,
      createdate: '',
      remark: '',
      goodList:[]
    }
  },
  computed:{
    nameList(){
      let result = [];
      if (!this.goodList) return result;
      this.goodList.forEach((item) => {
        if(item.name.indexOf(this.name) >= 0) {
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
  },
  methods: {
    submit() {
      let goodId = 0;
      let params;
      let msg = '';
      this.goodList.forEach((item) => {
        if(item.name === this.name) {
          goodId = item.id;
        }
      });
      if (!goodId){ msg = '请选择货品！'}
      if (!(this.count && this.count > 0)){ msg = '请输入正确数量！'}
      if (!this.createdate){ msg = '请选择日期！'}
      if (msg){
        this.$Message.error(msg)
        return false;
      }
      params = {
        user_id: 1,
        good_id: goodId,
        count: this.count,
        remark: this.remark,
        createdate: new Date(this.createdate).getTime()
      }
      this.$http.import(params).then((result) => {
        this.name= '';
        this.count= 0;
        this.createdate= '';
        this.remark= '';
        this.goodList= [];
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row {
    display:flex;
    padding: 20px 0;
    font-size:14px;
  }
  .row-l{
    width:120px;
    text-align: right;
    line-height: 32px;
    padding-right:20px;
  }
  .row-r{
    flex:1;
  }
</style>
