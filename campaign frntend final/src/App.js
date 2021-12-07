import React from 'react';
import Login from './components/Login/index'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCampaign from './components/Campaign/AddCampaign';


function App() {
  return (
    <div>


      <Router>
    <Route exact path="/" component={Login}/>
    <Route path="/add-campaign" component={AddCampaign}/>

  </Router>
    </div>
  );
}

export default App;
