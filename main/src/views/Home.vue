<template>
  <div class="home">
    <div>
      <p>当前处于主应用首页</p>
      <p>主应用的state：<code> {{ JSON.stringify(state) }}</code></p>
    </div>
    <div class="btns">
      <button @click="changeUsername">改变主应用的state</button>
      <button @click="gotoAbout">跳转到主应用的About页</button>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Home',
  components: {},
  computed: {
    state () {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')

      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    }
  },
  methods: {
    gotoAbout () {
      history.pushState(null, `${process.env.VUE_APP_PUBLIC_URL}/about`, `${process.env.VUE_APP_PUBLIC_URL}/about`)
    },
    changeUsername () {
      store.setGlobalState({
        user: { name: 'Ducr-主应用-' + Math.round(Math.random() * 100) }
      })
    }
  }
}
</script>
