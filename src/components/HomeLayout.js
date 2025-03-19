
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Layout,Avatar, Menu, Breadcrumb,Button,Input,Row,Select,Form, Col, Divider,Card,Dropdown,Switch,
    message, Tooltip,Image,Drawer  } from 'antd';
import {
 
  HomeOutlined,
  MenuOutlined,
 
  
} from '@ant-design/icons';
import { MdGroup, MdMailOutline, MdOutlineAutoGraph, MdPhone, MdShoppingCart, MdTableBar, MdVideocam } from "react-icons/md";
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';

import { NavLink } from 'react-router-dom'
import { PageHeader, Descriptions,Affix,notification,Modal,Alert } from 'antd';
import { Link,withRouter} from 'react-router-dom';
import axios from 'axios'
import logo from '../assets/wagerwyze_logo.jpeg';
import bkgrnd_imge from '../assets/purple_bg.jpg';

import * as serverconfig from "./serverconn.js";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const FormItem=Form.Item;
const { Meta } = Card;

const HomeLayout = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [login_visible, setlogin_visible] = useState(false);
  const [shownotificationmodal, setshownotificationmodal] = useState(false);
  const [numberofnotifications, setnumberofnotifications] = useState(0);


  // Function to check if the screen size is mobile
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
  };



  useEffect(() => {
    // Check initial screen size
    checkIsMobile();

    // Add event listener for screen resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);




    return (

         <div 
         
         >
             <Layout className="site-layout" style={{background:'#fff',margin:10}} >
            
            {/** Header */}

          <div style={{marginBottom:3}} >
          
                {
                  isMobile===true ? 
                  <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'row',flexWrap:'wrap'}}>
                    <span>
                    <MenuOutlined onClick={
                      () => {
                        setDrawerVisible(true);
                      }
                    
                    } style={{ position:'absolute', top: '20px', left: '20px', zIndex: 1000, fontSize: '24px', cursor: 'pointer' }} />
                  
                    <Drawer
                      title="Tabs"
                      placement="left"
                      onClose={() => {
                        setDrawerVisible(false);
                      }}
                      visible={drawerVisible}
                      width={200}         
                    >
                      <Menu mode="inline" >
                      <Menu.Item key="1" onClick={() => {
                        setDrawerVisible(false);
                      }}> <NavLink to='/'><span> <HomeOutlined/> Home</span></NavLink></Menu.Item>
                      
                      <Menu.Item key="4"><NavLink to='/teams'><span> <MdGroup/> Teams</span></NavLink></Menu.Item>
                      <Menu.Item key="5"><NavLink to='/statistics'><span> <MdOutlineAutoGraph/>Scores</span></NavLink></Menu.Item>
                      <Menu.Item key="6"><NavLink to='/videoanalysis'><span> <MdVideocam/> Video Analysis</span></NavLink></Menu.Item>
                      <Menu.Item key="3"><NavLink to='/contact'><span> <MdPhone/> Contact Us</span></NavLink></Menu.Item>

                    </Menu>
                    </Drawer>
                    </span>

                    <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'row',margin:20}}>
                      
                          <span style={{margin:2}}>
                              <Dropdown.Button 
                                overlay={(    
                                <Menu >
                                  <Menu.Item key="1" 
                                  onClick={()=>{
                                    setlogin_visible(true)
                                  }}>
                                    Continue 
                                  </Menu.Item> 
                                </Menu>)}
                                  onClick={()=>{
                                      setlogin_visible(true)
                                  }}
                              >
                                  Login
                              </Dropdown.Button>
                          </span>

                    </div>

                  </div>
              : 

                   <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                        <Image
                          width={100}
                          height={100}
                          src={logo}   
                          preview={false} 
                          />

                      <Menu mode='horizontal'
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >

                      <Menu.Item key="1"> <NavLink to='/'><span> <HomeOutlined/ > Home</span></NavLink></Menu.Item>
                      <Menu.Item key="4"><NavLink to='/teams'><span> <MdGroup/> Teams</span></NavLink></Menu.Item>
                      <Menu.Item key="5"><NavLink to='/statistics'><span> <MdOutlineAutoGraph/>Scores</span></NavLink></Menu.Item>
                      <Menu.Item key="6"><NavLink to='/videoanalysis'><span> <MdVideocam/> Video Analysis</span></NavLink></Menu.Item>

                      <Menu.Item key="3"><NavLink to='/contact'><span> <MdPhone/> Contact Us</span></NavLink></Menu.Item>

                      </Menu>

                      <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'row'}}>
                    
                          <span style={{margin:2}}>
                              <Dropdown.Button 
                                overlay={(    
                                <Menu >
                                  <Menu.Item key="1" 
                                  onClick={()=>{
                                    setlogin_visible(true)
                                  }}>
                                    Continue 
                                  </Menu.Item> 
                                </Menu>)}

                                  onClick={()=>{
                                      setlogin_visible(true)
                                  
                                  }}

                              >
                                  Signup
                              </Dropdown.Button>
                            
                          </span>

                        </div>

                  </div>

                }

              </div>
               

              {/** content */}
              <Content 

                style={{
                  backgroundImage: `url(${bkgrnd_imge})`, // Set the background image
                  backgroundSize: 'cover', // Cover the entire layout
                  backgroundPosition: 'center', // Center the image
                  minHeight: '100vh', // Ensure the background covers the full viewport height
                  margin: '0 2px'
                }}
         
              // style={{ ,background:'#fff' }}
              
              >

              <div className="site-layout-background" >
                 {/** Semi-transparent overlay */}
          

              {
                 isMobile ?
                  <p style={{display:'flex',justifyContent:'center',alignSelf:'center'}}>
                 {/* <Image
                  width={100}
                  height={100}
                  src={logo}   
                  preview={false} 
                  /> **/}
                  </p>
                  
                  :
                  null
    
                }
          
             {props.children}

           </div>
         </Content>

        
        {/** Footer */}
        <Footer style={{ textAlign: 'center',fontWeight:'bolder' }}>
          Design ©{new Date().getFullYear()} Created by wagerwyze
        </Footer>

        </Layout>
      
      </div>

        
  );

  

}

export default withRouter(HomeLayout);

  
