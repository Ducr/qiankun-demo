<template>
  <div class="about">
    <div>
      <p>当前处于主应用About页</p>
      <p>主应用的state：<code> {{ JSON.stringify(state) }}</code></p>
    </div>
    <div class="btns">
      <button @click="changeUsername">改变主应用的state</button>
      <button @click="gotoHome">跳转到主应用的首页</button>
    </div>
    <h1>main-app主应用About页</h1>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'About',
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
    gotoHome () {
      history.pushState(null, process.env.VUE_APP_PUBLIC_URL, process.env.VUE_APP_PUBLIC_URL)
    },
    changeUsername () {
      store.setGlobalState({
        user: { name: 'Ducr-主应用-' + Math.round(Math.random() * 100) }
      })
    }
  }
}
</script>
