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


const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const Signup = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  
  const [dataloading, setdataloading] = useState(true);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');

  const [result, set_result] = useState('');

  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
  const FormItem=Form.Item;


    // Function to check if the screen size is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

   //user effect
    useEffect(() => {
      setdataloading(false)

      // Check initial screen size
      checkIsMobile();

      // Add event listener for screen resize
      window.addEventListener('resize', checkIsMobile);

      // Cleanup
      return () => {
        window.removeEventListener('resize', checkIsMobile);
      };


    }, []);


    //send prediction request
    const user_signup=()=>{
      //check if not same selected team for home and away
      if ( username!='' && password!=''){
        setdataloading(true)
        let form_data = new FormData();
        form_data.append('username', username);
        form_data.append('password', password);
        ///make a post request now
        axios.post(serverconfig.backendserverurl+'/app-dataaa-api/user_signup', form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          setdataloading(false)
          message.info(res.data.message)
          set_result(res.data.message)

          //reload
          window.location.reload(false)
          
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
            <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}>
            
             {/** form */}
             <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap'}}>

            <div style={{display: 'flex',flexDirection:'column',margin:10,width:isMobile?'95%':'40%',justifyContent:'right',flexWrap:'wrap' }}>
             
            <Card style={{display: 'flex',flexDirection:'column',width:'100%'}}>
            <h3 style={{display:'flex',justifyContent:'center',color:'#5D3FD3',fontWeight:'bolder'}}>Create Account here</h3>
            
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
              name="password"
              label="Password"
              rules={[
                {
                  required: true, message: 'Please input your password!',
                },

              ]}
              hasFeedback

            >
              <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(val)=>{setpassword(val.target.value)}}
              />
            </Form.Item>
  
      
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
      
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password" 
              value={password2}
              onChange={(val)=>{setpassword2(val.target.value)}}
              />
  
            </Form.Item>


             
              <div style={{display:'flex',justifyContent:'right'}}>
                <FormItem>
                  <Button  type="primary" htmlType='submit'
                  onClick={()=>{user_signup()}}>JOIN NOW</Button>
                </FormItem>
              </div>

            </Form>


            {
                result!=""?
                <div>
                  <Divider></Divider>
                  <h2 style={{display:'flex',justifyContent:'center',color:'#5D3FD3',fontWeight:'bolder'}}>{result}</h2>
                  </div>
                  :null
                }

            </Card>

            </div>
            </div>
            </div>
          );
          
         }

};
export default  withRouter(Signup)  ;