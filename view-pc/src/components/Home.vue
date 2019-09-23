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
.ivu-layout{
    height:100vh;
}
.ivu-layout-sider{
    background: #515a6e;
    padding-top: 50px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
            </Header>
            <Layout>
                <Sider hide-trigger>
                    <Menu :active-name="currentMenu" theme="dark" width="auto">
                      <MenuItem v-for="item in menu" :key="item.name" :name="item.name" :to="item.url">{{item.label}}</MenuItem>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
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
  watch:{
    // '$route'(to, from) {

    // }
  },
  methods: {
      
  }
}
</script>
