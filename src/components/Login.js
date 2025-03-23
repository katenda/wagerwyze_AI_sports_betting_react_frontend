import React, { useState, useEffect } from 'react';
import { LoadingOutlined,UserOutlined,LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import * as serverconfig from "./serverconn.js";
import { Form, Input, Button,Select,message,Spin,Card,Image, Divider,Avatar } from 'antd';
import logo from '../assets/wagerwyze_logo.jpeg';
import moment from 'moment';
import { Line,Pie,Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const Login = (props) => {
  const [dataloading, setdataloading] = useState(true);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [result, set_result] = useState('');

  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
  const FormItem=Form.Item;
  const history = useHistory();


   //user effect
    useEffect(() => {
      setdataloading(false)
    }, []);


      //send prediction request
      const user_login=()=>{
        //check if not same selected team for home and away
        if ( username!='' && password!=''){
          setdataloading(true)
          let form_data = new FormData();
          form_data.append('username', username);
          form_data.append('password', password);
          ///make a post request now
          axios.post(serverconfig.backendserverurl+'/app-dataaa-api/user_login', form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then(res => {
            setdataloading(false)
            message.info(res.data.message)
            set_result(res.data.message)

            if (res.data.message==="success"){
              //set user data
              localStorage.setItem('login', JSON.stringify(res.data.user_data));
              //reload
              history.push("/");
              window.location.reload(false)

            }


          }).catch(error => console.log(error))
        
        }else{
          message.error("Home team cant be the same as away team")
        }

      }


         if(dataloading===true) {
          return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center' }}>
              <Spin indicator={antIcon} />
            </div>
            );
         }else  {
          return (
            <div style={{display:'flex',flexDirection:'column'}}>
            
              {/** form */}

             <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap'}}>

              {/**Beginning of right div */}

            <div style={{display: 'flex',flexDirection:'column',margin:10,width:'40%',justifyContent:'center' }}>
              <Card style={{display: 'flex',flexDirection:'column',width:'100%'}}>
            

            <h3 style={{display:'flex',justifyContent:'center',color:'#5D3FD3',fontWeight:'bolder'}}>Login </h3>
            
            <Form>

            <Form.Item
              label="User Name"
            >
              <Input 
              prefix={<UserOutlined className="site-form-item-icon" />}
               placeholder="Username"  
               value={username} 
                onChange={(val)=>{setusername(val.target.value)}} />
            </Form.Item>


            <Form.Item
              label="Password"
            >
              <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(val)=>{setpassword(val.target.value)}}
              />
            </Form.Item> 
      
            <div style={{display:'flex',justifyContent:'right'}}>
              <FormItem>
                <Button  type="primary" htmlType='submit'
                onClick={()=>{user_login()}}>LOG IN</Button>
              </FormItem>
            </div>

            </Form>

            {/** check login status */}

            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
              <h3>Don't have an account? </h3>
              <NavLink to='/signup'><span style={{color:'#5D3FD3',fontWeight:'bolder'}}> JOIN NOW</span></NavLink>
            </div>

            {
              result!=""?
                <div>
                  <Divider></Divider>
                  <h2 style={{display:'flex',justifyContent:'center',color: result==="success"?"green":"red",fontWeight:'bolder'}}>{result==="success"?"Logged in":result}</h2>
                </div>
              :
              null
            }


            </Card>

            </div>


            </div>
            </div>
          );
          
         }

};
export default  withRouter(Login)  ;