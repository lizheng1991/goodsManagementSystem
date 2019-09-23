<template>
  <div style="margin:20px;">
    <div class="row">
        <div class="row-l">名 称:</div>
        <div class="row-r"><AutoComplete
        v-model="name"
        :data="nameList"
        @on-search="searchName"
        placeholder=""
        style="width:300px"></AutoComplete></div>
    </div>
    <div class="row">
        <div class="row-l">数 量:</div>
        <div class="row-r"><Input v-model="num" type="number" placeholder="" style="width:300px" /></div>
    </div>
    <div class="row">
        <div class="row-l">日 期:</div>
        <div class="row-r"><DatePicker type="date" v-model="date" placeholder="" style="width: 300px"></DatePicker></div>
    </div>
    <div class="row">
        <div class="row-l">备 注:</div>
        <div class="row-r">
          <Input v-model="text" type="textarea" :rows="3" placeholder="" style="width:300px" />
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
  name: 'Export',
  data () {
    return {
      name: '',
      num: 0,
      date: '',
      text: '',
      nameList: ['lz1', 'lz2']
    }
  },
  methods: {
    searchName(name) {
      console.log(name)
    },
    submit() {
      console.log('name:'+this.name,'num:'+this.num,'date:'+this.date,'text:'+this.text)
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
