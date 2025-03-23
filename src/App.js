import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import HomeLayout from './components/HomeLayout';
import Predict from './components/Predict';
import Teams from './components/Teams';
import Statistics from './components/Statistics';
import Signup from './components/Signup';
import Login from './components/Login';
import Carousel_comp from './components/Carousel_comp';
import Insights from './components/Insights';

const App = (props) => {
  const [user_profile, setuser_profile] = useState({});

  //check login status
  const check_login=()=>{
    if(localStorage.getItem("login")){
      setuser_profile(JSON.parse(localStorage.getItem("login")))
    }
  }

  useEffect(() => {
    //check login status
    check_login()
  }, [localStorage.getItem("login")]);

  return (
    <Router>
        {/**Main layout */}
        <HomeLayout >

        {/** Routing Switch */}
         <Switch>
         
          {
            JSON.stringify(user_profile)==="{}"?
            <Route exact path='/' component={Carousel_comp}></Route>
            :
            <Route exact path='/' component={Predict}></Route>
          }

          <Route exact path='/teams' component={Teams}></Route>
          <Route exact path='/statistics' component={Statistics}></Route>
          <Route exact path='/signup' component={Signup}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/account' component={Insights}></Route>

        </Switch> 

      </HomeLayout>

    </Router>

  );
};
export default App;