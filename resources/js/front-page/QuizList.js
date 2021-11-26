import axios from 'axios';
import {useState,useEffect} from 'react'
import AllTest from './AllTest';

function QuizList() {
  let UrlHttp ="http://127.0.0.1:8000/api";
    var url = window.location.pathname;
    var splitUrl = url.split('/');   
    const uid = splitUrl[2];
const [data, setData]=useState();
useEffect(() => {   
getData();
}, [])

const getData=()=>{
  axios.get(`${UrlHttp}/quiz_test_get/${uid}`).then(res=>{
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
      <AllTest data={data}/>
      </div>
      </div>
      </div>
      </div>
    )
}

export default QuizList
