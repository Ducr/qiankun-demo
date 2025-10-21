import React from 'react';
import Routes from './router/routers';
import './App.css';

function App(props = {}) {
  return (
    <div className="App">
      <Routes routerBase={props.routerBase} />
    </div>
  );
}

export default App;
