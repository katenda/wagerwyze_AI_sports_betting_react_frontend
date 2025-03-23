import React, { useState, useEffect } from 'react';
import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Table, Spin, Divider} from 'antd';
import axios from 'axios'
import * as serverconfig from "./serverconn.js";
import { MdLogout } from 'react-icons/md';
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const Insights = (props) => {
  const [dataloading, setdataloading] = useState(true);
  const [report, setreport] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
  const [user_profile, setuser_profile] = useState({});
  
  const history = useHistory();

  const columns = [
   
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'id',
    },
    {
      title: 'Home Team',
      dataIndex: 'home_team',
      key: 'id',
    },
    {
      title: 'Away Team',
      dataIndex: 'away_team',
      key: 'id',
    },
    {
      title: 'Winner',
      dataIndex: 'winner',
      key: 'id',
    },
   

  ];

   
   useEffect(() => {
      //get date
      check_login()

      load_initdata()
     }, []);


    //check login status
    const check_login=()=>{
      if(localStorage.getItem("login")){
        setuser_profile(JSON.parse(localStorage.getItem("login")))
      }
    }


    //load data
    const load_initdata=()=>{

      if(localStorage.getItem("login")){
        var data=JSON.parse(localStorage.getItem("login"))

        setdataloading(true)

        let form_data = new FormData();
        form_data.append('user_id', data.pk);
  
        axios.post(`${serverconfig.backendserverurl}/app-dataaa-api/get_predictions`, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {  
          //console.log(res.data)
          setreport(res.data)
          setdataloading(false)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

      }

    }
    
    
    return (

    <div>
      
      {
        dataloading===true?
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center' }}>
          <Spin indicator={antIcon} />
        </div>
        :
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',margin:10,flexDirection:'column' }}>
         
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <h3 style={{color:'#fff'}}>UserName: {user_profile.username}</h3>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              
              <NavLink to='/'>
                <LogoutOutlined style={{ fontSize: '24px',color:'#5D3FD3'}} 
                  onClick={()=>{
                    localStorage.removeItem('login')
                    //window.location.reload(false)
                    history.push("/");
                    window.location.reload(false)

                  }}
                />
              </NavLink>

          </div>
          <Divider></Divider>
          <h3 style={{color:'#fff'}}>History</h3>
          <Table 
            scroll={{ x: 1000 }}
            columns={columns}
            pagination={{showQuickJumper:true,showSizeChanger:true }}
            dataSource={report} 
            bordered
          />

        </div>
      }

    </div>
  );
};
export default withRouter(Insights) ;