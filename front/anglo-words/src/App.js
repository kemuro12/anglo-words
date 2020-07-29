import React from 'react';
import Header from './components/Header/Header';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';

function App(props) {
  return (
    <div>
      <Header />
      <Route exact path="/" render={() => <div>main</div>} />
      <Route path="/vocabulary" render={() => <div>vocabulary</div>} />
      <Route path="/login" render={() => <Login />} />
    </div>
  );
}

export default App;
