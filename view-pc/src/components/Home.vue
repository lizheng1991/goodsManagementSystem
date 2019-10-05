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
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{background:'#464f64'}">
                <div class="header-box">
                    货品管理系统
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
  watch:{
    // '$route'(to, from) {

    // }
  },
  methods: {
      
  }
}
</script>
