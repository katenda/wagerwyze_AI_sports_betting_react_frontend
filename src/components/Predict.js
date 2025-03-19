import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import * as serverconfig from "./serverconn.js";
import { Form, Input, Button,Select,message,Spin,Card } from 'antd';

const { Option } = Select;

const Predict = (props) => {
  const [dataloading, setdataloading] = useState(true);
  const [teams, setteams] = useState([]);
  const [home_team, sethome_team] = useState('');
  const [away_team, setaway_team] = useState('');
  const [prediction_results, setprediction_results] = useState('');

  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

  const FormItem=Form.Item;

   //user effect
    useEffect(() => {
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

    //send prediction request
    const send_prediction_request=()=>{
      //check if not same selected team for home and away
      if (home_team!=away_team && home_team!='' && away_team!=''){
        setdataloading(true)

        let form_data = new FormData();
        form_data.append('home_team', home_team);
        form_data.append('away_team', away_team);
    
        ///make a post request now
          axios.post(serverconfig.backendserverurl+'/app-dataaa-api/make_prediction', form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then(res => {
            setdataloading(false)
            message.info(res.data.message)
            setprediction_results(res.data.message)

          })
          .catch(error => console.log(error))
      
      }else{
        message.error("Home team cant be the same as away team")
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
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',flexDirection:'column',margin:10,width:'100%' }}>
                <Card style={{display: 'flex',  justifyContent:'center', alignItems:'center',flexDirection:'column'}}>

                <h3 style={{display:'flex',justifyContent:'center',color:'purple',fontWeight:'bolder'}}>Get our NFL match predictions</h3>
                <FormItem 
                label={<h4 style={{fontWeight:'bold'}}>Home Team</h4>}
                >
                  <Select 
                  placeholder="Home team" 
                  style={{  }} 
                  value={home_team}
                  onChange={(val)=>{sethome_team(val)}} 
                  showSearch
                  optionFilterProp="children"
                  onFocus={()=>{}}
                  onBlur={()=>{}}
                  onSearch={()=>{}} 
                  >
                    {teams.map(
                      (accnt)=>(
                        <Option value={accnt.team_id}>{accnt.team_id} | {accnt.team_name}</Option>
                      ))}
                  </Select>
                </FormItem>


                <FormItem 
                label={<h4 style={{fontWeight:'bold'}}>Away Team</h4>}
                >
                  <Select 
                  placeholder="Away team" 
                  style={{  }} 
                  value={away_team}
                  onChange={(val)=>{setaway_team(val)}} 
                  showSearch
                  optionFilterProp="children"
                  onFocus={()=>{}}
                  onBlur={()=>{}}
                  onSearch={()=>{}} 
                  >
                    {teams.map(
                      (accnt)=>(
                        <Option value={accnt.team_id}>{accnt.team_id} | {accnt.team_name}</Option>
                      ))}
                  </Select>
                </FormItem>


                <FormItem>
                  <Button  type="primary" htmlType='button' onClick={()=>{send_prediction_request()}}>Get Prediction</Button>
                </FormItem>


                {
                 prediction_results!=""?
                <h2 style={{display:'flex',justifyContent:'center',color:'green',fontWeight:'bolder'}}>{prediction_results}</h2>
                :null
               }

                </Card>

                
              </div>
              }
   
    </div>
  );
};
export default  withRouter(Predict)  ;