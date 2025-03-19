import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Table, Spin} from 'antd';
import axios from 'axios'
import * as serverconfig from "./serverconn.js";

const Statistics = (props) => {
  const [dataloading, setdataloading] = useState(true);
  const [scores, setscores] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

  const columns = [
   
    {
      title: 'Date',
      dataIndex: 'schedule_date',
      key: 'over_under_line',
    },
    {
      title: 'Team Home',
      dataIndex: 'team_home',
      key: 'over_under_line',
    },

    {
      title: 'Team Away',
      dataIndex: 'team_away',
      key: 'over_under_line',
    },
    {
      title: 'Home Score',
      dataIndex: 'score_home',
      key: 'over_under_line',
    },
    {
      title: 'Away Score',
      dataIndex: 'score_away',
      key: 'over_under_line',
    },

    {
      title: 'Season',
      dataIndex: 'schedule_season',
      key: 'over_under_line',
    },
    {
      title: 'Week',
      dataIndex: 'schedule_week',
      key: 'over_under_line',
    },
    {
      title: 'PlayOff?',
      dataIndex: 'schedule_playoff',
      key: 'over_under_line',
      render: (text,record) =><p>{record.schedule_playoff===true?"Yes":"No"}</p>
    },

    {
      title: 'Stadium',
      dataIndex: 'stadium',
      key: 'over_under_line',
    },

    {
      title: 'Over/Under line',
      dataIndex: 'over_under_line',
      key: 'over_under_line',
    },

  ];

   
   useEffect(() => {
      //get date
      load_initdata()
     }, []);



    //load data
    const load_initdata=()=>{
     
      axios.get(`${serverconfig.backendserverurl}/app-dataaa-api/get_current_statistics`)
      .then(res => {  
        //console.log(res.data)
        setscores(res.data)
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
              dataSource={scores} 
              bordered
            />
          </div>

          
        }

      </div>
  );
};
export default withRouter(Statistics) ;