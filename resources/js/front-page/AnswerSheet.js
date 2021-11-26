import React from 'react'

function AllTest({data,answer}) {
    const CheckAnswer = (option,ans,click)=>{        
        const check = JSON.stringify(click)        
if(option==ans){
if(ans==check){
    return {background:"blueviolet"}
    }
return {background:"green"}
}

else if(option==check){
if(check!=ans){
    return {background:"red"}
}
}
else null;
    
    }
return (    
        <div>
            <h4>Answer Sheet</h4>
             {
         data&&data.map((user)=>{                                                 
            return(
                    <ul className="collection with-header" key={user.id}>
                    <li className="collection-header"><h6>{JSON.parse(user.qustions)}</h6></li>
                    <li className="collection-item" style={CheckAnswer(user.option_1,user.answer,answer[user.id])}>{JSON.parse(user.option_1)}</li>
                    <li className="collection-item" style={CheckAnswer(user.option_2,user.answer,answer[user.id])}>{JSON.parse(user.option_2)}</li>    
                    <li className="collection-item" style={CheckAnswer(user.option_3,user.answer,answer[user.id])}>{JSON.parse(user.option_3)}</li>
                    <li className="collection-item" style={CheckAnswer(user.option_4,user.answer,answer[user.id])}>{JSON.parse(user.option_4)}</li>                                    
                    </ul>  
            )           
         })         
         }                             
        </div>
    )
}

export default AllTest
