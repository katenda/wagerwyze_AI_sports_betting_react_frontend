import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
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

const Predict = (props) => {
  const [dataloading, setdataloading] = useState(true);
  const [teams, setteams] = useState([]);
  const [home_team, sethome_team] = useState('');
  const [away_team, setaway_team] = useState('');
  const [prediction_results, setprediction_results] = useState('');
  const [who_wins, setwho_wins] = useState('');
  const [who_loses, setwho_loses] = useState('');
  const [date, setdate] = useState(moment().format(dateFormat).toString());
  const [graph, setgraph] = useState({});
  const [chartData, setChartData] = useState(null);
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

        if(localStorage.getItem("login")){
          var data=JSON.parse(localStorage.getItem("login"))
          
          let form_data = new FormData();

          form_data.append('home_team', home_team);
          form_data.append('away_team', away_team);
          form_data.append('home_team_name', get_team_name(home_team));
          form_data.append('away_team_name', get_team_name(away_team));
          
          form_data.append('client_id', data.pk);

          ///make a post request now
            axios.post(serverconfig.backendserverurl+'/app-dataaa-api/make_prediction', form_data, {
              headers: {
                'content-type': 'multipart/form-data'
              } })
            .then(res => {
              setdataloading(false)
              message.info(res.data.message)
              setprediction_results(res.data.message)
  
              setwho_wins(res.data.winner)
              setwho_loses(res.data.loser)
              setgraph(res.data.graph)
  
              //set chart her
              setChartData({
                labels: res.data.graph.decades,
                datasets: [
                  {
                    label: get_team_name(home_team)+" Wins",
                    data: res.data.graph.team_one_wins,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  {
                    label: get_team_name(away_team)+" Wins",
                    data: res.data.graph.team_two_wins,
                    borderColor: "green",
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    borderWidth: 2,
                    tension: 0.4,
                  },
                ],
              });
  
            })
            .catch(error => console.log(error))

        }else{
          message.error("Please signup first")
        }
      
      }else{
        message.error("Home team cant be the same as away team")
      }

    }

    // get team name
    const get_team_name=(team_id)=>{
      const foundItem = teams.find(item => item.team_id === team_id);
      var team_name=''

      if (foundItem!=undefined){
        team_name=foundItem.team_name
      }
      return team_name
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

            <div style={{display: 'flex',flexDirection:'column',margin:10,width:'45%',flexWrap:'wrap' }}>
              <Card style={{display: 'flex',flexDirection:'column',width:'100%'}}>
                <h3 style={{color:'#5D3FD3',fontWeight:'bolder'}}>Prediction Instructions</h3>
                <Divider></Divider>
                <h4>1. Choose team one from the first dropdown list</h4>
                <h4>2. Pick a second team from the second dropdown list</h4>
                <h4>3. A predictive model is running in the backend which will predict the winning team name which could be considered accurate by 90 % </h4>

                <div>
                {chartData ? (
                   <div style={{ width: "100%", height: "300px", margin: "auto" }}>
                    <h2 style={{display:'flex',justifyContent:'center',color:'#5D3FD3',fontWeight:'bolder'}} >Team Wins per Decade</h2>

                  <Line 
                  data={chartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Decade", // Label for X-axis
                          font: { size: 14, weight: "bold" },
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Total Wins", // Label for Y-axis
                          font: { size: 14, weight: "bold" },
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
      
                  
                  />
                  </div>
                ) : (
                  <p>{null}</p>
                )}
              </div>


              </Card>

            </div>


              {/**Beginning of right div */}

            <div style={{display: 'flex',flexDirection:'column',margin:10,width:'45%',justifyContent:'right',flexWrap:'wrap'}}>
              <Card style={{display: 'flex',flexDirection:'column',width:'100%'}}>

              <FormItem 
              label={<h4 style={{fontWeight:'bold'}}>Team one</h4>}>
                <Select 
                placeholder="Team one" 
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
              label={<h4 style={{fontWeight:'bold'}}>Team two</h4>}
              >
                <Select 
                placeholder="Team two" 
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

             
              <div style={{display:'flex',justifyContent:'right'}}>
                <FormItem>
                  <Button  type="primary" htmlType='button' onClick={()=>{send_prediction_request()}}>Get Prediction</Button>
                </FormItem>
              </div>


              {
               prediction_results!=""?
               <div>
                <Divider></Divider>
                <h2 style={{display:'flex',justifyContent:'center',color:'#5D3FD3',fontWeight:'bolder'}}>{prediction_results}</h2>
               </div>
                :null
              }


              {/** winning section */}
              
              {
                home_team!=""?
                <div>
                <Divider></Divider>
                <h4>Date: {date}</h4>
                <h4>Match: {home_team} vs {away_team}</h4>

                {
                  prediction_results!=""?
                  <h4> 
                  {who_wins} could win this match and we are 90% accurate based on the data collected from NFL dataset since 1960 for team {who_wins} and team {who_loses}
                  </h4>
                  :null
                }
                
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
export default  withRouter(Predict)  ;