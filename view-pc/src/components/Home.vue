<style scoped>
.layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.content{
    overflow-x: auto;
    height: calc(100vh - 64px);
}
.ivu-layout-sider{
    background: #515a6e;
    padding-top: 50px;
}
.header-box{
    line-height: 64px;
    font-size: 18px;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #fff;
    display:flex;
    justify-content: space-between;
}
.dropdown{
    line-height:24px;
    font-size:12px;
    color:#333;
}
.dropdown div{
    margin:0 14px;
}
.dropdown .unlogin{
    color:#2d8cf0;
    cursor: pointer;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{background:'#464f64'}">
                <div class="header-box">
                    <div class="header-left">
                    货品管理系统
                    </div>
                    <div class="header-right">
                        <Dropdown>
                            <a href="javascript:void(0)">
                                <Avatar icon="ios-person" />
                            </a>
                            <div slot="list" class="dropdown">
                                <div class="user">欢迎 {{user.name}}!</div>
                                <div class="unlogin" @click="unlogin()">退出登录</div>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider hide-trigger>
                    <Menu :active-name="currentMenu" theme="dark" width="auto">
                      <MenuItem v-for="item in menu" :key="item.name" :name="item.name" :to="item.url">{{item.label}}</MenuItem>
                    </Menu>
                </Sider>
                <Layout class="content" :style="{padding: '0 24px 24px'}">
                    <Content>
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import { menu } from '../dict/menu.js'
export default {
  name: 'Home',
  data () {
    return {
      currentMenu: '0',
      menu: menu
    }
  },
  computed:{
      user(){
          return this.$store.state.user
      },
      isManager(){
          return this.$store.state.user.role === 1;
      }
  },
  watch:{
    // '$route'(to, from) {
        
    // }
  },
  methods: {
      unlogin(){
            this.$store.commit('unlogin');
            localStorage.removeItem('good_user_info');
            this.$router.push('/login');
      }
  },
  mounted(){
        // 回显菜单当前项
        let path = this.$route.path;
        this.menu.forEach(item => {
            if(item.url === path) {
                this.currentMenu = item.name;
            }
        });
        // 处理角色
        if(!this.isManager) {
            this.menu = menu.filter(item=>{
              return item.show;
          })
        }
  }
}
</script>
