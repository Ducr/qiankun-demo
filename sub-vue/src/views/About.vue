<template>
  <div class="home">
    <div>
      <p>当前处于<code>{{ isInQiankun ? 'qiankun' : '独立运行'}}</code>环境sub-vue应用About页</p>
      <p>sub-vue子应用的user state：<code> {{ JSON.stringify(user) }}</code></p>
    </div>
    <div class="btns">
      <template v-if="isInQiankun">
        <button @click="gotoSubReact">跳转到`sub-react`子应用</button>
        <button @click="openSubVue">独立打开sub-vue子应用</button>
      </template>
      <button @click="changeUsername">{{ `改变${isInQiankun ? '全局的' : '独立子应用'}state` }}</button>
      <button @click="gotoHome">{{ `跳转到${isInQiankun ? 'qiankun环境' : '独立运行'}的首页` }}</button>
    </div>
    <h1>{{ `${isInQiankun ? 'qiankun环境' : '独立运行'}sub-vue应用About页` }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {},
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
      window.history.pushState(null, '/qiankun/sub-react', '/qiankun/sub-react')
    },
    gotoHome () {
      if (this.isInQiankun) {
        history.pushState(null, '/qiankun/sub-vue', '/qiankun/sub-vue')
      } else { // 独立环境，用回$router来跳转
        this.$router.push('/')
      }
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
