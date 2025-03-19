import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import HomeLayout from './components/HomeLayout';
import Predict from './components/Predict';
import Teams from './components/Teams';
import Statistics from './components/Statistics';

const App = (props) => {
  return (
    <Router>
        {/**Main layout */}
        <HomeLayout >

        {/** Routing Switch */}
         <Switch>
          <Route exact path='/' component={Predict}></Route>
          <Route exact path='/teams' component={Teams}></Route>
          <Route exact path='/statistics' component={Statistics}></Route>
        </Switch> 

      </HomeLayout>


    </Router>




  );
};
export default App;