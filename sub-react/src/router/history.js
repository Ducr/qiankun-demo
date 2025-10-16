import { createBrowserHistory } from 'history';

const getBasename = () => {
  if (window.__POWERED_BY_QIANKUN__) {
    return '/sub-react';
  }
  return process.env.PUBLIC_URL || '/subapp/sub-react';
};

export const history = createBrowserHistory({
  basename: getBasename()
});

export default history;
