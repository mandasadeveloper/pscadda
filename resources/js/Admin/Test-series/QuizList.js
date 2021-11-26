import axios from 'axios';
import {useState,useEffect} from 'react'
import {ExcelRenderer} from 'react-excel-renderer';
import { Link } from 'react-router-dom';
import AllTest from './AllTest';

function QuizList() {
  let UrlHttp ="http://127.0.0.1:8000/api";
    var url = window.location.pathname;
    var splitUrl = url.split('/');   
    const uid = splitUrl[2];
const [data, setData]=useState();
const [state, setState] = useState({ 
  rows:"",
  quiztest:"",
  option_1:"",
  option_2:"",
  option_3:"",
  option_4:"",
  answer:""
  });
useEffect(() => {   
getData();
}, [])

const getData=()=>{
  axios.get(`${UrlHttp}/quiz_test_get/${uid}`).then(res=>{
    if(res.data.status === 200){  
      console.log(res.data.data);
      setData(res.data.data);          
    }
  });          
}


const handleInputs=(e)=>{
  const fileObj = e.target.files[0];
  ExcelRenderer(fileObj, (err, resp)=>{
    if(err){
      console.log(err);
    }
    else{  
      setState({        
        rows:resp.rows
      });
    }
  })

}


const Create = (e)=>{
  for(var i = 0; i<state.rows.length; i++)
if(i%7==0){
const data = {
  test_id:uid,
  quiztest:JSON.stringify(state.rows[i]),
  option_1:JSON.stringify(state.rows[i+1]),
  option_2:JSON.stringify(state.rows[i+2]),
  option_3:JSON.stringify(state.rows[i+3]),
  option_4:JSON.stringify(state.rows[i+4]),
  answer:JSON.stringify(state.rows[i+5]),
};
axios.post(`${UrlHttp}/quiz_test_post/`, data).then(res =>{
if(res.data.status === 200){ 
console.log(res.data.message);   
    getData();
  }
  });
}
}
    return (
    <div>
            <div style={{width:"90%", margin:"auto"}} >
        <div className="col s12">
          <div style={{marginTop:"10%", display:"block"}}>             
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="file" 
              id="autocomplete-description" 
              className="autocomplete"
              name="quiz_qustion"             
              onChange={handleInputs}/>                 
              <a onClick={Create} className="waves-effect btn">Create</a>
            </div>        
          </div>
        </div>
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
