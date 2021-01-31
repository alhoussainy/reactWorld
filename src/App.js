import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import NotFund from './pages/NotFund';
import About from './pages/About';




const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/apropos" exact component={About} />
        <Route component={NotFund} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
