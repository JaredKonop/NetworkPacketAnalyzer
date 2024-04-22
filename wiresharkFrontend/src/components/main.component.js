import React, { useState } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select'
// import Table from 'react-bootstrap/Table'
import axios from "axios";
const options = [
  { value: 'wlp4s0', label: 'WLAN' },
  { value: 'lo', label: 'LOOPBACK' },
  { value: 'enp0s31f6', label: 'ETHERNET' },
  { value: 'virbr0', label: 'Virtual Bridge/NAT' },
  { value: 'bluetooth0', label: 'BLUETOOTH' },
  { value: 'udpdump', label: 'UDP Listener remote capture' },
]
const SignUp=()=> {
   const [data, setData] = useState([])

    const handleAxios=(event)=>{
        event.preventDefault();
        NotificationManager.info('Your request is processing just be hold');
        console.log(event.target.interface.value); // reference by form input's `name` tag
        axios({
            method: "POST",
            url: "http://localhost:8080/submit",
            headers: {},
            data: {
                time: event.target.time.value,
                interface:event.target.interface.value
            },
          })
            .then(res => {
                console.log('Data send',res.data)
                NotificationManager.success(res.data.dataToshow, 'Success');
                const fileName = res.data.pathToTXT.split("/C")
                console.log("C"+fileName[1])
                axios({
                  method: "POST",
                  url: "http://localhost:8080/file",
                  headers: {},
                  data: {
                      filePath:"C"+fileName[1]
                  },
                }).then(res=>{
                  console.log('Data recieved',res.data)
                      // print all lines
                  setData(res.data)
                })
                .catch(err=>{
                  console.log('Data err',err)
                })
            })
            .catch(err =>{ 
               //  NotificationManager.error(err, 'Error');
                console.log(err)
            })
    }
        return (
        <div className='row'>
            <div id="innerBox" className="col-sm-6">
               <form onSubmit={handleAxios}>
                  <h3>Wireshark</h3>
                  <div className="form-group">
                     <label>Time in Seconds</label>
                     <input type="number" name = "time" className="form-control" placeholder="Estimated time" />
                  </div>
                  <div className="form-group">
                     <label>Interface</label>
                     <Select name ="interface"options={options} />
                  </div>
                  <button type="start" className="btn btn-dark btn-lg btn-block">Start</button>
               </form>
               <NotificationContainer/>            
            </div>
            <div id="innerBoxData" className="col-sm-6">
               {data.map(line=>{
                  return  <p>{line}</p>
               })}
               </div>
         </div>
         )
    }
    
    export default SignUp;
