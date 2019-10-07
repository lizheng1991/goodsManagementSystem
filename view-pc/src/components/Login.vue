<template>
<div class="form-box">
  <div class="form">
    <Form :model="formData">
      <FormItem label="姓 名" label-position="top">
          <Input v-model="formData.name" placeholder="请输入人员名称..." />
      </FormItem>
      <FormItem label="密 码" label-position="top">
          <Input v-model="formData.password" placeholder="请输入密码..." />
      </FormItem>
    </Form>
    <br><br>
    <Button type="success" long @click="login()">登 录</Button>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formData:{
        name: '',
        password: ''
      }
    }
  },
  methods:{
    login(){
      this.$http.login(this.formData).then((result)=>{
          if(result.success && result.data.length) {
              this.$store.commit('login',result.data[0]);
              localStorage.good_user_info=JSON.stringify(result.data[0]);
              this.$router.push('/home/goods');
          }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-box{
  height:100vh;
  width:100vw;
  background:#1b4572;
  position: relative;
}
.form{
  position: absolute;
  height:300px;
  width: 300px;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
}
</style>
<style>

.form-box .ivu-form .ivu-form-item-label{
  color:#fff;
}
</style>
