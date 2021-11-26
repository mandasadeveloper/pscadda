import axios from 'axios';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {db} from "../../firebase";

function TestList() {
  let UrlHttp ="http://127.0.0.1:8000/api";
    var url = window.location.pathname;
    var splitUrl = url.split('/');   
    const uid = splitUrl[2];
const [data, setData]=useState();
const [state, setState] = useState({
  quiz:"",
  });

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


const handleInputs=(e)=>{
const {name, value}=e.target;
setState((preValue)=>{
return{
...preValue,
[name]:value,
}
})
}
const Create = (e)=>{
e.preventDefault();
const data = {   
  test_id:uid,
  quiz:state.quiz,                        
}        
axios.post(`${UrlHttp}/test_list_post`, data).then(res =>{
  if(res.data.status === 200){     
    setState({     
      quiz:"",
    });
  getData();
  }
  });
}
    return (
    <div>
            <div style={{width:"90%", margin:"auto"}} >
        <div className="col s12">
          <div style={{marginTop:"10%", display:"block"}}>             
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="text" 
              id="autocomplete-description" 
              className="autocomplete"
              name="quiz"
              value={state.quiz}
              onChange={handleInputs}/>
              <label htmlFor="autocomplete-description">Create new Quiz</label>
              <a onClick={Create} className="waves-effect btn">Create</a>
            </div>        
          </div>
        </div>
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
