<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <div class="logo" @click="gotoMain()">QIANKUN-DEMO</div>
      <ul class="sub-apps">
        <li :class="{active: !current.includes('/qiankun/sub-')}" @click="gotoMain()">main-app</li>
        <li v-for="item in microApps" :class="{active: current.startsWith(item.activeRule)}" :key="item.name" @click="goto(item)">{{ item.name }}</li>
      </ul>
      <div class="userinfo">主应用的state：{{ JSON.stringify(state) }}</div>
    </div>
    <router-view v-if="!current.includes('/qiankun/sub-')" class="mainapp-viewport" />
    <div v-else id="subapp-viewport"></div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import microApps from './micro-app'
import store from '@/store'
export default {
  name: 'App',
  data () {
    return {
      isLoading: true,
      microApps,
      // current: '/qiankun/sub-vue'
      current: '/qiankun/main-app'
    }
  },
  computed: {
    state () {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')

      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  components: {},
  methods: {
    gotoMain () {
      history.pushState(null, process.env.VUE_APP_PUBLIC_URL, process.env.VUE_APP_PUBLIC_URL)
    },
    goto (item) {
      history.pushState(null, item.activeRule, item.activeRule)
    },
    bindCurrent () {
      const path = window.location.pathname
      this.current = path
      // if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
      //   this.current = path
      // }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          // 对跳转到主应用触发加载进度，子应用中由loader方法触发
          if (!this.current?.includes('/qiankun/sub-')) {
            NProgress.start()
          }
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          if (!this.current?.includes('/qiankun/sub-')) {
            NProgress.done()
          }
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    }
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    this.listenRouterChange()
    if (!this.current.includes('/qiankun/sub-')) {
      NProgress.done()
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0 !important;
  padding: 0;
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
.layout-wrapper {
  .layout-header {
    height: 50px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    line-height: 50px;
    position: relative;
    .logo {
      float: left;
      margin: 0 50px;
      cursor: pointer;
    }
    .sub-apps {
      list-style: none;
      margin: 0;
      li{
        list-style: none;
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;
        &.active {
          color: #42b983;
          text-decoration: underline;
        }
      }
    }
    .userinfo {
      position: absolute;
      right: 50px;
      top: 0;
    }
  }
  .mainapp-viewport {
    text-align: center;
    color: #2c3e50;

    .btns {
      margin: 100px;
    }
    .btns button {
      margin: 0 10px;
    }
  }
  #subapp-viewport {
    .App-header {
      min-height: calc(100vh - 50px) !important;
    }
  }
}
</style>
