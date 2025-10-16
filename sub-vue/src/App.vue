<template>
  <div id="app">
    <div>
      <p>当前处于<code>{{ isInQiankun ? 'qiankun' : '独立运行'}}</code>环境</p>
      <p>sub-vue子应用的user state：<code> {{ JSON.stringify(user) }}</code></p>
    </div>
    <div class="btns">
      <template v-if="isInQiankun">
        <button @click="gotoSubReact">跳转到`sub-react`子应用</button>
        <button @click="openSubVue">独立打开sub-vue子应用</button>
      </template>
      <button @click="changeUsername">{{ `改变${isInQiankun ? '全局的' : '独立子应用'}state` }}</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    // 通过global获取user的信息
    ...mapState('global', {
      user: state => state.user
    }),
    isInQiankun () {
      return window.__POWERED_BY_QIANKUN__
    }
  },
  methods: {
    // setGlobalState 是在 /common/src/store/global-register.js中定义的
    ...mapActions('global', ['setGlobalState']),
    gotoSubReact () {
      // 跳转到子应用
      window.history.pushState(null, 'sub-react', '/sub-react')
    },
    changeUsername () {
      // 也可通过 store.commit('global/setGlobalState', { user: '阿杜' }) 进行操作
      this.setGlobalState({
        user: this.isInQiankun
          ? { name: '阿杜-sub-vue-子应用-' + Math.round(Math.random() * 100) }
          : { name: '阿杜-sub-vue-独立运行-' + Math.round(Math.random() * 100) }
      })
    },
    openSubVue () {
      if (!this.isInQiankun) {
        alert('当前已经是单独运行的子应用')
        return
      }

      // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
      window.open(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#app {
  text-align: center;
  color: #2c3e50;
}

.btns {
  margin: 100px;
}
.btns button {
  margin: 0 10px;
}

</style>
