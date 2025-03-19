import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Table, Spin} from 'antd';
import axios from 'axios'
import * as serverconfig from "./serverconn.js";

const Teams = (props) => {
  const [dataloading, setdataloading] = useState(true);
  const [teams, setteams] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

  const columns = [
   
    {
      title: 'ID',
      dataIndex: 'team_id',
      key: 'team_id',
    },
    {
      title: 'Team',
      dataIndex: 'team_name',
      key: 'team_id',
    },
    {
      title: 'Division',
      dataIndex: 'team_division',
      key: 'team_id',
    },
    {
      title: 'Conference',
      dataIndex: 'team_conference',
      key: 'team_id',
    },

  ];

   
   useEffect(() => {
      //get date
      load_initdata()
     }, []);

    //load data
    const load_initdata=()=>{
     
      axios.get(`${serverconfig.backendserverurl}/app-dataaa-api/get_teams_data`)
      .then(res => {  
        //console.log(res.data)
        setteams(res.data)

        setdataloading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

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
          <Table 
            scroll={{ x: 1000 }}
            columns={columns}
            pagination={{showQuickJumper:true,showSizeChanger:true }}
            dataSource={teams} 
            bordered
          />



        </div>
      }

    </div>
  );
};
export default withRouter(Teams) ;