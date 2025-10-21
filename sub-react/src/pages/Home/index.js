import React from 'react';
import './index.css';
import logo from '../../logo.svg';
import { useState, useEffect } from 'react';

function Home(props) {
  const [isInQiankun] = useState(() => window.__POWERED_BY_QIANKUN__);
  const [globalState, setGlobalState] = useState(() => {
    if (!window.__POWERED_BY_QIANKUN__) {
      // 这里是子应用独立运行的环境，实现子应用的登录逻辑
      // 模拟登录后，存储用户信息到global module
      const userInfo = { name: '我是sub-react独立运行时名字叫Ducr' } // 假设登录后取到的用户信息
      return { user: userInfo };
    }
    return {};
  });

  useEffect(() => {
    if (window.__POWERED_BY_QIANKUN__ && window.mainAppProps) {
      // 初始化获取主应用状态
      const initialState = window.mainAppProps.getGlobalState?.();
      setGlobalState(initialState || {});

      // 监听主应用状态变化
      window.mainAppProps.onGlobalStateChange?.((state, prev) => { // eslint-disable-line no-unused-expressions
        setGlobalState(state);
      }, true);
    }
  }, []);

  const gotoSubVue = () => {
    // 跳转到子应用
    window.history.pushState(null, 'sub-vue', '/qiankun/sub-vue')
  }
  const openSubReact = () => {
    if (!isInQiankun) {
      alert('当前已经是单独运行的子应用')
      return
    }

    // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
    window.open(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
  };

  const changeUsername = () => {
    if (window.__POWERED_BY_QIANKUN__ && window.mainAppProps) {
      window.mainAppProps.setGlobalState?.({ // eslint-disable-line no-unused-expressions
        ...globalState,
        user: { name: '阿杜-sub-react-子应用-' + Math.round(Math.random() * 100) }
      });
    } else {
      setGlobalState({
        ...globalState,
        user: { name: '阿杜-sub-react-独立运行-' + Math.round(Math.random() * 100) }
      });
    }
  };

  return (
    <div className="home">
      <p>当前处于<code>{ isInQiankun ? 'qiankun' : '独立运行'}</code>环境</p>
      <p>sub-react子应用的user state：<code> { JSON.stringify(globalState.user) }</code></p>
      <div className="btns">
          { isInQiankun && <>
              <button onClick={gotoSubVue}>跳转到`sub-vue`子应用</button>
              <button onClick={openSubReact}>独立打开sub-react子应用</button>
            </>
          }
          <button onClick ={changeUsername}>{`改变${isInQiankun ? '全局的' : '独立子应用'}state`}</button>
        </div>
      
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default Home;
