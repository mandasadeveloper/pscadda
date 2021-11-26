import axios from 'axios';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';


function CreateTest() {
let UrlHttp ="http://127.0.0.1:8000/api";
const [data, setData]=useState();

useEffect(() => {   
getData();
}, [])

const getData=()=>{
  axios.get(`${UrlHttp}/test_get`).then(res=>{
    if(res.data.status === 200){
      setData(res.data.data);          
    }
  });            
}

    return (
    <div>
            <div style={{width:"90%", margin:"auto"}} >      
        <div className="row">
    <div className="col s12 m6">
     {
         data&&data.map((user,index)=>{
             return(
                <div className="card darken-1" key={index} >
                <div className="card-content black-text">
                  <span className="card-title">{user.cardname}</span>
                  <p>{user.description}</p>
                </div>
                <div className="card-action">
                  <Link to={`/test-list/${user.id}`}>See More</Link>                  
                </div>
              </div>
             )
         })
     }
    </div>
  </div>
      </div>
    </div>
    )
}

export default CreateTest
