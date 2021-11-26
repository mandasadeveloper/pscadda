import axios from 'axios';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

function TestList() {
  let UrlHttp ="http://127.0.0.1:8000/api";
    var url = window.location.pathname;
    var splitUrl = url.split('/');   
    const uid = splitUrl[2];
const [data, setData]=useState();
useEffect(() => {   
getData();
}, [])

const getData=()=>{
  axios.get(`${UrlHttp}/test_list_get/${uid}`).then(res=>{
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
               <Link to={`/quiz-list/${user.id}`}>
               <div className="card-content black-text">
                  <span className="card-title">{user.quiz}</span>                  
                </div>  
                </Link>              
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

export default TestList
