import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './history';
import Home from '../pages/Home';

const getBasename = () => {
  if (window.__POWERED_BY_QIANKUN__) {
    return '/sub-react';
  }
  return process.env.PUBLIC_URL || '/subapp/sub-react';
};

// 检查是否在正确的基路径下
const isInCorrectBasePath = () => {
  return window.location.pathname.startsWith(getBasename());
};

const Routes = () => {
  const basename = getBasename();
  return (
    <Router history={history} basename={basename}>
      <Switch>
        {/* 如果不在正确的基路径下，重定向到正确的路径 */}
        <Route exact path="/" render={() => {
          if (!isInCorrectBasePath()) {
            // 如果直接访问根路径，重定向到带基路径的首页
            return <Redirect to={`/`} />;
          }
          return <Home />;
        }} />
        {/* 其他路由 */}
        <Route exact path="/" component={Home} />
        {/* 404 页面 */}
        <Route render={() => (
          <div className="page">
            <h1>404 - 页面未找到</h1>
            <button className="btn" onClick={() => history.push('/')}>
              返回首页
            </button>
          </div>
        )} />
      </Switch>
    </Router>
  );
}
export default Routes;


// class Routes extends React.Component {
//   render() {
//     return (
//       <Router history={history} basename={window.__POWERED_BY_QIANKUN__ ? '/sub-react' : process.env.PUBLIC_URL}>
//         <Switch>
//           <Route exact path="/" component={Home} />
//           {/* 404 页面 */}
//           <Route render={() => (
//             <div className="page">
//               <h1>404 - 页面未找到</h1>
//               <button className="btn" onClick={() => history.push('/')}>
//                 返回首页
//               </button>
//             </div>
//           )} />
//         </Switch>
//       </Router>
//     );
//   }
// }
