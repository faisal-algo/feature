import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainScreen from './Components/MainScreen';
import Modal from './Components/Modal';

export default function App() {
  const modalType = localStorage.getItem('modalType');

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainScreen />
        </Route>
        <Route path="/modalA" render={() => <Modal modalType={modalType} />} />
        <Route path="/modalB" render={() => <Modal modalType={modalType} />} />
      </Switch>
    </Router>
  );
}
