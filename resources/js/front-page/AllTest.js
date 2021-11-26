import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Report from './Report';
import AnswerSheet from './AnswerSheet';
import {auth} from '../firebase';

function AllTest() { 
  let UrlHttp ="http://127.0.0.1:8000/api";
  var url = window.location.pathname;
  var splitUrl = url.split('/'); 
  const uid = splitUrl[2];
    const [offset, setOffset] = useState(0);
    const [value, setValue] = useState([]);
    const [perPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)
    const [score, setScore] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [report, setReport] = useState({});
    const [sr, setSr]=useState(auth.currentUser.email);
    const [answer, setAnswer] = useState('');  
    const [data, setData] = useState()  
    
    const Click=(option,ans,id)=>{       
setReport((preValue)=>{ 
return{
...preValue,
[id]:JSON.parse(option),
}
})     
if(option==ans){
  setScore(score + 1);
}
else{
  setWrong(wrong + 1);
}
    }
    const getData = async() => {       
        const res = await axios.get(`${UrlHttp}/quiz_test_get/${uid}`) 
        setData(res.data.data);  
        const info = res.data.data;
        
                  const slice = info.slice(offset, offset + perPage)
                  const postData = slice.map((user) => 
                  <div className="collection with-header" key={user.id}>                   
                    <li className="collection-header"><h6>{JSON.parse(user.qustions)}</h6></li>                   
                    <a className="collection-item waves-effect state" onClick={()=>Click(user.option_1,user.answer,user.id)}>{JSON.parse(user.option_1)}</a>
                    <a className="collection-item waves-effect state" onClick={()=>Click(user.option_2,user.answer,user.id)}>{JSON.parse(user.option_2)}</a>    
                    <a className="collection-item waves-effect state" onClick={()=>Click(user.option_3,user.answer,user.id)}>{JSON.parse(user.option_3)}</a>
                    <a className="collection-item waves-effect state"  onClick={()=>Click(user.option_4,user.answer,user.id)}>{JSON.parse(user.option_4)}</a>                                                                            
                  </div>)
                  setValue(postData)
                  setPageCount(Math.ceil(info.length / perPage))
    }
   
    useEffect(() => {
        getData()       
      }, [offset])
      const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage)
    };
    const Submit=(e)=>{        
      e.preventDefault();
      const data = {  
        user_id:sr, 
        user_name:"user",
        report:JSON.stringify(report),
      }       
      axios.post(`http://127.0.0.1:8000/api/users_answer`, data).then(res =>{
        if(res.data.status === 200){ 
          const id = res.data.message; 
          axios.get(`http://127.0.0.1:8000/api/answersheet/${id}`).then(res=>{
        if(res.data.status === 200){
          setAnswer(JSON.parse(res.data.data[0].answer));                                 
        }
      });                  
        }
        });
      const attempt = score+wrong;
      setShowScore({score:score,pageCount:pageCount, wrong:wrong, attempt:attempt, unattempt:pageCount-attempt}); 
    }   
    return (
        <div className="App">
          {
            !showScore?
            <>
            {value}
            <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={150}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>                        
            <a onClick={Submit} className="waves-effect waves-light btn">Submit</a>                   
            </>                        
            :<>
            <Report score={showScore}/>
            <AnswerSheet data={data} answer={answer}/>
            </>
          }                                                              
        </div>
      );
}
.0
export default AllTest

