import axios from 'axios';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {db} from "../../firebase";

function CreateTest() {
let UrlHttp ="http://127.0.0.1:8000/api";
const [data, setData]=useState();
const [state, setState] = useState({
cardname:"",
description:"",
});

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

const deleteData=(uid)=>{
db.collection('Test').doc(uid).delete()
.then(()=>{           
getData();
})
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
    cardname:state.cardname,
    description:state.description,                        
  }        
  axios.post(`${UrlHttp}/test_post`, data).then(res =>{
    if(res.data.status === 200){ 
      console.log(res.data.message); 
      setState({
          cardname:"",
          description:"",
      });
    getData();
    }
    });
}
    return (
    <div>
            <div style={{width:"90%", margin:"auto"}} >
        <div className="col s12">
       <form onSubmit={Create}>
       <div style={{marginTop:"10%", display:"block"}}>
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="text" 
              id="autocomplete-cardname" 
              className="autocomplete"
              name="cardname"
              value={state.cardname}
              onChange={handleInputs}/>
              <label htmlFor="autocomplete-cardname">Create new test series</label>             
            </div>        
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="text" 
              id="autocomplete-description" 
              className="autocomplete"
              name="description"
              value={state.description}
              onChange={handleInputs}/>
              <label htmlFor="autocomplete-description">description</label>
              <input type="submit" value="Create" className="waves-effect btn"/>
            </div>        
          </div>
       </form>
        </div>
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
