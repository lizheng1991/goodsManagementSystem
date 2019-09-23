<template>
  
</template>

<script>
export default {
  name: 'Import',
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
